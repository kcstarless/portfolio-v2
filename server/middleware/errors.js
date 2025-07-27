import { error, info } from '../utils/logger.js'

const errorHandler = (err, req, res, next) => {
    error(err, 'utils/logger.js')

    // multer errors
    if (err.name === 'MulterError') {
      switch(err.code) {
        case 'LIMIT_FILE_SIZE':
          return res.status(400).json({ error: 'File too large. Max size is 5MB.' })
        case 'LIMIT_FILE_COUNT':
          return res.status(400).json({ error: 'File count limit exceeded.' })
        case 'LIMIT_UNEXPECTED_FILE':
          return res.status(400).json({ error: 'Unexpected file field.' })
        default:
          return res.status(400).json({ error: err.message })
      }
    }

    // mongoose errors
    if (
      err.name === 'CastError' ||
      err.name === 'ValidationError' ||
      err.name === 'MongoServerError'
    ) {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        return res.status(400).json({ error: 'duplicate/uniqness key error' })
      }

      if (err.name === 'CastError') {
        return res.status(400).json({ error: 'malformatted id' })
      }

      return res.status(400).json({ error: err.message })
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'token invalid' })
    }

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'token expired' })
    }
  
    // Unhandle errors
    error("Unhandled error stack:", err.stack)
    return res.status(500).json({ error: 'internal server error'})
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

export { errorHandler, unknownEndpoint }