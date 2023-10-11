require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/rateLimiter');
const cors = require('./middlewares/cors');

const { DB_ADRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const { PORT = 3000 } = process.env;
const app = express();

mongoose
  .connect(DB_ADRESS, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('база данных подключена');
  })
  .catch(() => {
    console.log('Не удается подключиться к базе данных');
  });

app.use(express.json());

app.use(cors);

app.use(requestLogger);

app.use(helmet());

app.use(limiter);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
