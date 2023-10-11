import React from "react"
import { useNavigate } from "react-router-dom"
import "./NotFound.css"

function NotFound() {
  const path = useNavigate()

  function goNavigate() {
    path(-2)
  }

  return (
    <section className="not-found">
      <h2 className="not-found__code">404</h2>
      <p className="not-found__code-description">Страница не найдена</p>
      <button onClick={goNavigate} className="not-found__link">
        Назад
      </button>
    </section>
  )
}

export default NotFound
