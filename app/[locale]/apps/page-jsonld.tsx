import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { appsCategories } from "@/data/apps/categories"

export default async function AppsJsonLD({
  locale,
  contributors,
}: {
  locale: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations({ namespace: "page-apps" })

  const url = normalizeUrlForJsonLd(locale, "/apps/")

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // JSON-LD structured data for the apps page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-apps-meta-title"),
    description: t("page-apps-meta-description"),
    url: url,
    inLanguage: locale,
    contributor: contributorList,
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
          name: t("page-apps-meta-title"),
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

  const appCategoriesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("page-apps-categories-title"),
    description: t("page-apps-meta-description"),
    url: url,
    numberOfItems: Object.keys(appsCategories).length,
    itemListElement: Object.values(appsCategories).map((category, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: t(category.name),
      description: t(category.description),
      url: normalizeUrlForJsonLd(locale, `/apps/categories/${category.slug}`),
    })),
  }

  return <PageJsonLD structuredData={[webPageJsonLd, appCategoriesJsonLd]} />
}
