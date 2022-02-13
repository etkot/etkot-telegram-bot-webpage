"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
require('dotenv-flow').config();
var graphql_file_loader_1 = require("@graphql-tools/graphql-file-loader");
var load_1 = require("@graphql-tools/load");
var apollo_server_core_1 = require("apollo-server-core");
var apollo_server_express_1 = require("apollo-server-express");
var bodyParser = require("body-parser");
var cors = require("cors");
var express = require("express");
var http = require("http");
var morgan = require("morgan");
var path = require("path");
var configure_1 = require("./configure");
var API_1 = require("./features/API");
var auth_model_1 = require("./features/Auth/auth.model");
var auth_resolver_1 = require("./features/Auth/auth.resolver");
var auth_service_1 = require("./features/Auth/auth.service");
var query_resolver_1 = require("./features/Query/query.resolver");
var quote_model_1 = require("./features/Quote/quote.model");
var quote_resolver_1 = require("./features/Quote/quote.resolver");
var quote_service_1 = require("./features/Quote/quote.service");
var ironSession_1 = require("./middleware/ironSession");
var database_1 = require("./utils/database");
var whiteList = ['localhost:8000', 'http://127.0.0.1'];
var resolvers = {
    Query: query_resolver_1.queryResolver,
    Quote: quote_resolver_1.quoteResolver,
    Auth: auth_resolver_1.authResolver
};
var dataSources = function () { return ({
    /* @ts-ignore */ // TODO: Some really puzzling error here about mongoose type mismatch
    quotes: new quote_service_1["default"](quote_model_1.QuoteDBModel),
    /* @ts-ignore */ // TODO: Some really puzzling error here about mongoose type mismatch
    auth: new auth_service_1["default"](auth_model_1.AuthDBModel)
}); };
var origin = function (origin, callback) {
    if (whiteList.includes(origin) || !origin) {
        callback(null, true);
    }
    else {
        callback(new Error('Not allowed by CORS'));
    }
};
var corsOptions = { origin: origin, credentials: true };
var runInit = function () { return __awaiter(void 0, void 0, void 0, function () {
    var port, typeDefs, app, httpServer, server;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                port = configure_1["default"].PORT || 3001;
                return [4 /*yield*/, (0, database_1["default"])()
                    // load from a single schema file
                ];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, load_1.loadSchema)(path.join(__dirname, 'schema.graphql'), {
                        loaders: [new graphql_file_loader_1.GraphQLFileLoader()]
                    })];
            case 2:
                typeDefs = _a.sent();
                app = express();
                httpServer = http.createServer(app);
                app.use(ironSession_1.useSession);
                server = new apollo_server_express_1.ApolloServer({
                    typeDefs: typeDefs,
                    resolvers: resolvers,
                    mocks: configure_1["default"].NODE_ENV === 'development',
                    mockEntireSchema: false,
                    plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)({}), (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer: httpServer })],
                    dataSources: dataSources,
                    context: function (_a) {
                        var req = _a.req;
                        return ({
                            session: req.session
                        });
                    }
                });
                return [4 /*yield*/, server.start()];
            case 3:
                _a.sent();
                server.applyMiddleware({ app: app, cors: corsOptions });
                app.use(morgan('tiny'));
                app.use(bodyParser.json());
                app.use(cors(corsOptions));
                app.use(API_1.ApiRouter);
                httpServer.listen({ port: port }, function () {
                    console.log("\uD83D\uDE80 Server ready at http://localhost:".concat(port).concat(server.graphqlPath));
                });
                return [2 /*return*/];
        }
    });
}); };
runInit();
