import { client } from './networkConfigs'

const whoamiQuery = `#graphql
  query WhoAmI {
    whoami {
      first_name
      last_name
      username
    }
  }
`

export const authGuard = async (navigate = true) => {
  let loggedin = false
  try {
    const { whoami } = await client<{ whoami: boolean }>(whoamiQuery)
    loggedin = whoami
  } catch (error) {}

  if (!loggedin && navigate) {
    window.location.replace('/login')
  }

  return loggedin
}
