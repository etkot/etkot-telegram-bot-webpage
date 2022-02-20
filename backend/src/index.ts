require('dotenv-flow').config()
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as express from 'express'
import * as http from 'http'
import { IronSession } from 'iron-session'
import * as morgan from 'morgan'
import * as path from 'path'
import configuration from './configure'
import { ApiRouter } from './features/API'
import { AuthDBModel } from './features/Auth/auth.model'
import { authResolver } from './features/Auth/auth.resolver'
import Auth from './features/Auth/auth.service'
import { CreditDBModel } from './features/Credit/credit.model'
import { creditResolver } from './features/Credit/credit.resolver'
import Credit from './features/Credit/credit.service'
import { queryResolver } from './features/Query/query.resolver'
import { QuoteDBModel } from './features/Quote/quote.model'
import { quoteResolver } from './features/Quote/quote.resolver'
import Quotes from './features/Quote/quote.service'
import { Resolvers } from './generated/graphql'
import { useSession } from './middleware/ironSession'
import { CustomOrigin } from './types/customOrigin'
import initDatabase from './utils/database'

const whiteList = ['http://localhost:8000', 'http://127.0.0.1', configuration.CORS_ORIGIN]

const resolvers: Resolvers = {
  Query: queryResolver, // Top resolver
  Quote: quoteResolver,
  Auth: authResolver,
  CreditDoc: creditResolver,
}

const dataSources = () => ({
  /* @ts-ignore */ // TODO: Some really puzzling error here about mongoose type mismatch
  quotes: new Quotes(QuoteDBModel),
  /* @ts-ignore */ // TODO: Some really puzzling error here about mongoose type mismatch
  auth: new Auth(AuthDBModel),
  /* @ts-ignore */ // TODO: Some really puzzling error here about mongoose type mismatch
  credits: new Credit(CreditDBModel),
})

export type Context = {
  session: IronSession
  dataSources: ReturnType<typeof dataSources>
}

const origin: CustomOrigin = (origin, callback) => {
  if (whiteList.includes(origin) || !origin) {
    callback(null, true)
  } else {
    callback(new Error('Not allowed by CORS'))
  }
}

const corsOptions = { origin, credentials: true }

const runInit = async () => {
  const port = configuration.PORT || 3001
  await initDatabase()

  // load from a single schema file
  const typeDefs = await loadSchema(path.join(__dirname, 'schema.graphql'), {
    loaders: [new GraphQLFileLoader()],
  })

  const app = express()
  const httpServer = http.createServer(app)
  app.use(useSession)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mocks: configuration.NODE_ENV === 'development',
    mockEntireSchema: false,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground({}), ApolloServerPluginDrainHttpServer({ httpServer })],
    dataSources,
    context: ({ req }) => ({
      session: req.session,
    }),
  })

  await server.start()
  server.applyMiddleware({ app, cors: corsOptions })

  app.use(morgan('tiny'))
  app.use(bodyParser.json())
  app.use(cors(corsOptions))
  app.use(ApiRouter)

  httpServer.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  })
}

runInit()
