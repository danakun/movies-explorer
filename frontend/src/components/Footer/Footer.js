import React from "react"
import "./Footer.css"

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__info">
        <p className="footer__copyrights">&copy; 2023</p>
        <a
          className="footer__link"
          href="https://practicum.yandex.ru"
          target="_blank"
          rel="noreferrer"
        >
          Яндекс.Практикум
        </a>
        <a
          className="footer__link"
          href="https://github.com/danakun"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
      </div>
    </footer>
  )
}

export default Footer
