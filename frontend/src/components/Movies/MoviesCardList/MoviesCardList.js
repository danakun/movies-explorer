import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import {
  COUNTER_MOVIE_DESKTOP_CARD,
  COUNTER_MOVIE_TABLET_CARD,
  COUNTER_MOVIE_MOBILE_CARD,
} from "../../../utils/constants"
import MoviesCard from "../MoviesCard/MoviesCard"
import SearchError from "../SearchError/SearchError"
import "./MoviesCardList.css"
import Preloader from "../Preloader/Preloader"

function MoviesCardList({
  cards,
  isLoading,
  isSavedFilms,
  savedMovies,
  isReqErr,
  isNotFound,
  handleLikeFilm,
  onDeleteCard,
}) {
  const [shownMovies, setShownMovies] = useState(0)
  const { pathname } = useLocation()

  // Сохраненная карточка фильма из массива сохраненных
  function getSavedMovieFromList(savedMovies, card) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id)
  }

  // Количество отображаемых карточек с фильмами
  function showMovieCounterDisplayWidth() {
    const display = window.innerWidth
    if (display > 1180) {
      setShownMovies(12)
    } else if (display > 767) {
      setShownMovies(8)
    } else {
      setShownMovies(5)
    }
  }

  // Количество отображаемых карточек на экране, при клике на кнопку Ещё
  function showMovieCounterBtnPluse() {
    const display = window.innerWidth
    if (display > 1180) {
      setShownMovies(shownMovies + COUNTER_MOVIE_DESKTOP_CARD)
    } else if (display > 767) {
      setShownMovies(shownMovies + COUNTER_MOVIE_TABLET_CARD)
    } else {
      setShownMovies(shownMovies + COUNTER_MOVIE_MOBILE_CARD)
    }
  }

  // Эффект для обновления состояния выдачи карточек в том колличестве
  // в котором изначально заданы функцией showMovieCounterDisplayWidth
  useEffect(() => {
    showMovieCounterDisplayWidth()
  }, [cards])

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", showMovieCounterDisplayWidth)
    }, 500)
  })

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && (
        <SearchError errorText={"Ничего не найдено"} />
      )}
      {isReqErr && !isLoading && (
        <SearchError
          errorText={
            "Во время поискового запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          }
        />
      )}
      {!isLoading && !isReqErr && !isNotFound && (
        <>
          {pathname === "/saved-movies" ? (
            <>
              <ul className="cards__list">
                {cards.map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    card={card}
                    cards={cards}
                    saved={getSavedMovieFromList(savedMovies, card)}
                    savedMovies={savedMovies}
                    isSavedFilms={isSavedFilms}
                    handleLikeFilm={handleLikeFilm}
                    onDeleteCard={onDeleteCard}
                  />
                ))}
              </ul>
            </>
          ) : (
            <>
              <ul className="cards__list">
                {cards.slice(0, shownMovies).map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={getSavedMovieFromList(savedMovies, card)}
                    cards={cards}
                    card={card}
                    isSavedFilms={isSavedFilms}
                    savedMovies={savedMovies}
                    handleLikeFilm={handleLikeFilm}
                    onDeleteCard={onDeleteCard}
                  />
                ))}
              </ul>
              <div className="cards__button-wrapper">
                {cards.length > shownMovies ? (
                  <button
                    className="cards__button"
                    onClick={showMovieCounterBtnPluse}
                  >
                    Ещё
                  </button>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  )
}

export default MoviesCardList
