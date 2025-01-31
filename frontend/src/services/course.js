import axios from 'axios'

const baseUrl = '/api/courses'

const setHeaders = () => {
    return {
        headers: {
            Authorization: 'Bearer ' + (window.localStorage.getItem('token') || '')
        }
    }
}

const getCourses = async () => {
    const response = await axios.get(baseUrl, setHeaders())
    return response.data
}

const createCourse = async (course) => await axios.post(baseUrl, course, setHeaders())


const deleteCourse = async (id) => await axios.delete(`${baseUrl}/${id}`, setHeaders())

const updateCourse = async (id, data) => await axios.put(`${baseUrl}/${id}`, data, setHeaders())

const incrementLikes = async id => await axios.patch(`${baseUrl}/${id}`, null, setHeaders()) 

export {
    getCourses,
    createCourse,
    deleteCourse,
    updateCourse,
    incrementLikes
}