const pool = require('../db');
const { v4: uuidv4 } = require('uuid');
class Address{
constructor(street,city,country){
    this.street=street;
    this.city=city;
    this.country=country

}
async addAddress(userId){
    const sqlStatement = `INSERT INTO addresses (street, city,country,user_id,identifier) VALUES ($1, $2,$3,$4,$5) RETURNING identifier`
    const result = await pool.query(sqlStatement, [this.street,this.city,this.country,userId,uuidv4()]); // Assuming you have a constant named getUserByEmail in your queries module
    return result.rows[0].identifier||null;
}
}

module.exports = Address