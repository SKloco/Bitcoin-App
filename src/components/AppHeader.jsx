import React from 'react'
import { NavLink } from 'react-router-dom'

export function AppHeader(props) {
  return (
    <header>
      <NavLink to="/">
        <img src={require(`../assets/imgs/home.png`)} className="header__btn"></img>
      </NavLink>
      <NavLink to="/contact">
        <img src={require(`../assets/imgs/phone-book.png`)} className="header__btn"></img>
      </NavLink>
      {/* <img  onClick={() => props.changePage('ContactDetailsPage')}>ContactDetailsPage</img > */}
      <NavLink to="/statistic">
        <img src={require(`../assets/imgs/charts.png`)} className="header__btn" ></img>
      </NavLink>
    </header>
  )
}
