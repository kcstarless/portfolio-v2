import multer from 'multer'

const storage = multer.memoryStorage()

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