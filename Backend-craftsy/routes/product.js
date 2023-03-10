const express=require('express');
const router=express.Router();

const {create,productById,read,remove,update,list,listRelated,listCategories}=require('../controller/product');
const {isAdmin,isAuth,requireSignin}=require('../controller/auth');
const { userById } = require('../controller/user');

router.post('/products',list);
router.post('/product/create/:userId',requireSignin,isAuth,isAdmin,create);
router.get('/product/:productId',read)
router.delete('/product/:productId/:userId',requireSignin,isAuth,isAdmin,remove);
router.put('/product/:productId/:userId',requireSignin,isAuth,isAdmin,update);
router.get('/products/related/:productId',listRelated)
router.get('/products/categories',listCategories)


router.param('userId',userById);
router.param('productId',productById);

module.exports=router;