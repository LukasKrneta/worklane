import cookieParser from 'cookie-parser'
import express from 'express'
import errorHandler from './middleware/errorHandler.js'
import notFound from './middleware/notFound.js'
import apiRouter from './routes/index.js'

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRouter)

app.use(notFound)
app.use(errorHandler)

export default app
