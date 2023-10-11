import React from "react"
import { formatDurationMovie } from "../../../utils/helpers"
import btnDel from "../../../images/d3.svg"
import "./MoviesCard.css"

function MoviesCard({
  card,
  saved,
  isSavedFilms,
  handleLikeFilm,
  savedMovies,
  onDeleteCard,
}) {
  // Клик по фильму
  function onCardClick() {
    if (saved) {
      onDeleteCard(savedMovies.filter((m) => m.movieId === card.id)[0])
    } else {
      handleLikeFilm(card)
    }
  }

  // Удаление фильма
  function onDelete() {
    onDeleteCard(card)
  }

  // Класс кнопки с лайком
  const cardLikeButtonClassName = `${
    saved ? "card__like-button card__like-active" : "card__like-button"
  }`

  return (
    <>
      <li className="card" key={card.id}>
        <div className="card__wrapper">
          <a href={card.trailerLink} target="_blank" rel="noreferrer">
            <img
              className="card__image"
              alt={card.nameRU}
              src={
                isSavedFilms
                  ? card.image
                  : `https://api.nomoreparties.co/${card.image.url}`
              }
            />
          </a>

          {isSavedFilms ? (
            <button
              type="button"
              className="card__like-remove"
              onClick={onDelete}
            >
              <img className="card__like-remove" src={btnDel} alt="удалить" />
            </button>
          ) : (
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={onCardClick}
            ></button>
          )}

          <div className="card__title-block">
            <h2 className="card__title">{card.nameRU}</h2>
            <span className="card__time">
              {formatDurationMovie(card.duration)}
            </span>
          </div>
        </div>
      </li>
    </>
  )
}

export default MoviesCard
