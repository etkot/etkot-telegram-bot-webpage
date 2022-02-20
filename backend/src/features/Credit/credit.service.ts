import { MongoDataSource } from 'apollo-datasource-mongodb'
import { Context } from 'src'
import { CreditDBModel } from './credit.model'

class Credit extends MongoDataSource<CreditDBModel, Context> {
  getAllCreditDocs = () => {
    if (!this.context.session.user) {
      return null
    }

    return this.model.find({}).exec()
  }
}

export default Credit
