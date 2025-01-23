import Course from './Course.jsx'

const Courses = ({courses, refreshCourses, showStatus, loggedIn}) => {

    return (
        <>            
            {courses.map(course => <Course key={course.id} course={course} refreshCourses={refreshCourses} showStatus = {showStatus} loggedIn={loggedIn}></Course>)}
        </>
    )
}

export default Courses