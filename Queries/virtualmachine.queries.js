exports.virtualMachinesQueryList = {
   
	 GET_All_VirtualMachines: `
	SELECT virtualmachines.hostname,virtualmachines.is_active,virtualmachines.operating_system, virtualmachines.identifier,users.identifier FROM virtualmachines LEFT JOIN users ON users.id = virtualmachines.user_id where users.id =31;
    `,
    //  GET_USERS_QUERY : 'SELECT id,name,email FROM USERS', 
    
    
    
    }