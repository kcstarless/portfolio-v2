import multer from 'multer'
import path from 'path'
import { error, info } from '../utils/logger.js'

const sanitizeFilename = (name) => 
  name.toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/project_images')
  },

  filename: (req, file, cb) => {
    const userId = req.user.id
    // info(req.body)
    if (!userId) {
      const err = new Error('Image file error: User ID is missing. Cannot save file.')
      err.name = 'MulterError'
      return cb(err, false)
    }

    if (!req.body.title) {
      const err = new Error('Image file error: Title is missing. Cannot save file.')
      err.name = 'MulterError'
      return cb(err, false)
    }
    
    const projectTitle = sanitizeFilename(req.body?.title)

    const ext = path.extname(file.originalname)
    const filename = `${userId}-${projectTitle}${ext}`
    cb(null, filename)
  },
})

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true) 
  } else {
    const err = new Error('Invalid file type. Only JPEG, PNG, SVG and GIF files are allowed.')
    err.name = 'MulterError'
    cb(err, false)
  }
}

const limits = { fileSize: 5 * 1024 * 1024 } // 5MB

const upload = multer({ storage, fileFilter, limits })

export const uploadSingleImage = upload.single('image')
