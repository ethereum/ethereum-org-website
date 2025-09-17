import { getTranslations } from "next-intl/server"

import { FileContributor, ITutorial } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function TutorialsPageJsonLD({
  locale,
  internalTutorials,
  contributors,
}: {
  locale: string
  internalTutorials: ITutorial[]
  contributors: FileContributor[]
}) {
  const t = await getTranslations({ namespace: "page-developers-tutorials" })

  const url = normalizeUrlForJsonLd(locale, `/developers/tutorials/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // JSON-LD structured data for the developers tutorials page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-tutorials-meta-title"),
    description: t("page-tutorials-meta-description"),
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

  const tutorialCollectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("page-tutorial-title"),
    description: t("page-tutorials-meta-description"),
    url: url,
    numberOfItems: internalTutorials.length,
    itemListElement: internalTutorials.slice(0, 10).map((tutorial, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tutorial.title,
      description: tutorial.description,
      url: tutorial.href,
    })),
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
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

  const courseListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("page-tutorial-title"),
    description: t("page-tutorials-meta-description"),
    url: url,
    numberOfItems: internalTutorials.length,
    itemListElement: internalTutorials.slice(0, 10).map((tutorial, index) => ({
      "@type": "Course",
      name: tutorial.title,
      description: tutorial.description,
      url: tutorial.href,
      provider: {
        "@type": "Organization",
        name: "ethereum.org",
        url: "https://ethereum.org",
      },
      courseMode: "online",
      educationalLevel: "beginner-intermediate",
      inLanguage: locale,
      isAccessibleForFree: true,
      about: [
        "Ethereum Development",
        "Smart Contracts",
        "Blockchain Programming",
        "Web3",
      ],
      position: index + 1,
    })),
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
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

  return (
    <PageJsonLD
      structuredData={[
        webPageJsonLd,
        tutorialCollectionJsonLd,
        courseListJsonLd,
      ]}
    />
  )
}
