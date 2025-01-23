import {useState, cloneElement} from 'react'

const TogglableCourse = (props) => {

    const [visible, setVisible] = useState(null)

    if(!window.localStorage.getItem('token')){
        return null
    }

    const showWhenVisible = {display: !props.loggedIn ? 'none' : visible ? '' : 'none'}
    const hideWhenVisible = {display: !props.loggedIn ? 'none' : visible ? 'none' : ''}

    const toggleVisibility = () => setVisible(!visible)

    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
                <br/><br/>
                <button onClick={null}>All Courses</button><button onClick={null}>My Courses</button>
            </div>
            <div style={showWhenVisible}>
                {cloneElement(props.children, {toggleVisibility, showStatus: props.showStatus})}
            </div>
        </>
    )
}

export default TogglableCourse