import React, { Component } from 'react'
import { AppHeader } from '../components/AppHeader'
import { HomePage } from './HomePage'
import { ContactPage } from './ContactPage'
import { ContactDetailsPage } from './ContactDetailsPage'
import { StatisticPage } from './StatisticPage'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { ContactEditPage } from './ContactEditPage'
import { SignupPage } from './SignupPage'
import userService from '../services/user.service'

export class BitcoinApp extends Component {
  PrivateRoute = (props) => {
    const isLoggedUser = userService.getLoggedInUser()
    // return isAdmin ? <Route path={props.path} component={props.component} /> : <Redirect to='/' />
    return isLoggedUser ? <Route {...props} /> : <Redirect to="/signup" />
  }

  render() {
    return (
      <Router>
        <AppHeader />
        <Switch>
          <this.PrivateRoute path="/contact/edit/:id?" component={ContactEditPage} />
          <this.PrivateRoute path="/contact/:id" component={ContactDetailsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/statistic" component={StatisticPage} />
          <Route path="/signup" component={SignupPage} />
          <this.PrivateRoute path="/" component={HomePage} />
        </Switch>
      </Router>
    )
  }
}
