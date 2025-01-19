import {useState, useEffect} from 'react'
import { getCourses, createCourse, updateCourse, deleteCourse } from '../services/course.js'
import Course from './Course.jsx'
import CreateCourse from './CreateCourse.jsx'
import EditCourse from './EditCourse.jsx'

const Courses = ({exit}) => {
    const [courses, setCourses] = useState([])
    const [newCourse, setNewCourse] = useState(false)
    const [course, setCourse] = useState(null)

    const refreshCourses = async () => {
        try{
            const data = await getCourses()
            setCourses(data)
        }catch(error){
            alert(error.response.data)
        }
    }
    
    useEffect(() => {
        (async () => await refreshCourses())()
    },[])

    const toggleNewDisplay = () => setNewCourse(!newCourse)
    const toggleEditDisplay = () => setCourse({})

    const handleLogout = () => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('name')
        exit()
    }

    const setCourseDetails = (course) => setCourse(course)

    const createNewCourse = async (course) => {
        try{
            await createCourse(course)
            refreshCourses()
            toggleNewDisplay()
        }catch(error){
                alert(error.response.data)
        }
    }

    const editExistingCourse = async (updatedCourse) => {
        try{
            await updateCourse(course.id, updatedCourse)
            refreshCourses()
            toggleEditDisplay()
        }catch(error){
                alert(error.response.data)
        }
    }
    
    const deleteExistingCourse = async (course) => {
        try{
            if(confirm(`Are you sure you want to delete "${course.title}"?`))
            await deleteCourse(course.id)
            refreshCourses()
        }catch(error){
                alert(error.response.data)
        }
    }

    if(newCourse){
        return (
            <CreateCourse toggleScreen = {toggleNewDisplay} create = {createNewCourse}></CreateCourse>
        )
    }

    if(course?.title){
        return (
            <EditCourse toggleScreen = {toggleEditDisplay} edit = {editExistingCourse} course={course}></EditCourse>
        )
    }

    return (
        <>
            <h1>Welcome, {window.localStorage.getItem('name')} <button onClick = {handleLogout}>Logout</button></h1>
            
            <br/>
            {courses.map(course => <Course key={course.id} course={course} deleteCourse={deleteExistingCourse} setDetails={setCourseDetails}></Course>)}
            <br/>
            <div>
                <button onClick={toggleNewDisplay}>Create New Course</button>
            </div>
        </>
    )
}

export default Courses