import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Header, Table } from 'semantic-ui-react'

const Users = (props) => {
  const users = props.users.map(user => {
    return (
      <Table.Row key={user.id}>
        <Table.Cell><Link to={`/users/${user.id}`}>{user.name}</Link></Table.Cell>
        <Table.Cell>{user.blogs.length}</Table.Cell>
      </Table.Row>
    )
  })

  return (
    <div>
      <Header as="h2">Users </Header>
      <Table definition>
        <Table.Header>
          <Table.Row>
            <th>&nbsp;</th>
            <Table.HeaderCell>blogs created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users}
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Users)
