import path from "node:path"
import { fileURLToPath } from "node:url"

import rehypeImg from "@/lib/md/rehypeImg"

/**
 * Adapter for our existing rehypeImg plugin. Fumadocs MDX calls plugins
 * with global config — the upstream plugin needs per-file `dir`, `srcPath`,
 * `locale`. We derive them from the vfile path inside the transformer.
 *
 * PoC: locale is hardcoded to "en" (only English content is wired).
 */
const rehypeImgForFumadocs = () => {
  return async (tree: unknown, file: { path?: string; cwd?: string }) => {
    const absPath = file.path
      ? file.path.startsWith("file:")
        ? fileURLToPath(file.path)
        : file.path
      : ""
    const cwd = file.cwd ?? process.cwd()
    // absPath: <cwd>/public/content/developers/tutorials/<slug>/index.md
    // dir:     public/content/developers/tutorials/<slug>
    // srcPath: /content/developers/tutorials/<slug>
    const rel = path.relative(cwd, absPath)
    const dir = path.dirname(rel)
    const srcPath = "/" + dir.replace(/^public\//, "")
    const inner = rehypeImg({ dir, srcPath, locale: "en" })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return inner(tree as any)
  }
}

export default rehypeImgForFumadocs
