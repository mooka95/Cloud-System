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
async function deleteVirtualMachine(req,res){
//get
const vmDb = await VirtualMachine.getVirtualMachineByID(req.params.id,req.user.id)
if(!vmDb){
    throw new AppError(404, 'VirtualMachine Not Exists on Your Account')
}
const virtualMachine = new VirtualMachine(vmDb.hostname,vmDb.operating_system,vmDb.is_active, vmDb.identifier)
 await virtualMachine.deleteVirtualMachine()
res.status(200).json({"message":"VirtualMachine deleted successfully!"});
}
async function activateVirtualMachine(req,res){
    const vmDb = await VirtualMachine.getVirtualMachineByID(req.params.id,req.user.id)
    if(!vmDb){
        throw new AppError(404, 'VirtualMachine Not Exists on Your Account')
    }
    const virtualMachine = new VirtualMachine(vmDb.hostname,vmDb.operating_system,vmDb.is_active, vmDb.identifier)
    await virtualMachine.updateVirtualMachineActiveState(true)
    res.status(200).json({"message":"VirtualMachine Activated successfully!"});
}
async function deactivateVirtualMachine(req,res){
    const vmDb = await VirtualMachine.getVirtualMachineByID(req.params.id,req.user.id)
    if(!vmDb){
        throw new AppError(404, 'VirtualMachine Not Exists on Your Account')
    }
    const virtualMachine = new VirtualMachine(vmDb.hostname,vmDb.operating_system,vmDb.is_active, vmDb.identifier)
    await virtualMachine.updateVirtualMachineActiveState(false)
    res.status(200).json({"message":"VirtualMachine Deactivated successfully!"});
}



module.exports ={
    getAllVirtualMachines,
    createNewVirtualMachine,
    deleteVirtualMachine,
    activateVirtualMachine,
    deactivateVirtualMachine,
}