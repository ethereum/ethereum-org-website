import { getTranslations } from "next-intl/server"

import type { VideoCardData } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function VideosPageJsonLD({
  locale,
  videos,
}: {
  locale: string
  videos: VideoCardData[]
}) {
  const t = await getTranslations("page-videos")

  const url = normalizeUrlForJsonLd(locale, `/videos/`)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": url,
        name: t("page-videos-meta-title"),
        description: t("page-videos-meta-description"),
        url: url,
        inLanguage: locale,
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
              name: t("page-videos-hero-title"),
              item: url,
            },
          ],
        },
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
        mainEntity: { "@id": `${url}#video-list` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#video-list`,
        name: t("page-videos-hero-title"),
        description: t("page-videos-meta-description"),
        numberOfItems: videos.length,
        itemListElement: [...videos]
          .sort((a, b) =>
            b.uploadDate > a.uploadDate
              ? 1
              : b.uploadDate < a.uploadDate
                ? -1
                : 0
          )
          .slice(0, 10)
          .map((video, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: video.title,
            url: normalizeUrlForJsonLd(locale, `/videos/${video.slug}/`),
          })),
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
