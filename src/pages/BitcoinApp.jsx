import React, { Component } from 'react'
import { AppHeader } from '../components/AppHeader'
import { HomePage } from './HomePage'
import { ContactPage } from './ContactPage'
import { ContactDetailsPage } from './ContactDetailsPage'
export class BitcoinApp extends Component {
  state = {
    currentPage: 'Home',
    selectedcontactId: '5a56640269f443a5d64b32ca',
  }

  changePage = async (page) => {
    await this.setState({ currentPage: page })
  }
  onSelectContact = async (contactId) => {
    this.setState({ selectedcontactId: contactId }, this.setState({ currentPage: 'ContactDetailsPage' }))
    
  }
  CurrPage = () => {
    switch (this.state.currentPage) {
      case 'Home':
        return <HomePage />
      case 'Contact':
        return <ContactPage onSelectContact={this.onSelectContact} />
      case 'ContactDetailsPage':
        return <ContactDetailsPage contactId={this.state.selectedcontactId} />
      default:
        return <HomePage />
    }
  }
  render() {
    const { currentPage } = this.state
    if (!currentPage) return <div>Loading...</div>
    return (
      <div>
        <AppHeader changePage={this.changePage} />
        <this.CurrPage />
      </div>
    )
  }
}
