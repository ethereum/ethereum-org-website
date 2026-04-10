import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumCommunityReference,
  ethereumFoundationOrganization,
  ethereumFoundationReference,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ethereumFoundationOrganization,
      ethereumCommunityOrganization,
      {
        "@type": "WebPage",
        "@id": url,
        name: t("page-wallets-meta-title"),
        description: t("page-wallets-meta-description"),
        url: url,
        inLanguage: locale,
        contributor: contributorList,
        author: [ethereumCommunityReference],
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://ethereum.org/#website",
          name: "ethereum.org",
          url: "https://ethereum.org",
        },
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
        publisher: ethereumFoundationReference,
        reviewedBy: ethereumFoundationReference,
        mainEntity: { "@id": `${url}#wallets` },
      },
      {
        "@type": "Article",
        "@id": `${url}#wallets`,
        headline: t("page-wallets-title"),
        description: t("page-wallets-meta-description"),
        image: "https://ethereum.org/images/wallets/wallet-hero.png",
        author: [ethereumCommunityReference],
        contributor: contributorList,
        publisher: ethereumFoundationReference,
        reviewedBy: ethereumFoundationReference,
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
