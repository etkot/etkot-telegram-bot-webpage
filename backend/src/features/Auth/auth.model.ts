import * as mongoose from 'mongoose'
import { Auth } from 'src/generated/graphql'

const authDBSchema = new mongoose.Schema<Auth>(
  {
    _id: Number,
    username: String,
    first_name: String,
    last_name: String,
    is_bot: Boolean,
  },
  { collection: 'auth' }
)

export const AuthDBModel = mongoose.model<Auth>('Auth', authDBSchema)
export type AuthDBModel = mongoose.Document & Auth
