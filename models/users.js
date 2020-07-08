const client = require('../db')
const createTableText = `
CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  first_name text,
  last_name text,
  email text
);
`;

module.exports = async ()=>{
    try{
       return await client.query(createTableText);
    }catch (error) {
        return {error: error.message};
    }
};

