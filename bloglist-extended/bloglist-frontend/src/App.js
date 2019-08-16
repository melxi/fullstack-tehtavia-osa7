import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogDetails from './components/BlogDetails'
import BlogForm from './components/BlogForm'
import User from './components/User'
import Users from './components/Users'
import Notification from './components/Notification'
import { setUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs,  } from './reducers/blogReducer'

const App = props => {
  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    props.initializeUsers()
  }, [])

  useEffect(() => {
    props.setUser()
  }, [])

  if (props.user === null) {
    return <LoginForm />
  }

  return (
    <div>
      <Router>
        <Navigation />
        <Notification />
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/:id" component={User} />
        <Route exact path="/" component={BlogForm} />
        <Route exact path="/" component={Blog} />
        <Route exact path="/blogs/:id" component={BlogDetails} />
      </Router>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    blogs: state.blogs,
    users: state.users
  }
}

const mapDispatchToProps = {
  setUser,
  initializeBlogs,
  initializeUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App)