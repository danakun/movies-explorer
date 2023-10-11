import React, { useState, useEffect } from "react"
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList"
import Footer from "../Footer/Footer"
import SearchForm from "../Movies/SearchForm/SearchForm"
import Header from "../Header/Header"
import { filterMovies, filterDurationMovie } from "../../utils/helpers"

function SavedMovies({ loggedIn, onDeleteCard, savedMovies }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies)
  const [searchQuery, setSearchQuery] = useState("")
  const [isShortMovies, setIsShortMovies] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    const moviesFilmList = filterMovies(savedMovies, searchQuery)
    setFilteredMovies(
      isShortMovies ? filterDurationMovie(moviesFilmList) : moviesFilmList
    )
  }, [savedMovies, isShortMovies, searchQuery])

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true)
    } else {
      setIsNotFound(false)
    }
  }, [filteredMovies])

  function getChangeShortMovie() {
    setIsShortMovies(!isShortMovies)
  }

  function getSearchQueryDate(query) {
    setSearchQuery(query)
  }

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        onFilterMovies={getChangeShortMovie}
        getSearchQueryDate={getSearchQueryDate}
      />
      <MoviesCardList
        cards={filteredMovies}
        savedMovies={savedMovies}
        isNotFound={isNotFound}
        isSavedFilms={true}
        onDeleteCard={onDeleteCard}
      />
      <Footer />
    </section>
  )
}

export default SavedMovies
