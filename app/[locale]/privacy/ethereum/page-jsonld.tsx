import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function PrivacyEthereumPageJsonLD({
  locale,
  lastEditLocaleTimestamp,
  contributors,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-privacy-ethereum")
  const tPrivacy = await getTranslations("page-privacy")

  const url = normalizeUrlForJsonLd(locale, `/privacy/ethereum/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const webPageId = { "@id": url }
  const articleId = { "@id": `${url}#privacy-on-ethereum` }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        ...webPageId,
        name: t("page-privacy-ethereum-meta-title"),
        description: t("page-privacy-ethereum-meta-description"),
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
              name: tPrivacy("page-privacy-title"),
              item: normalizeUrlForJsonLd(locale, "/privacy/"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: t("page-privacy-ethereum-title"),
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
        headline: t("page-privacy-ethereum-title"),
        description: t("page-privacy-ethereum-meta-description"),
        image: "https://ethereum.org/images/infrastructure_transparent.png",
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        contributor: contributorList,
        about: [
          {
            "@type": "Thing",
            name: "Privacy on Ethereum",
            description:
              "Tools and techniques for protecting your privacy on Ethereum, including zero-knowledge proofs, stealth addresses, and privacy pools",
          },
          {
            "@type": "Thing",
            name: "Ethereum",
            description:
              "A decentralized platform for applications and digital economies powered by smart contracts",
          },
        ],
        dateModified: lastEditLocaleTimestamp,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
