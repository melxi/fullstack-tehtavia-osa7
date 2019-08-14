import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = (state = null, action) => {
  switch (action.type) {
  case 'USER_LOGIN':
    return action.data
  case 'USER_LOGOUT':
    return null
  default:
    return state
  }
}

export const setUser = user => {
  return dispatch => {
    dispatch({
      type: 'USER_LOGIN',
      data: user
    })
  }
}

export const userLogin = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'USER_LOGIN',
      data: user
    })
    return user
  }
}

export const userLogout = () => {
  return dispatch => {
    blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch({
      type: 'USER_LOGOUT'
    })
  }
}

export default loginReducer