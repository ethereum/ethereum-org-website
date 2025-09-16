import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function FoundersPageJsonLD({
  locale,
}: {
  locale: string
}) {
  const t = await getTranslations({
    namespace: "page-founders",
  })

  const url = normalizeUrlForJsonLd(locale, `/founders/`)

  // JSON-LD structured data for the founders page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-founders-metadata-title"),
    description: t("page-founders-metadata-description"),
    url: url,
    inLanguage: locale,
    author: [
      {
        "@type": "Organization",
        name: "ethereum.org",
        url: "https://ethereum.org",
      },
    ],
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
          name: t("page-founders-metadata-title"),
          item: normalizeUrlForJsonLd(locale, "/founders/"),
        },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/favicon-32x32.png",
      },
    },
    reviewedBy: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/favicon-32x32.png",
      },
    },
  }

  return <PageJsonLD structuredData={[webPageJsonLd]} />
}
