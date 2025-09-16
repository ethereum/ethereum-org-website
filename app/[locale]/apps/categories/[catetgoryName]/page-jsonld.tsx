import { getTranslations } from "next-intl/server"

import { AppCategoryData, AppData } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function AppsCategoryJsonLD({
  locale,
  categoryName,
  category,
  appsData,
}: {
  locale: string
  categoryName: string
  category: AppCategoryData
  appsData: Record<string, AppData[]>
}) {
  const t = await getTranslations({ namespace: "page-apps" })

  const url = normalizeUrlForJsonLd(locale, `/apps/categories/${categoryName}`)
  // Get apps for this category
  const categoryApps = appsData[categoryName] || []

  // JSON-LD structured data for the apps category page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t(category.metaTitle),
    description: t(category.metaDescription),
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
          name: "Apps",
          item: normalizeUrlForJsonLd(locale, "/apps/"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: t(category.name),
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

  const categoryAppsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t(category.name),
    description: t(category.description),
    url: url,
    numberOfItems: categoryApps.length,
    itemListElement: categoryApps.slice(0, 10).map((app, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: app.name,
      description: app.description,
      url: app.url,
    })),
  }

  return <PageJsonLD structuredData={[webPageJsonLd, categoryAppsJsonLd]} />
}
