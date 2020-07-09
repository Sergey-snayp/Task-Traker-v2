const db = require('db');

module.exports.getById = async (id) => {
  try {
    return { user: (await db.query('SELECT * FROM users WHERE user_id = $1', [id])).rows[0] };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports.deleteById = async (id) => {
  try {
    return { user: (await db.query('DELETE FROM users WHERE user_id = $1', [id])) };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports.updateById = async ({ id, data }) => {
  let updData = '';
  for (const key in data) {
    updData += `${key} = '${data[key]}', `;
  }
  updData = updData.slice(0, -2);
  try {
    return { user: (await db.query(`UPDATE users SET ${updData} WHERE user_id = ${id}`)) };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports.getByLoginAndPasswordHash = async (login, password) => {
  try {
    return { user: (await db.query(`SELECT * FROM users WHERE login = ${login} and password = ${password}`)).rows[0] };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports.getByLogin = async (login) => {
  try {
    return { user: (await db.query('SELECT * FROM users WHERE login = $1', [login])).rows[0] };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports.insert = async ({
  login, firstName, lastName, email, password,
}) => {
  try {
    return {
      user: (await db.query('INSERT INTO users (login, first_name, last_name, email, password) VALUES ($1, $2, $3, $4,$5)',
        [login, firstName, lastName, email, password])),
    };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports.getUsers = async ({ offset, limit = 10 }) => {
  try {
    return { users: (await db.query(`SELECT * FROM users OFFSET ${offset} LIMIT ${limit}`)).rows };
  } catch (error) {
    return { error: error.message };
  }
};
