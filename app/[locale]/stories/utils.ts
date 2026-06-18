import { readdir } from "fs/promises"
import { join } from "path"

import { CONTENT_DIR } from "@/lib/constants"

const STORIES_DIR = join(process.cwd(), CONTENT_DIR, "stories")

export async function getStorySlugs(): Promise<string[]> {
  const entries = await readdir(STORIES_DIR, { withFileTypes: true })
  return entries.filter((e) => e.isDirectory()).map((e) => e.name)
}
