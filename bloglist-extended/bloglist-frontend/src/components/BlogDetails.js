import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'

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
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes
        <button onClick={() => {like(blog)}}>like</button>
        <div>added by {blog.user.name}</div>
        {blog.user.username === user.username &&(<button onClick={() => remove(blog)}>remove </button>)}
      </div>
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input {...comment} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
      </ul>
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