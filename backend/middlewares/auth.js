const jwt = require('jsonwebtoken');
const { SECRET_KEY_DEV } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;
const Unauthorized = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new Unauthorized('Необходима авторизация!');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY_DEV,
    );
  } catch (err) {
    next(new Unauthorized('Необходима авторизация!'));
    return;
  }
  req.user = payload;
  next();
};
