import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'

const store = createStore(notificationReducer, applyMiddleware(thunk))

export default store