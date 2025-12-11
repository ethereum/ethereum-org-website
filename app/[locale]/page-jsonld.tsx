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

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://ethereum.org/#website",
    name: "ethereum.org",
    url: "https://ethereum.org",
    description: t("page-index-meta-description"),
    publisher: {
      "@id": "https://ethereum.org/#organization",
    },
    inLanguage: locale,
  }

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-index-meta-title"),
    description: t("page-index-meta-description"),
    url: url,
    inLanguage: locale,
    isPartOf: {
      "@id": "https://ethereum.org/#website",
    },
    about: {
      "@id": "https://ethereum.org/#organization",
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
      "@id": "https://ethereum.org/#organization",
    },
    mainEntity: {
      "@id": "https://ethereum.org/#organization",
    },
  }

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    additionalType: "https://schema.org/EducationalOrganization",
    "@id": "https://ethereum.org/#organization",
    name: "ethereum.org",
    alternateName: "Ethereum.org",
    url: "https://ethereum.org",
    logo: {
      "@type": "ImageObject",
      "@id": "https://ethereum.org/#logo",
      url: "https://ethereum.org/images/eth-home-icon.png",
      contentUrl: "https://ethereum.org/images/eth-home-icon.png",
      caption: "ethereum.org logo",
    },
    image: {
      "@id": "https://ethereum.org/#logo",
    },
    description: t("page-index-meta-description"),
    sameAs: [
      "https://github.com/ethereum/ethereum-org-website",
      "https://discord.gg/ethereum-org",
      "https://x.com/EthDotOrg",
    ],
    foundingDate: "2015",
    slogan:
      "Ethereum is the community-run technology powering the cryptocurrency ether and thousands of decentralized applications",
    knowsAbout: [
      "Ethereum",
      "Blockchain technology",
      "Cryptocurrency",
      "Decentralized finance",
      "Smart contracts",
      "Web3",
      "Decentralized applications",
    ],
    areaServed: "Worldwide",
    parentOrganization: {
      "@type": "Organization",
      name: "Ethereum Foundation",
      url: "https://ethereum.foundation",
    },
  }

  return (
    <PageJsonLD
      structuredData={[webSiteJsonLd, webPageJsonLd, organizationJsonLd]}
    />
  )
}
