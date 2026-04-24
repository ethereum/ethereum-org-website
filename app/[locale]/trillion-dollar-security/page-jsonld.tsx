import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES, REFERENCE } from "@/lib/jsonld/constants"
import { KNOWN_PERSONS } from "@/lib/jsonld/persons"
import { personReference } from "@/lib/jsonld/utils"

export default async function TrillionDollarSecurityPageJsonLD({
  locale,
  contributors,
}: {
  locale: Lang | undefined
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-trillion-dollar-security")

  const url = normalizeUrlForJsonLd(locale, `/trillion-dollar-security/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const webPageId = { "@id": url }
  const articleId = { "@id": `${url}#trillion-dollar-security` }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      KNOWN_PERSONS["josh-stark"],
      KNOWN_PERSONS["fredrik-svantes"],
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        ...webPageId,
        name: t("page-trillion-dollar-security-meta-title"),
        description: t("page-trillion-dollar-security-meta-description"),
        url,
        inLanguage: locale,
        contributor: contributorList,
        author: [
          personReference("josh-stark"),
          personReference("fredrik-svantes"),
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
              name: t("page-trillion-dollar-security-meta-title"),
              item: url,
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: articleId,
      },
      {
        "@type": "Article",
        ...articleId,
        isPartOf: webPageId,
        headline: t("page-trillion-dollar-security-title"),
        description: t("page-trillion-dollar-security-meta-description"),
        image: "https://ethereum.org/images/trillion-dollar-security/hero.png",
        author: [
          personReference("josh-stark"),
          personReference("fredrik-svantes"),
        ],
        contributor: contributorList,
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        about: {
          "@type": "Thing",
          name: "Ethereum Security",
          description:
            "Comprehensive security analysis of Ethereum's trillion-dollar ecosystem",
        },
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
