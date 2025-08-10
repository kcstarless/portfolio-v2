import bcrypt from 'bcrypt'
import express from  'express'
import { User } from '#models'
import * as mids from '#middlewares'

const usersRouter = express.Router()

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('projects')
  res.json(users)
})

usersRouter.post('/', mids.validateUser, async (req, res) => {
    const { username, name, password } = req.body
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
})

export { usersRouter }