import React, { Component } from 'react'
import userService from '../services/user.service'

export class SignupPage extends Component {
  state = {
    userName: '',
  }

  handleChange = async ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    this.setState({ [field]: value })
  }
  signup = async (ev) => {
    ev.preventDefault()
    console.log('username signup cmp:', this.state.userName)
    const userName = userService.signup(this.state.userName)
    await this.setState({ userName })
    this.props.history.push('/')
  }
  //   onBack = () => {
  //     if (this.state.contact._id) this.props.history.push(`/contact/${this.state.contact._id}`)
  //     else this.props.history.push('/')
  //   }

  render() {
    return (
      <section className="signup">
        <img src={require(`../assets/imgs/bitcoin.png`)} alt="" />
        <form onSubmit={this.signup}>
          <label htmlFor="userName">Please enter your name:</label>
          <input onChange={this.handleChange} type="text" placeholder="User Name" id="userName" name="userName" />
          <button>submit</button>
        </form>
      </section>
    )
  }
}
