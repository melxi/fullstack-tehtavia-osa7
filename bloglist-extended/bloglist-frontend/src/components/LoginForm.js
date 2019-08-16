import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { userLogin } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = (props) => {
  const [username] = useField('text')
  const [password] = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await props.userLogin({
        username: username.value,
        password: password.value
      })
      props.setNotification(`${user.username} successfully logged in`)
    } catch (exception) {
      props.setNotification('wrong username or password', 'error')
    }
  }

  return (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username</label>
          <input {...username}/>
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input {...password}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  userLogin,
  setNotification
}

export default connect(null, mapDispatchToProps)(LoginForm)