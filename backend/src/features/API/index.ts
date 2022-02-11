import { Router } from 'express'
import { LoginRouter } from './Login'

export const ApiRouter = Router()

ApiRouter.use('/api', LoginRouter)
