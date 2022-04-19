import React, { Component } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { MoveList } from '../components/MoveList'
import { TransferFund } from '../components/TransferFunds'
import { contactService } from '../services/contact.service'
import userService from '../services/user.service'

export class ContactDetailsPage extends Component {
  state = {
    chosenContact: null,
    loggedinUser: null,
  }
  componentDidMount() {
    this.loadContact()
    this.loadLoggedinUser()
  }

  cd
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadContact()
      this.loadLoggedinUser()
    }
  }

  async loadContact() {
    const chosenContact = await contactService.getContactById(this.props.match.params.id)
    this.setState({ chosenContact })
  }
  onBack = () => {
    this.props.history.push('/contact')
    // this.props.history.goBack()
  }
  onTransferCoins = (amount) => {
    userService.addMove(this.state.chosenContact, amount)
    this.loadContact()
    this.loadLoggedinUser()
  }
  loadLoggedinUser = () => {
    const loggedinUser = userService.getLoggedInUser()
    this.setState({ loggedinUser })
  }
  render() {
    const { chosenContact, loggedinUser } = this.state
    if (!chosenContact) return <div>Loading ....</div>
    return (
      <>
        <section className="contact-detail">
          <img src={`https://robohash.org/set_set5/${chosenContact._id}.png`} alt="img" />
          <section className="personal">
            <h4>Name: {chosenContact.name}</h4>
            <h4>Email: {chosenContact.email}</h4>
            <h4>Phone: {chosenContact.phone}</h4>
          </section>
        </section>
        <section className="btns">
          <button onClick={this.onBack}>Back</button>
          <Link to={`/contact/edit/${chosenContact._id}`}>Edit Contact</Link>
          {/* <Link to="/robot/r2">Next Robot</Link> */}
        </section>

        <TransferFund contact={this.state.chosenContact} maxCoins={this.state.loggedinUser.coins} onTransferCoins={this.onTransferCoins} />
        <MoveList movesList={loggedinUser.moves.filter((m) => m.toId === chosenContact._id)} title="My Moves" />
      </>
    )
  }
}
