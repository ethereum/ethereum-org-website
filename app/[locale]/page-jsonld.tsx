import { getTranslations } from "next-intl/server"

import { Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumCommunityReference,
  ethereumFoundationOrganization,
  ethereumFoundationReference,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function IndexPageJsonLD({
  locale,
}: {
  locale: Lang | undefined
}) {
  const t = await getTranslations("page-index")

  const url = normalizeUrlForJsonLd(locale, `/`)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ethereumFoundationOrganization,
      ethereumCommunityOrganization,
      {
        "@type": "WebSite",
        "@id": "https://ethereum.org/#website",
        url: url,
        name: "ethereum.org",
        description: t("page-index-meta-description"),
        educationalUse: "Self-Paced",
        keywords:
          "Ethereum, ETH, Crypto, Digital Ownership, DeFi, Decentralized Finance, Privacy, Stablecoins, Web3, Blockchain, Smart Contracts, Open Source",
        inLanguage: locale,
        license: "https://opensource.org/licenses/MIT",
        audience: {
          "@type": "EducationalAudience",
          audienceType: "public",
        },
        publisher: ethereumFoundationReference,
        maintainer: ethereumFoundationReference,
        contributor: ethereumCommunityReference,
        about: {
          "@type": "Thing",
          name: "Ethereum",
          description:
            "Ethereum is a global, open-source blockchain network with smart contract functionality, and a platform that powers digital ownership, decentralized finance (DeFi), and privacy-preserving applications.",
          image: "https://ethereum.org/images/assets/eth-diamond-glyph.png",
          sameAs: [
            "https://www.wikidata.org/wiki/Q16783523",
            "https://en.wikipedia.org/wiki/Ethereum",
            "https://x.com/ethereum",
            "https://github.com/ethereum",
          ],
        },
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
