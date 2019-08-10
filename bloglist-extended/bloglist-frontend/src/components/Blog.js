import React, { useState } from 'react'
const Blog = ({ blog, like, remove, creator }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const details = () => (
    <div className="details">
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes
        <button onClick={() => {like(blog)}}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {creator &&(<button onClick={() => remove(blog)}>remove </button>)}
    </div>
  )

  return (
    <div className="blog" style={blogStyle}>
      <div data-testid="container" onClick={() => setExpanded(!expanded)}>
        {blog.title} {blog.author}
      </div>
      {expanded && details()}
    </div>
  )
}

export default Blog