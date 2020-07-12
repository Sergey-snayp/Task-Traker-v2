const Joi = require('@hapi/joi');

exports.createTask = Joi.object().keys({
  user_id: Joi.number().required(),
  title: Joi.string().required(),
  description: Joi.string(),
  status: Joi.string().validate(['View', 'In Progress', 'Done']).required(),
}).required();

exports.updateDescrTask = Joi.object().keys({
  id: Joi.number().required(),
  title: Joi.string(),
  description: Joi.string(),
}).required();

exports.updateStatusTask = Joi.object().keys({
  id: Joi.number().required(),
  status: Joi.string().validate(['View', 'In Progress', 'Done']).required(),
}).required();

exports.updateUserTask = Joi.object().keys({
  id: Joi.number().required(),
  user_id: Joi.number().required(),
}).required();

exports.deleteTask = Joi.object().keys({
  id: Joi.number().required(),
}).required();
