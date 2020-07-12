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
    return { user: (await db.query(`UPDATE tasks SET ${updData} WHERE id = ${id}`)) };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports.deleteById = async (id) => {
  try {
    return { user: (await db.query('DELETE FROM tasks WHERE id = $1', [id])) };
  } catch (error) {
    return { error: error.message };
  }
};

const sortBy = async (sortType) => {
  try {
    return { user: (await db.query(`SELECT * FROM tasks ORDER BY status 'View' FIRST`)).rows };
  } catch (error) {
    return { error: error.message };
  }
};

(async () => {
  const result = await sortBy('author_id');
  console.log(result);
})();
