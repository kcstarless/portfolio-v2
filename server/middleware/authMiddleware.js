import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'
import { info_log, error_log } from '../utils/logger.js'

const authMiddleware = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Token missing or invalid' })
  }

  const token = authorization.substring(7)
  const decodedToken = jwt.verify(token, process.env.SECRET)  // throws if invalid

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if (!user) {
    return res.status(401).json({ error: 'User not found' })
  }

  req.user = user
  next()
}

const optionalAuthMiddleware = async (req, res, next) => {
    const authorization = req.get('authorization')
    
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            const token = authorization.substring(7)
            const decodedToken = jwt.verify(token, process.env.SECRET)
            
            if (!decodedToken.id) {
                return next() // No user, continue without auth
            }
            
            req.user = decodedToken // Add user info to request
        } catch (error) {
            // Invalid token, but continue without auth instead of rejecting
            req.user = null
        }
    }
    next()
}

export { authMiddleware, optionalAuthMiddleware }
