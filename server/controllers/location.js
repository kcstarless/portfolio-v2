import express from 'express'
import axios from 'axios'

const locationsRouter = express.Router()

locationsRouter.get('/', async (req, res) => {
    const response = await axios.get('http://ip-api.com/json/')
    res.json(response.data) 
})

export { locationsRouter }