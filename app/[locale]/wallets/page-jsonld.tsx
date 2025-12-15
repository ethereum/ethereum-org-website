import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import { ethereumFoundationOrganization } from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function WalletsPageJsonLD({
  locale,
  lastEditLocaleTimestamp,
  contributors,
}) {
  const t = await getTranslations({
    namespace: "page-find-wallet",
  })

  const url = normalizeUrlForJsonLd(locale, `/wallets/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // JSON-LD structured data for the Wallets page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-wallets-meta-title"),
    description: t("page-wallets-meta-description"),
    url: url,
    inLanguage: locale,
    contributor: contributorList,
    author: [ethereumFoundationOrganization],
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
    publisher: ethereumFoundationOrganization,
    reviewedBy: ethereumFoundationOrganization,
  }

  // JSON-LD for the wallets guide article content
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-wallets-title"),
    description: t("page-wallets-meta-description"),
    image: "https://ethereum.org/images/wallets/wallet-hero.png",
    author: [ethereumFoundationOrganization],
    contributor: contributorList,
    publisher: ethereumFoundationOrganization,
    reviewedBy: ethereumFoundationOrganization,
    about: {
      "@type": "Thing",
      name: "Ethereum Wallets",
      description:
        "Complete guide to Ethereum wallets, types, features, and how to use them safely",
    },
    dateModified: lastEditLocaleTimestamp,
  }

  return <PageJsonLD structuredData={[webPageJsonLd, articleJsonLd]} />
}
