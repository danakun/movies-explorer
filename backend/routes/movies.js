const movieRouter = require('express').Router();
const {
  addMovieValidator,
  deleteMovieValidator,
} = require('../middlewares/validation');
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');

// Маршрут получения списка фильмов
movieRouter.get('/movies', getMovies);

// Маршрут создания нового фильма
movieRouter.post('/movies', addMovieValidator, addMovie);

// Маршрут удаления фильма
movieRouter.delete('/movies/:movieId', deleteMovieValidator, deleteMovie);

module.exports = movieRouter;
