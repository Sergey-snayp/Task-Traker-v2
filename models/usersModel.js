const db = require('db');

module.exports.getById = async (id) => {
  try {
    const { password, ...rest } = (await db.query('SELECT * FROM users WHERE user_id = $1', [id])).rows[0];
    return { user: rest };
  } catch (error) {
    return { error };
  }
};

module.exports.deleteById = async (user_id) => {
  try {
    return { user: (await db.query('DELETE FROM users WHERE user_id = $1', [user_id])) };
  } catch (error) {
    return { error };
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
    return { user: (await db.query(`SELECT * FROM users WHERE login = '${login}' and password = '${password}'`)).rows[0] };
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
  login, first_name, last_name, email, passwordHash,
}) => {
  try {
    return {
      user: (await db.query('INSERT INTO users (login, first_name, last_name, email, password) VALUES ($1, $2, $3, $4,$5)',
        [login, first_name, last_name, email, passwordHash])),
    };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports.getUsers = async ({ offset, limit = 10 }) => {
  try {
    const usersSelect = (await db.query(`SELECT * FROM users OFFSET ${offset} LIMIT ${limit}`)).rows;
    return { users: usersSelect.map((user) => { const { password, ...rest } = user; return rest; }) };
  } catch (error) {
    return { error: error.message };
  }
};
