require('dotenv').config();




module.exports={
    saltRounds:process.env.SALT_ROUNDS ||7,
    jwtSecret:process.env.JWT_SECRET|| 'sercret',
    port:process.env.PORT ||3000,
}