import { useState, useEffect } from 'react'
import Login from './Components/Login.jsx'
import CreateUser from './Components/CreateUser.jsx'
import Courses from './Components/Courses.jsx'
import Notification from './Components/Notification.jsx'

function App() {
  const [ display, setDisplay ] = useState(null)
  const [ notification, setNotification ] = useState({message: '', type: ''})
  const returnHome = () => {
    setDisplay(false)
  }

  const showNotification = (type, message) => {
    setNotification({message, type})
    setTimeout(() => setNotification({message: '', type: ''}), 5000)
  }

  if(window.localStorage.getItem('token')){
    return (
    <>
      <Notification type={notification.type} message={notification.message}></Notification>
      <Courses exit={returnHome} status={showNotification}></Courses>
    </>
    )
  }
  const changeDisplay = () => setDisplay(!display)

  return (
    <>
      <Notification type={notification.type} message={notification.message}></Notification>
      <Login display={!display} toggle={changeDisplay} status={showNotification}></Login>
      <CreateUser display={display} toggle={changeDisplay} status={showNotification}></CreateUser>
    </>
  )
}

export default App
