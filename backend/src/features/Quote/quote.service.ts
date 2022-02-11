import { MongoDataSource } from 'apollo-datasource-mongodb'
import { Context } from 'src'
import { QuoteDBModel } from './quote.model'

class Quotes extends MongoDataSource<QuoteDBModel, Context> {
  getAllQuotes = () => {
    if (!this.context.session.user) {
      return null
    }

    return this.model.find({}).exec()
  }
}

export default Quotes
