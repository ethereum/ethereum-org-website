import { getTranslations } from "next-intl/server"

import docLinks from "@/data/developer-docs-links.yaml"

import { SITE_URL } from "@/lib/constants"

import {
  type DocLink,
  renderDocsNode,
  type Translator,
} from "@/lib/llms-txt/render"

export const dynamic = "force-static"

const INTRO = `# Ethereum Developer Documentation

> Technical reference for building on Ethereum: protocol concepts, the Ethereum stack, smart contracts, scaling solutions, and developer tooling.

This file indexes the developer documentation under ${SITE_URL}/developers/docs/. For the full ethereum.org index including learner content, guides, and community resources, see ${SITE_URL}/llms.txt.`

const links = docLinks as unknown as DocLink[]

const renderTopGroup = (group: DocLink, t: Translator): string => {
  const lines = [`## ${t(group.id)}`, ""]
  for (const item of group.items ?? []) {
    lines.push(...renderDocsNode(item, 0, t))
  }
  return lines.join("\n")
}

export const GET = async () => {
  const t = await getTranslations({
    locale: "en",
    namespace: "page-developers-docs",
  })

  const sections = links.map((entry) =>
    entry.items
      ? renderTopGroup(entry, t)
      : renderDocsNode(entry, 0, t).join("\n")
  )

  const body = [INTRO, ...sections, ""].join("\n\n")

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  })
}
