import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function ContributorsJsonLD({
  locale,
  contributors,
}: {
  contributors: FileContributor[]
  locale: string
}) {
  const t = await getTranslations({
    namespace: "page-contributing-translation-program-contributors",
  })

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const url = normalizeUrlForJsonLd(
    locale,
    `/contributing/translation-program/contributors/`
  )

  // JSON-LD structured data for the translation contributors page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-contributing-translation-program-contributors-meta-title"),
    description: t(
      "page-contributing-translation-program-contributors-meta-description"
    ),
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
            "page-contributing-translation-program-contributors-meta-title"
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
        url: "https://ethereum.org/images/eth-home-icon.png",
      },
    },
    reviewedBy: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/images/eth-home-icon.png",
      },
    },
  }

  return <PageJsonLD structuredData={[webPageJsonLd]} />
}
