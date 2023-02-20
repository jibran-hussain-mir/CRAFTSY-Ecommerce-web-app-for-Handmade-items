const mongoose=require('mongoose');
const crypto=require('crypto');
const { v4: uuidv4 } = require('uuid');


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    email:{
        type:String,
        trim:true,
        requried:true,
        unique:true
    },  
    hashed_password:{
        type:String,
        required:true
    },
    about:{
        type:String,
        trim:true,
    },
    salt:String,

    // Admin (1) or Regular User (0)
    role:{
        type:Number,
        default:0
    },

    // Purchase history of the user
    history:{
        type:Array,
        default:[]
    }
},{timestamps:true})

// Virtual Field
userSchema
.virtual('password')
.set(function(password){
    this._password=password;
    this.salt=uuidv4();;
    this.hashed_password=this.encryptedPassword(password);
})
.get(function(){
    return this._passoword;
}) 

userSchema.methods={
    isValidCredentials:function(plainPassword){
        return this.encryptedPassword(plainPassword) === this.hashed_password;
    },
    encryptedPassword:function(password){
        if(!password) return '';
        try{
            return crypto.createHmac('sha256',this.salt)
                            .update(password)
                            .digest('hex');
        }catch(e){
            console.log(e);
        }
    }
}


const User=mongoose.model('User',userSchema)
module.exports=User