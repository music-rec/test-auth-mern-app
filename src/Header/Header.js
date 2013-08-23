import React from 'react'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'
import { AppBar, Button } from 'react-toolbox'

import './Header.css'

const Header = ({ user }) => <AppBar styleName="header">
  {user.data.image && <img
    style={ { verticalAlign: 'middle' } }
    src={ `http://localhost:3000/uploads/${ user.data.image }.png` }/>}
  &nbsp;
  &nbsp;

  {user.username}
  &nbsp;
  <Button raised onClick={ () => user.logout() }>Logout</Button>
</AppBar>

export default compose(
  inject('user'),
  observer
)(Header)
