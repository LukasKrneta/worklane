import { env } from '../utils/env.js'

const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode ?? 500
  const message = error.message ?? 'Internal server error.'
  const responseBody = { message }

  if (env.nodeEnv !== 'production' && error.stack) {
    responseBody.stack = error.stack
  }

  res.status(statusCode).json(responseBody)
}

export default errorHandler
