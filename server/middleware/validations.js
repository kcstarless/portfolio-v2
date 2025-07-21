import { info } from "../utils/logger.js"

const validateProject = (req, res, next) => {
  const { body } = req
  info('Validating body:', body)
  
  // Required string fields
  const requiredFields = [
    'projectNo',
    'title',
    'description', 
    'tech',
    'demoUrl',
    'githubUrl',
    'imageUrl',
    'difficulty',
    'user'
  ]
  

  // Check for missing or empty fields
  const missingFields = requiredFields.filter(field => 
    !body[field] || (typeof body[field] === 'string' && body[field].trim() === '')
  )
  
  // Collect all validation errors
  const errors = []
  
  if (missingFields.length > 0) {
    errors.push(`Missing required fields: ${missingFields.join(', ')}`)
  }

  // Validate difficulty either easy, medium or hard
  if (body.difficulty && !['easy', 'medium', 'hard'].includes(body.difficulty)) {
     errors.push('difficulty must be easy, medium or hard')
  }
  
  // Validate projectNo is a positive number
  if (body.projectNo && ((!Number.isInteger(Number(body.projectNo)) || Number(body.projectNo) <= 0))) {
    errors.push('projectNo must be a positive integer')
  }
  
  // Validate URLs
  const urlFields = ['demoUrl', 'githubUrl']
  for (const field of urlFields) {
    if (body[field]) { // Only validate if field exists
      try {
        new URL(body[field])
      } catch {
        errors.push(`${field} must be a valid URL`)
      }
    }
  }
  
  // Return all errors at once
  if (errors.length > 0) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors
    })
  }
  
  next()
}

const validateTech = (req, res, next) => {
  const { name, iconUrl } = req.body

  if (!name || (typeof name === 'string' && name.trim() === '')) {
    return res.status(400).json({
      error: 'Validation failed',
      details: 'Name is required'
    })
  }

  if (!iconUrl) {
    return res.status(400).json({
      error: 'Validation failed',
      details: 'IconUrl is required'
    })
  }

  next()
}

const validateUser = (req, res, next) => {
  const { username, name, password } = req.body

  if (!username || (typeof username === 'string' && username.trim() === '')) {
    return res.status(400).json({
      error: 'Validation failed',
      details: 'Username is required'
    })
  }

  if (username && username.length < 4) {
    return res.status(400).json({
      error: 'Validation failed',
      details: 'Usernmae must be at least 4 characters long'
    })
  } 

  if (!password || password.length < 8) {
    return res.status(400).json({
      error: 'Validation failed',
      details: 'Password must be at least 8 characters long',
    });
  }

  const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*~`]).{8,}$/;
  if (!strongPasswordRegex.test(password)) {
    return res.status(400).json({
      error: 'Validation failed',
      details: 'Password must include at least one uppercase letter, one number, and one special character',
    });
  }

  next()
}

export { validateProject, validateTech, validateUser }