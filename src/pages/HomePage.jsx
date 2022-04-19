import React, { Component } from 'react'
import userService from '../services/user.service'
import bitcoinService from '../services/bitcoin.service'
import { MoveList } from '../components/MoveList'

export class HomePage extends Component {
  state = {
    user: null,
    bitcoinRate: null,
  }

  componentDidMount() {
    this.loadUser()
    this.loadRate()
  }

  async loadUser() {
    const user = userService.getLoggedInUser()
    console.log('loggedinuser', user)
    this.setState({ user })
  }
  async loadRate() {
    const bitcoinRate = await bitcoinService.getRate()
    this.setState({ bitcoinRate })
  }

  render() {
    const { user } = this.state
    if (!user) return <div>Loading...</div>

    return (
      <section className="home">
        <section className="profile">
          <img className="profile__img" src={require('../assets/imgs/profile.png')} alt="" />
          <h1 className="profile__name">{this.state.user.name}</h1>
          <span className="profile__item">
            <img className="profile__item__icon" src={require('../assets/imgs/coins.png')} alt="" />
            <h4 className="profile__item__data"> {this.state.user.coins}</h4>
          </span>
          <span className="profile__item">
            <img className="profile__item__icon" src={require('../assets/imgs/bitcoin.png')} alt="" />
            <h4 className="profile__item__data">{this.state.bitcoinRate}</h4>
          </span>
        </section>
        <MoveList movesList={user.moves} title="My Moves" />
      </section>
    )
  }
}
