const express=require('express');
const router=express.Router();
const {requireSignin,isAuth,isAdmin}=require('../controller/auth')
const {userById}=require('../controller/user')


router.get('/:userId',requireSignin,isAuth,isAdmin,(req,res)=>{
    res.json({name:req.profile.name})
})
router.param('userId',userById);

module.exports=router