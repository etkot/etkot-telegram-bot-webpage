import { Router } from 'express'

export const LoginRouter = Router()

LoginRouter.use('/login', (req, res) => {
  console.log(req.params)

  res.json({ success: true })
})
