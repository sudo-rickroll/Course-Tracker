import {useState, useEffect, cloneElement} from 'react'
import { getCourses } from '../services/course.js'

const TogglableCourse = (props) => {

    const [visible, setVisible] = useState(null)
    const [courses, setCourses] = useState([])

    const showWhenVisible = {display: !props.loggedIn ? 'none' : visible ? '' : 'none'}
    const hideWhenVisible = {display: !props.loggedIn ? 'none' : visible ? 'none' : ''}

    const refreshCourses = async (e=null, id = null) => {
        if(id){
            setCourses(courses.filter(course => course.user?.id === id))
            return
        }        
        const courseList = await getCourses()
        setCourses(courseList)  
    }

    useEffect(() => {
        refreshCourses()
      }, [])

    const toggleVisibility = () => setVisible(!visible)

    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel[0]}</button>
                <br/><br/>
                <button onClick={refreshCourses}>{props.buttonLabel[1]}</button><button onClick={(e) => refreshCourses(e, window.localStorage.getItem('userId'))}>{props.buttonLabel[2]}</button>
            </div>
            <div style={showWhenVisible}>
                {cloneElement(props.children[0], {course: null, refreshCourses, toggleVisibility, showStatus: props.showStatus})}
            </div>
            {cloneElement(props.children[1], {courses: courses, refreshCourses, toggleVisibility, showStatus: props.showStatus, loggedIn: props.loggedIn})}
        </>
    )
}

export default TogglableCourse