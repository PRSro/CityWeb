import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  Users,
  Places,
  Events,
  Persons,
  Businesses,
  JobAds,
  TrafficDisruptions,
  Polls,
  CheckIns,
  Neighborhoods,
  Connections,
} from './src/collections/index.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  editor: lexicalEditor(),
  collections: [
    Users,
    Places,
    Events,
    Persons,
    Businesses,
    JobAds,
    TrafficDisruptions,
    Polls,
    CheckIns,
    Neighborhoods,
    Connections,
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
