import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function LearningToolsJsonLD({
  locale,
}: {
  locale: string
}) {
  const t = await getTranslations({
    namespace: "page-developers-learning-tools",
  })

  const url = normalizeUrlForJsonLd(locale, `/developers/learning-tools/`)

  // JSON-LD structured data for the developers learning tools page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-learning-tools-meta-title"),
    description: t("page-learning-tools-meta-desc"),
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
          name: "Developers",
          item: normalizeUrlForJsonLd(locale, "/developers/"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: t("page-learning-tools-meta-title"),
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
