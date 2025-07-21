import jwt from 'jsonwebtoken'
import { info } from '../utils/logger.js'

const authMiddleware = async (req, res, next) => {
    const authorization = req.get('authorization')
    if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const token = authorization.substring(7)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    info("decodedToken: ", decodedToken)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }

    req.user = decodedToken // attach user info to req

    next()
}

export { authMiddleware }