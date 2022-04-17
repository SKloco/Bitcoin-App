import React, { Component } from 'react'
import { AppHeader } from '../components/AppHeader'
import { HomePage } from './HomePage'
import { ContactPage } from './ContactPage'
import { ContactDetailsPage } from './ContactDetailsPage'
import { StatisticPage } from './StatisticPage'
import { HashRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import { ContactEditPage } from './ContactEditPage'

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
  // CurrPage = () => {
  //   switch (this.state.currentPage) {
  //     case 'Home':
  //       return <HomePage />
  //     case 'Contact':
  //       return <ContactPage onSelectContact={this.onSelectContact} />
  //     case 'ContactDetailsPage':
  //       return <ContactDetailsPage contactId={this.state.selectedcontactId} />
  //     case 'StatisticPage':
  //       return <StatisticPage />
  //     default:
  //       return <HomePage />
  //   }
  // }
  render() {
    // const { currentPage } = this.state
    // if (!currentPage) return <div>Loading...</div>
    return (
      <Router>
        <AppHeader  />
        <Switch>
          <Route path="/contact/edit/:id?" component={ContactEditPage} />
          <Route path="/contact/:id" component={ContactDetailsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/statistic" component={StatisticPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    )
  }
}
