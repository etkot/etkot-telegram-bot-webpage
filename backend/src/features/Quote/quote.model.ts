import * as mongoose from 'mongoose'
import { Quote } from 'src/generated/graphql'

const quoteDBSchema = new mongoose.Schema<Quote>({
  quote: String,
  name: String,
})

export const QuoteDBModel = mongoose.model<Quote>('Quote', quoteDBSchema)
export type QuoteDBModel = mongoose.Document & Quote
