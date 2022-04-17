import React, { Component } from 'react'
import { contactService } from '../services/contact.service'
import { ContactList } from '../components/ContactList'
import { ContactFilter } from '../components/ContactFilter'
import { Link } from 'react-router-dom'


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
          <ContactList history={this.props.history} contacts={contacts} />
          <Link to="/contact/edit/">Add</Link>
        </section>
      </div>
    )
  }
}
