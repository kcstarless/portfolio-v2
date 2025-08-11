/** server/middleware/_morganMiddleware.js */

import morgan from 'morgan'

morgan.token('body', (req) => {
  return req.method === 'POST' || req.method === 'PUT'
    ? JSON.stringify(req.body)
    : '';
});

// Use morgan with the custom token
const requestLogger = morgan(
    ':method :url :status :res[content-length] - :response-time ms :body'
)

export { requestLogger } 