import express from 'express';
import { Project } from '../models/project.js'

const projectsRouter = express.Router()

projectsRouter.get('/', async (request, response) => {
    const projects = await Project.find({})
    response.status(200).json(projects)
})

projectsRouter.get('/:id', async (request, response) => {
    await Project.findById(request.params.id)
    response.status(204).end()
})

export { projectsRouter } 