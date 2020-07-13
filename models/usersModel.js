const db = require('db');

const getById = async (user_id) => {
  try {
    const { password, ...rest } = (await db.query('SELECT * FROM users WHERE user_id = $1', [user_id])).rows[0];
    return { user: rest };
  } catch (error) {
    return { error };
  }
};

const deleteById = async (user_id) => {
  try {
    return { user: (await db.query('DELETE FROM users WHERE user_id = $1', [user_id])) };
  } catch (error) {
    return { error };
  }
};

const updateById = async ({ user_id, ...data }) => {
  let updData = '';
  for (const key in data) {
    updData += `${key} = '${data[key]}', `;
  }
  updData = updData.slice(0, -2);
  try {
    return { user: (await db.query(`UPDATE users SET ${updData} WHERE user_id = ${user_id}`)) };
  } catch (error) {
    return { error: error.message };
  }
};

const getByLoginAndPasswordHash = async (login, password) => {
  try {
    return { user: (await db.query(`SELECT * FROM users WHERE login = '${login}' and password = '${password}'`)).rows[0] };
  } catch (error) {
    return { error: error.message };
  }
};

const getByLogin = async (login) => {
  try {
    return { user: (await db.query('SELECT * FROM users WHERE login = $1', [login])).rows[0] };
  } catch (error) {
    return { error: error.message };
  }
};

const insert = async ({
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

const getUsers = async ({ offset, limit = 10 }) => {
  try {
    const usersSelect = (await db.query(`SELECT * FROM users OFFSET ${offset} LIMIT ${limit}`)).rows;
    return { users: usersSelect.map((user) => { const { password, ...rest } = user; return rest; }) };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  getUsers,
  insert,
  getByLogin,
  getByLoginAndPasswordHash,
  updateById,
  deleteById,
  getById,
};
