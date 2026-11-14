import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { getBreadcrumbListJsonLd } from "@/lib/jsonld/breadcrumbs"
import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

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
        url,
        inLanguage: locale,
        isPartOf: REFERENCE.ETHEREUM_ORG_WEBSITE,
        breadcrumb: await getBreadcrumbListJsonLd(
          locale,
          "staking/deposit-contract"
        ),
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
