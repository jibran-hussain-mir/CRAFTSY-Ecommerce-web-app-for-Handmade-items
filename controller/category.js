const Category=require('../models/category');

exports.create=async (req,res)=>{
    
   try{
    const category=new Category(req.body);
    await category.save();
    res.status(201).json({category})
   }catch(e){
    res.status(420).json({error:e.message});
   }

}

