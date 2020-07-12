const render = require('concerns/render');
const { tasksModel } = require('models');

module.exports.create = async (req, res) => {
  const { user, error } = await tasksModel.insert({
    title: req.body.title,
    status: req.body.status,
    description: req.body.description,
    user_id: req.params.user_id,
  });
  if (error) return render.custom(res, error.status, error.message);

  return render.success(res, { user });
};

module.exports.editTask = async (req, res) => {
  const { user, error } = await tasksModel.updateById({
    id: req.params.task_id,
    data: req.body,
  });
  if (error) return render.custom(res, error.status, error.message);

  return render.success(res, { user });
};

module.exports.editTaskStatus = async (req, res) => {
  const { user, error } = await tasksModel.updateById({
    id: req.params.task_id,
    data: req.body,
  });
  if (error) return render.custom(res, error.status, error.message);

  return render.success(res, { user });
};

module.exports.editTaskUser = async (req, res) => {
  const { user, error } = await tasksModel.updateById({
    id: req.params.task_id,
    data: req.body,
  });
  if (error) return render.custom(res, error.status, error.message);

  return render.success(res, { user });
};

module.exports.sortBy = async (req, res) => {
  const { user, error } = await tasksModel.updateById({
    id: req.params.task_id,
    data: req.body,
  });
  if (error) return render.custom(res, error.status, error.message);

  return render.success(res, { user });
};

module.exports.taskDelete = async (req, res) => {
  const { user, error } = await tasksModel.deleteById(req.params.task_id);
  if (error) return render.custom(res, error.status, error.message);

  return render.success(res, { user });
};
