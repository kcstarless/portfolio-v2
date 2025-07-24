import express from 'express'
import { Project } from '../models/project.js'
import { User } from '../models/user.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { validateProject } from '../middleware/validations.js'
import { uploadSingleImage } from '../middleware/uploadMiddleware.js'
import { info } from '../utils/logger.js'

const projectsRouter = express.Router()

projectsRouter.get('/', async (req, res) => {
    const projects = await Project.find({})
      .populate('user', { username: 1, name: 1})
      .populate('tech', { name: 1, icon: 1})
    res.status(200).json(projects)
})

projectsRouter.get('/:id', async (req, res) => {
    const project = await Project.findById(req.params.id)
    
    if (project) {
      res.status(200).json(project)
    } else {
      res.status(404).json({ error: 'No matching project found' })
    }
})

projectsRouter.post('/', authMiddleware, uploadSingleImage, validateProject, async (req, res) => {
    const body = req.body
    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(400).json({ error: 'user missing or not valid' })
    }

    if (req.file) {
      body.imagePath = `/uploads/project_images/${req.file.filename}`
    } else {
      return res.status(400).json({ error: 'Image file is required' })
    }

    const project = new Project(prepProject(body, user))
    const saved = await project.save()
    user.projects = user.projects.concat(saved._id)
    await user.save()
    
    res.status(201).json(saved)
})

projectsRouter.delete('/:id', authMiddleware, async (req, res) => {
    const currentUserId = req.user.id
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({ error: 'project not found' })
    }

    if (currentUserId !== project.user.toString()) {
      return res.status(403).json({ error: 'project not owned by the current user'})
    }

    await Project.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

const prepProject = (body, user) => ({
        title: body.title,
        description: body.description,
        tech: body.tech,
        demoUrl: body.demoUrl,
        githubUrl: body.githubUrl,
        imagePath: body.imagePath,
        user: user._id
})

export { projectsRouter } 