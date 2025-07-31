import axios from "axios";

const apiKey = '8Gnt3uJMoAbCGGWZvwJiqU68GxzJBUNZ';

// Format date to ISO 8601 (Ticketmaster requires full timestamp with 'Z')
const toISO = (date) => date.toISOString().split('.')[0] + 'Z';

const getApiUrl = (lat, lon) => {
  const startDate = new Date();
  const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days ahead

  const base = `https://app.ticketmaster.com/discovery/v2/events.json`;
  const params = new URLSearchParams({
    apikey: apiKey,
    latlong: `${lat},${lon}`,
    radius: 25,
    unit: "miles",
    startDateTime: toISO(startDate),
    endDateTime: toISO(endDate)
  });

  return `${base}?${params.toString()}`;
};

const getLocalEvents = async (lat, lon) => {
  const url = getApiUrl(lat, lon);
  const response = await axios.get(url)
  console.log(response)
  const events = response.data._embedded?.events || [];

  const seen = new Set();
  const uniqueEvents = events.filter(event => {
    const name = event.name;
    if (seen.has(name)) return false;
    seen.add(name);
    return true;
  });

  return uniqueEvents
}

export default { getLocalEvents };
