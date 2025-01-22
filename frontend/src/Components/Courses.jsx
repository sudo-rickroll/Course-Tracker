import {useState, useEffect} from 'react'
import { getCourses, createCourse, updateCourse, deleteCourse, incrementLikes } from '../services/course.js'
import Course from './Course.jsx'
import CourseForm from './CourseForm.jsx'

const Courses = ({exit, showStatus}) => {
    const [courses, setCourses] = useState([])
    const [course, setCourse] = useState(null)

    const refreshCourses = async () => {
        try{
            const data = await getCourses()
            setCourses(data)
        }catch(error){
            showStatus('failure', error.response?.data || error.message)
        }
    }
    
    useEffect(() => {
        (async () => await refreshCourses())()
    },[])

    const toggleNewDisplay = () => setNewCourse(!newCourse)
    const toggleEditDisplay = () => setCourse({})

    const setCourseDetails = (course) => setCourse(course)
    
    const deleteExistingCourse = async (course) => {
        try{
            if(confirm(`Are you sure you want to delete "${course.title}"?`)){
                await deleteCourse(course.id)
                showStatus('success', `Course "${course.title}" deleted successfully`)
                refreshCourses()
            }
        }catch(error){
            showStatus('failure', error.response?.data || error.message)
        }
    }

    const updateLikes = async (course) => {
        try{
            await incrementLikes(course.id)
            refreshCourses()
        }catch(error){
            showStatus('failure', error.response?.data || error.message)
        }
    }

    return (
        <>            
            {courses.map(course => <Course key={course.id} course={course} deleteCourse={deleteExistingCourse} addLike={updateLikes} setDetails={setCourseDetails}></Course>)}
        </>
    )
}

export default Courses