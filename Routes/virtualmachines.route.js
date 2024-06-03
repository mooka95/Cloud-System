const { Router } = require('express')
const asyncExec = require('../Utils/async')
const virtualMachineController = require('../Controllers/virtualmachines.controller')
const authenticate= require("../Middlewares/Authenticate")
module.exports = Router({ mergeParams: true })

.get('/virtualmachines',authenticate,asyncExec(virtualMachineController.getAllVirtualMachines))
.post('/virtualmachines',authenticate,asyncExec(virtualMachineController.createNewVirtualMachine))