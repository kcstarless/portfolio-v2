import express from 'express'
import path from 'path'

const initRouter = express.Router()

initRouter.get('/ping', (req, res) => {
    res.status(200).send('pong')
})

// initRouter.get('/')

export { initRouter }