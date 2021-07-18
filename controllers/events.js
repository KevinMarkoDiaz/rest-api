const {response} = require('express');

const Receta = require('../models/Receta');



const getRecipe = async (req, res = response)=>{


    const recipesList = await Receta.find()
                                        
                                   


    res.status(200).json({ 

        ok:true,
        recipesList

    });
};

const createRecipe = async(req, res = response) => {

    const recipe = new Receta(req.body);

    
    try{
        recipe.user = req.uid;

        const recipeSave = await recipe.save();


        res.status(200).json({

            ok:true,
            msg:recipeSave
        })

    }catch(error){

        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Contactate con el administrador'
        });

    };




};

const updateRecipe = async (req, res = response) =>{


    const recipeId = req.params.id;
    const uid = req.uid;
    try{

       const recipe = await Receta.findById(recipeId);
       
       
        if(!recipe){

            res.status(401).json({
                ok:false,
                msg:'No existe el id de esta receta'
            })

        };
        
        if(recipe.user.toString() !== uid){

            return res.status(401).json({
                ok:false,
                msg:'No tiene premisos de edicion en esta receta'
            })

        }


        const newRecipe = {
            ...req.body,
            user: uid
        }


        const recipeUpdate = await Receta.findByIdAndUpdate(recipeId, newRecipe, {new:true});

        res.status(200).json({
            ok:true,
            receta: recipeUpdate 
        });

    }catch(error){

        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });

    };




   
};

const deleteRecipe = async(req, res = response) =>{

    const recipeId = req.params.id;
    const uid = req.uid;


    try{

        const recipe = await Receta.findById(recipeId);
        
        
         if(!recipe){
 
             res.status(401).json({
                 ok:false,
                 msg:'No existe el id de esta receta'
             })
 
         };
         
         if(recipe.user.toString() !== uid){
 
             return res.status(401).json({
                 ok:false,
                 msg:'No tiene premisos de edicion en esta receta'
             })
 
         }
 
 
       
 
 
        await Receta.findByIdAndDelete(recipeId)
 
         res.status(200).json({
             ok:true,
             receta: 'Receta eliminada' 
         });
 
     }catch(error){
 
         console.log(error);
         res.status(500).json({
             ok:false,
             msg:'Hable con el administrador'
         });
 
     };

  
};

module.exports = {
    deleteRecipe, updateRecipe, createRecipe, getRecipe 
};