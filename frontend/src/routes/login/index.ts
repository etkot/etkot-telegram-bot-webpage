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

const loggedIn = await authGuard(false)
if (loggedIn) {
  window.location.replace('/')
}

const script = document.createElement('script')
script.async = true
script.src = 'https://telegram.org/js/telegram-widget.js?15'
script.setAttribute('data-telegram-login', process.env.NODE_ENV === 'production' ? 'Etkot_bot' : 'etkot_test_bot')
script.setAttribute('data-size', 'large')
script.setAttribute('data-radius', '4')
script.setAttribute('data-onauth', 'onTelegramAuth(user)')

const container = document.getElementById('container')
container.appendChild(script)

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
