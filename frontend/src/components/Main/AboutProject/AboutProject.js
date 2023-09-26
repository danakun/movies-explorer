import React from "react"
import "./AboutProject.css"

function AboutProject() {
  return (
    <section className="project-info" id="about">
      <div className="project-info__wrapper">
        <h2 className="project-info__title">О проекте</h2>
        <ul className="project-info__text-container">
          <li className="project-info__info">
            <h3 className="project-info__info-title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="project-info__info-paragraph">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li className="project-info__info">
            <h3 className="project-info__info-title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="project-info__info-paragraph">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className="project-info__time">
          <h3 className="project-info__time-title project-info__time-title_black">
            1 неделя
          </h3>
          <h3 className="project-info__time-title">4 недели</h3>
          <p className="project-info__time-skill">Back-end</p>
          <p className="project-info__time-skill">Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject
