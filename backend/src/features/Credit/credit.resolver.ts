import { CreditDocResolvers } from 'src/generated/graphql'

export const creditResolver: CreditDocResolvers = {
  _id: (creditDoc) => creditDoc._id.toString(),
  username: (creditDoc) => creditDoc.username,
  minus_credits: (creditDoc) => creditDoc.minus_credits,
  plus_credits: (creditDoc) => creditDoc.plus_credits,
}
