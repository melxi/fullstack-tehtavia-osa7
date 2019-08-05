import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { initializeBlogs, likeBlog, removeBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'

const App = props => {
  const [user, setUser] = useState(null)
  const [username] = useField('text')
  const [password] = useField('password')
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      props.setNotification(`${user.username} successfully logged in`)
    } catch (exception) {
      props.setNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const createBlog = blog => {
    blogService
      .create(blog)
      .then(createdBlog => {
        setBlogs(blogs.concat(createdBlog))
        props.setNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      })
      .catch(exception => {
        if (exception.toString().includes('401')) {
          props.setNotification('You are not authorized to perform this operation', 'error')
        } else {
          props.setNotification('Failed to add a new blog', 'error')
        }
      })
  }

  const likeBlog = blog => {
    props.likeBlog(blog)
    props.setNotification(`blog ${blog.title} by ${blog.author} liked!`)
  }

  const removeBlog = blog => {
    const confirmRemoval = window.confirm(`remove blog ${blog.title} ${blog.author}`)

    if (confirmRemoval) {
      props.removeBlog(blog)
      props.setNotification(`blog ${blog.title} by ${blog.author} removed!`)
    }
  }

  if (user === null) {
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
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="new note">
        <BlogForm
          createBlog={createBlog}
        />
      </Togglable>
      {props.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          like={likeBlog}
          remove={removeBlog}
          user={user}
          creator={blog.user && blog.user.username === user.username}
        />
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps, { initializeBlogs, likeBlog, removeBlog, setNotification })(App)
