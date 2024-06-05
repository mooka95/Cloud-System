const Firewall=require('../Models/firewall')

async function  getAllFirewalls(req,res){
    const virtualMachines = await Firewall.getAllFirewalls(req.user)
    res.status(200).json(virtualMachines);
}
module.exports={
    getAllFirewalls,

}