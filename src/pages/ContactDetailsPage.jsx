import React, { Component } from 'react'
import { contactService } from '../services/contact.service'

export class ContactDetailsPage extends Component {
  state = {
    chosenContact: null,
  }
  componentDidMount() {
    this.loadContact()
  }

  async loadContact() {
    const chosenContact = await contactService.getContactById(this.props.contactId)
    this.setState({ chosenContact })
  }

  render() {
    const { chosenContact } = this.state
    if(!chosenContact) return <div>Loading ....</div>
    return (
      <section>
        <h4>first name {chosenContact.name}</h4>
      </section>
    )
  }
}
