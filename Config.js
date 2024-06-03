require('dotenv').config();




module.exports={
    saltRounds:process.env.SALT_ROUNDS ||7,
    jwtSecret:process.env.JWT_SECRET,
    port:process.env.PORT ||3000,
}