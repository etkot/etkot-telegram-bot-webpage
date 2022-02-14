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
  const { whoami } = await client<{ whoami: boolean }>(whoamiQuery)

  if (!whoami && navigate) {
    window.location.replace('/login')
  }

  return whoami
}
