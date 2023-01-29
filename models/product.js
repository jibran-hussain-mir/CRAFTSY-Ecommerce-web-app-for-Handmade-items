const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:50,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
        maxlength:300,
     },
     price:{
        type:Number,
        required:true,
        trim:true,
        maxlength:32
     },
     category:{
        type:mongoose.Schema.Types.ObjectId, //why we have used Object id here
        ref:'Category',
        required:true,
        trim:true
     }, 
     quantity:{
        type:Number,
        trim:true,
        required:true,
     },
     sold:{
      type:Number,
      default:0
     },
     photo:{
        data:Buffer, //The data property is used to specify the name of the property that will hold the binary data in the Mongoose schema, while type is used to specify the data type of the field
        contentType:String
     },
     shipping:{
        required:true,
        type:Boolean
     }
},{timestamps:true})

module.exports=mongoose.model('Product',productSchema)