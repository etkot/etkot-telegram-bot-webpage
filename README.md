# Etkot telegram bot webpage

This is a web interface to the etkot telegram bot, that allows viewing stats etc.

## Frontend

The frontend is made purely with vanilla js. But because typescript is fun it has a minimal build step made with esbuild.

### Getting started:

- `cd frontend`
- `yarn install`
- `yarn dev`

If you just want to get it up and running I recommend the `yarn dev` command. But if you want to debug the telegram login system you need to use the `yarn sudo-dev` command.
This runs the last node command as root, so that we can bind to 127.0.0.1:80. Telegram Login iframe only works on locahost if it's on http://127.0.0.1:80 and ports under 1024
can only be binded with root. You also need to make sure you have node configured for the root user. ([Help here](https://stackoverflow.com/a/40078875/6378341))

About file structure; The `public` folder holds all .html files that aren't templates. .ts Files inside the `src/routes/` folder work as esbuild [entry points](https://esbuild.github.io/api/#entry-points) and will be outputted to `public/`.

To include .css files you need to import them in corresponding .ts files and .html files. .html files imported inside .ts files will be compiled to string (Usefull for defining templates for components).

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
