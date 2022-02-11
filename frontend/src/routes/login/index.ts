import { backendUrl } from '../../utils/backendUrl'
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

const onTelegramAuth = async (user: User) => {
  const res = await fetch(`${backendUrl}/api/login`, {
    method: 'POST',
    body: JSON.stringify(user),
  })

  console.log(await res.json())
}

window['onTelegramAuth'] = onTelegramAuth
