const { Router } = require('express')
const asyncExec = require('../Utils/async')
const virtualMachineController = require('../Controllers/virtualmachines.controller')
module.exports = Router({ mergeParams: true })

.get('/virtualmachines',asyncExec(virtualMachineController.getAllVirtualMachines))