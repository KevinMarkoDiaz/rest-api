const response = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const createUser = async (req, res = response)=>{
    
    const { email, password} = req.body;


    

    try {
    
        let user = await User.findOne({email});

        if (user) {
            return res.status(400).json({
                ok:false,
                msg:'El usuario existe'
            })
            
        }
    

        user = new User(req.body);

        //Encriptar contraseñas

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        

        await user.save();
        
        //Generar JWT

        const token = await generarJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
          
         })
    
    
    } catch (error) { 

        console.log(error);

        res.status(500).json({

            ok:false,
            msg:'Error al grabar datos'

        })

    }


   
};



const loginUser = async(req, res = response)=>{


    const { email, password} = req.body;


    try{

        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({
                ok:false,
                msg:'El usuario no existe con ese email'
            })}



        //Validar los passwords
        
        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword){

           return res.status(400).json({

                ok:false,
                msg: 'Password incorrecto'

            });

        };


                
        //Generar JWT

        const token = await generarJWT(user.id, user.name);


        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
         })


    }catch(error){
        
        console.log(error);

        res.status(500).json({

            ok:false,
            msg:'Error al grabar datos'

        })

    }

    
   }


const renewToken = async(req, res = response)=>{

    const uid = req.uid;
    const name = req.name;

    const token = await generarJWT(uid, name);


    res.json({
        ok: true,
        token,
        uid,
        name



        })
   }
   
   
module.exports = {
    createUser, loginUser, renewToken
}