// esbuild --bundle --loader:.html=text --outDir www/ --watch src/

import { build } from 'esbuild'
import glob from 'glob'

const entryPoints = glob.sync('src/routes/**/*.ts')
console.log(entryPoints)

const start = Date.now()

const results = await build({
  entryPoints,
  outdir: 'public',
  loader: {
    '.html': 'text',
  },
  format: 'esm',
  bundle: true,
  sourcemap: false,
  minify: true,
  splitting: true,
  treeShaking: true,
  metafile: true,
})

const end = Date.now()
const duration = (end - start) / 1000 // in seconds

console.log(`Finished building frontend in ${duration}s ✨`)
