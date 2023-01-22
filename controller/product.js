const Product=require('../models/product');
const formidable = require('formidable');
const { IncomingForm } = require('formidable');
const fs=require('fs'); 
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