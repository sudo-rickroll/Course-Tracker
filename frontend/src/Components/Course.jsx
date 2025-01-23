import { useState } from 'react'
import styles from '../styles.js'
import CourseForm from './CourseForm.jsx'
import { deleteCourse, incrementLikes } from '../services/course.js'

const Course = ({course, refreshCourses, showStatus, loggedIn}) => {

    const [visible, setVisible] = useState(null)
    const [readMode, setReadMode] = useState(true)

    const showWhenVisible = {display: visible ? '' : 'none'}
    const showWhenRead = {display: readMode ? '' : 'none'}
    const showWhenEdit = {display: readMode ? 'none' : ''}

    const toggleVisibility = () => setVisible(!visible)
    const toggleView = () => setReadMode(!readMode)
    
    const increaseLikes = async () => {
        try{
            await incrementLikes(course.id)
            refreshCourses()
        }catch(error){
            showStatus('failure', error.response?.data || error.message)
        }
    }

    const deleteRecord = async() => {
        try{
            if(confirm(`Are you sure you want to delete the course "${course.title}"`)){
                await deleteCourse(course.id)
                refreshCourses()
            }
        }catch(error){
            showStatus('failure', error.response?.data || error.message)
        }
    }

    return (
        <>
            <div style={{...styles.border, ...styles.margin, ...showWhenRead}}>
                <p><b>{course.title}</b><button onClick={toggleVisibility}>{visible?'Hide':'Show'}</button></p>
                <div style= {showWhenVisible}>
                    {course.author ? <p>by <b>{course.author}</b></p> : null}
                    <p><b>{course.hours}</b> hours spent</p>
                    <p>can be found at <a href={course.url}>{course.url}</a></p>
                </div>
                <p><b>{course.likes || 0}</b> likes {loggedIn? <button onClick={increaseLikes}>Like</button> : null}</p>
                {loggedIn? <><button onClick={toggleView}>Edit</button><button onClick={deleteRecord}>Delete</button></> : null}
            </div>
            <div style={{...styles.border, ...styles.margin, ...showWhenEdit}}>
                <CourseForm course={course} refreshCourses={refreshCourses} toggleVisibility={toggleView} showStatus={showStatus}></CourseForm>
            </div>
        </>
    )
}

export default Course