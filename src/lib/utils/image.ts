import fs from "fs"
import path from "path"

import { DEPLOY_URL } from "@/lib/constants"

/**
 * Load image buffer from local filesystem or CDN fallback.
 */
export async function loadImageBuffer(
  publicPath: string
): Promise<Buffer | null> {
  const normalizedPath = publicPath.replace(/^\//, "")
  const localPath = path.join("public", normalizedPath)

  if (fs.existsSync(localPath)) {
    try {
      return fs.readFileSync(localPath)
    } catch {
      // Fall through to CDN
    }
  }

  try {
    const res = await fetch(`${DEPLOY_URL}/${normalizedPath}`)
    if (!res.ok) return null
    return Buffer.from(await res.arrayBuffer())
  } catch {
    return null
  }
}
