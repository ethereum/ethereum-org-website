import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function PrivacyPageJsonLD({
  locale,
  latestCommitDate,
  contributors,
}: {
  locale: Lang | undefined
  latestCommitDate: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-privacy")

  const url = normalizeUrlForJsonLd(locale, `/privacy/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const webPageId = { "@id": url }
  const articleId = { "@id": `${url}#privacy` }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        ...webPageId,
        name: t("page-privacy-meta-title"),
        description: t("page-privacy-meta-description"),
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
              name: t("page-privacy-title"),
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
        headline: t("page-privacy-title"),
        description: t("page-privacy-meta-description"),
        image:
          "https://ethereum.org/images/three-people-cat-butterflies-petting-dog.png",
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        contributor: contributorList,
        about: [
          {
            "@type": "Thing",
            name: "Digital privacy",
            description:
              "The right to control your own personal data and decide who you share information about yourself with",
          },
          {
            "@type": "Thing",
            name: "Ethereum",
            description:
              "A decentralized platform for applications and digital economies powered by smart contracts",
          },
        ],
        dateModified: latestCommitDate,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
