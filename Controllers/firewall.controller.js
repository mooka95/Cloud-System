const Firewall=require('../Models/firewall')

async function  getAllFirewalls(req,res){
    const virtualMachines = await Firewall.getAllFirewalls(req.user)
    res.status(200).json(virtualMachines);
}
async function createFirewall(req,res){
    const {name}= req.body
    const firewall = new Firewall(null,name)
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

}