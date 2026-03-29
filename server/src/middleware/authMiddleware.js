import AppError from '../utils/AppError.js'
import { TOKEN_COOKIE_NAME, verifyAuthToken } from '../utils/jwt.js'

const extractToken = (req) => {
  const bearerToken = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.replace('Bearer ', '')
    : null

  return req.cookies[TOKEN_COOKIE_NAME] ?? bearerToken ?? null
}

const requireAuth = async (req, res, next) => {
  try {
    const token = extractToken(req)

    if (!token) {
      throw new AppError('Authentication required.', 401)
    }

    const payload = verifyAuthToken(token)

    req.user = { id: payload.sub }

    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      next(new AppError('Authentication required.', 401))
      return
    }

    next(error)
  }
}

export default requireAuth
