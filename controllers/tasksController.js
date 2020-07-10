const render = require('concerns/render');
const { tasksModel } = require('models');

module.exports.create = async (req, res) => {
  const { user, error } = await tasksModel.insert({
    title: req.body.title,
    status: req.body.status,
    description: req.body.description,
    author_id: req.params.id,
  });
  if (error) return render.custom(res, error.status, error.message);

  return render.success(res, { user });
};

module.exports.editTask = async (req, res) => {
  const { user, error } = await tasksModel.insert({
    title: req.body.title,
    status: req.body.status,
    description: req.body.description,
    author_id: req.params.id,
  });
  if (error) return render.custom(res, error.status, error.message);

  return render.success(res, { user });
};
