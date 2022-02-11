import { AuthResolvers } from 'src/generated/graphql'

export const authResolver: AuthResolvers = {
  _id: (parent, args, ctx, info) => parent._id,
  username: (parent, args, ctx, info) => parent.username,
  first_name: (parent, args, ctx, info) => parent.first_name,
  last_name: (parent, args, ctx, info) => parent.last_name,
  is_bot: (parent, args, ctx, info) => parent.is_bot,
}
