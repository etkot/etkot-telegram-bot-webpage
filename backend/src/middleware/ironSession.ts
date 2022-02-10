import { ironSession } from 'iron-session/express'
import configuration from '../configure'

const session = ironSession({
  cookieName: 'etkot_telegrambot_auth',
  password: configuration.SESSION_SECRET,
  cookieOptions: {
    secure: configuration.NODE_ENV === 'production',
  },
})

export const useSession = (request: any, response: any, next: (err: any) => any): void => {
  session(request, response, next)
}
