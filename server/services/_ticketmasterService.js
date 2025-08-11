/** server/services/_ticketmasterService.js */

import axios from 'axios'
import { info_log } from '#utils'

const apiKey = process.env.TICKETMASTER_API_KEY


const toISO = (date) => date.toISOString().split('.')[0] + 'Z'

const getApiUrl = (lat, lon) => {
  const startDate = new Date()
  const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days ahead

  const base = `https://app.ticketmaster.com/discovery/v2/events.json`

  const params = new URLSearchParams({
    apikey: apiKey,
    latlong: `${lat},${lon}`,
    radius: 25,
    unit: "miles",
    startDateTime: toISO(startDate),
    endDateTime: toISO(endDate)
  }) // ticketmaster limits to 20 events per request

  return `${base}?${params.toString()}`
};

const filterData = (events) => {
  const seenWordsSets = []

  return events.filter(event => {
    if (!event.url) return false
    
    const words = event.name.toLowerCase().split(/\W+/)  // split by non-word chars

    // Check if words overlap with any previously seen set
    const isDuplicate = seenWordsSets.some(seenSet =>
      words.some(word => seenSet.has(word))
    )

    if (isDuplicate) return false

    // Add this event's words set to seenWordsSets
    seenWordsSets.push(new Set(words))

    return true
  })
}

const fetchEvents = async (lat, lon) => {
  info_log(apiKey)
  const url = getApiUrl(lat, lon)
  
  const response = await axios.get(url)
  const events = response.data._embedded?.events || []

  return filterData(events)
}

export { fetchEvents }
