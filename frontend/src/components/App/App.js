import React, { useState, useEffect } from "react"
import Header from "../Header/Header"
import Main from "../Main/Main"
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom"
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import Footer from "../Footer/Footer"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import Register from "../Register/Register"
import Login from "../Login/Login"
import Movies from "../Movies/Movies"
import SavedMovies from "../SavedMovies/SavedMovies"
import * as api from "../../utils/MainApi"
import Profile from "../Profile/Profile"
import InfoTooltip from "../InfoTooltip/InfoTooltip"
import InfoTooltipEditProfile from "../InfoTooltipEditProfile/InfoTooltipEditProfile"
import NotFound from "../NotFound/NotFound"
import "./App.css"

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname
  const [currentUser, setCurrentUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [savedMovies, setSavedMovies] = useState([])
  const [isUpdate, setIsUpdate] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false)
  const [
    isInfoTooltipEditProfilePopupOpen,
    setInfoTooltipEditProfilePopupOpen,
  ] = useState(false)

  // Вывод данных при авторизовации
  useEffect(() => {
    if (isLoggedIn) {
      api
        .getMe()
        .then((profileInfo) => {
          setCurrentUser(profileInfo)
        })
        .catch((error) => {
          console.log(error)
        })
      api
        .getMovies()
        .then((cardsSavedFilms) => {
          setSavedMovies(cardsSavedFilms.reverse())
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [isLoggedIn])

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      api
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true)
            localStorage.removeItem("allMovies")
          }
          navigate(path)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  // Регистр
  function registrationUser({ name, email, password }) {
    api
      .register(name, email, password)
      .then(() => {
        loginUser({ email, password })
        setInfoToolTipPopupOpen(true)
        setIsSuccess(true)
      })
      .catch((error) => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(false)
        console.log(error)
      })
  }

  // Логин
  function loginUser({ email, password }) {
    api
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setIsSuccess(true)
          setInfoToolTipPopupOpen(true)
          localStorage.setItem("jwt", res.token)
          navigate("/movies", { replace: true })
          setIsLoggedIn(true)
        }
      })
      .catch((error) => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(false)
        console.log(error)
      })
  }

  // Поставить лайк фильму
  function handleLikeFilm(card) {
    api
      .addNewCard(card)
      .then((newMovieFilm) => {
        setSavedMovies([newMovieFilm, ...savedMovies])
      })
      .catch((error) => {
        setIsSuccess(false)
        console.log(error)
        handleAuthorizationError(error)
      })
  }

  // Удаление сохраненного фильма
  function handleDeleteFilm(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setSavedMovies((state) => state.filter((item) => item._id !== card._id))
      })
      .catch((error) => {
        setIsSuccess(false)
        console.log(error)
        handleAuthorizationError(error)
      })
  }

  // Редактирования данных
  function editProfileInfo(userInfo) {
    setIsLoading(true)
    api
      .setUserInfo(userInfo)
      .then((data) => {
        setInfoTooltipEditProfilePopupOpen(true)
        setIsUpdate(true)
        setCurrentUser(data)
      })
      .catch((error) => {
        setInfoTooltipEditProfilePopupOpen(true)
        setIsUpdate(false)
        console.log(error)
        handleAuthorizationError(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // Обработчик ошибки авторизации
  function handleAuthorizationError(error) {
    if (error === "Error: 401") {
      handleLogout()
    }
  }

  // Закрываю попапы в closeAllPopups
  function closeAllPopups() {
    setInfoToolTipPopupOpen(false)
    setInfoTooltipEditProfilePopupOpen(false)
  }

  // Две константы попапов присваиваю константе isOpen, чтобы отслеживать их состояние в юзэффекте
  const isOpen = isInfoToolTipPopupOpen || isInfoTooltipEditProfilePopupOpen

  // Отслеживаю состояния попапов и закрываю по ESC
  useEffect(() => {
    function closeByEscapePopups(evt) {
      if (evt.key === "Escape") {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscapePopups)
      return () => {
        document.removeEventListener("keydown", closeByEscapePopups)
      }
    }
  }, [isOpen])

  // Закрываю попапы по оверлею
  function closeByOverlayPopups(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups()
    }
  }

  // При выходе из приложения чищу локальное хранилище со всеми данными
  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("jwt")
    localStorage.removeItem("movies")
    localStorage.removeItem("movieSearch")
    localStorage.removeItem("shortMovies")
    localStorage.removeItem("allMovies")
    localStorage.clear()
    navigate("/")
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__wrapper">
          <Routes>
            <Route
              path={"/"}
              element={
                <>
                  <Header loggedIn={isLoggedIn} />
                  <Main />
                  <Footer />
                </>
              }
            />
            <Route
              path={"/signin"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Login isLoading={isLoading} onAuthorization={loginUser} />
                )
              }
            />
            <Route
              path={"/signup"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Register
                    isLoading={isLoading}
                    registrationUser={registrationUser}
                  />
                )
              }
            />
            <Route path={"*"} element={<NotFound />} />
            <Route
              path={"/movies"}
              element={
                <ProtectedRoute
                  path="/movies"
                  loggedIn={isLoggedIn}
                  component={Movies}
                  handleLikeFilm={handleLikeFilm}
                  onDeleteCard={handleDeleteFilm}
                  savedMovies={savedMovies}
                />
              }
            />
            <Route
              path={"/saved-movies"}
              element={
                <ProtectedRoute
                  path="/saved-movies"
                  loggedIn={isLoggedIn}
                  component={SavedMovies}
                  savedMovies={savedMovies}
                  onDeleteCard={handleDeleteFilm}
                />
              }
            />
            <Route
              path={"/profile"}
              element={
                <ProtectedRoute
                  path="/profile"
                  loggedIn={isLoggedIn}
                  component={Profile}
                  isLoading={isLoading}
                  onUpdateUser={editProfileInfo}
                  signOut={handleLogout}
                />
              }
            />
          </Routes>
          <InfoTooltip
            isSuccess={isSuccess}
            isOpen={isInfoToolTipPopupOpen}
            onClose={closeAllPopups}
            onCloseOverlay={closeByOverlayPopups}
          />
          <InfoTooltipEditProfile
            isUpdate={isUpdate}
            isOpen={isInfoTooltipEditProfilePopupOpen}
            onClose={closeAllPopups}
            onCloseOverlay={closeByOverlayPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
