const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { SALT, JWT_SECRET } = require('config');

const sha512 = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  const value = hash.digest('hex');
  return value;
};

module.exports.hashFunc = (string) => sha512(string, SALT);

module.exports.generateJWT = (user) => {
  const expMinutes = 60 * 24 * 30;

  return jwt.sign({
    user_id: user._id,
  }, JWT_SECRET, { expiresIn: 60 * expMinutes });
};
