import React, { Component } from 'react'
import userService from '../services/user.service'
import bitcoinService from '../services/bitcoin.service'

export class HomePage extends Component {
  state = {
    user: null,
    bitcoindRate: null,
  }

  componentDidMount() {
    this.loadUser()
    this.loadRate()
  }

  async loadUser() {
    this.setState({ user: userService.getUser() })
  }
  async loadRate() {
    const bitcoindRate =await bitcoinService.getRate()
    this.setState({ bitcoindRate })
  }

  render() {
    const { user } = this.state
    if (!user) return <div>Loading...</div>

    return (
      <div>
        HomePage
        <section>
          <h1>{this.state.user.name}</h1>
          <h1>amount of coins = {this.state.user.coins}</h1>
          <h1>bitcoind rate = {this.state.bitcoindRate}</h1>
        </section>
      </div>
    )
  }
}
