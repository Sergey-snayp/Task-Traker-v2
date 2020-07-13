const Joi = require('@hapi/joi');

exports.createTask = Joi.object().keys({
  user_id: Joi.number().required(),
  title: Joi.string().required(),
  description: Joi.string(),
  status: Joi.string().valid('View', 'In Progress', 'Done').required(),
}).required();

exports.editContextTask = Joi.object().keys({
  task_id: Joi.number().required(),
  title: Joi.string(),
  description: Joi.string(),
}).required();

exports.editStatusTask = Joi.object().keys({
  task_id: Joi.number().required(),
  status: Joi.string().valid('View', 'In Progress', 'Done').required(),
}).required();

exports.editUserTask = Joi.object().keys({
  task_id: Joi.number().required(),
  user_id: Joi.number().required(),
}).required();

exports.deleteTask = Joi.object().keys({
  task_id: Joi.number().required(),
}).required();

exports.sortBy = Joi.object().keys({
  sort_type: Joi.string().valid('status', 'user_id').required(),
  sortdirection: Joi.string().valid('asc', 'desc').required(),
}).required();
