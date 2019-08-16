import React from 'react'
import Notification from './Notification'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser, userLogout } from '../reducers/loginReducer'
import { Menu, Header, Button } from 'semantic-ui-react'

const Navigation = (props) => {
  const handleLogout = () => {
    props.setUser(null)
    props.userLogout()
  }

  return (
    <header>
      <Menu>
        <Menu.Item><Link to="/">blogs</Link></Menu.Item>
        <Menu.Item><Link to="/users">users</Link></Menu.Item>
        <Menu.Item position="right">
          {props.user.name} logged in
          <Button primary style={{ marginLeft: '0.5em' }} onClick={handleLogout}>logout</Button>
        </Menu.Item>
      </Menu>
      <Notification />
      <Header
        as='h2'
        content='blog app'
        style={{
          fontSize: '3em',
          fontWeight: 'normal',
          marginBottom: '0.5em'
        }}
      />
    </header>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setUser,
  userLogout
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
