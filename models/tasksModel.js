const db = require('db');

module.exports.insert = async ({
  title, description, status, user_id,
}) => {
  try {
    return {
      user: (await db.query('INSERT INTO tasks (title, description, status, user_id) VALUES ($1, $2, $3, $4)',
        [title, description, status, user_id])),
    };
  } catch (error) {
    return { error };
  }
};

module.exports.updateById = async ({ task_id, ...data }) => {
  let updData = '';
  for (const key in data) {
    updData += `${key} = '${data[key]}', `;
  }
  updData = updData.slice(0, -2);
  try {
    return { user: (await db.query(`UPDATE tasks SET ${updData} WHERE id = ${task_id}`)) };
  } catch (error) {
    return { error };
  }
};

module.exports.deleteById = async (id) => {
  try {
    return { user: (await db.query('DELETE FROM tasks WHERE id = $1', [id])) };
  } catch (error) {
    return { error };
  }
};

module.exports.sortBy = async (sort_type, sortdirection = 'asc') => {
  try {
    console.log(`SELECT * FROM tasks ORDER BY ${sort_type} ${sortdirection}`);
    return { user: (await db.query(`SELECT * FROM tasks ORDER BY ${sort_type} ${sortdirection}`)).rows };
  } catch (error) {
    return { error };
  }
};
