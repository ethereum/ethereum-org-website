import { getTranslations } from "next-intl/server"

import type { VideoCardData } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES, REFERENCE } from "@/lib/jsonld/constants"

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
      ...BASE_GRAPH_NODES,
      {
        "@type": "VideoGallery",
        "@id": url,
        name: t("page-videos-meta-title"),
        description: t("page-videos-meta-description"),
        url: url,
        inLanguage: locale,
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        isPartOf: REFERENCE.ETHEREUM_ORG_WEBSITE,
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
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
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
