import React, { useState, useEffect } from "react"
import Header from "../Header/Header"
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList"
import SearchForm from "../Movies/SearchForm/SearchForm"
import Footer from "../Footer/Footer"
import "./Movies.css"
import { filterMovies, filterDurationMovie } from "../../utils/helpers"
import * as movies from "../../utils/MoviesApi"

function Movies({ loggedIn, savedMovies, handleLikeFilm, onDeleteCard }) {
  // Состояния стейтов
  const [isLoading, setIsLoading] = useState(false)
  const [initialCardsMovies, setInitialCardsMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [isNotFound, setIsNotFound] = useState(false)
  const [isShortMovies, setIsShortMovies] = useState(false)
  const [isReqErr, setIsReqErr] = useState(false)

  // Получение короткометражек
  useEffect(() => {
    setIsShortMovies(localStorage.getItem("shortMovies") === "true")
  }, [])

  // Получение фильмов из локального хранилища
  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"))
      setInitialCardsMovies(movies)
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredMovies(filterDurationMovie(movies))
      } else {
        setFilteredMovies(movies)
      }
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem("movieSearch")) {
      setIsNotFound(filteredMovies.length === 0)
    } else {
      setIsNotFound(false)
    }
  }, [filteredMovies])

  // Функция для фильтрации фильмов
  function getMovieFiltered(movies, query, short) {
    const moviesFilmList = filterMovies(movies, query, short)
    setInitialCardsMovies(moviesFilmList)
    setFilteredMovies(
      short ? filterDurationMovie(moviesFilmList) : moviesFilmList
    )
    localStorage.setItem("movies", JSON.stringify(moviesFilmList))
    localStorage.setItem("allMovies", JSON.stringify(movies))
  }

  // Функция поиска фильмов
  function getSearchQueryDate(query) {
    localStorage.setItem("movieSearch", query)
    localStorage.setItem("shortMovies", isShortMovies)
    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"))
      getMovieFiltered(movies, query, isShortMovies)
    } else {
      setIsLoading(true)
      movies
        .getMovies()
        .then((cardsSavedFilms) => {
          getMovieFiltered(cardsSavedFilms, query, isShortMovies)
          setIsReqErr(false)
        })
        .catch((error) => {
          setIsReqErr(true)
          console.log(error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  function getChangeShortMovie() {
    setIsShortMovies(!isShortMovies)
    if (!isShortMovies) {
      const filteredCardsMovies = filterDurationMovie(initialCardsMovies)
      setFilteredMovies(filteredCardsMovies)
    } else {
      setFilteredMovies(initialCardsMovies)
    }
    localStorage.setItem("shortMovies", !isShortMovies)
  }

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        getSearchQueryDate={getSearchQueryDate}
        isShortMovies={isShortMovies}
        onFilterMovies={getChangeShortMovie}
      />
      <MoviesCardList
        cards={filteredMovies}
        isLoading={isLoading}
        savedMovies={savedMovies}
        isSavedFilms={false}
        isReqErr={isReqErr}
        handleLikeFilm={handleLikeFilm}
        onDeleteCard={onDeleteCard}
        isNotFound={isNotFound}
      />
      <Footer />
    </section>
  )
}

export default Movies
