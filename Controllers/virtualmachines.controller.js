const virtualMachine = require('../Models/VirtualMachine')

async function  getAllVirtualMachines(req,res){
    // const userId = req.userId
    const virtualMachines = await virtualMachine.getAllVirtualMachines()
    res.status(200).json(virtualMachines);
}



module.exports ={
    getAllVirtualMachines,
}