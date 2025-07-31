import express from 'express'
import { Tech } from '../models/tech.js'
import { validateTech } from '../middleware/validations.js'
import { User } from '../models/user.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const techsRouter = express.Router()

techsRouter.get('/', async (req, res) => {
    const techs = await Tech.find({})
    res.status(200).json(techs)
})

techsRouter.get('/:id', async (req, res) => {
    const tech = await Tech.findById(req.params.id)
    if (tech) {
        res.status(200).json(tech)
    } else {
        res.status(404).json({ error: 'No matching technology found' })
    }
})

techsRouter.post('/', authMiddleware, validateTech, async (req, res) => {
    const { name, icon, level, comments } = req.body
    const user = await User.findById(req.user.id)

    if (!user) {
        return res.status(400).json({ error: 'user missing or not valid' })
    }
    
    const tech = new Tech({
        name,
        icon,
        level,
        comments,
    })

    const savedTech = await tech.save()
    res.status(201).json(savedTech)
})

techsRouter.delete('/:id', authMiddleware, async (req, res) => {
    const tech = await Tech.findById(req.params.id)

    if (!tech) {
        return res.status(404).json({ error: 'No matching technology found' })
    }
    
    await Tech.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

export { techsRouter }