import { getTranslations } from "next-intl/server"

import { Lang } from "@/lib/types"

import PageJsonLD from "@/components/organisms/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
  ethereumFoundationReference,
} from "@/lib/utils/jsonld"
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://ethereum.org/#website",
        url: url,
        name: "ethereum.org",
        description: t("page-index-meta-description"),
        educationalUse: "Independent Study",
        keywords:
          "Ethereum, Blockchain, Smart Contracts, Web3, Open Source, Protocol, Documentation, Education",
        inLanguage: locale,
        license: "https://opensource.org/licenses/MIT",
        audience: {
          "@type": "EducationalAudience",
          educationalRole: ["developer", "student"],
          audienceType: "public",
        },
        publisher: ethereumFoundationOrganization,
        maintainer: ethereumFoundationReference,
        contributor: ethereumCommunityOrganization,
        about: {
          "@type": "Thing",
          name: "Ethereum",
          description:
            "A decentralized, open-source blockchain with smart contract functionality.",
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
