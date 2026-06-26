import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function WalletsPageJsonLD({
  locale,
  lastEditLocaleTimestamp,
  contributors,
}) {
  const t = await getTranslations("page-find-wallet")

  const url = normalizeUrlForJsonLd(locale, `/wallets/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const webPageId = { "@id": url }
  const articleId = { "@id": `${url}#wallets` }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        ...webPageId,
        name: t("page-wallets-meta-title"),
        description: t("page-wallets-meta-description"),
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
              name: t("page-wallets-meta-title"),
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
        headline: t("page-wallets-title"),
        description: t("page-wallets-meta-description"),
        image: "https://ethereum.org/images/wallets/wallet-hero.png",
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        contributor: contributorList,
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        about: {
          "@type": "Thing",
          name: "Ethereum Wallets",
          description:
            "Complete guide to Ethereum wallets, types, features, and how to use them safely",
        },
        dateModified: lastEditLocaleTimestamp,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
