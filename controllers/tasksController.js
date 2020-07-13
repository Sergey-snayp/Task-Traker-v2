const render = require('concerns/render');
const { tasksModel } = require('models');
const validators = require('./validators');

module.exports.create = async (req, res) => {
  req.body.user_id = req.params.user_id;
  const { params, validationError } = validators.validate(req.body, validators.taskValidators.createTask);
  if (validationError) return render.error(res, validationError);

  const { user, error } = await tasksModel.insert(params);
  if (error) return render.error(res, error);

  return render.success(res, { user });
};

module.exports.editContextTask = async (req, res) => {
  req.body.task_id = req.params.task_id;
  const { params, validationError } = validators.validate(req.body, validators.taskValidators.editContextTask);
  if (validationError) return render.error(res, validationError);

  const { user, error } = await tasksModel.updateById(params);
  if (error) return render.error(res, error);

  return render.success(res, { user });
};

module.exports.editTaskStatus = async (req, res) => {
  req.body.task_id = req.params.task_id;
  const { params, validationError } = validators.validate(req.body, validators.taskValidators.editStatusTask);
  if (validationError) return render.error(res, validationError);

  const { user, error } = await tasksModel.updateById(params);
  if (error) return render.error(res, error);

  return render.success(res, { user });
};

module.exports.editTaskUser = async (req, res) => {
  req.body.task_id = req.params.task_id;
  const { params, validationError } = validators.validate(req.body, validators.taskValidators.editUserTask);
  if (validationError) return render.error(res, validationError);

  const { user, error } = await tasksModel.updateById(params);
  if (error) return render.error(res, error);

  return render.success(res, { user });
};

module.exports.sortBy = async (req, res) => {
  req.body.task_id = req.params.task_id;
  const { params, validationError } = validators.validate(req.query, validators.taskValidators.sortBy);
  if (validationError) return render.error(res, validationError);

  const { user, error } = await tasksModel.sortBy(params.sort_type, params.sortdirection);
  if (error) return render.error(res, error);
  return render.success(res, { user });
};

module.exports.taskDelete = async (req, res) => {
  const { params, validationError } = validators.validate(req.params, validators.taskValidators.deleteTask);
  if (validationError) return render.error(res, validationError);

  const { user, error } = await tasksModel.deleteById(params.task_id);
  if (error) return render.error(res, error);

  return render.success(res, { user });
};
