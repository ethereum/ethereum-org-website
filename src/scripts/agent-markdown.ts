import fs from "fs"
import { dirname, join, relative, sep } from "path"

import { DIAGRAM_FIGURE_TEXT } from "@/components/Diagrams/figure-text"

import { AGENT_CONTENT_DIR, CONTENT_DIR, DEFAULT_LOCALE } from "@/lib/constants"

import en from "@/intl/en/component-diagrams.json"
import { diagramTextFromMessages, toAgentMarkdown } from "@/lib/md/diagram-text"

const HAS_DIAGRAM = /<[A-Z]\w*Diagram\b/

const textFor = (locale: string) => {
  const file = join("src/intl", locale, "component-diagrams.json")
  const own = fs.existsSync(file)
    ? JSON.parse(fs.readFileSync(file, "utf8"))
    : {}
  return diagramTextFromMessages(locale, { ...en, ...own })
}

const pages = fs
  .readdirSync(CONTENT_DIR, { recursive: true, encoding: "utf8" })
  .filter((file) => file.endsWith(`${sep}index.md`) || file === "index.md")
  .map((file) => file.split(sep).join("/"))
  .filter((file) =>
    HAS_DIAGRAM.test(fs.readFileSync(join(CONTENT_DIR, file), "utf8"))
  )

if (!pages.length) {
  console.error(`agent-markdown: no diagram tags found under ${CONTENT_DIR}`)
  process.exit(1)
}

fs.rmSync(AGENT_CONTENT_DIR, { recursive: true, force: true })
const texts = new Map<string, ReturnType<typeof textFor>>()
for (const page of pages) {
  const locale = page.match(/^translations\/([^/]+)\//)?.[1] ?? DEFAULT_LOCALE
  if (!texts.has(locale)) texts.set(locale, textFor(locale))
  const source = join(CONTENT_DIR, page)
  try {
    const markdown = toAgentMarkdown(fs.readFileSync(source, "utf8"), {
      dir: `/${relative("public", dirname(source)).split(sep).join("/")}/`,
      figures: DIAGRAM_FIGURE_TEXT,
      text: texts.get(locale)!,
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
