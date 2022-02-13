// esbuild --bundle --loader:.html=text --outDir www/ --watch src/

import { build } from 'esbuild'
import * as fs from 'fs'
import glob from 'glob'

const entryPoints = glob.sync('src/routes/**/*.ts')
console.log(entryPoints)

const start = Date.now()
const metafileOut = process.env.OUTPUT || 'metafile.json'

const results = await build({
  entryPoints,
  outdir: 'public',
  loader: {
    '.html': 'text',
  },
  format: 'esm',
  bundle: true,
  sourcemap: true,
  minify: true,
  splitting: true,
  treeShaking: true,
  metafile: true,
  write: false,
})

const end = Date.now()
const duration = (end - start) / 1000 // in seconds

console.log(`Finished analyzing frontend in ${duration}s ✨`)
console.log(
  `Writing metafile of frontend to ${metafileOut}s. You can analyze it e.g. with https://www.bundle-buddy.com/esbuild`
)

fs.writeFileSync(metafileOut, JSON.stringify(results.metafile, null, 2))
