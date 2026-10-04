#!/usr/bin/env node
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const outDir = path.join(__dirname, '..', 'seed', 'b365-scraped')
const outFile = path.join(outDir, `b365-events-${Date.now()}.json`)

const USER_AGENT = 'Piața-Research/0.1 (+https://github.com/PRSro/CityWeb)'

async function main() {
  await fs.mkdir(outDir, { recursive: true })
  
  const result = {
    source: 'b365.ro',
    fetchedAt: new Date().toISOString(),
    status: 'skipped',
    reason: 'Safe mode: conceptual only. Requires manual review before enabling fetch.',
    items: [],
    notes: [
      'UNVERIFIED - not imported to DB',
      'Do not copy full descriptions/images',
      'Store only title/time/place/url',
      'Respect robots.txt and rate limits',
      'Check LEGAL-REVIEW before enabling actual scraping'
    ]
  }
  
  await fs.writeFile(outFile, JSON.stringify(result, null, 2))
  console.log('Wrote:', outFile)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
