import { env } from '../utils/env.js'

export const getHealth = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Worklane API is running.',
    environment: env.nodeEnv,
  })
}
