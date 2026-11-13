import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import * as schema from "./schema"

/**
 * This deploy's database URL. On Netlify the build decides (see
 * `src/scripts/learner-db/prepare.ts`): off for branch deploys other than dev
 * and staging, and a preview's own `preview_<PR>` database. Locally, whatever
 * `.env.local` sets.
 */
const resolveUrl = () => {
  const url = process.env.LEARNER_DB_URL
  if (!url || process.env.LEARNER_DB_ENABLED === "false") return undefined
  const database = process.env.LEARNER_DB_NAME
  if (!database) return url
  const parsed = new URL(url)
  parsed.pathname = `/${database}`
  return parsed.toString()
}

const url = resolveUrl()

/** Without a learner database, accounts are off and progress stays in the browser */
export const hasLearnerDb = !!url

const connect = (connection: string) =>
  drizzle(
    // PgBouncer runs in transaction mode (no prepared statements), and the
    // non-production cluster has few connections to spare
    postgres(connection, { prepare: false, max: 1, idle_timeout: 20 }),
    { schema }
  )

let db: ReturnType<typeof connect> | undefined

/** Shared client, opened on first use */
export const getDb = () => {
  if (!url) throw new Error("No learner database for this deploy")
  return (db ??= connect(url))
}
