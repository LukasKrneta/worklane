const isEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

const sendValidationError = (res, errors) => {
  res.status(400).json({
    message: 'Validation failed.',
    errors,
  })
}

export const validateRegisterRequest = (req, res, next) => {
  const { email, password, name } = req.body
  const errors = []

  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.push('Name is required.')
  }

  if (!email || typeof email !== 'string' || !isEmail(email.trim())) {
    errors.push('A valid email is required.')
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    errors.push('Password must be at least 8 characters long.')
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors)
  }

  next()
}

export const validateLoginRequest = (req, res, next) => {
  const { email, password } = req.body
  const errors = []

  if (!email || typeof email !== 'string' || !isEmail(email.trim())) {
    errors.push('A valid email is required.')
  }

  if (!password || typeof password !== 'string') {
    errors.push('Password is required.')
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors)
  }

  next()
}
