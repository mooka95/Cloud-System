const express = require('express')
const app = express()
const port = 8080
const passport = require('passport')
const { jwtStrategy } = require('./Config/passport')
const router = require('./Routes/router')()
app.use(passport.initialize({}))
  passport.use('jwt', jwtStrategy)
app.use('/', router)
app.use((err,req,res,next)=>{
  err.statusCode=err.statusCode||500;
  const handleError=err.statusCode<500?err.message:"SomeThing Went Wrong";

  res.status(err.statusCode).json({
    message:handleError,
    errors:err.errors ||{}
  });
 

})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})