import { drizzle } from "drizzle-orm/postgres-js"
import { createHmac } from "node:crypto"
import postgres from "postgres"

import * as schema from "./schema"

/**
 * A PR preview's own login. Netlify env vars can't differ per PR, so the build
 * and the runtime both derive the password from the shared secret.
 */
export const previewCredentials = (database: string, secret: string) => {
  const user = `${database}_app`
  const password = createHmac("sha256", secret).update(user).digest("hex")
  return { user, password }
}

/**
 * This deploy's database URL. On Netlify the build decides (see
 * `src/scripts/learner-db/prepare.ts`): off for branch deploys other than dev
 * and staging, and a preview's own `preview_<PR>` database and login.
 * Locally, whatever `.env.local` sets.
 */
const resolveUrl = () => {
  const url = process.env.LEARNER_DB_URL
  if (!url || process.env.LEARNER_DB_ENABLED === "false") return undefined
  const database = process.env.LEARNER_DB_NAME
  if (!database) return url
  const secret = process.env.LEARNER_PREVIEW_DB_SECRET
  if (!secret) return undefined
  const { user, password } = previewCredentials(database, secret)
  const parsed = new URL(url)
  parsed.username = user
  parsed.password = password
  parsed.pathname = `/${database}`
  return parsed.toString()
}

const url = resolveUrl()

/** Without a learner database, accounts are off and progress stays in the browser */
export const hasLearnerDb = !!url

/**
 * Session settings for every connection, the app's and migrations'. Columns
 * are `timestamp without time zone` and Drizzle reads them as UTC, so
 * `defaultNow()` must write UTC too, whatever the server's default zone.
 */
export const LEARNER_DB_CONNECTION = { TimeZone: "UTC" }

const connect = (connection: string) =>
  drizzle(
    // PgBouncer runs in transaction mode (no prepared statements), and the
    // non-production cluster has few connections to spare
    postgres(connection, {
      prepare: false,
      max: 1,
      idle_timeout: 20,
      connection: LEARNER_DB_CONNECTION,
    }),
    { schema }
  )

let db: ReturnType<typeof connect> | undefined

/** Shared client, opened on first use */
export const getDb = () => {
  if (!url) throw new Error("No learner database for this deploy")
  return (db ??= connect(url))
}
