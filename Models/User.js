const bcrypt = require('bcrypt');
const { saltRounds,jwtSecret }=require('../Config');
const usersQuery=require('../Queries/user.queries')
const database = require("../db")
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
class User {
    
    constructor(id,email, password, firstName, lastName) {
        this.id = id
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
      }
    async hashPassword(){
        this.password = await bcrypt.hash(this.password,saltRounds);
    }
    async addUser(){
       const sqlStatement = `INSERT INTO users (email, password,first_name, last_name, identifier) VALUES ($1, $2,$3,$4, $5) RETURNING identifier,id`
        const result = await database.query(sqlStatement, [this.email,this.password,this.firstName,this.lastName,uuidv4()]); // Assuming you have a constant named getUserByEmail in your queries module
        this.id=result.rows[0].id
        return result.rows[0].identifier||null;
    }
    async checkPasswordHash(requestedPassword){
        const isMatch = await bcrypt.compare(requestedPassword, this.password);
        return isMatch;   
     }
    static async getUserByEmail(email){
        const result = await database.query(usersQuery.queryList['GET_User_ByEmail_Query'], [email]); // Assuming you have a constant named getUserByEmail in your queries module
        const user = result.rows[0]||null;
        if(!user){
            return null
        }
        
                return new User(user.id,user.email, user.password, user.first_name, user.last_name)

    }
    static async getUserById(id){
        const result = await database.query(usersQuery.queryList['GET_User_ById_Query'], [id]); // Assuming you have a constant named getUserByEmail in your queries module
        const user = result.rows[0]||null;
        if(!user){
            return null
        }
        
                return new User(user.id,user.email, user.password, user.first_name, user.last_name)

    }
    static async getUserByToken(token){
        try{

            const {user}= await jwt.verify(token,jwtSecret);
            const userData =await this.getUserById(user.id);
            return userData;
        }catch(err){
         return false
        }

    }
    async generateToken(id){
       const accessTokenExpires = moment().add(120, 'minutes')
        const payload = {
            user: {id},
            sub:id,
            iat: moment().unix(),
            exp: accessTokenExpires.unix(),
          }
        
          return jwt.sign(payload, jwtSecret)
    }
}
module.exports = User
