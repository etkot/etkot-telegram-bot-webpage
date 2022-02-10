import { QuoteResolvers } from 'src/generated/graphql'

export const quoteResolver: QuoteResolvers = {
  _id: (parent, args, ctx, info) => parent._id,
  quote: (parent, args, ctx, info) => parent.quote,
  name: (parent, args, ctx, info) => parent.name,
}
