import { cloneElement, useState, useRef } from 'react'

const Togglable = (props) => {
    const [display, setDisplay] = useState(null)
    const [currentForm, setCurrentForm] = useState('')

    const toggleDisplay = (mode = null) => {
        setDisplay(!display)
        setCurrentForm(mode)
    }

    const handleLogout = () => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('name')
        props.showStatus('success', 'Logged out successfully')
        setDisplay(null)
    }

    if(window.localStorage.getItem('token')){
        return (
            <h1>Welcome, {window.localStorage.getItem('name')} <button onClick = {handleLogout}>Logout</button></h1>
        )
    }

    const hideWhenVisible = {display: display ? 'none' : ''}
    const showWhenVisible = {display: display ? '' : 'none'}

    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={e => toggleDisplay(e.target.innerHTML)}>{props.buttonLabels[0]}</button>
                <button onClick={e => toggleDisplay(e.target.innerHTML)}>{props.buttonLabels[1]}</button>
            </div>
            <div style={showWhenVisible}>
                {currentForm ? cloneElement(props.children[props.buttonLabels.indexOf(currentForm)], {toggleDisplay, showStatus: props.showStatus}) : null}
            </div>
        </>
    )
}

export default Togglable