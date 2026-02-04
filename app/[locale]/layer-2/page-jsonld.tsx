import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/organisms/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function Layer2PageJsonLD({
  locale,
  contributors,
}: {
  locale: Lang | undefined
  contributors: FileContributor[]
}) {
  const t = await getTranslations({
    namespace: "page-layer-2",
  })

  const url = normalizeUrlForJsonLd(locale, `/layer-2/`)

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
        name: t("page-layer-2-meta-title"),
        description: t("page-layer-2-meta-description"),
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
              name: t("page-layer-2-meta-title"),
              item: url,
            },
          ],
        },
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
        mainEntity: { "@id": `${url}#layer-2` },
      },
      {
        "@type": "Article",
        "@id": `${url}#layer-2`,
        headline: t("page-layer-2-hero-title"),
        description: t("page-layer-2-meta-description"),
        image: "https://ethereum.org/images/layer-2/learn-hero.png", // TODO: adjust value when the old theme breakpoints are removed (src/theme.ts)
        author: [ethereumCommunityOrganization],
        contributor: contributorList,
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#layer-2-faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: t("page-layer-2-faq-ExpandableCard-1-title"),
            acceptedAnswer: {
              "@type": "Answer",
              text: `${t("page-layer-2-faq-ExpandableCard-1-description-1")} ${t("page-layer-2-faq-ExpandableCard-1-description-2")}`,
            },
          },
          {
            "@type": "Question",
            name: t("page-layer-2-faq-ExpandableCard-2-title"),
            acceptedAnswer: {
              "@type": "Answer",
              text: `${t("page-layer-2-faq-ExpandableCard-2-description-1")} ${t("page-layer-2-faq-ExpandableCard-2-description-2")}`,
            },
          },
          {
            "@type": "Question",
            name: t("page-layer-2-faq-ExpandableCard-3-title"),
            acceptedAnswer: {
              "@type": "Answer",
              text: t("page-layer-2-faq-ExpandableCard-3-description"),
            },
          },
          {
            "@type": "Question",
            name: t("page-layer-2-faq-ExpandableCard-4-title"),
            acceptedAnswer: {
              "@type": "Answer",
              text: t("page-layer-2-faq-ExpandableCard-4-description"),
            },
          },
        ],
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
