import mongoose from 'mongoose'
import { info_log, error_log, getMongoUri } from '#utils'

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