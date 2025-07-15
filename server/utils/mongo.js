import mongoose from 'mongoose'
import { MONGODB_URI } from './config.js'

console.log('connecting to mongoDB')

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('connected to mongoDB')
    })
    .catch((err) => {
        console.log('error occurred connecting to mongoDB: ', err.message)
    })

export {}