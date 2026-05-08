import { getTranslations } from "next-intl/server"

import { FileContributor, ITutorial } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function TutorialsPageJsonLD({
  locale,
  internalTutorials,
  contributors,
}: {
  locale: string
  internalTutorials: ITutorial[]
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-developers-tutorials")

  const url = normalizeUrlForJsonLd(locale, `/developers/tutorials/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        "@id": url,
        name: t("page-tutorials-meta-title"),
        description: t("page-tutorials-meta-description"),
        url,
        inLanguage: locale,
        contributor: contributorList,
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
              name: "Developers",
              item: normalizeUrlForJsonLd(locale, "/developers/"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: t("page-tutorial-title"),
              item: url,
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: { "@id": `${url}#tutorials` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#tutorials`,
        name: t("page-tutorial-title"),
        description: t("page-tutorials-meta-description"),
        url,
        numberOfItems: internalTutorials.length,
        itemListElement: internalTutorials
          .slice(0, 10)
          .map((tutorial, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: tutorial.title,
            url: normalizeUrlForJsonLd(locale, tutorial.href),
            item: {
              "@type": "Course",
              name: tutorial.title,
              description:
                tutorial.description.length > 60
                  ? tutorial.description.slice(0, 57) + "..."
                  : tutorial.description,
              url: normalizeUrlForJsonLd(locale, tutorial.href),
              provider: REFERENCE.ETHEREUM_FOUNDATION,
              courseMode: "online",
              educationalLevel: tutorial.skill ?? "beginner",
              inLanguage: locale,
              isAccessibleForFree: true,
              about: [
                "Ethereum Development",
                "Smart Contracts",
                "Blockchain Programming",
                "Web3",
              ],
            },
          })),
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
