const db = require('db');

module.exports.insert = async ({
  title, description, status, author_id,
}) => {
  try {
    return {
      user: (await db.query('INSERT INTO tasks (title, description, status, author_id) VALUES ($1, $2, $3, $4)',
        [title, description, status, author_id])),
    };
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
    return { user: (await db.query(`UPDATE tasks SET ${updData} WHERE user_id = ${id}`)) };
  } catch (error) {
    return { error: error.message };
  }
};
