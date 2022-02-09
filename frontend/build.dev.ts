// esbuild --bundle --loader:.html=text --outDir www/ --watch src/

import { serve } from 'esbuild'

await serve(
  {
    servedir: 'public',
  },
  {
    entryPoints: ['./src/index.ts'],
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
