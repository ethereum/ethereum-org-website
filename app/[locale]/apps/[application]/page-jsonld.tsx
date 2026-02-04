import { AppData, FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/organisms/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd, slugify } from "@/lib/utils/url"

export default async function AppsAppJsonLD({
  locale,
  app,
  contributors,
}: {
  locale: string
  app: AppData
  contributors: FileContributor[]
}) {
  const url = normalizeUrlForJsonLd(locale, `/apps/${slugify(app.name)}`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        name: `Ethereum Apps - ${app.name}`,
        description: app.description,
        url: url,
        inLanguage: locale,
        contributor: contributorList,
        author: [ethereumCommunityOrganization],
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://ethereum.org/#website",
          name: "ethereum.org",
          url: "https://ethereum.org",
        },
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
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
        mainEntity: { "@id": `${url}#applications` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${url}#applications`,
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
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
