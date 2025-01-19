import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/users'

const createUser = async (name, username, password) => {
    const response = await axios.post(baseUrl, {name, username, password})
    return response.data
}

export default createUser