const AppError = require('../Utils/AppError')
const User = require("../Models/User");





module.exports=  async (req,res,next)=>{
    try{
        
        const token =req.headers.authorization;
        if(!token){
         throw new AppError(401,"Please Login First ")
        
        }
        req.user= await User.getUserByToken(token);
        
        
        if(!req.user){
            throw new AppError(401,"Please Login First ")
        }
        next();
    }catch(error){
next(error)
    }





}