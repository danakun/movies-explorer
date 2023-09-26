const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const NotFound = require('../errors/NotFound');

const SALT_ROUNDS = 10;
const { NODE_ENV, JWT_SECRET } = process.env;
const { SECRET_KEY_DEV, CREATED } = require('../utils/constants');

// Создание пользователя
const createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, SALT_ROUNDS)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => res.status(CREATED).send({
      email: user.email,
      name: user.name,
      _id: user._id,
    }))
    .catch((e) => {
      if (e.code === 11000) {
        next(new Conflict('Такой пользователь уже существует'));
      } else if (e.name === 'ValidationError') {
        next(
          new BadRequest(
            'Переданы некорректные данные при создании пользователя',
          ),
        );
      } else {
        next(e);
      }
    });
};

// Sign in(логин) пользователя по мейлу и паролю
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // Создание JWT-токена
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY_DEV,
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(next);
};

// Получение аутентифицированного пользователя
const getMe = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(() => {
      throw new NotFound('Пользователь по указанному _id не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequest('Запрашиваемый пользователь не найден'));
      } else {
        next(e);
      }
    });
};

// Редактирование пользователя
const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFound('Пользователь с указанным _id не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      if (e.code === 11000) {
        next(new Conflict('Такой пользователь уже существует'));
      } else if (e.name === 'ValidationError') {
        next(
          new BadRequest('Переданы некорректные данные при обновлении профиля'),
        );
      } else {
        next(e);
      }
    });
};

module.exports = {
  createUser,
  getMe,
  updateUser,
  login,
};
