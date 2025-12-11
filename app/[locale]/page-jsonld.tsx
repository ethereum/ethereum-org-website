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
    url: url,
    name: "ethereum.org",
    description: t("page-index-meta-description"),
    educationalUse: "instruction",
    keywords:
      "Ethereum, Blockchain, Smart Contracts, Web3, Open Source, Protocol, Documentation, Education",
    inLanguage: locale,
    license: "https://opensource.org/licenses/MIT",
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "developer",
      audienceType: "public",
    },
    publisher: {
      "@type": "Organization",
      name: "Ethereum Foundation",
      url: "https://ethereum.foundation",
      ownershipFundingInfo: "https://ethereum.foundation/ef",
      logo: "https://cdn.jsdelivr.net/gh/ethereum/ethereum-foundation-website@master/src/assets/images/ef-logo.svg",
      sameAs: [
        "https://www.wikidata.org/wiki/Q114736857",
        "https://github.com/ethereum/ethereum-foundation-website",
        "https://x.com/ethereumfndn",
      ],
    },
    maintainer: {
      "@type": "Organization",
      name: "Ethereum Community",
      url: "https://github.com/ethereum/ethereum-org-website/graphs/contributors",
    },
    about: {
      "@type": "SoftwareApplication",
      name: "Ethereum",
      applicationCategory: "Blockchain Protocol",
      operatingSystem: "Cross-platform",
      description:
        "A decentralized, open-source blockchain with smart contract functionality.",
      sameAs: [
        "https://www.wikidata.org/wiki/Q16783523",
        "https://en.wikipedia.org/wiki/Ethereum",
        "https://x.com/ethereum",
        "https://github.com/ethereum",
      ],
    },
  }

  return <PageJsonLD structuredData={[webSiteJsonLd]} />
}
