import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.data
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: users
    })
  }
}

export default userReducer