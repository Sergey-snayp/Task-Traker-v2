const db = require('db');

const insert = async ({
  title, description, status, user_id,
}) => {
  try {
    return {
      task: (await db.query('INSERT INTO tasks (title, description, status, user_id) VALUES ($1, $2, $3, $4)',
        [title, description, status, user_id])),
    };
  } catch (error) {
    return { error };
  }
};

const updateById = async ({ task_id, ...data }) => {
  let updData = '';
  for (const key in data) {
    updData += `${key} = '${data[key]}', `;
  }
  updData = updData.slice(0, -2);
  try {
    return { task: (await db.query(`UPDATE tasks SET ${updData} WHERE id = ${task_id}`)) };
  } catch (error) {
    return { error };
  }
};

const deleteById = async (id) => {
  try {
    return { task: (await db.query('DELETE FROM tasks WHERE id = $1', [id])) };
  } catch (error) {
    return { error };
  }
};

const sortBy = async (sort_type, sortdirection = 'asc') => {
  try {
    console.log(`SELECT * FROM tasks ORDER BY ${sort_type} ${sortdirection}`);
    return { tasks: (await db.query(`SELECT * FROM tasks ORDER BY ${sort_type} ${sortdirection}`)).rows };
  } catch (error) {
    return { error };
  }
};

module.exports = {
  insert,
  sortBy,
  updateById,
  deleteById,
};
