const VirtualMachine = require('../Models/VirtualMachine');
const AppError = require('../Utils/AppError');

async function  getAllVirtualMachines(req,res){
    // const userId = req.userId
    const virtualMachines = await VirtualMachine.getAllVirtualMachines(req.user)
    res.status(200).json(virtualMachines);
}
async function  createNewVirtualMachine(req,res){
    const {hostname,isActive,OperatingSystem} =req.body
    const virtualMachine = new VirtualMachine(hostname,OperatingSystem,isActive)

    const virtualMachineId = await virtualMachine.addVirtualMachine(req.user,req.body)
    if(!virtualMachineId){
   throw new AppError(500,'Could not create virtual machine. Try again later')
    }

    res.status(200).json({"message":"virtualMachine created Successfully", "vmId": virtualMachineId});
}



module.exports ={
    getAllVirtualMachines,
    createNewVirtualMachine,
}