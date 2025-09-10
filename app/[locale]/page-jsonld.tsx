import { getTranslations } from "next-intl/server"

import { Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function IndexPageJsonLD({
  locale,
}: {
  locale: Lang | undefined
}) {
  const t = await getTranslations({
    namespace: "page-index",
  })

  const url = normalizeUrlForJsonLd(locale, `/`)

  // JSON-LD structured data for the homepage
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-index-meta-title"),
    description: t("page-index-meta-description"),
    url: url,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
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
          item: url,
        },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
  }

  // JSON-LD for ethereum.org as an organization
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://ethereum.org",
    name: "ethereum.org",
    url: "https://ethereum.org",
    logo: "https://ethereum.org/images/ethereum-logo.png",
    description: t("page-index-meta-description"),
    sameAs: [
      "https://github.com/ethereum/ethereum-org-website",
      "https://discord.gg/ethereum-org",
      "https://x.com/EthDotOrg",
    ],
    mainEntityOfPage: `https://ethereum.org`,
    foundingDate: "2014",
    slogan:
      "Ethereum is the community-run technology powering the cryptocurrency ether and thousands of decentralized applications",
  }

  return <PageJsonLD structuredData={[webPageJsonLd, organizationJsonLd]} />
}
