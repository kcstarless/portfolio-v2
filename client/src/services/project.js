import axios from 'axios'

const baseUrl = '/api/projects'

const getAll = () => {
    // console.log('fetching data...')
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { getAll }