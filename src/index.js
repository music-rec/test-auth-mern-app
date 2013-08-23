import 'babel-polyfill'

import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './App'
import { Provider } from 'mobx-react'

import { store as routing } from 'mobx/Routing.store'
import user from './mobx/User.store'

const render = Component => ReactDom.render(
  <AppContainer>
    <Provider { ...{ routing, user } }>
      <Component />
    </Provider>

  </AppContainer>,
  document.getElementById('root')
)

render(App)

if ( module.hot ) {
  module.hot.accept('./App', () => render(App))
}
