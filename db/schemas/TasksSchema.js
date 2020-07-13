const client = require('../index');

const createTableText = `
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR (50),
  description text,
  status VARCHAR (15),
  user_id integer references users(user_id) ON DELETE CASCADE
);
`;

module.exports = (async () => {
  try {
    return await client.query(createTableText);
  } catch (error) {
    return { error };
  }
})();
