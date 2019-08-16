import React from 'react'
import { connect } from 'react-redux'
import { Item } from 'semantic-ui-react'

const User = (props) => {
  if (props.user === undefined) {
    return null
  }
  return (
    <div>
      <h2>{props.user.name}</h2>
      <h3>added blogs</h3>
      <Item.Group divided>
        {props.user.blogs.map(blog => (
          <Item key={blog.id}>
            <Item.Content>{blog.title}</Item.Content>
          </Item>
        ))}
      </Item.Group>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id
  return {
    user: state.users.find(user => user.id === id)
  }
}

export default connect(mapStateToProps)(User)
