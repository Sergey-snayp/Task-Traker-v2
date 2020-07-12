const Joi = require('@hapi/joi');

const options = { allowUnknown: true, stripUnknown: true };

exports.register = Joi.object().keys({
  login: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
}).options(options);

exports.login = Joi.object().keys({
  login: Joi.string().required(),
  password: Joi.string().required(),
}).options(options);
