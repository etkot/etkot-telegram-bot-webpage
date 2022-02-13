import { ironSession } from 'iron-session/express'
import { Auth } from 'src/generated/graphql'
import configuration from '../configure'

const session = ironSession({
  cookieName: 'etkot_telegrambot_auth',
  password: configuration.SESSION_SECRET,
  cookieOptions: {
    secure: true,
    sameSite: 'none',
  },
})

declare module 'iron-session' {
  interface IronSessionData {
    user?: Auth
  }
}

export const useSession = (request: any, response: any, next: (err: any) => any): void => {
  session(request, response, next)
}
