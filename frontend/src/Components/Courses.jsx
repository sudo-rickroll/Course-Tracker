import Course from './Course.jsx'
import PropTypes from 'prop-types'

const Courses = ({courses, refreshCourses, showStatus, loggedIn}) => {

    return (
        <>            
            {courses.map(course => <Course key={course.id} course={course} refreshCourses={refreshCourses} showStatus = {showStatus} loggedIn={loggedIn}></Course>)}
        </>
    )
}

Courses.propTypes = {
    courses: PropTypes.array,
    refreshCourses: PropTypes.func,
    showStatus: PropTypes.func,
    loggedIn: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.oneOf([null])
        ])
}

export default Courses