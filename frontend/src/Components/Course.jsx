import styles from '../styles.js'

const Course = ({course, deleteCourse, setDetails}) => {

    const editItem = () => setDetails(course)
    
    const deleteItem = async () => await deleteCourse(course)

    return (
        <div style={{...styles.border, ...styles.margin}}>
            <p><b>{course.title}</b></p>
            {course.author ? <p>by <b>{course.author}</b></p> : null}
            <p><b>{course.hours}</b> hours spent</p>
            <p>can be found at <a href={course.url}>{course.url}</a></p>
            <button onClick={editItem}>Edit</button>
            <button onClick={deleteItem}>Delete</button>
        </div>
    )
}

export default Course