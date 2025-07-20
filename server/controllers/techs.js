import express from 'express'
import { Tech } from '../models/tech.js'
import { validateTech } from '../middleware/validations.js'

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

techsRouter.post('/', validateTech, async (req, res) => {
    const { name, iconUrl } = req.body
    
    const tech = new Tech({
        name,
        iconUrl,
    })

    const savedTech = await tech.save()
    res.status(201).json(savedTech)
})

export { techsRouter }