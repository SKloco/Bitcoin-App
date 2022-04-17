import React, { Component } from 'react'
import userService from '../services/user.service'
import bitcoinService from '../services/bitcoin.service'

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
    this.setState({ user: userService.getUser() })
  }
  async loadRate() {
    const bitcoinRate = await bitcoinService.getRate()
    this.setState({ bitcoinRate })
  }

  render() {
    const { user } = this.state
    if (!user) return <div>Loading...</div>

    return (
      <section className="home-page">
        <h1>{this.state.user.name}</h1>
        <span className="container">
          <img src={require('../assets/imgs/coins.png')} alt="" /> <h4 className="container__title"> {this.state.user.coins}</h4>
        </span>
        <span className="container">
          <img src={require('../assets/imgs/bitcoin.png')} alt="" /> <h4 className="container__title">{this.state.bitcoinRate}</h4>
        </span>
      </section>
    )
  }
}
