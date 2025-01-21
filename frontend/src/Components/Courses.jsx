import {useState, useEffect} from 'react'
import { getCourses, createCourse, updateCourse, deleteCourse, incrementLikes } from '../services/course.js'
import Course from './Course.jsx'
import CourseForm from './CourseForm.jsx'

const Courses = ({exit, status}) => {
    const [courses, setCourses] = useState([])
    const [newCourse, setNewCourse] = useState(false)
    const [course, setCourse] = useState(null)

    const refreshCourses = async () => {
        try{
            const data = await getCourses()
            setCourses(data)
        }catch(error){
            status('failure', error.response?.data || error.message)
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
        status('success', 'Logged out successfully')
    }

    const setCourseDetails = (course) => setCourse(course)

    const createNewCourse = async (course) => {
        try{
            await createCourse(course)
            status('success', `Course "${course.title}" created successfully`)
            refreshCourses()
            toggleNewDisplay()
        }catch(error){
            status('failure', error.response?.data || error.message)
        }
    }

    const editExistingCourse = async (updatedCourse) => {
        try{
            await updateCourse(course.id, updatedCourse)
            status('success', `Course "${course.title}" updated successfully`)
            refreshCourses()
            toggleEditDisplay()
        }catch(error){
            status('failure', error.response?.data || error.message)
        }
    }
    
    const deleteExistingCourse = async (course) => {
        try{
            if(confirm(`Are you sure you want to delete "${course.title}"?`)){
                await deleteCourse(course.id)
                status('success', `Course "${course.title}" deleted successfully`)
                refreshCourses()
            }
        }catch(error){
            status('failure', error.response?.data || error.message)
        }
    }

    const updateLikes = async (course) => {
        try{
            await incrementLikes(course.id)
            refreshCourses()
        }catch(error){
            status('failure', error.response?.data || error.message)
        }
    }

    if(newCourse){
        return (
            <CourseForm toggleScreen = {toggleNewDisplay} modify = {createNewCourse} course={null}></CourseForm>
        )
    }

    if(course?.title){
        return (
            <CourseForm toggleScreen = {toggleEditDisplay} modify = {editExistingCourse} course={course}></CourseForm>
        )
    }

    return (
        <>
            <h1>Welcome, {window.localStorage.getItem('name')} <button onClick = {handleLogout}>Logout</button></h1>
            
            <br/>
            {courses.map(course => <Course key={course.id} course={course} deleteCourse={deleteExistingCourse} addLike={updateLikes} setDetails={setCourseDetails}></Course>)}
            <br/>
            <div>
                <button onClick={toggleNewDisplay}>Create New Course</button>
            </div>
        </>
    )
}

export default Courses