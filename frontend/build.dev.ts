// esbuild --bundle --loader:.html=text --outDir www/ --watch src/

import { serve } from 'esbuild'
import glob from 'glob'

const entryPoints = glob.sync('src/routes/**/*.ts')
console.log(entryPoints)

const server = await serve(
  {
    servedir: 'public',
    port: Number(process.env.PORT) || 8000,
  },
  {
    entryPoints,
    outdir: 'public',
    loader: {
      '.html': 'text',
    },
    format: 'esm',
    bundle: true,
    sourcemap: true,
    splitting: true,
    treeShaking: true,
  }
)

console.log(`Serving at http://${server.host}:${server.port}`)
