const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const AccessForbidden = require('../errors/AccessForbidden');
const NotFound = require('../errors/NotFound');

// # возвращает все сохранённые текущим пользователем фильмы
const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

// # создаёт фильм с переданными в теле
// # country, director, duration, year, description,
// image, trailer, nameRU, nameEN и thumbnail, movieId
const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(
          new BadRequest(
            'Переданы некорректные данные при создании карточки фильма',
          ),
        );
      } else {
        next(e);
      }
    });
};

// # удаляет сохранённый фильм по id
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFound('Фильм с указанным _id не найден');
    })
    .then((movie) => {
      const owner = movie.owner.toString();
      if (req.user._id === owner) {
        Movie.deleteOne(movie)
          .then(() => {
            res.send(movie);
          })
          .catch(next);
      } else {
        throw new AccessForbidden('Невозможно удалить фильм');
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(
          new BadRequest('Переданы некорректные данные для удаления фильма'),
        );
      } else {
        next(e);
      }
    });
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
