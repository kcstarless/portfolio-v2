import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import * as stores from 'stores'
import * as service from 'services'
import * as hooks from 'hooks'

export const useLocalInfo = () => {
  const dispatch = useDispatch()
  const [location, setLocation] = useState(null)
  const [weather, setWeather] = useState(null)
  const [events, setEvents] = useState(null)
  
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)

  const { showNotification } = hooks.useNotification()
  const currentUser = useSelector((state) => state.auth.user) || null

  const handleDemoLogin = async () => {
    try {
      const loggedInUser = await dispatch(stores.loginUser({ 
        username: 'demo', 
        password: 'DemoDemo8!' 
      })).unwrap()
      showNotification('info', `Welcome ${loggedInUser.name}!`)
    } catch (err) {
      showNotification('error', 'Demo login failed. Please try again.')
    }
  }

  useEffect(() => {
    if (location) return 
    const loadData = async () => {
      try {
        const loc = await service.location.getUserLocation()
        setLocation(loc)

        const [weatherData, eventsData] = await Promise.all([
          service.weather.getWeather(loc.latitude, loc.longitude),
          service.ticketmaster.getLocalEvents(loc.latitude, loc.longitude),
        ])
        // console.log(weatherData)
        setWeather(weatherData)
        setEvents(eventsData)
      } catch (err) {
        showNotification('error', 'Failed to load location data.')
      }
    }
    loadData()
  }, [])

  const createCombinedItems = () => {
    if (!location || !weather || !events) return []

    const items = []

    // Add weather item
    items.push({
      id: "weather",
      name: `${location.city} - ${weather.currentConditions.temp}°C`,
      icon: weather.currentConditions.icon,
      isWeather: true,
    })

    // Add demo login item for non-authenticated users
    if (!currentUser) {
      items.push({
        id: "demo",
        name: "You can login & try",
        isDemo: true,
        onClick: handleDemoLogin,
      })
    }

    if (currentUser?.username === 'demo') {
      items.push({
        id: "logout",
        name: "Please log out to view Dave's portfolio",
      })
    }

    // Add all events
    // items.push(...events)

    return items
  }

  const combinedItems = createCombinedItems()

  // Reset index if it's out of bounds when combinedItems changes
  // useEffect(() => {
  //   if (index >= combinedItems.length && combinedItems.length > 0) {
  //     setIndex(0)
  //   }
  // }, [combinedItems.length, index])

  useEffect(() => {
    if (combinedItems.length === 0) return
    const interval = setInterval(() => {
      if (!hovered) {
        setIndex((prev) => (prev + 1) % combinedItems.length)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [combinedItems.length, hovered, currentUser])

  return {
    location,
    weather,
    events,
    combinedItems,
    currentItem: combinedItems[index],
    setHovered,
    currentUser,
  }
}
