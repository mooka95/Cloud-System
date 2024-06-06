const Firewall=require('../Models/firewall')
const AppError = require('../Utils/AppError');
async function  getAllFirewalls(req,res){
    const virtualMachines = await Firewall.getAllFirewalls(req.user)
    res.status(200).json(virtualMachines);
}
async function createFirewall(req,res){
    const {name}= req.body
    const firewall = new Firewall(null,name)
//
    const firewallDb= await Firewall.getFirewallByName(name,req.user.id)
    if(firewallDb.length>0){
        throw new AppError(400,'Firewall name already exists on your account')
    }
    const firewallId = await firewall.createFirewall(req.user.id)

    res.status(200).json({"message":"Firewall created Successfully", "firewallId": firewallId});
}
async function deleteFirewall(req,res){
    const firewallDbData = await Firewall.getFirewallByID(req.params.id,req.user.id)
    if(!firewallDbData){
        throw new AppError(404, 'firewall Not Exists on Your Account')
    }
    const firewall = new Firewall(firewallDbData.id,firewallDbData.name,firewallDbData.identifier)
     await firewall.deleteFirewall()
    res.status(200).json({"message":"firewall deleted successfully!"});
}
module.exports={
    getAllFirewalls,
    deleteFirewall,
    createFirewall,

}