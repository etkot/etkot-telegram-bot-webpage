require('dotenv-flow').config()
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import * as cors from 'cors'
import * as express from 'express'
import * as http from 'http'
import { IronSession } from 'iron-session'
import * as morgan from 'morgan'
import * as path from 'path'
import configuration from './configure'
import { queryResolver } from './features/Query/query.resolver'
import { QuoteDBModel } from './features/Quote/quote.model'
import { quoteResolver } from './features/Quote/quote.resolver'
import Quotes from './features/Quote/quote.service'
import { Resolvers } from './generated/graphql'
import { useSession } from './middleware/ironSession'
import { CustomOrigin } from './types/customOrigin'
import initDatabase from './utils/database'

export type Context = {
  session: IronSession
  dataSources: {
    quotes: Quotes
  }
}

const whiteList = ['localhost:3000']

const origin: CustomOrigin = (origin, callback) => {
  if (whiteList.includes(origin) || !origin) {
    callback(null, true)
  } else {
    callback(new Error('Not allowed by CORS'))
  }
}

const runInit = async () => {
  const port = configuration.PORT || 3001
  await initDatabase()

  // load from a single schema file
  const typeDefs = await loadSchema(path.join(__dirname, 'schema.graphql'), {
    loaders: [new GraphQLFileLoader()],
  })

  const resolvers: Resolvers = {
    Query: queryResolver, // Top resolver
    Quote: quoteResolver,
  }

  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground({}), ApolloServerPluginDrainHttpServer({ httpServer })],
    dataSources: () => ({
      /* @ts-ignore */ // TODO: Some really puzzling error here about mongoose type mismatch
      quotes: new Quotes(QuoteDBModel),
    }),
    context: ({ req }) => ({
      session: req.session,
    }),
  })

  await server.start()
  server.applyMiddleware({ app })

  app.use(morgan('tiny'))
  app.use(useSession)
  app.use(cors({ origin }))

  httpServer.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  })
}

runInit()
