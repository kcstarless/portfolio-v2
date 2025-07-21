import { error } from '../utils/logger.js'

const errorHandler = (err, req, res, next) => {
    error("ERROR NAME: ", err.name)
    error("ERROR CODE ", err.code)
    error("ERROR MESSAGE: ", err.message)

    switch(err.name) {
      case 'CastError': 
        return res.status(400).json({ error: 'malformatted id' })
      case 'ValidationError':
        return res.status(400).json({ error: err.message })
      case 'MongoServerError':
        if(err.code === 11000) {
          return res.status(400).json({ error: 'username must be unique' })
        }
        return res.status(400).json({ error: err.message })
      case 'JsonWebTokenError':
        return res.status(401).json({ error: 'token invalid' })
      case 'TokenExpiredError':
        return res.status(401).json({ error: 'token expired' })
      default: 
        error("Unhandled error stack:", err.stack)
        return res.status(500).json({ error: 'internal server error'})
    }
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

export { errorHandler, unknownEndpoint }