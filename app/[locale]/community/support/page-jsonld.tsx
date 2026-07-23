import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { isExternal, normalizeUrlForJsonLd } from "@/lib/utils/url"

import { sections } from "./data"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function SupportJsonLD({
  locale,
  contributors,
}: {
  locale: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-community-support")

  const url = normalizeUrlForJsonLd(locale, `/community/support/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // Flatten all card items in page render order, then append the Discord CTA.
  const links = [
    ...[...sections.getHelp, ...sections.learn].flatMap((section) =>
      section.items.map(({ labelKey, href }) => ({
        labelKey,
        href,
      }))
    ),
    // Page-terminating external CTA ("Still need help?" Discord button).
    // Not part of the sections data struct, so appended manually.
    {
      labelKey: "page-community-support-discord",
      href: "https://discord.gg/ethereum-org",
    },
  ]

  const supportItems = links.map(({ labelKey, href }, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t(labelKey as Parameters<typeof t>[0]),
    url: isExternal(href) ? href : normalizeUrlForJsonLd(locale, href),
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        "@id": url,
        name: t("page-community-support-hero-title"),
        description: t("page-community-support-meta-description"),
        url,
        inLanguage: locale,
        contributor: contributorList,
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        isPartOf: REFERENCE.ETHEREUM_ORG_WEBSITE,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: normalizeUrlForJsonLd(locale, "/"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Community",
              item: normalizeUrlForJsonLd(locale, "/community/"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: t("page-community-support-hero-title"),
              item: url,
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: { "@id": `${url}#support-links` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#support-links`,
        name: t("page-community-support-hero-title"),
        numberOfItems: supportItems.length,
        itemListElement: supportItems,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
