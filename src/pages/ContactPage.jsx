import React, { Component } from 'react'
import { contactService } from '../services/contact.service'
import { ContactList } from '../components/ContactList'
import { ContactFilter } from '../components/ContactFilter'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadContacts, removeContact, setFilterBy } from '../store/actions/contactActions'
import { spendBalance } from '../store/actions/userActions'

class _ContactPage extends Component {
  async componentDidMount() {
    // this.loadContacts()
    this.props.loadContacts()
  }

  // async loadContacts() {
  //   const contacts = await contactService.getContacts(this.state.filterBy)
  //   this.setState({ contacts })
  // }

  onChangeFilter = async (filterBy) => {
    // console.log('filterBy:', filterBy)
    // this.setState({ filterBy }, this.loadContacts)
    await this.props.setFilterBy(filterBy)
    this.props.loadContacts()
  }
  render() {
    const { contacts , filterBy } = this.props

    if (!contacts) return <div>Loading ....</div>
    return (
      <section className="contact-page">
        <ContactFilter onChangeFilter={this.onChangeFilter} filterBy={this.props.filterBy}/>
        <ContactList history={this.props.history} contacts={contacts} />
        <Link to="/contact/edit/" className="plusBtn"></Link>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contactModule.contacts,
    filterBy:state.contactModule.filterBy
  }
}

const mapDispatchToProps = {
  loadContacts,
  removeContact,
  setFilterBy,
  spendBalance,
}

export const ContactPage = connect(mapStateToProps, mapDispatchToProps)(_ContactPage)
