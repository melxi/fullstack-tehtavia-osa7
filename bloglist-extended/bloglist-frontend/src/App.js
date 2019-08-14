import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import blogService from './services/blogs'
import User from './components/User'
import Users from './components/Users'
import Blog from './components/Blog'
import BlogDetails from './components/BlogDetails'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { setUser, userLogin, userLogout } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'

const App = props => {
  const [username] = useField('text')
  const [password] = useField('password')

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    props.initializeUsers()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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

  const handleLogout = () => {
    props.setUser(null)
    props.userLogout()
  }

  const createBlog = async blog => {
    try {
      const createdBlog = await props.createBlog(blog)
      props.setNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
    }
    catch (exception) {
      if (exception.toString().includes('401')) {
        props.setNotification('You are not authorized to perform this operation', 'error')
      } else {
        props.setNotification('Failed to add a new blog', 'error')
      }
    }
  }

  if (props.user === null) {
    return (
      <div>
        <h1>log in to application</h1>
        <Notification />
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

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{props.user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Router>
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/:id" component={User} />
        <Togglable buttonLabel="new note">
          <BlogForm
            createBlog={createBlog}
          />
        </Togglable>
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
  userLogin,
  userLogout,
  initializeBlogs,
  createBlog,
  initializeUsers,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(App)