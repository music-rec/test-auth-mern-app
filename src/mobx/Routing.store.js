import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import createHistory from 'history/createHashHistory'

const store = new RouterStore()
const history = syncHistoryWithStore(createHistory(), store)

export { history, store }

export default store
