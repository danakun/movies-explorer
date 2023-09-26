const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const NotFound = require('../errors/NotFound');
const userRouter = require('./users');
const movieRouter = require('./movies');

const {
  loginValidator,
  createUserValidator,
} = require('../middlewares/validation');

router.post('/signup', createUserValidator, createUser);

router.post('/signin', loginValidator, login);

router.use(auth);

router.use('/', userRouter);

router.use('/', movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

module.exports = router;
