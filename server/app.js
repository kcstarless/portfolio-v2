/** /server/app.js */
import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import * as middlewares from '#middlewares'
import * as controllers from '#controllers'
import './utils/_mongo.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(express.static(join(__dirname, 'dist')))
app.use(express.json())
app.use(cors())
app.use(middlewares.requestLogger)

app.use('/api/init', controllers.initRouter)
app.use('/api/login', controllers.loginRouter)
app.use('/api/projects', controllers.projectsRouter)
app.use('/api/users', controllers.usersRouter)
app.use('/api/techs', controllers.techsRouter)

app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)

export { app }