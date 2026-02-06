import { execSync } from "child_process"
import * as fs from "fs"

const BUCKET = process.env.S3_BUCKET
const PR_NUMBER = process.env.PR_NUMBER
const ENDPOINT = process.env.S3_ENDPOINT
const endpointFlag = ENDPOINT ? `--endpoint-url ${ENDPOINT}` : ""

if (!BUCKET || !PR_NUMBER) {
  console.error("S3_BUCKET and PR_NUMBER environment variables are required")
  process.exit(1)
}

interface IndexEntry {
  pr: number
  branch: string
  author: string
  updatedAt: string
  summary: { total: number; pending: number; approved: number }
}

function fetchIndex(): IndexEntry[] {
  try {
    execSync(
      `aws s3 cp s3://${BUCKET}/metadata/index.json /tmp/visual-index.json ${endpointFlag} --quiet`,
      { stdio: "pipe" }
    )
    return JSON.parse(fs.readFileSync("/tmp/visual-index.json", "utf8"))
  } catch {
    return []
  }
}

function main(): void {
  const metadata = JSON.parse(
    fs.readFileSync(".lostpixel/metadata.json", "utf8")
  )

  const index = fetchIndex()
  const pr = parseInt(PR_NUMBER!, 10)

  // Update or add entry for this PR
  const existingIdx = index.findIndex((e) => e.pr === pr)
  const entry: IndexEntry = {
    pr,
    branch: metadata.branch,
    author: metadata.author,
    updatedAt: metadata.updatedAt,
    summary: {
      total: metadata.summary.total,
      pending: metadata.summary.pending,
      approved: metadata.summary.approved,
    },
  }

  if (existingIdx >= 0) {
    index[existingIdx] = entry
  } else {
    index.unshift(entry)
  }

  fs.writeFileSync("/tmp/visual-index.json", JSON.stringify(index, null, 2))
  execSync(
    `aws s3 cp /tmp/visual-index.json s3://${BUCKET}/metadata/index.json ${endpointFlag}`,
    { stdio: "inherit" }
  )

  console.log(`Updated dashboard index for PR #${pr}`)
}

main()
