import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { ethereumFoundationOrganization } from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function FindWalletPageJsonLD({
  locale,
  contributors,
}: {
  locale: Lang | undefined
  contributors: FileContributor[]
}) {
  const t = await getTranslations({
    namespace: "page-find-wallet",
  })

  const url = normalizeUrlForJsonLd(locale, `/wallets/find-wallet/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // JSON-LD structured data for the Find Wallet page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-find-wallet-meta-title"),
    description: t("page-find-wallet-meta-description"),
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
          name: "Wallets",
          item: normalizeUrlForJsonLd(locale, "/wallets/"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: t("page-find-wallet-meta-title"),
          item: url,
        },
      ],
    },
    publisher: ethereumFoundationOrganization,
    reviewedBy: ethereumFoundationOrganization,
  }

  // JSON-LD for the wallet finder article content
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-find-wallet-title"),
    description: t("page-find-wallet-meta-description"),
    image: "https://ethereum.org/images/wallets/wallet-hero.png",
    author: [ethereumFoundationOrganization],
    publisher: ethereumFoundationOrganization,
    contributor: contributorList,
    reviewedBy: ethereumFoundationOrganization,
    about: {
      "@type": "Thing",
      name: "Ethereum Wallet Finder",
      description:
        "Tool to find and compare Ethereum wallets based on features and requirements",
    },
  }

  return <PageJsonLD structuredData={[webPageJsonLd, articleJsonLd]} />
}
