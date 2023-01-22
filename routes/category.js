const express=require('express');
const router=express.Router();
const {create}=require('../controller/category');
const {isAdmin,isAuth,requireSignin}=require('../controller/auth');
const { userById } = require('../controller/user');
router.post('/category/create/:userId',requireSignin,isAuth,isAdmin,create);

router.param('userId',userById)

module.exports=router;