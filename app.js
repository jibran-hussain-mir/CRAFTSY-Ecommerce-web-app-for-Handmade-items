const express=require('express');
const userRouter=require('./routes/user');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const { urlencoded } = require('body-parser');
require('dotenv').config()
require('./db/connection');
const port=process.env.PORT||3000;
const app=express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());

// Route Middlewares
app.use('/api',userRouter);



app.listen(port,()=>{
    console.log(`Server is Running at port ${port}`)
})