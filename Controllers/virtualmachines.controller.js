const VirtualMachine = require('../Models/VirtualMachine');
const Firewall = require('../Models/firewall')
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
async function getVirtualMachineById(req,res){
    const vmDb = await VirtualMachine.getVirtualMachineByID(req.params.id,req.user.id)
    if(!vmDb){
        throw new AppError(404, 'VirtualMachine Not Exists on Your Account')
    }
    const virtualMachine = new VirtualMachine(vmDb.hostname,vmDb.operating_system,vmDb.is_active, vmDb.identifier)
    res.status(200).json( virtualMachine);
}
async function attachVirtualMachineToFirewall(req,res){
    const vmDb = await VirtualMachine.getVirtualMachineByID(req.body.virtualmachineId,req.user.id)
    if(!vmDb){
        throw new AppError(404, 'VirtualMachine Not Exists on Your Account')
    }
    const firewallDb = await Firewall.getFirewallByID(req.body.firewallId,req.user.id)
    if(!firewallDb){
        throw new AppError(404, 'Firewall Not Exists on Your Account')
    }
    const virtualMachine = new VirtualMachine(vmDb.hostname,vmDb.operating_system,vmDb.is_active, vmDb.identifier)
    virtualMachine.id = vmDb.id
    const firewall = new Firewall(firewallDb.id,firewallDb.name,firewallDb.identifier)
    //check if virtualMachine attached to this firewall
const virtualMachineFirewall = await virtualMachine.getFirewallAttachedToVirtualMachine(firewall.id)
if(virtualMachineFirewall){
    throw new AppError(409, 'VirtualMachine Already attached To Firewall')
}
    //attach firewallToVM
    const attachId = await virtualMachine.attachVirtualMachineToFirewall(firewall.id)
    if(!attachId){
        throw new AppError(500, 'cannot attach firewall to virtualmachine')
    }
    res.status(200).json({"message":"VirtualMachine attached to firewall successfully!"});

}


module.exports ={
    getAllVirtualMachines,
    createNewVirtualMachine,
    deleteVirtualMachine,
    activateVirtualMachine,
    deactivateVirtualMachine,
    getVirtualMachineById,
    attachVirtualMachineToFirewall,
}