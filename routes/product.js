const express=require('express');
const router=express.Router();

const {create,productById,read,remove,update}=require('../controller/product');
const {isAdmin,isAuth,requireSignin}=require('../controller/auth');
const { userById } = require('../controller/user');


router.post('/product/create/:userId',requireSignin,isAuth,isAdmin,create);
router.get('/product/:productId',read)
router.delete('/product/:productId/:userId',requireSignin,isAuth,isAdmin,remove);
router.put('/product/:productId/:userId',requireSignin,isAuth,isAdmin,update);

router.param('userId',userById);
router.param('productId',productById);

module.exports=router;