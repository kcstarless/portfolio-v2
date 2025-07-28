import { info, test_log } from "../utils/logger.js"

const validateProject = (req, res, next) => {
  const { body } = req
  // test_log('Validating body:', body)
  
  const requiredFields = [
    'title',
    'description', 
    'tech',
    'demoUrl',
    'githubUrl',
    'user'
  ]
  
  const missingFields = requiredFields.filter(field => 
    !body[field] || (typeof body[field] === 'string' && body[field].trim() === '')
  )
  
  const errors = []
  
  if (missingFields.length > 0) {
    errors.push(`Missing required fields: ${missingFields.join(', ')}`)
  }
  
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
  
  if (errors.length > 0) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors
    })
  }
  
  next()
}

const validateTech = (req, res, next) => {
  const { name, icon, level } = req.body

  if (!name || (typeof name === 'string' && name.trim() === '')) {
    return res.status(400).json({
      error: 'Validation failed',
      details: 'name is required'
    })
  }

  if (!icon) {
    return res.status(400).json({
      error: 'Validation failed',
      details: 'icon is required'
    })
  }

  if (!level) {
    return res.status(400).json({
      error: 'Validation failed',
      details: 'level is required'
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