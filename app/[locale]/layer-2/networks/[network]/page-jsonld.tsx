import type { CatalogNetwork } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { getNetworkHref } from "@/lib/utils/networkData"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { getBreadcrumbListJsonLd } from "@/lib/jsonld/breadcrumbs"
import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function NetworkDetailPageJsonLD({
  locale,
  network,
  description,
}: {
  locale: string
  network: CatalogNetwork
  description: string
}) {
  const url = normalizeUrlForJsonLd(locale, getNetworkHref(network.slug))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        "@id": url,
        name: network.name,
        description,
        url,
        inLanguage: locale,
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        isPartOf: REFERENCE.ETHEREUM_ORG_WEBSITE,
        breadcrumb: await getBreadcrumbListJsonLd(
          locale,
          `/layer-2/networks/${network.slug}`,
          network.name
        ),
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        about: {
          "@type": "Thing",
          name: network.name,
          description,
          url: network.website,
          sameAs: [network.l2BeatLink, network.growthepieLink],
        },
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
