import React from 'react'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'
import { TextInput } from 'common'
import { Button } from 'react-toolbox'

import './UserInfoPage.css'

const UserInfoPage = ({ user }) => <div styleName="user-info-page">
  <TextInput value={ user.data.info || '' } label="Info"
             onChange={ val => user.data = { ...user.data, info: val } }/>

  <TextInput value={ user.data.subInfo || '' } label="Sub info"
             onChange={ val => user.data = { ...user.data, subInfo: val } }/>

  <br/>

  <Button raised onClick={ () => user.update() }>Update</Button>
  <div styleName="error">{user.error}</div>
</div>

export default compose(
  inject('user'),
  observer
)(UserInfoPage)
