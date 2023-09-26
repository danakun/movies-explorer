import React from "react"
import { Link } from "react-router-dom"
import "./Form.css"
import logo from "../../images/logo.svg"

function Form({
  title,
  children,
  linkText,
  link,
  formQues,
  buttonText,
  isLoading,
  isDisablButton,
  onSubmit,
}) {
  return (
    <section className="form">
      <Link to="/" className="logo">
        <img src={logo} alt="Лого" />
      </Link>
      <h3 className="form__title">{title}</h3>
      <form className="forma" id="form" onSubmit={onSubmit} noValidate>
        {children}
        <button
          type="submit"
          className={
            isDisablButton || isLoading
              ? "form__button-save form__button-save_inactive"
              : "form__button-save"
          }
          disabled={isDisablButton ? true : false}
        >
          {buttonText}
        </button>
      </form>
      <p className="form__text">
        {formQues}
        <Link to={link} className="form__link">
          {linkText}
        </Link>
      </p>
    </section>
  )
}

export default Form
