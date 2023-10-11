import React from "react"
import arrowUp from "../../../images/arrow.svg"
import "./Portfolio.css"

function Portfolio() {
  return (
    <section className="portfolio limits-container">
      <h3 className="portfolio__title">Портфолио</h3>
      <nav className="portfolio__projects">
        <a
          className="portfolio__link portfolio__link-line"
          href="https://64f7e35c9d6a7a24bdb4f27a--superlative-cactus-b40829.netlify.app/"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__paragraph">Статичный сайт</p>
          <img
            className="portfolio__arrow"
            src={arrowUp}
            alt="Стрелка для ссылки"
          />
        </a>
        <a
          className="portfolio__link portfolio__link-line"
          href="https://danakun.github.io/russian-travel/"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__paragraph">Адаптивный сайт</p>
          <img
            className="portfolio__arrow"
            src={arrowUp}
            alt="Стрелка для ссылки"
          />
        </a>
        <a
          className="portfolio__link"
          href="https://danakun.nomoreparties.co/sign-in"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__paragraph">Одностраничное приложение</p>
          <img
            className="portfolio__arrow"
            src={arrowUp}
            alt="Стрелка для ссылки"
          />
        </a>
      </nav>
    </section>
  )
}

export default Portfolio
