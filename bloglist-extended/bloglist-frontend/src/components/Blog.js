import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      {props.blogs.map(blog => (
        <div className="blog" style={blogStyle} key={blog.id} data-testid="container" >
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps)(Blog)