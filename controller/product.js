const Product=require('../models/product');
const formidable = require('formidable');
const { IncomingForm } = require('formidable');
const fs=require('fs'); 
const { ResultWithContext } = require('express-validator/src/chain');
const product = require('../models/product');

exports.create=  (req,res)=>{
    const form = new IncomingForm();
    form.keepExtentions=true;
    form.parse(req, (err,fields,files)=>{

        if(err)
            {
                res.status(401).json({
                    error:'Image could not be uploaded'
                })
            }
        const product=new Product(fields);

        const {name,description,price,category,quantity,shipping}=fields;

        if(!name || !description || !price || !category || !quantity || !shipping)
            {
               return res.status(400).json({error:'All fields are required'});
            }
        
        if (files.photo) {

            if (files.photo.size > 1048576) {
              return res.status(400).json({
                error: "Image should be less than 1mb in size",
              });
            }
            product.photo.data = fs.readFileSync(files.photo.filepath); // change path to filepath
            product.photo.contentType = files.photo.mimetype; // change type to mimetype         

          }
          product.save((err,result)=>{
            if(err){
                res.status(400).json({error:err.message})
            }
            res.status(201).json({result})

        })
          
    })
    
}


exports.productById=async (req,res,next,productId)=>{
   try
      {
    const product=await Product.findById(productId);
    if(!product)
        {
            return res.status(400).json({error:"Product with this ID does not exist"});
        } 
        req.product=product;
        next();  
      }catch(e){
        res.status(500).json({error:e.message});
      }
}

exports.read=(req,res)=>{
    req.product.photo=undefined;
    return res.json({product:req.product})
}

exports.remove=async (req,res)=>{
    const product=await Product.deleteOne({_id:req.product._id.toString()});
    return res.status(200).json({product,message:`Product has been deleted successfully`});
}

exports.update=  (req,res)=>{
    const form = new IncomingForm();
    form.keepExtentions=true;
    form.parse(req, async (err,fields,files)=>{

        if(err)
            {
                res.status(401).json({
                    error:'Image could not be uploaded'
                })
            }
       

        const {name,description,price,category,quantity,shipping}=fields;

        if(!name || !description || !price || !category || !quantity || !shipping)
            {
               return res.status(400).json({error:'All fields are required'});
            }
        
        if (files.photo) {

            if (files.photo.size > 1048576) {
              return res.status(400).json({
                error: "Image should be less than 1mb in size",
              });
            }

            product.photo.data = fs.readFileSync(files.photo.filepath); // change path to filepath

          }
          const product=await Product.updateOne({_id:req.product._id.toString()},{
            $set:{
                fields
            }
        })
            product.photo=undefined;
            console.log(product)
            res.status(201).json({product})

        })
          
    }
    

