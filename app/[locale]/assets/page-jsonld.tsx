import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function AssetsJsonLD({
  locale,
  contributors,
}: {
  locale: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations({ namespace: "page-assets" })

  const url = normalizeUrlForJsonLd(locale, `/assets/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // JSON-LD structured data for the assets page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-assets-meta-title"),
    description: t("page-assets-meta-desc"),
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
          name: t("page-assets-meta-title"),
          item: normalizeUrlForJsonLd(locale, "/assets/"),
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

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("page-assets-h1"),
    description: t("page-assets-meta-desc"),
    url: url,
    numberOfItems: 3,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("page-assets-illustrations"),
        description:
          "Artistic works by Liam Cobb, Viktor Hachmang, Patrick Atkins, and others",
        url: normalizeUrlForJsonLd(locale, "/assets/#illustrations"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("page-assets-historical-artwork"),
        description: "Historical Ethereum artwork and graphics",
        url: normalizeUrlForJsonLd(locale, "/assets/#historical"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: t("page-assets-ethereum-brand-assets"),
        description: "Official Ethereum brand assets, logos, and graphics",
        url: normalizeUrlForJsonLd(locale, "/assets/#brand"),
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
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

  return <PageJsonLD structuredData={[webPageJsonLd, creativeWorkJsonLd]} />
}
