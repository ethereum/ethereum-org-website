import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import { ethereumFoundationOrganization } from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function StablecoinsPageJsonLD({ locale, contributors }) {
  const t = await getTranslations({
    namespace: "page-stablecoins",
  })

  const url = normalizeUrlForJsonLd(locale, `/stablecoins/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // JSON-LD structured data for the Stablecoins page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-stablecoins-meta-title"),
    description: t("page-stablecoins-meta-description"),
    url: url,
    inLanguage: locale,
    contributor: contributorList,
    author: [ethereumFoundationOrganization],
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
    publisher: ethereumFoundationOrganization,
    reviewedBy: ethereumFoundationOrganization,
  }

  // JSON-LD for the stablecoins article content
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-stablecoins-title"),
    description: t("page-stablecoins-meta-description"),
    image: "https://ethereum.org/images/stablecoins/hero.png",
    author: [ethereumFoundationOrganization],
    contributor: contributorList,
    publisher: ethereumFoundationOrganization,
    reviewedBy: ethereumFoundationOrganization,
    about: {
      "@type": "Thing",
      name: "Stablecoins",
      description:
        "Digital currencies pegged to stable assets like the US dollar",
    },
  }

  return <PageJsonLD structuredData={[webPageJsonLd, articleJsonLd]} />
}
