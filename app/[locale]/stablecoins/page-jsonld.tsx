import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumCommunityReference,
  ethereumFoundationOrganization,
  ethereumFoundationReference,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function StablecoinsPageJsonLD({ locale, contributors }) {
  const t = await getTranslations("page-stablecoins")

  const url = normalizeUrlForJsonLd(locale, `/stablecoins/`)

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
        name: t("page-stablecoins-meta-title"),
        description: t("page-stablecoins-meta-description"),
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
              name: t("page-stablecoins-meta-title"),
              item: url,
            },
          ],
        },
        publisher: ethereumFoundationReference,
        reviewedBy: ethereumFoundationReference,
        mainEntity: { "@id": `${url}#stablecoins` },
      },
      {
        "@type": "Article",
        "@id": `${url}#stablecoins`,
        headline: t("page-stablecoins-title"),
        description: t("page-stablecoins-meta-description"),
        image: "https://ethereum.org/images/stablecoins/hero.png",
        author: [ethereumCommunityReference],
        contributor: contributorList,
        publisher: ethereumFoundationReference,
        reviewedBy: ethereumFoundationReference,
        about: {
          "@type": "Thing",
          name: "Stablecoins",
          description:
            "Digital currencies pegged to stable assets like the US dollar",
        },
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
