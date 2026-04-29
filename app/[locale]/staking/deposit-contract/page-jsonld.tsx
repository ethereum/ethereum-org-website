import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES, REFERENCE } from "@/lib/jsonld/constants"

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
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        "@id": url,
        name: t("page-staking-deposit-contract-title"),
        description: t("page-staking-deposit-contract-subtitle"),
        url: url,
        inLanguage: locale,
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
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
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
