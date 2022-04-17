import React, { Component } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { contactService } from '../services/contact.service'

export class ContactDetailsPage extends Component {
  state = {
    chosenContact: null,
  }
  componentDidMount() {
    this.loadContact()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadContact()
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
  render() {
    const { chosenContact } = this.state
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
      </>
    )
  }
}
