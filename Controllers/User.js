const User=require('../Models/User');
const database=require('../db');
const usersQuery=require('../Queries/user.queries');
const AppError = require("../Utils/AppError")
const Address = require('../Models/Address')

async function registerUser(req, res, next) {
  try{
    // Your implementation here
    const {email, password,street,city,country,firstName,lastName} = req.body
const user = new User(null,email,password,firstName,lastName);
   await user.hashPassword()
   //inserting data to database
   const userIdentifier = await user.addUser()
   const address = await new Address(street,city,country)
   await address.addAddress(user.id)
   res.status(201).send({"message":"User created Successfully", "userIdentifier": userIdentifier});
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