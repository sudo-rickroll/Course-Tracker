import { useState, useEffect } from 'react'
import Login from './Components/Login.jsx'
import UserForm from './Components/UserForm.jsx'
import Courses from './Components/Courses.jsx'
import Notification from './Components/Notification.jsx'
import TogglableHome from './Components/TogglableHome.jsx'
import TogglableCourse from './Components/TogglableCourse.jsx'
import CourseForm from './Components/CourseForm.jsx'
import { getCourses } from './services/course.js'

function App() {
  const [ notification, setNotification ] = useState({message: '', type: ''})
  const [user, setUser] = useState(null)
  const [courses, setCourses] = useState([])

  const showNotification = (type, message) => {
    setNotification({message, type})
    setTimeout(() => setNotification({message: '', type: ''}), 5000)
  }

  const refreshCourses = async (id = null) => {
    const courseList = await getCourses()
    id ? setCourses(courseList.filter(course => course.user === id)) : setCourses(courseList)    
  }

  const validateSession = () => {
    window.localStorage.getItem('token') ? setUser(window.localStorage.getItem('userId')) : setUser('')
  }

  useEffect(() => {
    refreshCourses().then(() => {
        validateSession()
    }).catch(error => setNotification('failure', error.response?.data || error.message))
  }, [notification])


  return (
    <>
      <Notification type={notification.type} message={notification.message} />
      <TogglableHome buttonLabels={['Login', 'Create account']} showStatus={showNotification}>
          <Login />
          <UserForm />
      </TogglableHome>
      
      <TogglableCourse buttonLabel='Create course' showStatus={showNotification} loggedIn={user}>
          <CourseForm course={null} refreshCourses={refreshCourses} />
      </TogglableCourse>
      <Courses courses={courses} refreshCourses={refreshCourses} showStatus={showNotification} loggedIn={user}/>
    </>
  )
}

export default App
