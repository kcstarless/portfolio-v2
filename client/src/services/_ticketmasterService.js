import axios from "axios"

const baseUrl = '/api/init/events'

const getLocalEvents = async (lat, lon) => {
  const response = await axios.get(`${baseUrl}?lat=${lat}&lon=${lon}`)
  return response.data
}

export default { getLocalEvents }
