import {useState} from 'react'
import createUser from '../services/user.js'
import styles from '../styles.js'

const CreateUser = ({toggleDisplay, showStatus}) => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [displayPassword, setDisplayPassword] = useState(false)

    const handleNameChange = ({target}) => setName(target.value)
    const handleUsernameChange = ({target}) => setUsername(target.value)
    const handlePasswordChange = ({target}) => setPassword(target.value)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await createUser(name, username, password)
            showStatus('success', `Created user ${name}`)
            setUsername('')
            setPassword()
            toggleDisplay()
        }catch(error){
            showStatus('failure', error.response?.data || error.message)
        }
    }

    const togglePasswordDisplay = () => setDisplayPassword(!displayPassword)


    return (
        <form style={styles.formDisplay} onSubmit={handleSubmit}>
            <div style={{...styles.divDisplay, ...styles.margin}}>
                <label style={{...styles.elementDisplay, ...styles.margin}}>{'Name'}<label style={{...styles.required, ...styles.margin}}>{'*'}</label></label>
                <input style={styles.margin} value={name} onChange={handleNameChange}></input>
            </div>
            <br/>
            <div style={{...styles.divDisplay, ...styles.margin}}>
                <label style={{...styles.elementDisplay, ...styles.margin}}>{'Username'}<label style={{...styles.required, ...styles.margin}}>{'*'}</label></label>
                <input style={styles.margin} value={username} onChange={handleUsernameChange}></input>
            </div>
            <br/>
            <div style={{...styles.divDisplay, ...styles.margin}}>
                <label style={{...styles.elementDisplay, ...styles.margin}}>{'Password'}<label style={{...styles.required, ...styles.margin}}>{'*'}</label></label>
                <input style={{...styles.elementDisplay, ...styles.margin}} value={password} onChange={handlePasswordChange} type={displayPassword? 'text': 'password'}></input>
                <input type='checkbox' style={styles.margin} value={displayPassword} onChange = {togglePasswordDisplay}></input>
                <label style={styles.margin}>{'Show Password'}</label>
            </div>
            <br/>
            <div style={{...styles.divDisplay, ...styles.margin}}>
                <button style={{...styles.elementDisplay, ...styles.margin}} type='submit'>Create</button>
                <button style={{...styles.elementDisplay, ...styles.margin}} onClick={() => toggleDisplay()} type='button'>Cancel</button>
            </div>
        </form>
    )
}

export default CreateUser