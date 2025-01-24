import {useState, useEffect, cloneElement} from 'react'
import { getCourses } from '../services/course.js'

const TogglableCourse = (props) => {

    const [visible, setVisible] = useState(null)
    const [courses, setCourses] = useState([])

    const [allCourses, setAllCourses] = useState(true)

    const allCourseSelected = {
        backgroundColor: allCourses? 'rgba(230, 216, 171, 0.93)' : ''
    }

    const myCourseSelected = {
        backgroundColor: allCourses? '' : 'rgba(230, 216, 171, 0.93)'
    }

    const toggleView = (e) => {
        if(e.target.innerHTML === props.buttonLabel[2]){
            setAllCourses(false)
            return
        }
        setAllCourses(true)
    }
    const showWhenVisible = {display: !props.loggedIn ? 'none' : visible ? '' : 'none'}
    const hideWhenVisible = {display: !props.loggedIn ? 'none' : visible ? 'none' : ''}

    const refreshCourses = async () => setCourses(await getCourses())



    useEffect(() => {
        refreshCourses()
      }, [])

    const toggleVisibility = () => setVisible(!visible)

    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel[0]}</button>
                <br/><br/>
                <button style={allCourseSelected} onClick={toggleView}>{props.buttonLabel[1]}</button><button style={myCourseSelected} onClick={toggleView} >{props.buttonLabel[2]}</button>
            </div>
            <div style={showWhenVisible}>
                {cloneElement(props.children[0], {course: null, refreshCourses, toggleVisibility, showStatus: props.showStatus})}
            </div>
            {cloneElement(props.children[1], {courses: !allCourses && props.loggedIn ? courses.filter(course => course.user?.id === window.localStorage.getItem('userId')) : courses , refreshCourses, toggleVisibility, showStatus: props.showStatus, loggedIn: props.loggedIn})}
        </>
    )
}

export default TogglableCourse