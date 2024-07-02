const { Router } = require('express')
const asyncExec = require('../Utils/async')
const userController= require('../Controllers/User');


const validateLogin = asyncExec(async (req, res, next) => {
return req.validate(req.validations.loginUser)(req, res, next)
  })
const validateRegister = asyncExec(async (req, res, next) => {
return req.validate(req.validations.registerUser)(req, res, next)
  })

module.exports = Router({ mergeParams: true })
.post('/user', validateRegister,asyncExec(userController.registerUser))
.post('/login', validateLogin,asyncExec(userController.LoginUser))