import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { requestLogger } from './middleware/morgan.js'
import { projectsRouter } from './controllers/projects.js'
import { techsRouter } from './controllers/techs.js'
import { usersRouter } from './controllers/users.js'
import { loginRouter } from './controllers/login.js'
import { errorHandler, unknownEndpoint } from './middleware/errors.js'
import './utils/mongo.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(express.static(join(__dirname, 'dist')))
app.use(express.json())
app.use(cors())
app.use(requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/users', usersRouter)
app.use('/api/techs', techsRouter)
console.log('Access Key:', process.env.AWS_ACCESS_KEY_ID);
console.log('Secret Key:', process.env.AWS_SECRET_ACCESS_KEY);
console.log('Region:', process.env.AWS_REGION);
console.log('Endpoint:', process.env.AWS_ENDPOINT_URL_S3);

app.use(unknownEndpoint)
app.use(errorHandler)

export { app }