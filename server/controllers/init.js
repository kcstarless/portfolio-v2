import express from 'express'
import axios from 'axios'

const initRouter = express.Router()

initRouter.get('/ping', (req, res) => {
    res.status(200).send('pong')
})

initRouter.get('/location', async (req, res) => {
    // Extract users IP address to fetch accurate location data.
    // This avoids CORS issues by proxying through the backend.
    // NOTE: In development, client IP can't be resolved (will appear as localhost),
    // so fall back to server's public IP instead.
    let location
    
    if (process.env.NODE_ENV === 'development') {
      location = await axios(`https://ipinfo.io/json?token=${process.env.IPINFO_TOKEN}`)
    } else {
      const xForwardedFor = req.headers['x-forwarded-for']
      const clientIp = xForwardedFor
        ? xForwardedFor.split(',')[0].trim()
        : req.socket.remoteAddress
      location = await axios(`https://ipinfo.io/${clientIp}?token=${process.env.IPINFO_TOKEN}`)
    }
    res.status(200).json(location.data)
})

export { initRouter }