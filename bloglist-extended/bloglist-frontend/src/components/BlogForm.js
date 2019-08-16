import React from 'react'
import Togglable from './Togglable'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = props => {
  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const createdBlog = await props.createBlog({
        title: title.value,
        author: author.value,
        url: url.value
      })
      titleReset()
      authorReset()
      urlReset()
      props.setNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
    } catch (exception) {
      if (exception.toString().includes('401')) {
        props.setNotification('You are not authorized to perform this operation', 'error')
      } else {
        props.setNotification('Failed to add a new blog', 'error')
      }
    }
  }

  return (
    <Togglable buttonLabel="new note">
      <div>
        <h2>create new</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">title:</label>
            <input {...title}/>
          </div>
          <div>
            <label htmlFor="author">author:</label>
            <input {...author}/>
          </div>
          <div>
            <label htmlFor="url">url:</label>
            <input {...url}/>
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    </Togglable>
  )
}

const mapDispatchToProps = {
  createBlog,
  setNotification
}

export default connect(null, mapDispatchToProps)(BlogForm)