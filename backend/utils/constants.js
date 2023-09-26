const CREATED = 201;

// Регулярное выражение
const isMail = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

// Секретный ключ для режима разработки
const SECRET_KEY_DEV = 'dev-secret';

module.exports = {
  CREATED,
  isMail,
  SECRET_KEY_DEV,
};
