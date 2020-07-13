const jwt = require('jsonwebtoken');
const { hashFunc, generateJWT } = require('utilities/operations');
const { usersModel } = require('models');
const render = require('concerns/render');
const validators = require('./validators');

const register = async (req, res) => {
  const { params, validationError } = validators.validate(req.body, validators.authValidators.register);
  if (validationError) return render.error(res, validationError);

  const { user, error: errorDb } = await usersModel.getByLogin(params.login);
  if (errorDb) return render.error(res, errorDb);

  if (user) {
    render.error(res, {
      message: 'This login has been already taken. Please try a new one',
      data: { login: params.login },
    });
  }
  const passwordHash = hashFunc(params.password);
  const { error } = await usersModel.insert({
    ...params,
    passwordHash,
  });
  if (error) return render.custom(res, error.status, error);
  render.success(res, 'User successfully registered!');
};

const login = async (req, res, next) => {
  const { params, validationError } = validators.validate(req.body, validators.authValidators.login);
  if (validationError) return render.error(res, validationError);

  const passwordHash = hashFunc(params.password);
  const { user, error } = await usersModel.getByLoginAndPasswordHash(params.login, passwordHash);
  if (error) return render.custom(res, error.status, error);

  if (user) {
    req.futureUser = user;
    next();
  } else {
    return render.error(res, {
      message: 'Invalid login or password',
    });
  }
};

const responseOnSuccessLogin = (req, res) => {
  const token = generateJWT(req.futureUser);
  const decodedToken = jwt.decode(token);

  const response = {
    token: `${token}`,
    user: decodedToken,
  };
  res.json(response);
};

module.exports = {
  register,
  login,
  responseOnSuccessLogin,
};
