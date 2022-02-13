import * as crypto from 'crypto'
import { Router } from 'express'
import configuration from '../../../configure'
import { AuthDBModel } from '../../../features/Auth/auth.model'

export const LoginRouter = Router()

type TelegramLogin = {
  id: number
  first_name: string
  last_name: string
  username: string
  photo_url: string
  auth_date: number
  hash: string
}

LoginRouter.post('/login', async (req, res) => {
  console.log(req.session.user)
  const data = req.body as TelegramLogin

  const keys = Object.keys(data)
  keys.sort()

  const authData = []
  for (const key of keys) {
    if (key === 'hash') continue
    authData.push(`${key}=${data[key]}`)
  }

  const secret = crypto.createHash('sha256').update(configuration.TELEGRAM_SECRET).digest()
  const hash = crypto.createHmac('sha256', secret).update(authData.join('\n')).digest('hex')
  if (hash !== data.hash) {
    res.status(401).json({ error: 'Invalid hash' })
    return
  }

  const time = Math.round(Date.now() / 1000) // 1 hour
  const timeLimit = 86400 // 24 hours
  if (time - data.auth_date > timeLimit) {
    res.status(401).json({ error: 'Auth date is too old' })
    return
  }

  const user = await AuthDBModel.findById(data.id).exec()
  if (!user) {
    res.status(401).json({ error: 'User not found' })
    return
  }

  req.session.user = user
  await req.session.save()

  res.json({ success: true })
})
