import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser, userLogout } from '../reducers/loginReducer'

const Navigation = (props) => {
  const navigationStyle = {
    backgroundColor: '#D3D3D3',
    listStyleType: 'none'
  }

  const navLinkStyle = {
    display: 'inline-block',
    margin: '0 2px'
  }

  const handleLogout = () => {
    props.setUser(null)
    props.userLogout()
  }

  return (
    <header>
      <nav style={navigationStyle}>
        <li style={navLinkStyle}><Link to="/">blogs</Link></li>
        <li style={navLinkStyle}><Link to="/users">users</Link></li>
        <li style={navLinkStyle}><p>{props.user.name} logged in</p></li>
        <li style={navLinkStyle}><button onClick={handleLogout}>logout</button></li>
      </nav>
      <h2>blog app</h2>
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
