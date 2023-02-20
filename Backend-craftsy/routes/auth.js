const express=require('express');
const router=express.Router();
const {signup,signin,signout,requireSignin}=require('../controller/auth');
const {userSignupValidator,validateResults}=require('../Validator/index')

router.post('/signup',userSignupValidator,validateResults,signup);
router.post('/signin',signin);
router.get('/signout',signout);

module.exports=router;