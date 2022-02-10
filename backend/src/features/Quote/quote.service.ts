import { MongoDataSource } from 'apollo-datasource-mongodb'
import { Context } from 'src'
import { QuoteDBModel } from './quote.model'

class Quotes extends MongoDataSource<QuoteDBModel, Context> {
  getAllQuotes = () => this.model.find({}).exec()
}

export default Quotes
