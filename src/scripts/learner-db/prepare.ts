/**
 * Netlify build step, before `next build`: decides whether this deploy gets
 * the learner database, creates a PR preview's own database, and runs
 * migrations. The decision is written to `.netlify/learner-db.json`, which
 * `next.config.js` inlines so the runtime agrees with it.
 *
 *   production                     its database
 *   branch deploys dev, staging    their databases
 *   other branch deploys           none (they share dev's credentials)
 *   deploy previews                `preview_<PR>`, when the PR touches the
 *                                  learner code or has the `preview-db` label
 *   no LEARNER_DB_MIGRATE_URL      none, e.g. a fork PR's preview
 *
 * In previews LEARNER_DB_MIGRATE_URL is the provisioner, which owns every
 * preview database, so it stays build-only. The runtime logs in as the
 * preview's own `preview_<PR>_app` role, which can only use its database.
 * `.github/workflows/learner-db-previews.yml` drops both when the PR closes.
 */
import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import { mkdirSync, writeFileSync } from "node:fs"
import postgres from "postgres"

import { LEARNER_DB_CONNECTION, previewCredentials } from "../../lib/db"

const DATABASE_BRANCHES = ["dev", "staging"]
const PREVIEW_DB_LABEL = "preview-db"
const PREVIEW_DB_PATHS = [
  "app/[locale]/courses/",
  "app/api/account/",
  "app/api/auth/",
  "app/api/courses/",
  "drizzle.config.ts",
  "src/components/Account/",
  "src/components/Courses/",
  "src/data/courses/",
  "src/lib/auth/",
  "src/lib/courses/",
  "src/lib/db/",
  "src/scripts/learner-db/",
]
const OUTPUT = ".netlify/learner-db.json"

const { CONTEXT, BRANCH, REVIEW_ID, REPOSITORY_URL } = process.env
const migrateUrl = process.env.LEARNER_DB_MIGRATE_URL

const write = (enabled: boolean, database?: string) => {
  mkdirSync(".netlify", { recursive: true })
  writeFileSync(OUTPUT, JSON.stringify({ enabled, database: database ?? "" }))
  console.log(
    `[learner-db] ${enabled ? `enabled${database ? ` (${database})` : ""}` : "off"} for ${CONTEXT ?? "local"} ${BRANCH ?? ""}`
  )
}

const github = async <T>(path: string): Promise<T> => {
  const repo = REPOSITORY_URL?.replace(/^https:\/\/github\.com\//, "")
  const token = process.env.GITHUB_TOKEN_READ_ONLY
  const response = await fetch(`https://api.github.com/repos/${repo}${path}`, {
    headers: {
      accept: "application/vnd.github+json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  })
  if (!response.ok) throw new Error(`GitHub ${path}: ${response.status}`)
  return response.json() as Promise<T>
}

/** The PR touches learner code, or someone asked for a database by label */
const previewWantsDb = async (pr: string) => {
  const { labels } = await github<{ labels: { name: string }[] }>(
    `/pulls/${pr}`
  )
  if (labels.some(({ name }) => name === PREVIEW_DB_LABEL)) return true
  for (let page = 1; page <= 30; page++) {
    const files = await github<{ filename: string }[]>(
      `/pulls/${pr}/files?per_page=100&page=${page}`
    )
    if (
      files.some(({ filename }) =>
        PREVIEW_DB_PATHS.some((path) => filename.startsWith(path))
      )
    )
      return true
    if (files.length < 100) return false
  }
  return false
}

const withDatabase = (url: string, database: string) => {
  const parsed = new URL(url)
  parsed.pathname = `/${database}`
  return parsed.toString()
}

const runSql = async (url: string, statements: string[]) => {
  const client = postgres(url, {
    max: 1,
    onnotice: () => {},
    connection: LEARNER_DB_CONNECTION,
  })
  try {
    for (const statement of statements) await client.unsafe(statement)
  } finally {
    await client.end()
  }
}

/** Creates the preview's database and login, then migrates it */
const provisionPreview = async (adminUrl: string, database: string) => {
  const secret = process.env.LEARNER_PREVIEW_DB_SECRET
  // The runtime derives the login's password from it too
  if (!secret) throw new Error("LEARNER_PREVIEW_DB_SECRET is not set")
  const { user, password } = previewCredentials(database, secret)
  // Names are built from digits only and the password is hex: safe to interpolate
  const admin = postgres(adminUrl, { max: 1, onnotice: () => {} })
  try {
    const [role] = await admin`select 1 from pg_roles where rolname = ${user}`
    await admin.unsafe(
      `${role ? "alter" : "create"} role "${user}" login nocreatedb nocreaterole password '${password}'`
    )
    const [exists] =
      await admin`select 1 from pg_database where datname = ${database}`
    if (!exists) await admin.unsafe(`create database "${database}"`)
    await admin.unsafe(`revoke connect on database "${database}" from public`)
    await admin.unsafe(`grant connect on database "${database}" to "${user}"`)
  } finally {
    await admin.end()
  }

  const url = withDatabase(adminUrl, database)
  await runSql(url, [
    `alter default privileges in schema public grant select, insert, update, delete on tables to "${user}"`,
    `alter default privileges in schema public grant usage, select, update on sequences to "${user}"`,
  ])
  await runMigrations(url)
  // Default privileges skip tables that already existed, e.g. in a preview made before its login
  await runSql(url, [
    `grant usage on schema public to "${user}"`,
    `grant select, insert, update, delete on all tables in schema public to "${user}"`,
    `grant usage, select, update on all sequences in schema public to "${user}"`,
  ])
}

const runMigrations = async (url: string) => {
  const client = postgres(url, {
    max: 1,
    onnotice: () => {},
    connection: LEARNER_DB_CONNECTION,
  })
  try {
    await migrate(drizzle(client), {
      migrationsFolder: "src/lib/db/migrations",
    })
  } finally {
    await client.end()
  }
}

const main = async () => {
  if (!migrateUrl) return write(false)

  if (CONTEXT === "deploy-preview") {
    if (!REVIEW_ID || !/^\d+$/.test(REVIEW_ID)) return write(false)
    const wanted = await previewWantsDb(REVIEW_ID).catch((error) => {
      console.warn(`[learner-db] PR lookup failed, no database: ${error}`)
      return false
    })
    if (!wanted) return write(false)
    const database = `preview_${REVIEW_ID}`
    await provisionPreview(migrateUrl, database)
    return write(true, database)
  }

  if (CONTEXT === "branch-deploy" && !DATABASE_BRANCHES.includes(BRANCH ?? ""))
    return write(false)

  // Production, dev, staging, and local runs
  await runMigrations(migrateUrl)
  write(true)
}

main().catch((error) => {
  // A failed migration must stop the deploy: new code on an old schema breaks
  console.error("[learner-db]", error)
  process.exit(1)
})
