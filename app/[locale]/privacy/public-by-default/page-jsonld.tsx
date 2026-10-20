import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function PublicByDefaultPageJsonLD({
  locale,
  lastEditLocaleTimestamp,
  contributors,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-privacy-public-by-default")
  const tPrivacy = await getTranslations("page-privacy")
  const tCommon = await getTranslations("common")

  const url = normalizeUrlForJsonLd(locale, `/privacy/public-by-default/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const webPageId = { "@id": url }
  const articleId = { "@id": `${url}#lesson` }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        ...webPageId,
        name: t("page-privacy-public-by-default-meta-title"),
        description: t("page-privacy-public-by-default-meta-description"),
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
              name: tCommon("values"),
              item: normalizeUrlForJsonLd(locale, "/values/"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: tPrivacy("page-privacy-title"),
              item: normalizeUrlForJsonLd(locale, "/privacy/"),
            },
            {
              "@type": "ListItem",
              position: 4,
              name: tCommon("public-by-default"),
              item: url,
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: articleId,
      },
      {
        "@type": "LearningResource",
        ...articleId,
        isPartOf: webPageId,
        name: t("page-privacy-public-by-default-meta-title"),
        description: t("page-privacy-public-by-default-meta-description"),
        learningResourceType: "Interactive lesson",
        timeRequired: "PT20M",
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        contributor: contributorList,
        about: [
          {
            "@type": "Thing",
            name: "Privacy on Ethereum",
            description:
              "What wallets, RPC providers, the peer-to-peer network, the public chain, chain analysts and identity links can learn about a user, and the techniques that reduce it",
          },
        ],
        dateModified: lastEditLocaleTimestamp,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
