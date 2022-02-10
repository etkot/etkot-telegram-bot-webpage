import * as mongoose from 'mongoose'
import configuration from '../configure'

const initDatabase = async () => {
  try {
    await mongoose.connect(`mongodb://${configuration.DB_HOST}:${configuration.DB_PORT}/${configuration.DB_NAME}`)
    console.log('Connected to database')
  } catch (error) {
    console.error('Error connecting to database', error)
  }
}

export default initDatabase
