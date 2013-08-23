import { observable } from 'mobx'
import { create as hydrate, persist } from 'mobx-persist'
import axios from 'common/axios'

class UserStore {
  @persist @observable username = ''
  @persist @observable password = ''
  @persist('map') @observable data = {}
  @persist @observable loggedIn = false
  @observable error = ''

  logout() {
    this.error = ''
    this.loggedIn = false
    this.data = {}
  }

  _rememberHeaders() {
    const { username, password } = this
    axios.setHeaders({ username, password })
  }

  async login() {
    this.error = ''
    this._rememberHeaders()
    try {
      const { data } = await axios.get('/api/get-info')
      this.data = data
      this.loggedIn = true
    } catch (e) {
      if ( e.response.status === 401 ) {
        this.error = 'Wrong credentials'
      } else {
        this.error = e.response.data
      }
    }
  }

  async update() {
    this.error = ''
    try {
      const { _id, __v, ...currentData } = this.data
      const { data: { ...dbData } } = await axios.put('/api/update', currentData)
      Object.assign(this.data, dbData)
    } catch (e) {
      this.error = e.response.data
    }
  }

  async register() {
    this.error = ''
    const { username, password } = this
    try {
      const { data }  = await axios.post('/api/register', { username, password })
      this.data = data
      this._rememberHeaders()
      this.loggedIn = true
    } catch (e) {
      this.error = e.response.data
    }
  }

  constructor() {
    this._rememberHeaders()
  }
}

const userStore = new UserStore()

hydrate()('userStore', userStore).then(() => {
  console.log('user hydrated')
})

// yes, not very good looking
axios.setLogout(() => userStore.logout())

export default userStore
