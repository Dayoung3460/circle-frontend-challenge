import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config();

const rawUrl = process.env.DATABASE_URL!;
if (rawUrl.startsWith('file:')) {
  const relativePath = rawUrl.replace(/^file:/, '');
  const absolutePath = path.resolve(process.cwd(), relativePath);
  process.env.DATABASE_URL = `file:${absolutePath}`;
}

import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();


import express from 'express'
import booksRouter from './router/booksRouter'
import { errorHandler } from './middleware/errorHandler'
import ErrorHandler from './utils/ErrorHandler'
import cors from 'cors'

const app = express()
const port = 8000

app.use(express.json())
app.use(cors())

app.use('/books', booksRouter)

app.use((_req, _res, next) => {
    next(new ErrorHandler('Route not found', 404))
})

app.use(errorHandler)

app.listen(port, () => {
    console.log(`🚀 Example app listening at http://localhost:${port}`)
})

