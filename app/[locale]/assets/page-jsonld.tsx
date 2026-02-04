import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/organisms/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        name: t("page-assets-meta-title"),
        description: t("page-assets-meta-desc"),
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
              name: t("page-assets-meta-title"),
              item: normalizeUrlForJsonLd(locale, "/assets/"),
            },
          ],
        },
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
        mainEntity: { "@id": `${url}#assets` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#assets`,
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
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
