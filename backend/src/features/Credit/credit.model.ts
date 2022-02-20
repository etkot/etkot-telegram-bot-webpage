import * as mongoose from 'mongoose'
import { Credit, CreditDoc } from 'src/generated/graphql'

const creditDBSchema = new mongoose.Schema<Credit>({
  date: Number,
  from: String,
  msg: Number,
})

const creditDocDBSchema = new mongoose.Schema<CreditDoc>(
  {
    username: String,
    minus_credits: [creditDBSchema],
    plus_credits: [creditDBSchema],
  },
  {
    collection: 'credit',
  }
)

export const CreditDBModel = mongoose.model<CreditDoc>('Credit', creditDocDBSchema)
export type CreditDBModel = mongoose.Document & CreditDoc
