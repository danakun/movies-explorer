import React from "react"
import photo from "../../../images/photo.jpg"
import "./AboutMe.css"

function AboutMe() {
  return (
    <section className="about-me limits-container">
      <h2 className="about-me__title section-title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Дана</h3>
          <h4 className="about-me__job">Фронтенд-разработчик, 34 года</h4>
          <p className="about-me__text section-text">
            Я живу в Барселоне с 2014 года, закончила факультет Дизайна Среды
            СПбГУТД. В 2019 году меня увлекло программирование. Проработав
            больше десяти лет в дизайне, я решила поменять специальность и
            перейти в сферу диджитал. Мой опыт в дизайне и софт-скиллы помогают
            мне ответственно выполнять задачи, успешно работать в команде, не
            бояться сложностей, и постоянно учиться новому.
          </p>
          <a
            className="about-me__link"
            href="https://github.com/danakun"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img
          className="about-me__photo"
          src={photo}
          alt="Портрет дружелюбной Даны Кун"
        />
      </div>
    </section>
  )
}

export default AboutMe
