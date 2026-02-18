import { execSync } from "child_process"
import * as crypto from "crypto"
import * as fs from "fs"
import * as path from "path"

const BASELINE_DIR = ".lostpixel/baseline"
const CURRENT_DIR = ".lostpixel/current"
const DIFF_DIR = ".lostpixel/difference"
const OUTPUT = ".lostpixel/metadata.json"

interface Change {
  id: string
  story: string
  type: "added" | "changed" | "removed"
  status: "pending" | "approved"
  diffPercent: number | null
  screenshotHash: string | null
  baseline: string | null
  current: string | null
  diff: string | null
  approvedBy?: string
  approvedAt?: string
}

interface Metadata {
  pr: number
  branch: string
  snapshotCommit: string
  author: string
  createdAt: string
  updatedAt: string
  status: string
  summary: {
    total: number
    added: number
    changed: number
    removed: number
    pending: number
    approved: number
  }
  changes: Change[]
}

function listPngs(dir: string): Set<string> {
  if (!fs.existsSync(dir)) return new Set()
  return new Set(
    fs
      .readdirSync(dir, { recursive: true })
      .filter((f) => String(f).endsWith(".png"))
      .map((f) => String(f))
  )
}

function hashFile(filePath: string): string {
  const content = fs.readFileSync(filePath)
  return crypto.createHash("sha256").update(content).digest("hex")
}

function fetchExistingMetadata(pr: number): Metadata | null {
  const bucket = process.env.S3_BUCKET
  if (!bucket) return null

  const endpoint = process.env.S3_ENDPOINT
  const endpointFlag = endpoint ? `--endpoint-url ${endpoint}` : ""

  try {
    execSync(
      `aws s3 cp s3://${bucket}/metadata/${pr}.json /tmp/existing-metadata.json ${endpointFlag} --quiet`,
      { stdio: "pipe" }
    )
    return JSON.parse(fs.readFileSync("/tmp/existing-metadata.json", "utf8"))
  } catch {
    return null
  }
}

function generate(): void {
  const pr = parseInt(process.env.PR_NUMBER!, 10)
  const branch = process.env.BRANCH || ""
  const commit = process.env.COMMIT || ""
  const author = process.env.AUTHOR || ""

  const baselineFiles = listPngs(BASELINE_DIR)
  const currentFiles = listPngs(CURRENT_DIR)
  const diffFiles = listPngs(DIFF_DIR)

  // Fetch existing metadata to preserve approvals
  const existing = fetchExistingMetadata(pr)
  const existingApprovals = new Map<string, Change>()
  if (existing) {
    for (const c of existing.changes) {
      if (c.status === "approved") {
        existingApprovals.set(c.id, c)
      }
    }
  }

  const changes: Change[] = []

  // Changed: in both baseline and diff
  for (const file of diffFiles) {
    const id = file.replace(/\.png$/, "")
    const prev = existingApprovals.get(id)
    const currentHash = hashFile(path.join(CURRENT_DIR, file))

    // Carry forward approval if the screenshot content is identical to
    // what was previously approved (uses hash, not commit SHA)
    const carryForward = prev?.screenshotHash === currentHash

    changes.push({
      id,
      story: id,
      type: "changed",
      status: carryForward ? "approved" : "pending",
      diffPercent: null,
      screenshotHash: currentHash,
      baseline: `baselines/${file}`,
      current: `pending/${pr}/${file}`,
      diff: `diffs/${pr}/${file}`,
      ...(carryForward
        ? { approvedBy: prev.approvedBy, approvedAt: prev.approvedAt }
        : {}),
    })
  }

  // Added: in current but not baseline, and not in diff (purely new)
  for (const file of currentFiles) {
    if (!baselineFiles.has(file) && !diffFiles.has(file)) {
      const id = file.replace(/\.png$/, "")
      changes.push({
        id,
        story: id,
        type: "added",
        status: "pending",
        diffPercent: null,
        screenshotHash: hashFile(path.join(CURRENT_DIR, file)),
        baseline: null,
        current: `pending/${pr}/${file}`,
        diff: null,
      })
    }
  }

  // Removed: in baseline but not current
  for (const file of baselineFiles) {
    if (!currentFiles.has(file)) {
      const id = file.replace(/\.png$/, "")
      changes.push({
        id,
        story: id,
        type: "removed",
        status: "pending",
        diffPercent: null,
        screenshotHash: null,
        baseline: `baselines/${file}`,
        current: null,
        diff: null,
      })
    }
  }

  const approved = changes.filter((c) => c.status === "approved").length

  const metadata: Metadata = {
    pr,
    branch,
    snapshotCommit: commit,
    author,
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "pending_review",
    summary: {
      total: changes.length,
      added: changes.filter((c) => c.type === "added").length,
      changed: changes.filter((c) => c.type === "changed").length,
      removed: changes.filter((c) => c.type === "removed").length,
      pending: changes.length - approved,
      approved,
    },
    changes,
  }

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true })
  fs.writeFileSync(OUTPUT, JSON.stringify(metadata, null, 2))
  console.log(
    `Generated metadata: ${changes.length} changes (${metadata.summary.added} added, ${metadata.summary.changed} changed, ${metadata.summary.removed} removed)`
  )
}

generate()
