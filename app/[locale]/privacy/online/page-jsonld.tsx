import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function PrivacyOnlinePageJsonLD({
  locale,
  lastEditLocaleTimestamp,
  contributors,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-privacy-online")
  const tPrivacy = await getTranslations("page-privacy")

  const url = normalizeUrlForJsonLd(locale, `/privacy/online/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const webPageId = { "@id": url }
  const articleId = { "@id": `${url}#privacy-preserving-apps` }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        ...webPageId,
        name: t("page-privacy-online-meta-title"),
        description: t("page-privacy-online-meta-description"),
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
              name: t("page-privacy-online-title"),
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
        headline: t("page-privacy-online-title"),
        description: t("page-privacy-online-meta-description"),
        image: "https://ethereum.org/images/doge-computer.png",
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        contributor: contributorList,
        about: [
          {
            "@type": "Thing",
            name: "Online privacy",
            description:
              "Practical steps for protecting personal information online, including privacy-preserving apps, device settings, and data deletion requests",
          },
          {
            "@type": "Thing",
            name: "Data brokers",
            description:
              "Companies that collect and sell personal information, and the opt-out and deletion rights that apply to them",
          },
        ],
        dateModified: lastEditLocaleTimestamp,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
