import {useState, useEffect, cloneElement} from 'react'
import { getCourses } from '../services/course.js'
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import _ from 'lodash'
import PropTypes from 'prop-types'

const TogglableCourse = (props) => {

    const [visible, setVisible] = useState(null)
    const [courses, setCourses] = useState([])
    const [allCourses, setAllCourses] = useState(true)
    const [sortOrder, setSortOrder] = useState(null)

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

    const refreshCourses = async () => {
        const fetchedCourses = await getCourses()
        if(sortOrder === 'asc'){
            fetchedCourses.sort((a, b) => a.likes - b.likes)
        }else if(sortOrder === 'desc'){
            fetchedCourses.sort((a, b) => b.likes - a.likes)
        }
        setCourses(fetchedCourses)
    }

    const toggleSort = () => {
        const coursesToSort = _.cloneDeep(courses)
        if(sortOrder === 'asc'){
            coursesToSort.sort((a, b) => b.likes - a.likes)
            setSortOrder('desc')
        }else if(sortOrder === 'desc' || !sortOrder){
            coursesToSort.sort((a, b) => a.likes - b.likes)
            setSortOrder('asc')
        }
        setCourses(coursesToSort)
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
                <button style={allCourseSelected} onClick={toggleView}>{props.buttonLabel[1]}</button><button style={myCourseSelected} onClick={toggleView} >{props.buttonLabel[2]}</button>
                <button onClick={toggleSort}>{!sortOrder ? <FaSort/> : sortOrder==='asc' ? <FaSortUp /> : <FaSortDown />}</button>
            </div>
            <div style={showWhenVisible}>
                {cloneElement(props.children[0], {course: null, refreshCourses, toggleVisibility, showStatus: props.showStatus})}
            </div>
            {cloneElement(props.children[1], {courses: !allCourses && props.loggedIn ? courses.filter(course => course.user?.id === window.localStorage.getItem('userId')) : courses , refreshCourses, toggleVisibility, showStatus: props.showStatus, loggedIn: props.loggedIn})}
        </>
    )
}

TogglableCourse.propTypes = {
    buttonLabel: PropTypes.array.isRequired,
    showStatus: PropTypes.func.isRequired,
    loggedIn: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([null])
    ]),
    children: PropTypes.node.isRequired
}

export default TogglableCourse