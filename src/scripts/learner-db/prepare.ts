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
 * Drop a preview's database with `.github/workflows/learner-db-previews.yml`.
 */
import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import { mkdirSync, writeFileSync } from "node:fs"
import postgres from "postgres"

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

const runMigrations = async (url: string) => {
  const client = postgres(url, { max: 1, onnotice: () => {} })
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
    const admin = postgres(migrateUrl, { max: 1, onnotice: () => {} })
    try {
      const [exists] =
        await admin`select 1 from pg_database where datname = ${database}`
      // Identifier from digits only, so safe to interpolate
      if (!exists) await admin.unsafe(`create database "${database}"`)
    } finally {
      await admin.end()
    }
    await runMigrations(withDatabase(migrateUrl, database))
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
