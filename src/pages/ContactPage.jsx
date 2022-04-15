import React, { Component } from 'react'
import { contactService } from '../services/contact.service'
import { ContactList } from '../components/ContactList'
import { ContactFilter } from '../components/ContactFilter'


export class ContactPage extends Component {
  state = {
    contacts: null,
    filterBy: null,
  }

  componentDidMount() {
    this.loadContacts()
  }

  async loadContacts() {
    const contacts = await contactService.getContacts(this.state.filterBy)
    this.setState({ contacts })
  }

  onRemoveContact = async (contactId) => {
    await contactService.remove(contactId)
    this.loadContacts()
  }

  onChangeFilter = (filterBy) => {
    console.log('filterBy:', filterBy)
    this.setState({ filterBy }, this.loadContacts)

}
  render() {
    const { contacts } = this.state

    if (!contacts) return <div>Loading ....</div>
    return (
      <div>
        <section>
          <ContactFilter onChangeFilter={this.onChangeFilter} />
          <ContactList onRemoveContact={this.onRemoveContact} onSelectContact={this.props.onSelectContact} contacts={contacts} />
        </section>
      </div>
    )
  }
}
