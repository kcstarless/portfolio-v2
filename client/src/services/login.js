import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    console.log('response', response.data)
    return response.data
}

const logout = () => {
    window.localStorage.removeItem('currentUser')
}

export default { login, logout }