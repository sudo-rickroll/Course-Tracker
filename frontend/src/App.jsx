import { useState, useEffect } from 'react'
import Login from './Components/Login.jsx'
import UserForm from './Components/UserForm.jsx'
import Courses from './Components/Courses.jsx'
import Notification from './Components/Notification.jsx'
import TogglableHome from './Components/TogglableHome.jsx'
import TogglableCourse from './Components/TogglableCourse.jsx'
import CourseForm from './Components/CourseForm.jsx'

function App() {
  const [ notification, setNotification ] = useState({message: '', type: ''})
  const [user, setUser] = useState(null)
  

  const showNotification = (type, message) => {
    setNotification({message, type})
    setTimeout(() => setNotification({message: '', type: ''}), 5000)
  }

  

  const validateSession = () => {
    window.localStorage.getItem('token') ? setUser(window.localStorage.getItem('userId')) : setUser('')
  }

  useEffect(() => {
    validateSession()    
  }, [notification])


  return (
    <>
      <Notification type={notification.type} message={notification.message} />
      <TogglableHome buttonLabels={['Login', 'Create account']} showStatus={showNotification}>
          <Login />
          <UserForm />
      </TogglableHome>
      
      <TogglableCourse buttonLabel={['Create course','All Courses','My Courses']}showStatus={showNotification} loggedIn={user}>
          <CourseForm />
          <Courses />
      </TogglableCourse>
    </>
  )
}

export default App
