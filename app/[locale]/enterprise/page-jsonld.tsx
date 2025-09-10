import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function EnterprisePageJsonLD({
  locale,
}: {
  locale: string
}) {
  const t = await getTranslations({
    namespace: "page-enterprise",
  })

  const url = normalizeUrlForJsonLd(locale, `/enterprise/`)

  // JSON-LD structured data for the enterprise page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-enterprise-hero-title"),
    description: t("page-enterprise-metadata-description"),
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
          name: t("page-enterprise-hero-breadcrumb"),
          item: normalizeUrlForJsonLd(locale, "/enterprise/"),
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
