// models/virtualMachine.js
const pool = require('../db');
const { v4: uuidv4 } = require('uuid');
const {virtualMachinesQueryList} = require('../Queries/virtualmachine.queries')
class VirtualMachine {
  id
  constructor(hostName, operatingSystem, isActive = false,identifier) {
    this.hostName = hostName;
    this.operatingSystem = operatingSystem;
    this.isActive = isActive;
    this.identifier = identifier;
  }



  static async getAllVirtualMachines(user) {
      const res = await pool.query(virtualMachinesQueryList["GET_All_VirtualMachines"],[user.id]);
      return res.rows;
  }
   async addVirtualMachine(user) {
      const response = await pool.query(virtualMachinesQueryList["insertVirtualMachine"],[this.hostName,this.isActive,this.operatingSystem,user.id,uuidv4()]);
      return response.rows[0].identifier || false;
  }

  static async getVirtualMachineByID(identifier, userId) {
    const query = `SELECT * FROM virtualmachines WHERE identifier = $1 AND user_id = $2`;
    try {
      const res = await pool.query(query, [identifier, userId]);
      return res.rows[0] ||false;
    } catch (err) {
      throw err;
    }
  }
   async getVirtualMachineByHostName() {
    const query = `SELECT * FROM virtualmachines WHERE hostname = $1`;
    try {
      const res = await pool.query(query, [this.hostName]);
      return res.rows.length>0||false;
    } catch (err) {
      throw err;
    }
  }

  async deleteVirtualMachine() {
    const query = `DELETE FROM virtualmachines WHERE identifier = $1`;
     await pool.query(query, [this.identifier]);
      console.log('Data deleted successfully!');
    
  }

  async updateVirtualMachineActiveState(isActive) {
    const query = `UPDATE virtualmachines SET is_active = $1 WHERE identifier = $2`;
    try {
      await pool.query(query, [isActive, this.identifier]);
      console.log('Data updated successfully!');
    } catch (err) {
      console.error('Error updating data', err);
      throw err;
    }
  }

  async attachVirtualMachineToFirewall(firewallId) {
    try{
      const query = `INSERT INTO virtualmachines_firewalls (virtualmachine_id, firewall_id, identifier)
                     VALUES ($1, $2, $3) RETURNING identifier`;
        const res = await pool.query(query, [this.id, firewallId, uuidv4()]);
        return res.rows[0].identifier || false;

    }catch(error){
return false
    }
  }
  async getFirewallAttachedToVirtualMachine(firewallId) {
      const query = `SELECT * FROM   virtualmachines_firewalls WHERE firewall_id=$1 AND virtualmachine_id=$2`;
        const res = await pool.query(query, [firewallId,this.id]);
        return res.rows[0] || false;
  }
  
}


module.exports = VirtualMachine;
