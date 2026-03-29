import jwt from 'jsonwebtoken'
import { env } from './env.js'

export const TOKEN_COOKIE_NAME = 'worklane_token'

export const authCookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: env.nodeEnv === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000,
}

export const generateAuthToken = (userId) => {
  return jwt.sign({ sub: userId }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  })
}

export const verifyAuthToken = (token) => {
  return jwt.verify(token, env.jwtSecret)
}
