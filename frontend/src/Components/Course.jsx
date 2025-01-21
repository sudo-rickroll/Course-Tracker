import styles from '../styles.js'

const Course = ({course, deleteCourse, addLike, setDetails}) => {

    const editItem = () => setDetails(course)
    
    const deleteItem = async () => await deleteCourse(course)

    const increaseLikes = async () => await addLike(course)

    return (
        <div style={{...styles.border, ...styles.margin}}>
            <p><b>{course.title}</b></p>
            {course.author ? <p>by <b>{course.author}</b></p> : null}
            <p><b>{course.hours}</b> hours spent</p>
            <p>can be found at <a href={course.url}>{course.url}</a></p>
            <p><b>{course.likes || 0}</b> likes <button onClick={increaseLikes}>Like</button></p>
            <button onClick={editItem}>Edit</button>
            <button onClick={deleteItem}>Delete</button>
        </div>
    )
}

export default Course