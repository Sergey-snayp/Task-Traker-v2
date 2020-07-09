const { Router } = require('express');
const {
  authController,
  userController,
} = require('controllers');
const { checkAuth } = require('utilities/operations');

const apiRoutes = new Router();
const authRoutes = new Router();
const userRoutes = new Router();
const tasksRoutes = new Router();

apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/user', userRoutes);
apiRoutes.use('/task', tasksRoutes);

authRoutes.route('/login').post(authController.checkLoginAndPassword, authController.login, authController.responseOnSuccessLogin);
authRoutes.route('/register').post(authController.checkLoginAndPassword, authController.register);

apiRoutes.use(checkAuth);

userRoutes.route('/delete/:id').delete(userController.userDelete);
userRoutes.route('/:id').get(userController.getInfo);
userRoutes.route('/update/:id').put(userController.updateInfo);
userRoutes.route('/get/:offset').get(userController.getUsers);

module.exports = apiRoutes;
