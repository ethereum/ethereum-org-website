import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
  ethereumFoundationReference,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function DepositContractJsonLD({
  locale,
}: {
  locale: string
}) {
  const t = await getTranslations("page-staking-deposit-contract")

  const url = normalizeUrlForJsonLd(locale, `/staking/deposit-contract/`)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ethereumFoundationOrganization,
      ethereumCommunityOrganization,
      {
        "@type": "WebPage",
        "@id": url,
        name: t("page-staking-deposit-contract-title"),
        description: t("page-staking-deposit-contract-subtitle"),
        url: url,
        inLanguage: locale,
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
              name: "Staking",
              item: normalizeUrlForJsonLd(locale, "/staking/"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: t("page-staking-deposit-contract-title"),
              item: url,
            },
          ],
        },
        publisher: ethereumFoundationReference,
        reviewedBy: ethereumFoundationReference,
        about: {
          "@type": "Thing",
          name: "Ethereum Deposit Contract",
          description:
            "Official Ethereum deposit contract address for staking validators",
        },
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}