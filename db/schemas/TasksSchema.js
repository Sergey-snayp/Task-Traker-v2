const client = require('../index');

const createTableText = `
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title text,
  description text,
  status text,
  user_id integer references users(user_id) ON DELETE CASCADE
);
`;

module.exports = (async () => {
  try {
    return await client.query(createTableText);
  } catch (error) {
    return { error: error.message };
  }
})();
