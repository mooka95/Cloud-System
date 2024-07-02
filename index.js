const express = require('express')
const app = express()
const port = 3000
// const passport = require('passport')
// const { jwtStrategy } = require('./Config/passport')
const router = require('./Routes/router')()
// const authenticate= require("./Middlewares/Authenticate")
const validate = require('./Middlewares/validate')
const validations = require('./Validations')
var cors = require('cors')
app.use(cors())
app.use(express.json());

  app.use((req,res,next)=>{
    req.validations = validations
    req.validate =validate
    return next()
  })

app.use('/',router)

app.use((err,req,res,next)=>{
  // console.log(err)
  err.statusCode=err.statusCode||500;
  const handleError=err.statusCode<500?err.message:"SomeThing Went Wrong";

  res.status(err.statusCode).json({
    message:handleError,
    errors:err.errors ||{}
  });
})
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`))
}

module.exports = app;