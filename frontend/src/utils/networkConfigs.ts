import { GraphQLClient } from 'graphql-request'

export const backendUrl = process.env.NODE_ENV === 'production' ? 'https://api.nipatiitti.com' : 'http://localhost:5000'

export const client = new GraphQLClient(`${backendUrl}/graphql`, {
  credentials: 'include',
})
