import React from "react"
import { Link, NavLink } from "react-router-dom"
import account from "../../images/account-btn.svg"
import "./Navigation.css"

function Navigation({ handleClose }) {
  // Cмена цвета при клике на ссылку
  const setActiveColorLink = ({ isActive }) =>
    isActive ? "navigation__movies-link_active" : "navigation__movies-link"

  return (
    <div className="navigation">
      <div className="navigation__overlay-container"></div>
      <div className="navigation__movies">
        <button
          className="navigation__close-button"
          onClick={handleClose}
        ></button>
        <nav className="navigation__movies-links">
          <NavLink
            className={setActiveColorLink}
            exact
            to="/"
            onClick={handleClose}
          >
            Главная
          </NavLink>
          <NavLink
            className={setActiveColorLink}
            to="/movies"
            onClick={handleClose}
          >
            Фильмы
          </NavLink>
          <NavLink
            className={setActiveColorLink}
            to="/saved-movies"
            onClick={handleClose}
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link to="/profile" className="navigation__profile">
          <img src={account} alt="аккаунт" />
        </Link>
      </div>
    </div>
  )
}

export default Navigation
