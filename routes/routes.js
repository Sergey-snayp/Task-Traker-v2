const { Router } = require('express');
const {
  authController,
  userController,
  tasksController,
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

userRoutes.route('/delete/:user_id').delete(userController.userDelete);
userRoutes.route('/:user_id').get(userController.getInfo);
userRoutes.route('/update/:user_id').put(userController.updateInfo);
userRoutes.route('/get/:offset').get(userController.getUsers);

tasksRoutes.route('/create/:user_id').post(tasksController.create);
tasksRoutes.route('/edit/task/:task_id').put(tasksController.create);
tasksRoutes.route('/edit/status/:task_id').put(tasksController.create);
tasksRoutes.route('/edit/user/:task_id').put(tasksController.create);
tasksRoutes.route('/delete/:task_id').delete(tasksController.create);
tasksRoutes.route('/show/:task_id').delete(tasksController.create);

module.exports = apiRoutes;
