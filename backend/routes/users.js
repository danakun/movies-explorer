// Файл маршрута users/me
const userRouter = require('express').Router();

const {
  getMeValidator,
  updateUserValidator,
} = require('../middlewares/validation');

const { getMe, updateUser } = require('../controllers/users');

userRouter.get('/users/me', getMeValidator, getMe);
userRouter.patch('/users/me', updateUserValidator, updateUser);

module.exports = userRouter;
