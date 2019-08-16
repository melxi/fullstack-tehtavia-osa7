import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Header } from 'semantic-ui-react'

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
    borderWidth: 2
  }

  return (
    <div>
      {props.blogs.map(blog => (
        <Card fluid color="black" className="blog" style={blogStyle} key={blog.id} data-testid="container" >
          <Header as="h2" style={{
            fontSize: '2em',
            fontWeight: 'normal'
          }}><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></Header>
        </Card>
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