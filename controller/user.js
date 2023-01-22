const User=require('../models/user');

exports.userById=async (req,res,next,userId)=>{
    try
    {
        const user=await User.findById(userId);
        if(!User)
            {
                return res.status(404).json({error:"User does not exist"});
            }
        req.profile=user;
        next();
    }catch(error){
        res.status(400).json({error:error.message})
    }
}