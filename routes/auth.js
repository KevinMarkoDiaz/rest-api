
//Rutas de Usuarios host + /api/auth



const {Router} = require('express');
const {check} = require('express-validator');

const {createUser, loginUser, renewToken} = require('../controllers/auth');
const {checkValues} = require('../middlewares/checkValues');
const {validarJWT} = require('../middlewares/validar-jwt');
 
const router = Router();


router.post(
  '/register',
  [
    //middlewares
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'is required min 6 caracters  length').isLength({min:6}),
    checkValues
  
  
  ] 
  ,
   createUser 
   );

router.post(
  '/',
  [
      //middleweares
    check('email', 'email is required').isEmail(),
    check('password', 'is required min 6 caracters  length').isLength({min:6}),
    checkValues

  ] ,
  loginUser);

router.get('/renew', validarJWT, renewToken);


module.exports = router;