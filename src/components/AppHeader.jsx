import React from 'react'

export function AppHeader(props) {
  return (
    <header>
      <img src={require(`../assets/imgs/home.png`)} className="header__btn" onClick={() => props.changePage('Home')}></img>
      <img src={require(`../assets/imgs/phone-book.png`)} className="header__btn" onClick={() => props.changePage('Contact')}></img>
      {/* <img  onClick={() => props.changePage('ContactDetailsPage')}>ContactDetailsPage</img > */}
      <img src={require(`../assets/imgs/charts.png`)} className="header__btn" onClick={() => props.changePage('StatisticPage')}></img>
    </header>
  )
}
