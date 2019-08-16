import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  }

  return (
    <Message positive color={notification.type === 'error' ? 'red' : 'green'}>
      <Message.Header>{notification.message}</Message.Header>
    </Message>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)
