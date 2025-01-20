import {useState} from 'react'
import getUser from '../services/login.js'
import styles from '../styles.js'

const Login = ({display, toggle, status}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [displayPassword, setDisplayPassword] = useState(false)

    if(!display){
        return null
    }

    const handleUsernameChange = ({target}) => setUsername(target.value)
    const handlePasswordChange = ({target}) => setPassword(target.value)

    const toggleScreen = () => {
        setUsername('')
        setPassword('')
        toggle()
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const user = await getUser(username, password)
            window.localStorage.setItem('token', user.token)
            window.localStorage.setItem('name', user.name)
            status('success', `Login successful for user "${user.name}"`)
            toggleScreen()
        }catch(error){
            status('failure', error.response?.data || error.message)
        }
    }
   
    const togglePasswordDisplay = () => setDisplayPassword(!displayPassword)

    return (
        <form style={styles.formDisplay} onSubmit={handleSubmit}>
            <div style={{...styles.divDisplay, ...styles.margin}}>
                <label style={{...styles.elementDisplay, ...styles.margin}}>{'Username'}<label style={{...styles.required, ...styles.margin}}>{'*'}</label></label>
                <input style={styles.margin} value={username} onChange={handleUsernameChange}></input>
            </div>
            <br/>
            <div style={{...styles.divDisplay, ...styles.margin}}>
                <label style={{...styles.elementDisplay, ...styles.margin}}>{'Password'}<label style={{...styles.required, ...styles.margin}}>{'*'}</label></label>
                <input style={{...styles.elementDisplay, ...styles.margin}} value={password} onChange={handlePasswordChange} type={displayPassword? 'text': 'password'}></input>
                <input type='checkbox' style={styles.margin} value={displayPassword} onChange = {togglePasswordDisplay}></input>
                <label>{'Show Password'}</label>
            </div>
            <br/>
            <div style={{...styles.divDisplay, ...styles.margin}}>
                <button style={{...styles.elementDisplay, ...styles.margin}} type='submit'>{'Login'}</button>
                <button style={{...styles.elementDisplay, ...styles.margin}} onClick={toggleScreen} type='button'>{'Create User'}</button>
            </div>
        </form>
    )
}

export default Login