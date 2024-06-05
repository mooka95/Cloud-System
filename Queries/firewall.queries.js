exports.firewallQueryList = {
   
    GET_All_firewalls: `
   SELECT firewalls.id,firewalls.name,firewalls.identifier,users.identifier As userIdentifier FROM firewalls LEFT JOIN users ON users.id = firewalls.user_id  where users.id =$1;
   `,
   insertVirtualMachine : 'INSERT INTO virtualmachines (hostname, is_active,operating_system,user_id,identifier) VALUES ($1, $2,$3,$4,$5) RETURNING identifier', 

   
   
   
   }