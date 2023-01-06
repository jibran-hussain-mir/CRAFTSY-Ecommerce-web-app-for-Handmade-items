const express=require('express');
require('dotenv').config()
const port=process.env.PORT||3000;
const app=express();

app.get('/',(req,res)=>{
    res.send('<h1>hi</h1>');
})

app.listen(port,()=>{
    console.log(`Server is Running at port ${port}`)
})