import axios from 'axios'

const token = '20b177cf7981f4'

const getUserLocation = async () => {
    const response = await axios(`https://ipinfo.io/json?token=${token}`)
    const data = response.data
    const [latitude, longitude] = data.loc.split(',').map(Number);
    console.log(data)
    return {
        city: data.city,
        region: data.region,
        country: data.country,
        latitude,
        longitude
    };
}

export { getUserLocation }