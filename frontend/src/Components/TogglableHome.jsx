import { cloneElement, useState } from 'react'

const TogglableHome = (props) => {
    const [visible, setVisible] = useState(null)
    const [currentForm, setCurrentForm] = useState('')

    const toggleVisibility = (mode = null) => {
        setVisible(!visible)
        setCurrentForm(mode)
    }

    const handleLogout = () => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('name')
        props.showStatus('success', 'Logged out successfully')
        setVisible(null)
    }

    if(window.localStorage.getItem('token')){
        return (
            <h1>Welcome, {window.localStorage.getItem('name')} <button onClick = {handleLogout}>Logout</button></h1>
        )
    }

    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={e => toggleVisibility(e.target.innerHTML)}>{props.buttonLabels[0]}</button>
                <button onClick={e => toggleVisibility(e.target.innerHTML)}>{props.buttonLabels[1]}</button>
            </div>
            <div style={showWhenVisible}>
                {currentForm ? cloneElement(props.children[props.buttonLabels.indexOf(currentForm)], {toggleVisibility, showStatus: props.showStatus}) : null}
            </div>
        </>
    )
}

export default TogglableHome