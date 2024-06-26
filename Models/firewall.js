const pool = require('../db');
const { v4: uuidv4 } = require('uuid');
const {firewallQueryList} = require('../Queries/firewall.queries')
class Firewall{
constructor(id,name,identifier){
    this.id=id
    this.name=name
    this.identifier = identifier
}
static async getFirewallByID(identifier, userId) {
    const query = `SELECT * FROM firewalls WHERE identifier = $1 AND user_id = $2`;
    try {
      const res = await pool.query(query, [identifier, userId]);
      return res.rows[0] ||false;
    } catch (err) {
      console.error('Error fetching data', err);
      throw err;
    }
  }
static async getFirewallByName(name, userId) {
    const query = `SELECT * FROM firewalls WHERE name = $1 AND user_id = $2`;
    try {
      const res = await pool.query(query, [name, userId]);
      return res.rows ||false;
    } catch (err) {
      throw err;
    }
  }

  static async getAllFirewalls(user) {
    const res = await pool.query(firewallQueryList["GET_All_firewalls"],[user.id]);
    return res.rows||false;
  }
   async deleteFirewall() {
    const query = `DELETE FROM firewalls WHERE identifier = $1`;
    await pool.query(query, [this.identifier]);
     
  }
   async createFirewall(userId) {
    const response = await pool.query(firewallQueryList["insertFirewall"],[this.name,userId,uuidv4()]);
    return response.rows[0].identifier || false;
     
  }
}

module.exports = Firewall;