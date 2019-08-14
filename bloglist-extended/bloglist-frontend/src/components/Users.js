import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Users = (props) => {
  const users = props.users.map(user => {
    return (
      <tr key={user.id}>
        <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
        <td>{user.blogs.length}</td>
      </tr>
    )
  })

  return (
    <div>
      <h2>Users </h2>
      <table>
        <tbody>
          <tr>
            <th>&nbsp;</th>
            <th>blogs created</th>
          </tr>
          {users}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Users)
