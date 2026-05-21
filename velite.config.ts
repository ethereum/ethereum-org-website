import matter from "gray-matter"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import readingTime from "reading-time"
import rehypeSlug from "rehype-slug"
import remarkHeadingId from "remark-heading-id"
import { defineConfig, type Loader, s } from "velite"

import { escapeHeadingIds } from "@/lib/md/escapeHeadingIds"
import rehypeImgOriginal from "@/lib/md/rehypeImg"
import { computeToc } from "@/lib/md/remarkInferToc"
import { remarkPreserveJsx } from "@/lib/md/remarkPreserveJsx"

const CONTENT_ROOT = path.resolve("public/content")

// gray-matter loader that runs `escapeHeadingIds` on the body so MDX v3 does
// not parse `{#my-id}` as a JSX expression. Tolerates per-file parse failures
// by surfacing them as schema errors (handled by Velite) instead of aborting
// the whole build — some translated frontmatter has historic merge corruption.
const escapingMdLoader: Loader = {
  test: /\.md$/,
  load: (file) => {
    try {
      const escaped = escapeHeadingIds(file.toString())
      const parsed = matter(escaped)
      return { data: parsed.data, content: parsed.content }
    } catch (error) {
      file.message(
        `Frontmatter parse failed: ${(error as Error).message}`,
        undefined,
        "velite:loader"
      )
      return { data: {}, content: "" }
    }
  },
}

// rehypeImg wrapped so that the inner transformer is constructed per-file
// with options derived from the vfile path. Images live under the canonical
// English subtree even for translated content -- strip translations/{locale}/
// to point dir + srcPath at the English asset locations.
const rehypeImgFromVfile = () => {
  return async (tree: unknown, file: { path: string }) => {
    const relativeToContent = path.relative(CONTENT_ROOT, file.path)
    const translationMatch = relativeToContent.match(
      /^translations\/([^/]+)\/(.+)$/
    )
    const locale = translationMatch ? translationMatch[1] : "en"
    const canonical = translationMatch ? translationMatch[2] : relativeToContent
    const canonicalSlugDir = path.dirname(canonical).replace(/\\/g, "/")
    const dir = path.join(CONTENT_ROOT, canonicalSlugDir)
    const srcPath = "/" + path.posix.join("content", canonicalSlugDir)

    const transformer = rehypeImgOriginal({ dir, srcPath, locale })
    return transformer(tree)
  }
}

