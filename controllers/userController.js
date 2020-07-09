const render = require('concerns/render');
const { usersModel } = require('models');

module.exports.userDelete = async (req, res) => {
  const { user, error } = await usersModel.deleteById(req.params.id);
  if (error) return render.custom(res, error.status, error.message);

  return render.success(res, { user });
};

module.exports.getInfo = async (req, res) => {
  const { user, error } = await usersModel.getById(req.params.id);
  if (error) return render.custom(res, error.status, error.message);

  return render.success(res, { user });
};

module.exports.updateInfo = async (req, res) => {
  const { user, error } = await usersModel.updateById({ id: req.params.id, data: req.body });
  if (error) return render.custom(res, error.status, error.message);

  return render.success(res, { user });
};

module.exports.getUsers = async (req, res) => {
  const { users, error } = await usersModel.getUsers({ offset: req.params.offset});
  if (error) return render.custom(res, error.status, error.message);

  return render.success(res, { users });
};
