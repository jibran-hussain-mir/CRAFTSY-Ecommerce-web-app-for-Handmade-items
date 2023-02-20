const mongoose=require('mongoose');

const categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:100,
        trim:true
    }
},{timestamps:true})

module.exports=mongoose.model('Category',categorySchema);