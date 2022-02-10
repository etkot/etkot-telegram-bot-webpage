# Etkot telegram bot webpage

This is a web interface to the etkot telegram bot, that allows viewing stats etc.

## Frontend

The frontend is made purely with vanilla js. But because typescript is fun it has a minimal build step made with esbuild.

### Getting started:

- `cd frontend`
- `yarn install`
- `yarn dev`

## Backend

The backend uses a pretty complex setup of GraphQL, Apollo, TypeScript code gen
and mongoose models. (It's all just to get 100% typed code)

**OBS!** If you make changes to schema.graphql or other graphql definitions you need to run `yarn generate` to get the new types code.

You also need to have a instance of etkot bot mongoDB running and set the envs correcly for that.

Recommended VSCode extensions include:

- [GraphQL](https://marketplace.visualstudio.com/items?itemName=graphql-extension.graphql)

To get the extension going you need to make sure you have the graphql.config.json in vscode project root, or point to it in settings.

### Getting started:

- `cd backend`
- `yarn install`
- `yarn dev`

This will open a playground to test the graphql queries in `http://localhost:5000/graphql` (By default).
