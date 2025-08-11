/** server/controllers/_projectsController.js */

import express from 'express'
import { Project, User } from '#models'
import { error_log, info_log, uploadToS3 } from '#utils'
import * as mids from '#middlewares'

const projectsRouter = express.Router()

projectsRouter.get('/', mids.optionalAuthMiddleware, async (req, res) => {
    let projects
    info_log(req.user)
    if (req.user) {
        // User is logged in - show their projects
        projects = await Project.find({ user: req.user.id })
            .populate('user', { username: 1, name: 1 })
            .populate('tech', { name: 1, icon: 1 })
    } else {
        const defaultUser = await User.findOne({ username: 'dgim' }) // or whatever your default username is
        
        if (defaultUser) {
            projects = await Project.find({ user: defaultUser._id })
                .populate('user', { username: 1, name: 1 })
                .populate('tech', { name: 1, icon: 1 })
        } else {
            // Fallback: show all projects if default user not found
            projects = await Project.find({})
                .populate('user', { username: 1, name: 1 })
                .populate('tech', { name: 1, icon: 1 })
        }
    }

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

projectsRouter.post('/', mids.authMiddleware, mids.uploadSingleImage, mids.validateProject, async (req, res) => {
  const body = req.body
  const user = req.user 

  if (!req.file) {
    return res.status(400).json({ error: 'Image file is required' })
  }

  const { url } = await uploadToS3({
    file: req.file,
    title: body.title,
    userId: user.id,
  })

  body.imagePath = url

  const project = new Project(prepProject(body, user))
  const saved = await project.save()

  await User.findByIdAndUpdate(user.id, { $push: { projects: saved._id } })

  res.status(201).json(saved)
})

projectsRouter.put('/:id', mids.authMiddleware, mids.uploadSingleImage, mids.validateProject, async (req, res) => {
  const { id: projectId } = req.params
  const user = req.user
  const body = req.body

  const project = await Project.findOne({ _id: projectId, user: user.id })
  if (!project) {
    return res.status(403).json({ error: 'Not authorized to update this project' })
  }

  if (req.file) {
    const { url } = await uploadToS3({
      file: req.file,
      title: body.title,
      userId: user.id,
    })
    body.imagePath = url
  } else {
    body.imagePath = project.imagePath
  }

  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    { ...body },
    { new: true, runValidators: true }
  )

  return res.status(200).json(updatedProject)
})

projectsRouter.delete('/:id', mids.authMiddleware, async (req, res) => {
    const currentUserId = req.user.id
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({ error: 'No matching project found' })
    }

    if (currentUserId !== project.user.toString()) {
      return res.status(403).json({ error: 'Project not owned by the current user' })
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
    user: user._id,
})

export { projectsRouter }
