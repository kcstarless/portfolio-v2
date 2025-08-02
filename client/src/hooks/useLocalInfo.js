import { useEffect, useState } from "react"
import { useNotification } from '../contexts/NotificationContext'
import weatherService from "../services/weatherService"
import locationService from "../services/locationService"
import ticketmasterService from "../services/ticketmasterService"

export const useLocalInfo = () => {
  const [location, setLocation] = useState(null)
  const [weather, setWeather] = useState(null)
  const [events, setEvents] = useState(null)
  const [loading, setLoading] = useState(true)

  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)

  const { showNotification } = useNotification()

  useEffect(() => {
    if (location) return 
    const loadData = async () => {
      try {
        const loc = await locationService.getUserLocation()
        setLocation(loc)

        const [weatherData, eventsData] = await Promise.all([
          weatherService.getWeather(loc.latitude, loc.longitude),
          ticketmasterService.getLocalEvents(loc.latitude, loc.longitude),
        ])

        setWeather(weatherData)
        setEvents(eventsData)
      } catch (err) {
        showNotification('error', 'Failed to load location data.')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const combinedItems = location && weather && events
    ? [
        {
          id: "weather",
          name: `${location.city} - ${weather.currentConditions.temp}°C`,
          icon: weather.currentConditions.icon,
          isWeather: true,
        },
        ...events,
      ]
    : []

  useEffect(() => {
    if (combinedItems.length === 0) return

    const interval = setInterval(() => {
      if (!hovered) {
        setIndex((prev) => (prev + 1) % combinedItems.length)
      }
    }, 6000)

    return () => clearInterval(interval)
  }, [combinedItems.length, hovered])

  return {
    location,
    weather,
    events,
    combinedItems,
    currentItem: combinedItems[index],
    setHovered,
    isLoaded: !loading && location && weather && events.length > 0,
  }
}
