exports.queryList = {
   
    SAVE_USER_QUERY : 'INSERT INTO users (name, email, password) VALUES(?, ?, ?)',
     GET_USERS_QUERY : 'SELECT id,name,email FROM USERS', 
     GET_User_ByEmail_Query:'SELECT id,password FROM users WHERE email = $1',
     GET_User_ById_Query:'SELECT id,password,identifier FROM users WHERE id = $1'
    
    }