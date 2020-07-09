const jwt = require('jsonwebtoken');
const { hashFunc, generateJWT } = require('utilities/operations');
const { usersModel } = require('models');

module.exports.checkLoginAndPassword = (req, res, next) => {
  const { password, login } = req.body;

  if (!password || !login) {
    res.status(400).json({
      message: 'Login and password fields cant be empty',
    });
  }
  req.login = login;
  req.password = password;
  next();
};

module.exports.register = async (req, res, next) => {
  const { login, password } = req;
  try {
    const { user } = await usersModel.getByLogin(login);
    if (user) {
      res.status(409).json({
        message: 'This login has been already taken. Please try a new one',
        data: { login },
      });
    } else {
      const passwordHash = hashFunc(password);
      await usersModel.insert({ login, password: passwordHash });
      res.json({
        message: 'You are successfully registered. Please login to get your JWT',
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { login, password } = req;
  const passwordHash = hashFunc(password);
  try {
    const futureUser = await usersModel.getByLoginAndPasswordHash({ login, password: passwordHash });
    if (futureUser) {
      req.futureUser = futureUser;
      next();
    } else {
      res.status(400).json({
        message: 'Invalid login or password',
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.responseOnSuccessLogin = (req, res) => {
  const token = generateJWT(req.futureUser);
  console.log('req.futureUser:', req.futureUser);
  const decodedToken = jwt.decode(token);

  const response = {
    token: `${token}`,
    user: decodedToken,
  };
  res.json(response);
};
