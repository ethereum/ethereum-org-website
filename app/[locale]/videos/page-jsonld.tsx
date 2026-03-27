import { getTranslations } from "next-intl/server"

import type { VideoCardData } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"
import { getDefaultThumbnailUrl } from "@/lib/utils/videos"

export default async function VideosPageJsonLD({
  locale,
  videos,
}: {
  locale: string
  videos: VideoCardData[]
}) {
  const t = await getTranslations({ namespace: "page-videos" })

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
        itemListElement: videos.slice(0, 10).map((video, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: video.title,
          url: normalizeUrlForJsonLd(locale, `/videos/${video.slug}/`),
          item: {
            "@type": "VideoObject",
            name: video.title,
            description: video.description,
            thumbnailUrl:
              video.thumbnailUrl || getDefaultThumbnailUrl(video.youtubeId),
            uploadDate: `${video.uploadDate}T00:00:00+00:00`,
            embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
            contentUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
            educationalLevel: video.educationLevel,
            inLanguage: locale,
            publisher: ethereumFoundationOrganization,
            isAccessibleForFree: true,
          },
        })),
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
