import { useState } from 'react'
import styles from '../styles.js'

const CreateCourse = ({toggleScreen, create}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [hours, setHours] = useState(0)
    const [url, setUrl] = useState('')
    const [validateUrl, setValidateUrl] = useState(false)

    const urlRegex = /^(https?:\/\/|www\.)[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/[^\s]*)?$/

    const changeTitle = ({target}) => setTitle(target.value)
    const changeAuthor = ({target}) => setAuthor(target.value)
    const changeHours = ({target}) => setHours(target.value)
    const changeUrl = ({target}) => {
        !(target.value && urlRegex.test(target.value)) ? setValidateUrl(true) : setValidateUrl(false)
        setUrl(target.value)
    }

    const createNew = async (e) => {
        e.preventDefault()
        if(!validateUrl){
            await create({title, author, hours, url})
        }
    }

    return (
        <form style={styles.formDisplay} onSubmit={createNew}>
            <div style={{...styles.divDisplay, ...styles.margin}}>
                <label style={{...styles.elementDisplay, ...styles.margin}}>{'Title'}<label style={{...styles.required, ...styles.margin}}>{'*'}</label></label>
                <input style={styles.margin} value={title} onChange={changeTitle}></input>
            </div>
            <br/>
            <div style={{...styles.divDisplay, ...styles.margin}}>
                <label style={{...styles.elementDisplay, ...styles.margin}}>{'Author'}</label>
                <input style={styles.margin} value={author} onChange={changeAuthor}></input>
            </div>
            <br/>
            <div style={{...styles.divDisplay, ...styles.margin}}>
                <label style={{...styles.elementDisplay, ...styles.margin}}>{'URL'}<label style={{...styles.required, ...styles.margin}}>{'*'}</label></label>
                <input style={{...styles.elementDisplay, ...styles.margin}} value={url} onChange={changeUrl}></input>
                {validateUrl ? <label style={{...styles.margin, ...styles.required}}>{'Enter valid URL'}</label> : null}
            </div>
            <br/>
            <div style={{...styles.divDisplay, ...styles.margin}}>
                <label style={{...styles.elementDisplay, ...styles.margin}}>{'Hours'}</label>
                <input type='number' style={styles.margin} value={hours} onChange={changeHours}></input>
            </div>
            <br/>
            <div style={{...styles.divDisplay, ...styles.margin}}>
                <button style={{...styles.elementDisplay, ...styles.margin}} type='submit'>Create</button>
                <button style={{...styles.elementDisplay, ...styles.margin}} onClick={toggleScreen} type='button'>Back</button>
            </div>
        </form>
    )
}

export default CreateCourse