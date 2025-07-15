import { info, error } from '../utils/logger.js'

const errorHandler = (err, request, response, next) => {

    if (err.name === 'CastError') {
        error('error: ', err.message)
        return response.status(400).json({ error: 'malformatted id' })
    }

    response.status(500).json({ error: 'internal server error'})
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

export { errorHandler, unknownEndpoint }