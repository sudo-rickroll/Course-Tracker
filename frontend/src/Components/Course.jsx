import { useState } from 'react'
import styles from '../styles.js'
import CourseForm from './CourseForm.jsx'
import { deleteCourse, incrementLikes } from '../services/course.js'
import PropTypes from 'prop-types'

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
                showStatus('success', `Deleted course ${course.title} successfully`)
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
                    {course.author ? <p>authored by <b>{course.author}</b></p> : null}
                    <p><b>{course.hours}</b> hours spent</p>
                    <p>can be found at <a href={course.url}>{course.url}</a></p>
                    <p>created by <b>{course.user.name}</b></p>
                </div>
                <p><b>{course.likes}</b> likes {loggedIn? <button onClick={increaseLikes}>Like</button> : null}</p>
                {loggedIn && window.localStorage.getItem('userId') === course.user?.id ? <><button onClick={toggleView}>Edit</button><button onClick={deleteRecord}>Delete</button></> : null}
            </div>
            <div style={{...styles.border, ...styles.margin, ...showWhenEdit}}>
                <CourseForm course={course} refreshCourses={refreshCourses} toggleVisibility={toggleView} showStatus={showStatus}></CourseForm>
            </div>
        </>
    )
}

Course.propTypes = {
    course: PropTypes.object.isRequired,
    refreshCourses: PropTypes.func.isRequired,
    showStatus: PropTypes.func.isRequired,
    loggedIn: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.oneOf([null])
        ])
}

export default Course