const express=require('express');
const router=express.Router();
const {signup,signin}=require('../controller/userController');
const {userSignupValidator,validateResults}=require('../Validator/index')

router.post('/signup',userSignupValidator,validateResults,signup);
router.post('/signin',signin);

module.exports=router;