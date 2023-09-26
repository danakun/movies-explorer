import React, { useState, useEffect } from "react"
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox"
import "./SearchForm.css"
import { useLocation } from "react-router-dom"

function SearchForm({ getSearchQueryDate, onFilterMovies, isShortMovies }) {
  // Хранение введенного запроса поиска фильмов
  const [query, setQuery] = useState("")
  // Отслеживание ошибки запроса
  const [isQueryError, setIsQueryError] = useState(false)
  const location = useLocation()

  function setQueryChangeDate(event) {
    setQuery(event.target.value)
  }

  function setEditUserInfo(event) {
    event.preventDefault()
    if (query.trim().length === 0) {
      setIsQueryError(true)
    } else {
      setIsQueryError(false)
      getSearchQueryDate(query)
    }
  }

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("movieSearch")
    ) {
      const localQuery = localStorage.getItem("movieSearch")
      setQuery(localQuery)
    }
  }, [location])

  return (
    <section className="search">
      <form className="search__forma" id="form" onSubmit={setEditUserInfo}>
        <input
          className="search__input"
          name="query"
          placeholder="Фильм"
          type="text"
          onChange={setQueryChangeDate}
          value={query || ""}
        ></input>
        <button className="search__button" type="submit">
          Найти
        </button>
        <FilterCheckbox
          onFilterMovies={onFilterMovies}
          isShortMovies={isShortMovies}
        />
        {isQueryError && (
          <span className="search__form-error">
            Нужно ввести ключевое слово
          </span>
        )}
      </form>
    </section>
  )
}

export default SearchForm
