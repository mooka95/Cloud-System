const bcrypt = require('bcrypt');
const saltRounds= 7
const usersQuery=require('../Queries/user.queries')
const database = require("../db")
class User {
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
        const isMatch = await bcrypt.compare(requestedPassword, password);
        return isMatch;   
     }
    static async getUserByEmail(email){
        const result = await database.query(usersQuery.GET_User_ByEmail_Query, [email]); // Assuming you have a constant named getUserByEmail in your queries module
        const user = result.rows[0];
        return new User(user.email, user.password, user.first_name, user.last_name);

    }
}
module.exports = User
