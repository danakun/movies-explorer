import React from "react"
import AboutMe from "./AboutMe/AboutMe"
import AboutProject from "./AboutProject/AboutProject"
import Promo from "../Main/Promo/Promo"
import Portfolio from "./Portfolio/Portfolio"
import Techs from "./Techs/Techs"

function Main() {
  return (
    <main>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  )
}

export default Main
