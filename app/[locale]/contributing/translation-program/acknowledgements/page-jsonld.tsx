import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/organisms/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function AcknowledgementsJsonLD({
  locale,
  contributors,
}: {
  locale: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations({
    namespace: "page-contributing-translation-program-acknowledgements",
  })

  const url = normalizeUrlForJsonLd(
    locale,
    `/contributing/translation-program/acknowledgements/`
  )

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
        name: t(
          "page-contributing-translation-program-acknowledgements-meta-title"
        ),
        description: t(
          "page-contributing-translation-program-acknowledgements-meta-description"
        ),
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
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
