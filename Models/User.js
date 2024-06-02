const bcrypt = require('bcrypt');
const { saltRounds,jwtSecret }=require('../Config');
const usersQuery=require('../Queries/user.queries')
const database = require("../db")
const jwt = require('jsonwebtoken');
// const signJwt=util.promisify(jwt.sign);
class User {
    id 
    constructor(email, password, firstName, lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
      }
    async hashPassword(){
        this.password = await bcrypt.hash(this.password,saltRounds);
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
                return new User(user.email, user.password, user.first_name, user.last_name)

    }
    async generateToken(){
        return jwt.sign({id:this.id},jwtSecret,{expiresIn:'2h'});
    }
}
module.exports = User
