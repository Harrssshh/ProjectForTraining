const mongoose =require('mongoose');

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        require:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    productURL:{
        type:String
    }
});


module.exports=mongoose.model('Product',productSchema);