import path from "node:path"
import { fileURLToPath } from "node:url"

import rehypeImg from "@/lib/md/rehypeImg"

// Adapter for our existing rehypeImg plugin. Fumadocs MDX calls plugins with
// global config — the upstream plugin needs per-file `dir`, `srcPath`,
// `locale`. We derive them from the vfile path inside the transformer.
//
// i18n note: translated md files live under
// `public/content/translations/<locale>/<slug>/index.md` but their images
// are NOT duplicated into the translation tree — they live only in the EN
// tree at `public/content/<slug>/`. The existing pipeline always resolves
// images against the EN tree regardless of locale (see `src/lib/md/compile.ts`
// where `mdDir = "public/content/<slug>"` is computed from slugArray, not the
// file's real location). We do the same here: strip the
// `translations/<locale>/` prefix when computing `dir`/`srcPath`, and pass
// the locale through so rehypeImg's translated-image swap still works.
const translationDirRe = /^public\/content\/translations\/([^/]+)\//

const rehypeImgForFumadocs = () => {
  return async (tree: unknown, file: { path?: string; cwd?: string }) => {
    const absPath = file.path
      ? file.path.startsWith("file:")
        ? fileURLToPath(file.path)
        : file.path
      : ""
    const cwd = file.cwd ?? process.cwd()
    const rel = path.relative(cwd, absPath)

    let locale = "en"
    let normalized = rel
    const m = translationDirRe.exec(rel)
    if (m) {
      locale = m[1]
      // "public/content/translations/<locale>/<slug>/index.md"
      //   → "public/content/<slug>/index.md"
      normalized = rel.replace(translationDirRe, "public/content/")
    }
    const dir = path.dirname(normalized)
    const srcPath = "/" + dir.replace(/^public\//, "")
    // Translations reuse EN's image tree (the `dir`/`srcPath` above are
    // normalized to EN). Running Sharp/plaiceholder 24 more times produces
    // the same blurDataURL while spiking native memory past Netlify's 8 GB
    // ceiling. Skip the placeholder pass for non-EN; width/height still get
    // computed so layout shifts stay bounded.
    const skipPlaceholders = locale !== "en"
    const inner = rehypeImg({ dir, srcPath, locale, skipPlaceholders })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return inner(tree as any)
  }
}

export default rehypeImgForFumadocs
