const Joi = require('@hapi/joi');

exports.updateInfo = Joi.object().keys({
  user_id: Joi.number().required(),
  login: Joi.string(),
  first_name: Joi.string(),
  last_name: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
}).required();

exports.userId = Joi.object().keys({
  user_id: Joi.number().required(),
}).required();

exports.getUsers = Joi.object().keys({
  offset: Joi.number().default(0).required(),
}).required();
