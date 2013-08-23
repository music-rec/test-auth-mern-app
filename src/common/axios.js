import * as _axios from 'axios'

const API_URL = 'http://localhost:3000'

let headersObj = {}
let logoutFn = () => {}

const axios = _axios.create({ baseURL: API_URL })

axios.interceptors.request.use(function(config) {
  config.headers = Object.assign(headersObj, config.headers)
  return config
})

// yes, not very good looking
axios.setLogout = fn => logoutFn = fn
axios.setHeaders = obj => headersObj = obj

axios.interceptors.response.use(
  response => response,
  error => {
    if ( error.response.status === 401 ) {
      logoutFn()
    }
    return Promise.reject(error)
  }
)

export  default axios
