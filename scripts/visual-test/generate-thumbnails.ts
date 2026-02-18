import * as fs from "fs"
import * as path from "path"

import sharp from "sharp"

const CURRENT_DIR = ".lostpixel/current"
const BASELINE_DIR = ".lostpixel/baseline"
const DIFF_DIR = ".lostpixel/difference"
const THUMBNAIL_DIR = ".lostpixel/thumbnails"
const THUMBNAIL_WIDTH = 300

const PR_NUMBER = process.env.PR_NUMBER

if (!PR_NUMBER) {
  console.error("PR_NUMBER environment variable is required")
  process.exit(1)
}

async function generateThumbnail(
  srcPath: string,
  destPath: string
): Promise<void> {
  if (!fs.existsSync(srcPath)) return

  fs.mkdirSync(path.dirname(destPath), { recursive: true })
  await sharp(srcPath).resize(THUMBNAIL_WIDTH).png().toFile(destPath)
}

function listPngs(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { recursive: true })
    .filter((f) => String(f).endsWith(".png"))
    .map((f) => String(f))
}

async function main(): Promise<void> {
  const currentFiles = listPngs(CURRENT_DIR)
  const diffFiles = listPngs(DIFF_DIR)
  const baselineFiles = listPngs(BASELINE_DIR)

  // All files that have diffs or are new
  const relevantFiles = new Set([...diffFiles, ...currentFiles])

  let count = 0
  for (const file of relevantFiles) {
    const promises: Promise<void>[] = []

    // Current thumbnail
    const currentSrc = path.join(CURRENT_DIR, file)
    if (fs.existsSync(currentSrc)) {
      promises.push(
        generateThumbnail(currentSrc, path.join(THUMBNAIL_DIR, "current", file))
      )
    }

    // Baseline thumbnail
    const baselineSrc = path.join(BASELINE_DIR, file)
    if (fs.existsSync(baselineSrc)) {
      promises.push(
        generateThumbnail(
          baselineSrc,
          path.join(THUMBNAIL_DIR, "baseline", file)
        )
      )
    }

    // Diff thumbnail
    const diffSrc = path.join(DIFF_DIR, file)
    if (fs.existsSync(diffSrc)) {
      promises.push(
        generateThumbnail(diffSrc, path.join(THUMBNAIL_DIR, "diff", file))
      )
    }

    await Promise.all(promises)
    count++
  }

  // Also generate thumbnails for removed files (in baseline but not current)
  for (const file of baselineFiles) {
    if (!currentFiles.includes(file)) {
      await generateThumbnail(
        path.join(BASELINE_DIR, file),
        path.join(THUMBNAIL_DIR, "baseline", file)
      )
      count++
    }
  }

  console.log(`Generated thumbnails for ${count} screenshots`)
}

main().catch((err) => {
  console.error("Thumbnail generation failed:", err)
  process.exit(1)
})
