import axios from 'axios'

const getUserLocation = async () => {
    const response = await axios('http://ip-api.com/json/')
    const data = response.data
    console.log(data)
    return {
        city: data.city,
        region: data.region,
        country: data.country_name,
        latitude: data.lat,
        longitude: data.lon,
    };
}

export { getUserLocation }