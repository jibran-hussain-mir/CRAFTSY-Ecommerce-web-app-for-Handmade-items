const mongoose=require('mongoose');

// mongoose.set('debug',true);

mongoose.connect('mongodb://127.0.0.1:27017/CRAFTSY',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('Database connected successfully')
}).catch((e)=>{
    console.log(e);
})