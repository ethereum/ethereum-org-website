import { loader } from "fumadocs-core/source"
import { toFumadocsSource } from "fumadocs-mdx/runtime/server"

import { content } from "../../../.source/server"

// Single Fumadocs source covering all English markdown content under
// public/content (translations excluded — see source.config.ts).
export const contentSource = loader({
  source: toFumadocsSource(content, []),
  baseUrl: "/",
})
