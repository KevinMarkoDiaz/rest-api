
const {validarJWT} = require('../middlewares/validar-jwt');
const {Router} = require('express');
const {getRecipe, createRecipe, updateRecipe, deleteRecipe} = require('../controllers/events');

const {check} = require('express-validator');
const {checkValues} = require('../middlewares/checkValues');


const router = Router();

//Validar Token
router.use(validarJWT);

//Rutas de eventos

/*
Event routes

/api/events

*/

//Obtener recetas
router.get('/', getRecipe );

//Crear nueva receta

router.post('/'
    , 
    [
        check('title','El titulo es requerido').not().isEmpty(),
        check('ingredients','Los ingredientes son requeridos').not().isEmpty(),
        check('preparation','La preparacion es requerida').not().isEmpty(),
        check('reviews','La review es requerida').not().isEmpty(),
        check('state','El estado es requerido').not().isEmpty(),
        checkValues
             
    ]
    , createRecipe);

//Actualizar receta

router.put('/:id',  updateRecipe);

//Borrar receta

router.delete('/:id', deleteRecipe);

module.exports = router;