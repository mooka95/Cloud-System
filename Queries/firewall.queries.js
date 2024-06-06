exports.firewallQueryList = {
   
    GET_All_firewalls: `
   SELECT firewalls.id,firewalls.name,firewalls.identifier,users.identifier As userIdentifier FROM firewalls LEFT JOIN users ON users.id = firewalls.user_id  where users.id =$1;
   `,
   insertFirewall: "INSERT INTO firewalls (name,user_id,identifier) VALUES ($1, $2,$3) RETURNING identifier ",

   
   
   
   }