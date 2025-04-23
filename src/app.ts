import express from 'express'
import cors from 'cors'
import booksRouter from './router/booksRouter'
import { errorHandler } from './middleware/errorHandler'
import ErrorHandler from './utils/ErrorHandler'

const app = express()
app.use(express.json())
app.use(cors())
app.use('/books', booksRouter)
app.use((_req, _res, next) => {
  next(new ErrorHandler('Route not found', 404))
})
app.use(errorHandler)

export default app
