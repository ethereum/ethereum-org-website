import fs from "fs"
import { dirname, join, relative, sep } from "path"

import { DIAGRAM_FIGURE_TEXT } from "@/components/Diagrams/figure-text"

import { AGENT_CONTENT_DIR, CONTENT_DIR, DEFAULT_LOCALE } from "@/lib/constants"

import en from "@/intl/en/component-diagrams.json"
import { hasAgentTags, toAgentMarkdown } from "@/lib/md/agent-markdown"
import {
  diagramAgentTags,
  diagramTextFromMessages,
} from "@/lib/md/diagram-text"

const TAG_NAMES = Object.keys(DIAGRAM_FIGURE_TEXT)
// Byte check before decoding: about 8k pages, a few dozen with tags.
const mayHaveTags = (bytes: Buffer) =>
  bytes.includes("Diagram") ||
  TAG_NAMES.some((name) => bytes.includes(`<${name}`))

const enText = diagramTextFromMessages(DEFAULT_LOCALE, en)
const enTags = diagramAgentTags(DIAGRAM_FIGURE_TEXT, enText)

/** Tags in `locale`; a figure failing there falls back to English, with a warning. */
const tagsFor = (locale: string, page: string) => {
  if (locale === DEFAULT_LOCALE) return enTags
  const file = join("src/intl", locale, "component-diagrams.json")
  const own = fs.existsSync(file)
    ? JSON.parse(fs.readFileSync(file, "utf8"))
    : {}
  return diagramAgentTags(
    DIAGRAM_FIGURE_TEXT,
    diagramTextFromMessages(locale, { ...en, ...own }),
    {
      text: enText,
      onFallback: (tag, error) =>
        console.warn(
          `agent-markdown: ${page}: <${tag} /> falls back to English: ${error.message}`
        ),
    }
  )
}

const pages = fs
  .readdirSync(CONTENT_DIR, { recursive: true, encoding: "utf8" })
  .filter((file) => file.endsWith(`${sep}index.md`) || file === "index.md")
  .map((file) => file.split(sep).join("/"))
  .filter((file) => {
    const bytes = fs.readFileSync(join(CONTENT_DIR, file))
    return mayHaveTags(bytes) && hasAgentTags(bytes.toString("utf8"), enTags)
  })

if (!pages.length) {
  console.error(`agent-markdown: no agent text tags found under ${CONTENT_DIR}`)
  process.exit(1)
}

fs.rmSync(AGENT_CONTENT_DIR, { recursive: true, force: true })
for (const page of pages) {
  const locale = page.match(/^translations\/([^/]+)\//)?.[1] ?? DEFAULT_LOCALE
  const source = join(CONTENT_DIR, page)
  try {
    const markdown = toAgentMarkdown(fs.readFileSync(source, "utf8"), {
      dir: `/${relative("public", dirname(source)).split(sep).join("/")}/`,
      tags: tagsFor(locale, source),
    })
    const out = join(AGENT_CONTENT_DIR, page)
    fs.mkdirSync(dirname(out), { recursive: true })
    fs.writeFileSync(out, markdown)
  } catch (error) {
    console.error(`agent-markdown: ${source}: ${(error as Error).message}`)
    process.exit(1)
  }
}
console.log(
  `agent-markdown: wrote ${pages.length} pages to ${AGENT_CONTENT_DIR}`
)
