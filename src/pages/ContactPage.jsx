import React, { Component } from 'react'
import { contactService } from '../services/contact.service'
import { ContactList } from '../components/ContactList'
import { ContactDetailsPage } from './ContactDetailsPage'

export class ContactPage extends Component {
  state = {
    contacts: null,
    filterBy: null,
    selectedcontactId: null,
  }

  componentDidMount() {
    this.loadContact()
  }

  async loadContact() {
    const contacts = await contactService.getContacts(this.state.filterBy)
    this.setState({ contacts })
  }



  onRemoveContact = async (contactId) => {
    await contactService.remove(contactId)
    this.loadContact()
  }
  render() {
    const { contacts, selectedcontactId } = this.state

    if (!contacts) return <div>Loading ....</div>
    return (
      <div>
        <section>
          
          <ContactList onRemoveContact={this.onRemoveContact} onSelectContact={this.props.onSelectContact} contacts={contacts} />
        </section>
      </div>
    )
  }
}
