import mongoose from 'mongoose'
import { getMongoUri} from './config.js'
import { info, error } from './logger.js'

info("connecting to mongo...")

mongoose
    .connect(getMongoUri())
    .then(() => {
        info('connected to mongoDB...')
    })
    .catch((err) => {
        error('error occurred connecting to mongoDB: ', err.message)
    })

export {}