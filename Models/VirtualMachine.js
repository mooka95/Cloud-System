// models/virtualMachine.js
const pool = require('../db');
const { v4: uuidv4 } = require('uuid');
const {virtualMachinesQueryList} = require('../Queries/virtualmachine.queries')
class VirtualMachine {
  constructor(hostName, operatingSystem, isActive = false) {
    this.hostName = hostName;
    this.operatingSystem = operatingSystem;
    this.isActive = isActive;
    this.identifier = uuidv4();
  }



  static async getAllVirtualMachines(user) {
      const res = await pool.query(virtualMachinesQueryList["GET_All_VirtualMachines"],[user.id]);
      return res.rows;
  }
   async addVirtualMachine(user) {
      const response = await pool.query(virtualMachinesQueryList["insertVirtualMachine"],[this.hostName,this.isActive,this.operatingSystem,user.id,this.identifier]);
      return response.rows[0].identifier || false;
  }

  static async getVirtualMachineByID(identifier, userId) {
    const query = `SELECT * FROM virtual_machines WHERE identifier = $1 AND userid = $2`;
    try {
      const res = await pool.query(query, [identifier, userId]);
      return res.rows[0];
    } catch (err) {
      console.error('Error fetching data', err);
      throw err;
    }
  }

  async deleteVirtualMachine() {
    const query = `DELETE FROM virtual_machines WHERE identifier = $1`;
    try {
      await pool.query(query, [this.identifier]);
      console.log('Data deleted successfully!');
    } catch (err) {
      console.error('Error deleting data', err);
      throw err;
    }
  }

  async updateVirtualMachineActiveState(isActive) {
    const query = `UPDATE virtual_machines SET isactive = $1 WHERE identifier = $2`;
    try {
      await pool.query(query, [isActive, this.identifier]);
      console.log('Data updated successfully!');
    } catch (err) {
      console.error('Error updating data', err);
      throw err;
    }
  }

  async attachVirtualMachineToFirewall(firewallId) {
    const query = `INSERT INTO firewall_virtual_machines (virtual_machine_id, firewall_id, identifier)
                   VALUES ($1, $2, $3) RETURNING id`;
    try {
      const res = await pool.query(query, [this.identifier, firewallId, uuidv4()]);
      console.log('Data inserted successfully!');
      return res.rows[0].id;
    } catch (err) {
      console.error('Error inserting data', err);
      throw err;
    }
  }
}

module.exports = VirtualMachine;
