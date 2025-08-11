/** server/controllers/_loginController.js */

import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import * as mids from '#middlewares'
import { User } from '#models'

const loginRouter = express.Router()

loginRouter.post('/', mids.validateLogin, async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        { expiresIn: 60 * 60 }
    )

    res
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user._id })
})

export { loginRouter }