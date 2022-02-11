import { MongoDataSource } from 'apollo-datasource-mongodb'
import { Context } from 'src'
import { AuthDBModel } from './auth.model'

class Auth extends MongoDataSource<AuthDBModel, Context> {
  getCurrentUser = () => {
    if (!this.context.session.user) {
      return null
    }

    return this.model.findById(this.context.session.user._id).exec()
  }
}

export default Auth
