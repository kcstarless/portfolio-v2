import express from 'express'
import axios from 'axios'

const initRouter = express.Router()

initRouter.get('/ping', (req, res) => {
    res.status(200).send('pong')
})

initRouter.get('/location', async (req, res) => {
    const location = await axios(`https://ipinfo.io/json?token=${process.env.IPINFO_TOKEN}`)
    res.status(200).json(location.data)
})

// initRouter.get('/')

export { initRouter }