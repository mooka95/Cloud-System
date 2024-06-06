const { Router } = require('express')
const asyncExec = require('../Utils/async')
const userController= require('../Controllers/User');
module.exports = Router({ mergeParams: true })
.post('/user', asyncExec(userController.registerUser))
.post('/login', asyncExec(userController.LoginUser))