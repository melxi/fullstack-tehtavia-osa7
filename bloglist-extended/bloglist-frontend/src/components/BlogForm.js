import React from 'react'
import Togglable from './Togglable'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Form, Header } from 'semantic-ui-react'

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
      <Header
        as='h3'
        content='create new'
        style={{
          fontSize: '2em',
          fontWeight: 'normal',
          marginBottom: '0.5em'
        }}
      />
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>title</label>
          <input {...title} placeholder='title' />
        </Form.Field>
        <Form.Field>
          <label>author</label>
          <input {...author} placeholder='author' />
        </Form.Field>
        <Form.Field>
          <label>url</label>
          <input {...url} placeholder='url' />
        </Form.Field>
        <Button positive type='submit'>create</Button>
      </Form>
    </Togglable>
  )
}

const mapDispatchToProps = {
  createBlog,
  setNotification
}

export default connect(null, mapDispatchToProps)(BlogForm)