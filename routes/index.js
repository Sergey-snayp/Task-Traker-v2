const express = require('express');
const { checkAuth } = require('../middleware/auth');

const router = express.Router();

const authRoutes = require('./auth');
const usersRoutes = require('./users');
const userRoutes = require('./user');
const tasksRoutes = require('./tasks');

const errorControllers = require('../controllers/error');

/**
 * The order is crucial for auth logic
 */
router.use('/auth', authRoutes);
router.use(checkAuth);
router.use('/users', usersRoutes);
router.use('/user', userRoutes);
router.use('/tasks', tasksRoutes);

router.use(errorControllers.errorHandler);
router.use(errorControllers.notFoundRouteHandler);


module.exports = router;
