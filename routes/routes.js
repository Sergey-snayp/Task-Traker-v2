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

authRoutes.route('/login').post(authController.login, authController.responseOnSuccessLogin);
authRoutes.route('/register').post(authController.register);

userRoutes.use(checkAuth);
tasksRoutes.use(checkAuth);

userRoutes.route('/update/:user_id').put(userController.updateInfo);
userRoutes.route('/delete/:user_id').delete(userController.userDelete);
userRoutes.route('/:user_id').get(userController.getInfo);
userRoutes.route('/all/:offset').get(userController.getUsers);

tasksRoutes.route('/create/:user_id').post(tasksController.create);
tasksRoutes.route('/edit/context/:task_id').put(tasksController.editContextTask);
tasksRoutes.route('/edit/status/:task_id').put(tasksController.editTaskStatus);
tasksRoutes.route('/edit/user/:task_id').put(tasksController.editTaskUser);
tasksRoutes.route('/sort_by').get(tasksController.sortBy);
tasksRoutes.route('/delete/:task_id').delete(tasksController.taskDelete);

module.exports = apiRoutes;
