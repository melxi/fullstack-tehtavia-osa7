import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import { Form, Input, Button, Icon, Label, Comment, Header } from 'semantic-ui-react'

const BlogDetails = (props) => {
  const {
    user,
    blog,
    likeBlog,
    removeBlog,
    commentBlog,
    setNotification
  } = props
  const [comment, resetComment] = useField('text')

  const like = blog => {
    likeBlog(blog)
    setNotification(`blog ${blog.title} by ${blog.author} liked!`)
  }

  const remove = blog => {
    const confirmRemoval = window.confirm(`remove blog ${blog.title} ${blog.author}`)

    if (confirmRemoval) {
      removeBlog(blog)
      setNotification(`blog ${blog.title} by ${blog.author} removed!`)
      props.history.push('/')
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    commentBlog({ content: comment.value }, blog.id)
    resetComment()
  }

  if (blog === undefined) {
    return null
  }

  return (
    <div>
      <Header
        as='h2'
        content={blog.title}
        style={{
          fontSize: '1.7em',
          fontWeight: 'normal'
        }}
      />
      <a href={blog.url}>{blog.url}</a>
      <div>
        <Button as='div' labelPosition='right'>
          <Button color='red' onClick={() => {like(blog)}}>
            <Icon name='heart' />
            Like
          </Button>
          <Label as='a' basic color='red' pointing='left'>
            {blog.likes}
          </Label>
        </Button>
        <Label>added by {blog.user.name}</Label>
        <div style={{ marginTop: '0.5em' }}>
          {blog.user.username === user.username &&(<Button negative onClick={() => remove(blog)}>remove </Button>)}
        </div>
      </div>
      <Comment.Group>
        <Header as='h3' dividing>
          comments
        </Header>
        <Form onSubmit={handleSubmit}>
          <Input {...comment} action='comment' placeholder='add comment' id="comment" />
        </Form>
        {blog.comments.map(comment => (
          <Comment key={comment}>
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <Comment.Content>
              <Comment.Author>Anonymous</Comment.Author>
              <Comment.Metadata>
                <div>Today</div>
              </Comment.Metadata>
              <Comment.Text>{comment}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id
  return {
    user: state.user,
    blog: state.blogs.find(blog => blog.id === id)
  }
}

const mapDispatchToProps = {
  likeBlog,
  removeBlog,
  commentBlog,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetails)