import styles from '../styles.js'
import PropTypes from 'prop-types'

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

Notification.propTypes = {
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
}

export default Notification;