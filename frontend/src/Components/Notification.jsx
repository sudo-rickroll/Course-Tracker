import styles from '../styles.js'

const Notification = ({type, message}) => {

    if (type === "") {
        return null;
    }

    return (
        <div style={type === "success" ? {...styles.notification, ...styles.success} : {...styles.notification, ...styles.failure}}>
            {message}
        </div>
    )
}

export default Notification;