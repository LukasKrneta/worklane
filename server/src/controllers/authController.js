import { getAuthUserById, loginUser, registerUser } from '../services/authService.js'
import { authCookieOptions, TOKEN_COOKIE_NAME } from '../utils/jwt.js'

export const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body)

    res.status(201).json({ user })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { user, token } = await loginUser(req.body)

    res.cookie(TOKEN_COOKIE_NAME, token, authCookieOptions)
    res.status(200).json({ user, token })
  } catch (error) {
    next(error)
  }
}

export const me = async (req, res, next) => {
  try {
    const user = await getAuthUserById(req.user.id)

    res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
}
