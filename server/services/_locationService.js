import axios from 'axios'

const getLocationByIP = async (ip, token) => {
  if (ip) {
    const response = await axios(`https://ipinfo.io/${ip}?token=${token}`)
    return response.data
  } else {
    const response = await axios(`https://ipinfo.io/json?token=${token}`)
    return response.data
  }
}

export { getLocationByIP }