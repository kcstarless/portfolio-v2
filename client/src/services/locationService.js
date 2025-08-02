import axios from 'axios'

const baseUrl ='/api/init/location'

const getUserLocation = async () => {
    const response = await axios.get(baseUrl)
    console.log(response)
    const data = response.data
    const [latitude, longitude] = data.loc.split(',').map(Number) 
    console.log(data)

    return {
        city: data.city,
        region: data.region,
        country: data.country,
        latitude,
        longitude
    };
}

export default { getUserLocation }