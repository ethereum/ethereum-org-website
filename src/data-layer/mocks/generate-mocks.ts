/**
 * Script to generate mock data files from storage for local development.
 *
 * This script pulls data from Netlify Blobs storage and saves it as JSON files
 * in the /data-layer/mocks directory. These mock files can be used for local
 * development without needing to connect to Netlify Blobs.
 *
 * Run with:
 * - npx dotenv-cli -e .env -- npx ts-node -r tsconfig-paths/register -O '{"module":"commonjs"}' src/data-layer/mocks/generate-mocks.ts
 */

import * as fs from "fs"
import * as path from "path"

import { getData } from "../storage/getter"

// Define all task IDs to avoid importing registry (which imports API files with path aliases)
const TASK_IDS = [
  "fetch-apps",
  "fetch-beaconchain-epoch",
  "fetch-beaconchain-ethstore",
  "fetch-blobscan-stats",
  "fetch-calendar-events",
  "fetch-community-picks",
  "fetch-ethereum-marketcap",
  "fetch-ethereum-stablecoins-mcap",
  "fetch-eth-price",
  "fetch-gfis",
  "fetch-git-history",
  "fetch-github-repo-data",
  "fetch-grow-the-pie",
  "fetch-grow-the-pie-blockspace",
  "fetch-grow-the-pie-master",
  "fetch-l2beat",
  "fetch-posts",
  "fetch-rss",
  "fetch-stablecoins-data",
  "fetch-total-eth-staked",
  "fetch-total-value-locked",
] as const

const MOCKS_DIR = __dirname

async function generateMocks() {
  console.log("=".repeat(60))
  console.log("Generating mock data files from storage")
  console.log("=".repeat(60))
  console.log("")

  // Ensure mocks directory exists
  if (!fs.existsSync(MOCKS_DIR)) {
    fs.mkdirSync(MOCKS_DIR, { recursive: true })
    console.log(`📁 Created mocks directory: ${MOCKS_DIR}`)
  }

  let successCount = 0
  let notFoundCount = 0
  const errors: Array<{ taskId: string; error: string }> = []

  console.log(`📦 Fetching data for ${TASK_IDS.length} tasks...\n`)

  for (const taskId of TASK_IDS) {
    try {
      console.log(`  Fetching: ${taskId}...`)
      const data = await getData(taskId)

      if (data === null) {
        console.log(`    ⚠️  No data found, skipping`)
        notFoundCount++
        continue
      }

      // Save data as JSON file
      const filePath = path.join(MOCKS_DIR, `${taskId}.json`)
      const jsonContent = JSON.stringify(data, null, 2)
      fs.writeFileSync(filePath, jsonContent, "utf-8")

      const fileSize = (jsonContent.length / 1024).toFixed(2)
      console.log(`    ✅ Saved (${fileSize} KB)`)
      successCount++
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      console.log(`    ❌ Error: ${errorMessage}`)
      errors.push({ taskId, error: errorMessage })
    }
  }

  // Generate index file
  const indexContent = `/**
 * Mock data files for local development.
 *
 * These files are generated from Netlify Blobs storage and can be used
 * for local development without needing to connect to Netlify Blobs.
 *
 * Generated: ${new Date().toISOString()}
 * Total files: ${successCount}
 */

export const mockTaskIds = ${JSON.stringify(
    TASK_IDS.filter((id) => {
      const filePath = path.join(MOCKS_DIR, `${id}.json`)
      return fs.existsSync(filePath)
    }),
    null,
    2
  )} as const

export type MockTaskId = (typeof mockTaskIds)[number]
`

  const indexPath = path.join(MOCKS_DIR, "index.ts")
  fs.writeFileSync(indexPath, indexContent, "utf-8")
  console.log(`\n📄 Generated index file: ${indexPath}`)

  // Generate README
  const readmeContent = `# Mock Data Files

These mock data files are generated from Netlify Blobs storage for local development.

## Usage

These files can be used to mock the data-layer storage in local development environments without needing to connect to Netlify Blobs.

## Generation

To regenerate these files, run:

\`\`\`bash
npx dotenv-cli -e .env -- npx ts-node -r tsconfig-paths/register -O '{"module":"commonjs"}' src/data-layer/mocks/generate-mocks.ts
\`\`\`

## Files

- \`index.ts\` - TypeScript index file with task ID exports
- \`*.json\` - Individual mock data files for each task

## Last Generated

${new Date().toISOString()}

## Statistics

- Total tasks: ${TASK_IDS.length}
- Successfully generated: ${successCount}
- Not found: ${notFoundCount}
${errors.length > 0 ? `- Errors: ${errors.length}` : ""}
`

  const readmePath = path.join(MOCKS_DIR, "README.md")
  fs.writeFileSync(readmePath, readmeContent, "utf-8")
  console.log(`📄 Generated README: ${readmePath}`)

  // Summary
  console.log("\n" + "=".repeat(60))
  console.log("Summary")
  console.log("=".repeat(60))
  console.log(`  ✅ Successfully generated: ${successCount} files`)
  console.log(`  ℹ️  Not found: ${notFoundCount} tasks`)
  if (errors.length > 0) {
    console.log(`  ❌ Errors: ${errors.length}`)
    console.log("\n  Error details:")
    errors.forEach(({ taskId, error }) => {
      console.log(`    - ${taskId}: ${error}`)
    })
  }
  console.log(`  📁 Output directory: ${MOCKS_DIR}`)
  console.log("")
  console.log("✅ Mock generation completed!")
}

// Run the script
generateMocks().catch((error) => {
  console.error("❌ Failed to generate mocks:", error)
  if (error instanceof Error) {
    console.error("  Error message:", error.message)
    console.error("  Stack:", error.stack)
  }
  process.exit(1)
})
