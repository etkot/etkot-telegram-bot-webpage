// esbuild --bundle --loader:.html=text --outDir www/ --watch src/

import { serve } from 'esbuild'

const res = await serve(
  {
    servedir: 'public',
  },
  {
    entryPoints: ['./src/index.ts', './src/index.css'],
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

console.log(`Serving at http://${res.host}:${res.port}`)