// Derive (locale, slug, isTranslated) from a file path relative to CONTENT_ROOT.
// Examples:
//   staking/index.md                        -> { locale: "en", slug: "staking", isTranslated: false }
//   translations/de/staking/index.md        -> { locale: "de", slug: "staking", isTranslated: true }
//   translations/de/videos/foo/index.md     -> { locale: "de", slug: "foo",    isTranslated: true } (videos collection)
const derivePathInfo = (filePath: string, stripVideosPrefix = false) => {
  const relativeToContent = path.relative(CONTENT_ROOT, filePath)
  const translationMatch = relativeToContent.match(
    /^translations\/([^/]+)\/(.+)$/
  )
  const locale = translationMatch ? translationMatch[1] : "en"
  const canonical = translationMatch ? translationMatch[2] : relativeToContent
  const slugWithIndex = canonical
    .replace(/\\/g, "/")
    .replace(/\/index\.md$/, "")
  const slug = stripVideosPrefix
    ? slugWithIndex.replace(/^videos\//, "")
    : slugWithIndex
  return { locale, slug, isTranslated: !!translationMatch }
}

const resolveTemplate = (
  frontmatterTemplate: string | undefined,
  slug: string
): string => {
  if (frontmatterTemplate) return frontmatterTemplate
  if (slug.includes("developers/docs")) return "docs"
  if (slug.includes("developers/tutorials")) return "tutorial"
  return "static"
}

// gray-matter auto-converts ISO 8601 date strings in YAML into JS Date objects.
// We want stable ISO strings in the JSON output so locale-aware formatting can
// happen at render time.
const isoDateOrUndefined = (value: unknown): string | undefined => {
  if (value instanceof Date) return value.toISOString().split("T")[0]
  if (typeof value === "string") return value
  return undefined
}

const pageSchema = s
  .object({
    // Frontmatter pass-through (permissive; tightened in a follow-up PR).
    title: s.string().optional(),
    description: s.string().nullable().optional(),
    lang: s.string().optional(),
    template: s.string().optional(),
    image: s.string().optional(),
    alt: s.string().nullable().optional(),
    emoji: s.string().optional(),
    metaTitle: s.string().optional(),
    author: s.string().optional(),
    authors: s.array(s.unknown()).optional(),
    tags: s.array(s.string()).optional(),
    skill: s.string().optional(),
    published: s.unknown().optional(),
    source: s.string().optional(),
    sourceUrl: s.string().optional(),
    breadcrumb: s.string().optional(),
    sidebarDepth: s.number().optional(),
    summaryPoints: s.array(s.string()).optional(),
    // Compiled MDX body
    body: s.mdx(),
  })
  .passthrough()
  .transform((data, ctx) => {
    const filePath: string = ctx.meta.path
    const { locale, slug, isTranslated } = derivePathInfo(filePath)
    // VeliteFile exposes the parsed mdast for the body. Compute TOC from it
    // directly -- running mdast-util-toc as a remark plugin via the MDX
    // pipeline doesn't work because @mdx-js/mdx operates on an internal vfile
    // whose `data` doesn't survive to the schema layer.
    const tree = ctx.meta.mdast
    if (tree) {
      // Strip `{#custom-id}` from heading text and lift it into data.hProperties.id
      // so mdast-util-toc produces clean titles + correct URLs. Mirrors what the
      // MDX pipeline does via remark-heading-id; the mdast we get here is raw.
      remarkHeadingId()(tree)
    }
    const toc = tree ? computeToc(tree) : {}
    const raw: string = ctx.meta.content ?? ""
    const timeToRead = Math.round(readingTime(raw).minutes)
    return {
      ...data,
      locale,
      slug,
      isTranslated,
      template: resolveTemplate(data.template, slug),
      published: isoDateOrUndefined(data.published),
      toc,
      timeToRead,
    }
  })

const videoSchema = s
  .object({
    title: s.string().optional(),
    description: s.string().optional(),
    lang: s.string().optional(),
    youtubeId: s.string().optional(),
    uploadDate: s.unknown().optional(),
    duration: s.union([s.string(), s.number()]).optional(),
    topic: s.union([s.string(), s.array(s.string())]).optional(),
    author: s.string().optional(),
    educationLevel: s.string().optional(),
    format: s.string().optional(),
    breadcrumb: s.string().optional(),
    customThumbnailUrl: s.string().optional(),
    body: s.mdx(),
  })
  .passthrough()
  .transform((data, ctx) => {
    const filePath: string = ctx.meta.path
    const { locale, slug, isTranslated } = derivePathInfo(filePath, true)
    // Raw markdown body (without frontmatter) -- used by VideoPageJsonLD's
    // transcript stripping (needs the original text, not the compiled JS).
    const rawBody: string = ctx.meta.content ?? ""
    return {
      ...data,
      locale,
      slug,
      isTranslated,
      uploadDate: isoDateOrUndefined(data.uploadDate),
      rawBody,
    }
  })

// Slugs can contain `/` (e.g. `developers/docs/intro-to-ethereum`); use nested
// dirs so each entry maps to a flat filename and `mkdir({ recursive: true })`
// handles the tree. Empty slug (would be the site root) gets `_root` as filename.
const entryFilename = (slug: string) =>
  slug === "" ? "_root.json" : `${slug}.json`

// Strip the heavy `body` field for manifest entries. Pages manifest is just
// slugs (enumeration only). Videos manifest carries card metadata so the
// videos listing page doesn't have to read 1.5k per-entry files.
type AnyPage = { locale: string; slug: string }
type AnyVideo = {
  locale: string
  slug: string
  title?: string
  description?: string
  uploadDate?: string
  duration?: string | number
  topic?: string | string[]
  isTranslated?: boolean
}

const OUT_DIR = ".velite"

export default defineConfig({
  root: "public/content",
  output: {
    data: OUT_DIR,
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:8].[ext]",
    clean: true,
    format: "esm",
  },
  loaders: [escapingMdLoader],
  collections: {
    pages: {
      name: "Page",
      pattern: ["**/index.md", "!videos/**", "!translations/*/videos/**"],
      schema: pageSchema,
    },
    videos: {
      name: "Video",
      pattern: ["videos/*/index.md", "translations/*/videos/*/index.md"],
      schema: videoSchema,
    },
  },
  mdx: {
    gfm: true,
    copyLinkedFiles: false,
    remarkPlugins: [remarkHeadingId, remarkPreserveJsx],
    rehypePlugins: [rehypeSlug, rehypeImgFromVfile],
  },
  // Write per-entry files + a small manifest instead of Velite's default
  // bulk JSON outputs. `prepare` returning `false` skips outputData entirely,
  // so the ~240 MB of `pages.json` + `videos.json` are never written -- they'd
  // otherwise (a) load into V8 heap if anything imported them, OOM'ing the
  // Next build, and (b) get pulled into the Netlify function bundle past the
  // 250 MB limit. Per-entry files mean the render path reads only the page
  // it needs (~30 KB); enumeration uses the manifest.
  //
  // `.velite/index.js` is generated by Velite's `outputEntry` step before
  // `prepare` runs and re-exports the bulk JSONs that we never write. We
  // overwrite it with a stub so module resolution doesn't dangle. Types come
  // from `.velite/index.d.ts` (untouched), which derives Page/Video from the
  // schema and is only used as `import type` -- erased at compile time.
  prepare: async (data) => {
    const pagesDir = path.join(OUT_DIR, "pages")
    const videosDir = path.join(OUT_DIR, "videos")

    const pagesManifest: Record<string, string[]> = {}
    const videosManifest: Record<
      string,
      Array<
        Pick<
          AnyVideo,
          | "slug"
          | "title"
          | "description"
          | "uploadDate"
          | "duration"
          | "topic"
          | "isTranslated"
        >
      >
    > = {}

    const writes: Promise<void>[] = []

    for (const page of data.pages as AnyPage[]) {
      const dir = path.join(
        pagesDir,
        page.locale,
        path.dirname(page.slug || "_root")
      )
      const file = path.join(pagesDir, page.locale, entryFilename(page.slug))
      writes.push(
        mkdir(dir, { recursive: true }).then(() =>
          writeFile(file, JSON.stringify(page))
        )
      )
      ;(pagesManifest[page.locale] ??= []).push(page.slug)
    }

    for (const video of data.videos as AnyVideo[]) {
      const dir = path.join(videosDir, video.locale)
      const file = path.join(videosDir, video.locale, entryFilename(video.slug))
      writes.push(
        mkdir(dir, { recursive: true }).then(() =>
          writeFile(file, JSON.stringify(video))
        )
      )
      ;(videosManifest[video.locale] ??= []).push({
        slug: video.slug,
        title: video.title,
        description: video.description,
        uploadDate: video.uploadDate,
        duration: video.duration,
        topic: video.topic,
        isTranslated: video.isTranslated,
      })
    }

    await Promise.all(writes)
    await Promise.all([
      writeFile(
        path.join(OUT_DIR, "manifest.json"),
        JSON.stringify({ pages: pagesManifest, videos: videosManifest })
      ),
      writeFile(
        path.join(OUT_DIR, "index.js"),
        "// Bulk arrays intentionally not emitted. Use src/lib/md/getCompiledPage helpers.\nexport const pages = []\nexport const videos = []\n"
      ),
    ])

    return false as const
  },
})
