import { Router } from 'express'
import { login, me, register } from '../controllers/authController.js'
import requireAuth from '../middleware/authMiddleware.js'
import {
  validateLoginRequest,
  validateRegisterRequest,
} from '../validators/authValidators.js'

const authRouter = Router()

authRouter.post('/register', validateRegisterRequest, register)
authRouter.post('/login', validateLoginRequest, login)
authRouter.get('/me', requireAuth, me)

export default authRouter
