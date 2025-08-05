import { PutObjectCommand } from '@aws-sdk/client-s3'
import path from 'path'
import { s3 } from '../utils/s3.js'
import { error_log } from './logger.js'

const sanitizeFilename = (name) =>
  name.toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

export const uploadToS3 = async ({ file, title, userId }) => {
  const ext = path.extname(file.originalname)
  const sanitizedTitle = sanitizeFilename(title || 'untitled')
  const key = `${userId}-${sanitizedTitle}${ext}`

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  })

  try {
    await s3.send(command)
    const url = `https://${process.env.BUCKET_NAME}.t3.storageapi.dev/${key}`
    return { key, url }
  } catch (error) {
    error_log(error, 'uploadToS3.js')
    throw new Error('Failed to upload image')
  }
}
