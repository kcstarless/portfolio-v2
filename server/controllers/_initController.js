/** server/controllers/_initController.js */

import express from 'express'
import * as services from '#services'
import { info_log, test_log, getClientIP,  } from '#utils'

const initRouter = express.Router()

initRouter.get('/ping', (req, res) => {
    res.status(200).send('pong')
})

// Extract users IP address to fetch accurate location data.
// This avoids CORS issues by proxying through the backend.
// NOTE: In development, client IP can't be resolved hence null clientIP,
// so fall back to server's public IP instead.
initRouter.get('/location', async (req, res) => {
    const clientIP = getClientIP(req)
    const location = await services.getLocationByIP(clientIP, process.env.IPINFO_TOKEN)
    res.status(200).json(location)
})

initRouter.get('/events', async (req, res) => {
    const { lat, lon } = req.query
    
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' })
    }

    const events = await services.fetchEvents(lat, lon) 
    res.status(200).json(events)
})

export { initRouter }