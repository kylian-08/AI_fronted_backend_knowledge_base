import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const requiredDirs = [
  'src/data/styles',
  'src/data/components',
  'src/data/backend',
  'src/data/architecture',
]

let ok = true
for (const dir of requiredDirs) {
  const p = join(root, dir)
  if (!existsSync(p)) {
    console.error('MISSING:', dir)
    ok = false
  }
}

const registryFiles = [
  'src/data/styles/registry.ts',
  'src/data/components/registry.ts',
  'src/data/backend/registry.ts',
]

for (const f of registryFiles) {
  const p = join(root, f)
  if (!existsSync(p)) {
    console.error('MISSING:', f)
    ok = false
  } else {
    const content = readFileSync(p, 'utf-8')
    if (!content.includes('export const')) {
      console.error('INVALID export in', f)
      ok = false
    }
  }
}

if (ok) {
  console.log('validate-prompts: all registry files OK')
  process.exit(0)
} else {
  process.exit(1)
}
