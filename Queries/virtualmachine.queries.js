exports.virtualMachinesQueryList = {
   
	 GET_All_VirtualMachines: `
	SELECT virtualmachines.hostname,virtualmachines.is_active,virtualmachines.operating_system, virtualmachines.identifier,users.identifier As user_identifier FROM virtualmachines LEFT JOIN users ON users.id = virtualmachines.user_id where users.id =$1;
    `,
    insertVirtualMachine : 'INSERT INTO virtualmachines (hostname, is_active,operating_system,user_id,identifier) VALUES ($1, $2,$3,$4,$5) RETURNING identifier', 
    
    }