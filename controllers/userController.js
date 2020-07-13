const render = require('concerns/render');
const { usersModel } = require('models');
const validators = require('controllers/validators');
const { hashFunc } = require('utilities/operations');

const updateInfo = async (req, res) => {
  req.body.user_id = req.params.user_id;
  const { params, validationError } = validators.validate(req.body, validators.userValidators.updateInfo);

  if (validationError) return render.error(res, validationError);
  params.password = hashFunc(params.password);
  const { user, error } = await usersModel.updateById(params);
  if (error) return render.error(res, error.message);

  return render.success(res, { user });
};

const userDelete = async (req, res) => {
  const { params, validationError } = validators.validate(req.params, validators.userValidators.userId);
  if (validationError) return render.error(res, validationError);

  const { user, error } = await usersModel.deleteById(params.user_id);
  if (error) return render.error(res, error.message);

  return render.success(res, { user });
};

const getInfo = async (req, res) => {
  const { params, validationError } = validators.validate(req.params, validators.userValidators.userId);
  if (validationError) return render.error(res, validationError);

  const { user, error } = await usersModel.getById(params.user_id);
  if (error) return render.error(res, error.message);

  return render.success(res, { user });
};

const getUsers = async (req, res) => {
  const { params, validationError } = validators.validate(req.params, validators.userValidators.getUsers);
  if (validationError) return render.error(res, validationError);

  const { users, error } = await usersModel.getUsers({ offset: params.offset });
  if (error) return render.error(res, error.message);

  return render.success(res, { users });
};

module.exports = {
  getUsers,
  getInfo,
  userDelete,
  updateInfo,
};
