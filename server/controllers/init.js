import express from 'express'
import axios from 'axios'
import * as helper from '../utils/helper.js'
import { info, test_log } from '../utils/logger.js'

const initRouter = express.Router()

initRouter.get('/ping', (req, res) => {
    res.status(200).send('pong')
})

// Extract users IP address to fetch accurate location data.
// This avoids CORS issues by proxying through the backend.
// NOTE: In development, client IP can't be resolved hence null clientIP,
// so fall back to server's public IP instead.
initRouter.get('/location', async (req, res) => {
  const clientIP = helper.getClientIP(req)
  // info(clientIP)
  let location

  if (clientIP) {
    location = await axios(`https://ipinfo.io/${clientIP}?token=${process.env.IPINFO_TOKEN}`)
  } else {
    location = await axios(`https://ipinfo.io/json?token=${process.env.IPINFO_TOKEN}`)
  }

  res.status(200).json(location.data)
})

export { initRouter }