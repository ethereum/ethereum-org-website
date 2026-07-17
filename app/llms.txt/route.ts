import { getTranslations } from "next-intl/server"

import { SITE_URL } from "@/lib/constants"

import { renderLegalSection, renderNavSection } from "@/lib/llms-txt/render"
import { buildNavigation } from "@/lib/nav/buildNavigation"
import {
  buildFooterDipperLinks,
  buildFooterLinkSections,
} from "@/lib/nav/footerLinks"

export const dynamic = "force-static"

const INTRO = `# Ethereum.org

> The official Ethereum website providing comprehensive education, resources, and community information about Ethereum — the decentralized world computer that enables smart contracts and decentralized applications.

Ethereum.org is the primary educational hub for Ethereum, offering beginner-friendly explanations alongside advanced technical documentation. The site covers everything from basic concepts like "What is Ethereum?" to detailed developer guides, staking information, and protocol research. For the developer-documentation-only index, see ${SITE_URL}/developers/docs/llms.txt. To report a security vulnerability in Ethereum's core protocol, clients, or key smart contracts, see the Ethereum Foundation Bug Bounty Program at ${SITE_URL}/bug-bounty (summarized under "Security & Bug Bounty" below).`

const SECURITY = `## Security & Bug Bounty

- [Ethereum Foundation Bug Bounty Program](${SITE_URL}/bug-bounty): rewards for vulnerabilities in Ethereum's core protocol, execution and consensus clients, Solidity/Vyper, and key smart contracts.
- [Bug bounty submission guidance for AI agents](https://bbp-form.ethereum.org/llms.txt): in-scope targets, proof-of-concept requirements (a Kurtosis devnet or a reproducible state test), and the validation checklist to run before confirming an issue.`

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
    SECURITY,
    renderLegalSection(dipperLinks),
    "",
  ].join("\n\n")

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  })
}
