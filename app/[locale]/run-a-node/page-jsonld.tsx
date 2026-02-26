import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function RunANodePageJsonLD({
  locale,
  lastEditLocaleTimestamp,
  contributors,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations({
    namespace: "page-run-a-node",
  })

  const url = normalizeUrlForJsonLd(locale, `/run-a-node/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        name: t("page-run-a-node-title"),
        description: t("page-run-a-node-hero-subtitle"),
        url: url,
        inLanguage: locale,
        contributor: contributorList,
        author: [ethereumCommunityOrganization],
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
              name: t("page-run-a-node-title"),
              item: url,
            },
          ],
        },
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
        mainEntity: { "@id": `${url}#run-a-node` },
      },
      {
        "@type": "Article",
        "@id": `${url}#run-a-node`,
        headline: t("page-run-a-node-title"),
        description: t("page-run-a-node-hero-subtitle"),
        image: "https://ethereum.org/images/run-a-node/ethereum-inside.png",
        author: [ethereumCommunityOrganization],
        contributor: contributorList,
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
        about: {
          "@type": "Thing",
          name: "Running an Ethereum Node",
          description:
            "Guide to running your own Ethereum node, benefits, and requirements",
        },
        dateModified: lastEditLocaleTimestamp,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
