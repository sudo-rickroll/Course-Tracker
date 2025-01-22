import {useState, cloneElement} from 'react'

const TogglableCourse = (props) => {

    const [visible, setVisible] = useState(null)

    if(!window.localStorage.getItem('token')){
        return null
    }

    const showWhenVisible = {display: visible ? '' : 'none'}
    const hideWhenVisible = {display: visible ? 'none' : ''}

    const toggleVisibility = () => setVisible(!visible)

    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {cloneElement(props.children, {toggleVisibility, showStatus: props.showStatus})}
            </div>
        </>
    )
}

export default TogglableCourse