import { useState } from 'react'
import styles from '../styles.js'
import { createCourse, updateCourse } from '../services/course.js'
import PropTypes from 'prop-types'

const CourseForm = ({course, refreshCourses, toggleVisibility, showStatus}) => {
    const [title, setTitle] = useState(course?.title || '')
    const [author, setAuthor] = useState(course?.author || '')
    const [hours, setHours] = useState(course?.hours || 0)
    const [url, setUrl] = useState(course?.url || '')
    const [validateUrl, setValidateUrl] = useState(false)

    const urlRegex = /^(https?:\/\/|www\.)[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/[^\s]*)?$/

    const changeTitle = ({target}) => setTitle(target.value)
    const changeAuthor = ({target}) => setAuthor(target.value)
    const changeHours = ({target}) => setHours(target.value)
    const changeUrl = ({target}) => {
        !(target.value && urlRegex.test(target.value)) ? setValidateUrl(true) : setValidateUrl(false)
        setUrl(target.value)
    }

    const createNewCourse = async (e) => {
        e.preventDefault()
        try{
            await createCourse({title, author, hours, url})
            setTitle('')
            setAuthor('')
            setHours(0)
            setUrl('')
            showStatus('success', `Course "${title}" created successfully`)
            await refreshCourses()
            toggleVisibility()
        }catch(error){
            showStatus('failure', error.response?.data || error.message)
        }
    }

    const editExistingCourse = async (e, id) => {
        e.preventDefault()
        try{
            await updateCourse(id, {title, author, hours, url})
            showStatus('success', `Course "${course.title}" updated successfully`)
            await refreshCourses()
            toggleVisibility()
        }catch(error){
            showStatus('failure', error.response?.data || error.message)
        }
    }

    return (
        <form style={styles.formDisplay} onSubmit={course? (e) => editExistingCourse(e, course.id) : createNewCourse}>
            <div style={{...styles.divDisplay, ...styles.margin}}>
                <label style={{...styles.elementDisplay, ...styles.margin}}>{'Title'}<label style={{...styles.required, ...styles.margin}}>{'*'}</label></label>
                <input style={styles.margin} value={title} onChange={changeTitle}></input>
            </div>
            <br/>
            <div style={{...styles.divDisplay, ...styles.margin}}>
                <label style={{...styles.elementDisplay, ...styles.margin}}>{'Author'}</label>
                <input style={styles.margin} value={author} onChange={changeAuthor}></input>
            </div>
            <br/>
            <div style={{...styles.divDisplay, ...styles.margin}}>
                <label style={{...styles.elementDisplay, ...styles.margin}}>{'URL'}<label style={{...styles.required, ...styles.margin}}>{'*'}</label></label>
                <input style={{...styles.elementDisplay, ...styles.margin}} value={url} onChange={changeUrl}></input>
                {validateUrl ? <label style={{...styles.margin, ...styles.required}}>{'Enter valid URL'}</label> : null}
            </div>
            <br/>
            <div style={{...styles.divDisplay, ...styles.margin}}>
                <label style={{...styles.elementDisplay, ...styles.margin}}>{'Hours'}</label>
                <input type='number' style={styles.margin} value={hours} onChange={changeHours}></input>
            </div>
            <br/>
            <div style={{...styles.divDisplay, ...styles.margin}}>
                <button style={{...styles.elementDisplay, ...styles.margin}} type='submit'>{course? 'Update' : 'Create'}</button>
                <button style={{...styles.elementDisplay, ...styles.margin}} onClick={toggleVisibility} type='button'>Back</button>
            </div>
        </form>
    )
}

CourseForm.propTypes = {
    course: PropTypes.object,
    refreshCourses: PropTypes.func,
    toggleVisibility: PropTypes.func,
    showStatus: PropTypes.func
}

export default CourseForm