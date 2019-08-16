import React from 'react'
import Notification from './Notification'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { userLogin } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

const LoginForm = (props) => {
  const [username] = useField('text')
  const [password] = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await props.userLogin({
        username: username.value,
        password: password.value
      })
      props.setNotification(`${user.username} successfully logged in`)
    } catch (exception) {
      props.setNotification('wrong username or password', 'error')
    }
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Notification />
        <Header as='h2' textAlign='center'>
          Login to application
        </Header>
        <Form size='large' onSubmit={handleLogin}>
          <Segment stacked>
            <Form.Input {...username} fluid icon='user' iconPosition='left' placeholder='Username' />
            <Form.Input {...password} fluid icon='lock' iconPosition='left' placeholder='Password'type='password' />
            <Button primary fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

const mapDispatchToProps = {
  userLogin,
  setNotification
}

export default connect(null, mapDispatchToProps)(LoginForm)