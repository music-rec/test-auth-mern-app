import './App.css'
import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'
import user from './mobx/User.store'

import { history } from 'mobx/Routing.store'
import LoginPage from './LoginPage'
import UserInfoPage from './UserInfoPage'
import Header from './Header'

const App = ({ loggedIn }) => {
  if ( loggedIn ) {
    return <Router history={ history }>
      <Switch>
        <Route component={ () => <div>
          <Header/>
          <UserInfoPage/>
        </div> }/>
      </Switch>
    </Router>

  } else {
    return <LoginPage/>
  }
}

export default compose(
  inject(() => ({ loggedIn: user.loggedIn })),
  observer
)(App)
