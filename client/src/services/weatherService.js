import axios from 'axios'

const config = {
    unitGroup: 'metric', // or 'imperial'
    apiKey: 'RCFQPET5NKRMVHV5QZ3C67MEG',
    iconGroup: 'icons2'
}

const getApiUrl = (lat, lon) => {
    const { iconGroup, apiKey, unitGroup } = config;    
    return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=${apiKey}&iconSet=${iconGroup}&unitGroup=${unitGroup}`;
}

const getWeather = async (lat, lon) => {
    const url = getApiUrl(lat, lon) 
    const response = await axios.get(url)
    return response.data
}

export default { getWeather}