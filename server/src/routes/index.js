import { Router } from 'express'
import authRouter from './authRoutes.js'
import healthRouter from './healthRoutes.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/health', healthRouter)

export default router
