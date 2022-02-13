import { authGuard } from '../../utils/authGuard'
import { backendUrl } from '../../utils/networkConfigs'
import './index.css'

export type User = {
  auth_date: number
  first_name: string
  hash: string
  id: number
  last_name: string
  photo_url: string
  username: string
}

const loggedIn = authGuard(false)
if (loggedIn) {
  window.location.replace('/')
}

const onTelegramAuth = async (user: User) => {
  const res = await fetch(`${backendUrl}/api/login`, {
    method: 'POST',
    body: JSON.stringify(user),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const { success } = await res.json()

  if (success) {
    window.location.href = '/'
  }
}

window['onTelegramAuth'] = onTelegramAuth
