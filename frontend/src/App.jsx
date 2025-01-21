import { useState, useEffect } from 'react'
import Login from './Components/Login.jsx'
import CreateUser from './Components/CreateUser.jsx'
import Courses from './Components/Courses.jsx'
import Notification from './Components/Notification.jsx'
import Togglable from './Components/Togglable.jsx'

function App() {
  const [ notification, setNotification ] = useState({message: '', type: ''})

  const showNotification = (type, message) => {
    setNotification({message, type})
    setTimeout(() => setNotification({message: '', type: ''}), 5000)
  }


  return (
    <>
      <Notification type={notification.type} message={notification.message}></Notification>
      <Togglable buttonLabels={['Login', 'Create account']} showStatus={showNotification}>
          <Login />
          <CreateUser />
      </Togglable>
      <Courses showStatus={showNotification}></Courses>
    </>
  )
}

export default App
