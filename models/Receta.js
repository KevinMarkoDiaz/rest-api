const {Schema, model} = require('mongoose');

const RecipeSchema = Schema({

   title: {
       type: String,
       required: true 
   },

   ingredients:{
       
        type:Object,
        required:true
       
   },

   preparation:{
        type:String,
        required:true
   },

   reviews:{
       type:Number,
       required:true
   },

   state:{
       type:Boolean,
       required:true

   },

   user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required:true
   }

   
});

module.exports = model ('Receta', RecipeSchema );