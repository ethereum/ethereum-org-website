import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function RunANodePageJsonLD({
  locale,
  lastEditLocaleTimestamp,
  contributors,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string | null
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-run-a-node")

  const url = normalizeUrlForJsonLd(locale, `/run-a-node/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const webPageId = { "@id": url }
  const articleId = { "@id": `${url}#run-a-node` }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        ...webPageId,
        name: t("page-run-a-node-title"),
        description: t("page-run-a-node-hero-subtitle"),
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
              name: t("page-run-a-node-title"),
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
        headline: t("page-run-a-node-title"),
        description: t("page-run-a-node-hero-subtitle"),
        image: "https://ethereum.org/images/run-a-node/ethereum-inside.png",
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        contributor: contributorList,
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        about: {
          "@type": "Thing",
          name: "Running an Ethereum Node",
          description:
            "Guide to running your own Ethereum node, benefits, and requirements",
        },
        ...(lastEditLocaleTimestamp && {
          dateModified: lastEditLocaleTimestamp,
        }),
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
