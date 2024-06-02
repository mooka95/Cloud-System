const { Router } = require('express')
const asyncExec = require('../Utils/async')
const userController= require('../Controllers/User');
module.exports = Router({ mergeParams: true })
.post('/register', asyncExec(userController.registerUser))
.get('/users', asyncExec(userController.getAllUsers))
.get('/login', asyncExec(userController.LoginUser))