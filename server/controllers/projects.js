import express from 'express'
import path from 'path'

import { Project } from '../models/project.js'
import { User } from '../models/user.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { validateProject } from '../middleware/validations.js'
import { uploadSingleImage } from '../middleware/uploadMiddleware.js'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { s3 } from '../utils/s3.js'  // your S3 client setup

const projectsRouter = express.Router()

// Filename sanitizer for safe keys
const sanitizeFilename = (name) =>
  name.toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

projectsRouter.get('/', async (req, res) => {
  const projects = await Project.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('tech', { name: 1, icon: 1 })

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
    return res.status(400).json({ error: 'User missing or not valid' })
  }

  if (!req.file) {
    return res.status(400).json({ error: 'Image file is required' })
  }

  const ext = path.extname(req.file.originalname)
  const sanitizedTitle = sanitizeFilename(body.title || 'untitled')
  const key = `${req.user.id}-${sanitizedTitle}-${ext}`

  try {
    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'public-read',
    })

    await s3.send(command)

    // Save the public URL from Tigris (S3-compatible)
    body.imagePath = `https://${process.env.BUCKET_NAME}.t3.storageapi.dev/${key}`
  } catch (error) {
    console.error('Error uploading image:', error)
    return res.status(500).json({ error: 'Failed to upload image' })
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
