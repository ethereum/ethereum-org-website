import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function TokenizationPageJsonLD({
  locale,
  contributors,
}: {
  locale: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-organizations-enterprise-tokenization")
  const tCommon = await getTranslations("common")

  const url = normalizeUrlForJsonLd(
    locale,
    "/organizations/enterprise/tokenization/"
  )

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        "@id": url,
        name: t("page-organizations-enterprise-tokenization-meta-title"),
        description: t(
          "page-organizations-enterprise-tokenization-meta-description"
        ),
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
              name: tCommon("organizations"),
              item: normalizeUrlForJsonLd(locale, "/organizations/"),
            },
            // Positions 3 and 4 use the `common.json` crumb labels so the
            // structured data mirrors the visible breadcrumb trail exactly
            // ("ethereum.org / Organizations / Enterprise / Tokenization")
            // rather than the longer page/meta titles.
            {
              "@type": "ListItem",
              position: 3,
              name: tCommon("enterprise"),
              item: normalizeUrlForJsonLd(locale, "/organizations/enterprise/"),
            },
            {
              "@type": "ListItem",
              position: 4,
              name: tCommon("tokenization"),
              item: url,
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
