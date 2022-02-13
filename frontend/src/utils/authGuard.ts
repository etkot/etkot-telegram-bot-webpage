import { gql } from 'graphql-request'
import { client } from './networkConfigs'

const whoamiQuery = gql`
  query WhoAmI {
    whoami {
      first_name
      last_name
      username
    }
  }
`

export const authGuard = async (navigate = true) => {
  const { whoami } = await client.request(whoamiQuery)

  if (!whoami && navigate) {
    window.location.replace('/login')
  }

  return whoami as boolean
}
