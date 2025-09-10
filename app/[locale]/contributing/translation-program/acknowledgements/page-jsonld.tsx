import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function AcknowledgementsJsonLD({
  locale,
}: {
  locale: string
}) {
  const t = await getTranslations({
    namespace: "page-contributing-translation-program-acknowledgements",
  })

  const url = normalizeUrlForJsonLd(
    locale,
    `/contributing/translation-program/acknowledgements/`
  )

  // JSON-LD structured data for the translation acknowledgements page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t(
      "page-contributing-translation-program-acknowledgements-meta-title"
    ),
    description: t(
      "page-contributing-translation-program-acknowledgements-meta-description"
    ),
    url: url,
    inLanguage: locale,
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
          name: "Contributing",
          item: normalizeUrlForJsonLd(locale, "/contributing/"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Translation Program",
          item: normalizeUrlForJsonLd(
            locale,
            "/contributing/translation-program/"
          ),
        },
        {
          "@type": "ListItem",
          position: 4,
          name: t(
            "page-contributing-translation-program-acknowledgements-meta-title"
          ),
          item: url,
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
  }

  return <PageJsonLD structuredData={[webPageJsonLd]} />
}
