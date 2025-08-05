import mongoose from 'mongoose'
import { getMongoUri} from './config.js'
import { info_log, error_log } from './logger.js'

// info_log("connecting to mongo...")

mongoose
    .connect(getMongoUri())
    .then(() => {
        info_log('connected to mongoDB...')
    })
    .catch((err) => {
        error_log('error occurred connecting to mongoDB: ', err.message)
    })

export {}