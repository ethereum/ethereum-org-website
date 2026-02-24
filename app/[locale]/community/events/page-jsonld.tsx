import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { getLocaleYear } from "@/lib/utils/date"
import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function EventsJsonLD({
  locale,
  contributors,
}: {
  locale: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations({ namespace: "page-community-events" })
  const common = await getTranslations({ namespace: "common" })

  const year = getLocaleYear(locale)
  const url = normalizeUrlForJsonLd(locale, `/community/events/`)

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
        name: t("page-events-meta-title", { year }),
        description: t("page-events-meta-description", { year }),
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
              name: "Community",
              item: normalizeUrlForJsonLd(locale, "/community/"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: common("events"),
              item: url,
            },
          ],
        },
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
        mainEntity: { "@id": `${url}#sections` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#sections`,
        name: t("page-events-meta-title", { year }),
        description: t("page-events-meta-description", { year }),
        url: url,
        numberOfItems: 4,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: t("page-events-section-hubs"),
            description: t("page-events-section-hubs-subtitle"),
            url: `${url}#community-hubs`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t("page-events-section-local-meetups"),
            description: t("page-events-section-local-meetups-subtitle"),
            url: normalizeUrlForJsonLd(locale, "/community/events/meetups/"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: t("page-events-section-upcoming-conferences"),
            description: t("page-events-section-upcoming-conferences-subtitle"),
            url: normalizeUrlForJsonLd(
              locale,
              "/community/events/conferences/"
            ),
          },
          {
            "@type": "ListItem",
            position: 4,
            name: t("page-events-section-organizers"),
            description: t("page-events-section-organizers-subtitle"),
            url: `${url}#for-organizers`,
          },
        ],
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
