import { Context } from 'src'
import { QueryResolvers } from 'src/generated/graphql'

export const queryResolver: QueryResolvers<Context> = {
  getAllQuotes: (parent, args, { dataSources }, info) => dataSources.quotes.getAllQuotes(),
  whoami: (parent, args, { dataSources }, info) => dataSources.auth.getCurrentUser(),
}
