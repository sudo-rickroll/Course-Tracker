import { useState, useEffect } from 'react'
import Login from './Components/Login.jsx'
import CreateUser from './Components/CreateUser.jsx'
import Courses from './Components/Courses.jsx'

function App() {
  const [display, setDisplay] = useState(null)
  const returnHome = () => {
    setDisplay(false)
  }

  if(window.localStorage.getItem('token')){
    return <Courses exit={returnHome}></Courses>
  }
  const changeDisplay = () => setDisplay(!display)

  return (
    <>
      <Login display={!display} toggle={changeDisplay}></Login>
      <CreateUser display={display} toggle={changeDisplay}></CreateUser>
    </>
  )
}

export default App
