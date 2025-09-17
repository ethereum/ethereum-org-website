import { AppData, FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function AppsAppJsonLD({
  locale,
  app,
  contributors,
}: {
  locale: string
  app: AppData
  contributors: FileContributor[]
}) {
  const url = normalizeUrlForJsonLd(locale, `/apps/${app.name}`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // JSON-LD structured data for the individual app page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: `Ethereum Apps - ${app.name}`,
    description: app.description,
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
          name: "Apps",
          item: normalizeUrlForJsonLd(locale, "/apps/"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: app.name,
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

  const softwareApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    url: app.url,
    image: app.image,
    applicationCategory: app.category,
    applicationSubCategory: app.subCategory.join(", "),
    operatingSystem: "Web Browser",
    author: [
      {
        "@type": "Organization",
        name: app.parentCompany,
      },
    ],
    datePublished: app.dateOfLaunch,
    dateModified: app.lastUpdated,
    inLanguage: app.languages,
    screenshot: app.screenshots.slice(0, 5),
    sameAs: [app.twitter, app.github, app.discord].filter(Boolean),
  }

  return (
    <PageJsonLD structuredData={[webPageJsonLd, softwareApplicationJsonLd]} />
  )
}
