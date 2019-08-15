import React from 'react'

const LoginForm = ({username, password, handleLogin}) => {
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

export default LoginForm