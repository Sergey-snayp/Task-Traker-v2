const client = require('../index');

const createTableText = `
CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  login VARCHAR (30) UNIQUE,
  first_name VARCHAR (30),
  last_name VARCHAR (30),
  email VARCHAR (30) UNIQUE,
  password text
);
`;

module.exports = (async () => {
  try {
    return await client.query(createTableText);
  } catch (error) {
    return { error };
  }
})();
