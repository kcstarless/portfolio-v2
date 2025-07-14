const morgan = require('morgan')

morgan.token('body', (req) => {
  return req.method === 'POST' || req.method === 'PUT'
    ? JSON.stringify(req.body)
    : '';
});

// Use morgan with the custom token
const requestLogger = morgan(
    ':method :url :status :res[content-length] - :response-time ms :body'
)

module.exports = requestLogger