import React from 'react'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'
import { Button } from 'react-toolbox'
import { TextInput } from 'common'
import user from 'mobx/User.store'

import './LoginPage.css'

const LoginPage = () => {
  const disabled = !user.password || !user.username
  return <div styleName="login-page">
    <TextInput value={ user.username } label="Username"
               onChange={ val => user.username = val }/>
    <TextInput value={ user.password } label="Password"
               onChange={ val => user.password = val }/>
    <div styleName="buttons">
      <Button raised primary onClick={ () => user.login() } { ...{ disabled } }>Login</Button>
      &nbsp;
      &nbsp;
      <Button raised onClick={ () => user.register() } { ...{ disabled } }>Register</Button>
    </div>
    <div styleName="error">{user.error}</div>
  </div>
}

export default compose(
  inject('user'),
  observer
)(LoginPage)
