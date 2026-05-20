import { getTranslations } from "next-intl/server"

import { renderLegalSection, renderNavSection } from "@/lib/llms-txt/render"
import { buildNavigation } from "@/lib/nav/buildNavigation"
import {
  buildFooterDipperLinks,
  buildFooterLinkSections,
} from "@/lib/nav/footerLinks"

export const dynamic = "force-static"

const INTRO = `# Ethereum.org

> The official Ethereum website providing comprehensive education, resources, and community information about Ethereum — the decentralized world computer that enables smart contracts and decentralized applications.

Ethereum.org is the primary educational hub for Ethereum, offering beginner-friendly explanations alongside advanced technical documentation. The site covers everything from basic concepts like "What is Ethereum?" to detailed developer guides, staking information, and protocol research. For the developer-documentation-only index, see https://ethereum.org/developers/docs/llms.txt.`

export const GET = async () => {
  const t = await getTranslations({ locale: "en", namespace: "common" })

  const nav = buildNavigation(t)
  const footerSections = buildFooterLinkSections(t)
  const dipperLinks = buildFooterDipperLinks(t)

  const findFooter = (title: string) =>
    footerSections.find((s) => s.title === title)

  const body = [
    INTRO,
    renderNavSection(nav.learn, findFooter(nav.learn.label)),
    renderNavSection(nav.use, findFooter(nav.use.label)),
    renderNavSection(nav.build, findFooter(nav.build.label)),
    renderNavSection(nav.participate, findFooter(nav.participate.label)),
    renderNavSection(nav.research, findFooter(nav.research.label)),
    renderLegalSection(dipperLinks),
    "",
  ].join("\n\n")

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  })
}
