import axios from 'axios'

const baseUrl ='/api/init/location'

const getUserLocation = async () => {
    console.log('requesting location fetch...')
    const response = await axios.get(baseUrl)
    const data = response.data
    const [latitude, longitude] = data.loc.split(',').map(Number) 

    return {
        city: data.city,
        region: data.region,
        country: data.country,
        latitude,
        longitude
    };
}

export default { getUserLocation }