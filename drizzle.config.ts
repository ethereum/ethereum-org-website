import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"

// Next's precedence: `.env.local` first; dotenv never overwrites a set variable
config({ path: ".env.local" })
config()

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  // Direct connection: the pooled app URL can't run migrations
  dbCredentials: { url: process.env.LEARNER_DB_MIGRATE_URL ?? "" },
})
