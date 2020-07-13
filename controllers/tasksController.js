const render = require('concerns/render');
const { tasksModel } = require('models');
const validators = require('./validators');

const create = async (req, res) => {
  req.body.user_id = req.params.user_id;
  const { params, validationError } = validators.validate(req.body, validators.taskValidators.createTask);
  if (validationError) return render.error(res, validationError);

  const { task, error } = await tasksModel.insert(params);
  if (error) return render.error(res, error);

  return render.success(res, { task });
};

const editContextTask = async (req, res) => {
  req.body.task_id = req.params.task_id;
  const { params, validationError } = validators.validate(req.body, validators.taskValidators.editContextTask);
  if (validationError) return render.error(res, validationError);

  const { task, error } = await tasksModel.updateById(params);
  if (error) return render.error(res, error);

  return render.success(res, { task });
};

const editTaskStatus = async (req, res) => {
  req.body.task_id = req.params.task_id;
  const { params, validationError } = validators.validate(req.body, validators.taskValidators.editStatusTask);
  if (validationError) return render.error(res, validationError);

  const { task, error } = await tasksModel.updateById(params);
  if (error) return render.error(res, error);

  return render.success(res, { task });
};

const editTaskUser = async (req, res) => {
  req.body.task_id = req.params.task_id;
  const { params, validationError } = validators.validate(req.body, validators.taskValidators.editUserTask);
  if (validationError) return render.error(res, validationError);

  const { task, error } = await tasksModel.updateById(params);
  if (error) return render.error(res, error);

  return render.success(res, { task });
};

const sortBy = async (req, res) => {
  req.body.task_id = req.params.task_id;
  const { params, validationError } = validators.validate(req.query, validators.taskValidators.sortBy);
  if (validationError) return render.error(res, validationError);

  const { tasks, error } = await tasksModel.sortBy(params.sort_type, params.sortdirection);
  if (error) return render.error(res, error);
  return render.success(res, { tasks });
};

const taskDelete = async (req, res) => {
  const { params, validationError } = validators.validate(req.params, validators.taskValidators.deleteTask);
  if (validationError) return render.error(res, validationError);

  const { task, error } = await tasksModel.deleteById(params.task_id);
  if (error) return render.error(res, error);

  return render.success(res, { task });
};

module.exports = {
  taskDelete,
  sortBy,
  create,
  editContextTask,
  editTaskStatus,
  editTaskUser,
};
