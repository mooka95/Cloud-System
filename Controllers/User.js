const User=require('../Models/User');
const database=require('../db');
const usersQuery=require('../Queries/user.queries');
const AppError = require("../Utils/AppError")

async function registerUser(req, res, next) {
  try{
    // Your implementation here
    const {name,email, password} = req.body.user
const user = new User(name, email,password);
   await user.hashpassword()
   //inserting data to database
    await database.query(usersQuery.queryList.SAVE_USER_QUERY,[user.name,user.email,user.password])
   res.status(201).send("New User Added Successfully ");
  }catch(error){
    next(error)
  }
    
  }
  async function LoginUser(req,res){
    const { email, password } = req.body;

    // Retrieve user by email
    const user = await User.getUserByEmail(email);
    if (!user) {
      throw new AppError(404,"Email or password invalid")
    }
   const isPasswordMatch=await user.checkPasswordHash(password)
   if (!isPasswordMatch) {
    throw new AppError(404,"Email or password invalid")
        }
        //generate token
        const token = await user.generateToken(user.id)
        const response = {
          message:"Login successful!",
           token,
        }
        res.json(response)
  }
async function getAllUsers(req, res, next) {
  try{
  const users =  await database.query(usersQuery.queryList.GET_USERS_QUERY)
  res.json({ error: false, users })
  }catch(error){
    next(error)
  }
    
  }

  module.exports = {
    registerUser,
    getAllUsers,
    LoginUser,
  }