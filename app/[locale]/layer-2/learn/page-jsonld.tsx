import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumCommunityReference,
  ethereumFoundationOrganization,
  ethereumFoundationReference,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function Layer2LearnPageJsonLD({
  locale,
  lastEditLocaleTimestamp,
  contributors,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-layer-2-learn")

  const url = normalizeUrlForJsonLd(locale, `/layer-2/learn/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ethereumFoundationOrganization,
      ethereumCommunityOrganization,
      {
        "@type": "WebPage",
        "@id": url,
        name: t("page-layer-2-learn-meta-title"),
        description: t("page-layer-2-learn-description"),
        url: url,
        inLanguage: locale,
        contributor: contributorList,
        author: [ethereumCommunityReference],
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
              name: "Layer 2",
              item: normalizeUrlForJsonLd(locale, "/layer-2/"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: t("page-layer-2-learn-meta-title"),
              item: url,
            },
          ],
        },
        publisher: ethereumFoundationReference,
        reviewedBy: ethereumFoundationReference,
        mainEntity: { "@id": `${url}#layer-2-learn` },
      },
      {
        "@type": "Article",
        "@id": `${url}#layer-2-learn`,
        headline: t("page-layer-2-learn-title"),
        description: t("page-layer-2-learn-description"),
        image: "https://ethereum.org/images/layer-2/learn-hero.png", // TODO: adjust value when the old theme breakpoints are removed (src/theme.ts)
        author: [ethereumCommunityReference],
        publisher: ethereumFoundationReference,
        contributor: contributorList,
        reviewedBy: ethereumFoundationReference,
        dateModified: lastEditLocaleTimestamp,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
