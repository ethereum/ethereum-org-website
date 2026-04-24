import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES, REFERENCE } from "@/lib/jsonld/constants"
import { KNOWN_PERSONS } from "@/lib/jsonld/persons"
import { personReference } from "@/lib/jsonld/utils"

export default async function BugBountyJsonLD({
  locale,
  contributors,
}: {
  locale: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-bug-bounty")

  const url = normalizeUrlForJsonLd(locale, `/bug-bounty/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      KNOWN_PERSONS["fredrik-svantes"],
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        "@id": url,
        name: t("page-upgrades-bug-bounty-meta-title"),
        description: t("page-upgrades-bug-bounty-meta-description"),
        url,
        inLanguage: locale,
        contributor: contributorList,
        author: [
          personReference("fredrik-svantes"),
          REFERENCE.ETHEREUM_COMMUNITY,
        ],
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
              name: t("page-upgrades-bug-bounty-meta-title"),
              item: normalizeUrlForJsonLd(locale, "/bug-bounty/"),
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
