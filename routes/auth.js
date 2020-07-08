const express = require('express');
const {
  checkLoginAndPassword,
  login,
  register,
  responseOnSuccessLogin,
} = require('../controllers/auth');

const router = express.Router();

router.post('/login', checkLoginAndPassword, login, responseOnSuccessLogin);
router.post('/register', checkLoginAndPassword, register);

module.exports = router;
