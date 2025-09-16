import { getTranslations } from "next-intl/server"

import { Framework } from "@/lib/interfaces"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function LocalEnvironmentJsonLD({
  locale,
  frameworksListData,
}: {
  locale: string
  frameworksListData: Framework[]
}) {
  const t = await getTranslations({
    namespace: "page-developers-local-environment",
  })

  const url = normalizeUrlForJsonLd(locale, `/developers/local-environment/`)

  // JSON-LD structured data for the developers local environment page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-local-environment-setup-meta-title"),
    description: t("page-local-environment-setup-meta-desc"),
    url: url,
    inLanguage: locale,
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
          name: t("page-local-environment-setup-meta-title"),
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
        url: "https://ethereum.org/favicon-32x32.png",
      },
    },
    reviewedBy: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/favicon-32x32.png",
      },
    },
  }

  const developmentFrameworksJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ethereum Development Frameworks",
    description:
      "Tools and frameworks for setting up local Ethereum development environments",
    url: url,
    numberOfItems: frameworksListData.length,
    itemListElement: frameworksListData.map((framework, index) => ({
      "@type": "SoftwareApplication",
      position: index + 1,
      name: framework.name,
      description: framework.description,
      url: framework.url,
      applicationCategory: "DeveloperApplication",
      operatingSystem: ["Windows", "macOS", "Linux"],
      author: [
        {
          "@type": "Organization",
          name: framework.githubUrl || "Community",
        },
      ],
      downloadUrl: framework.url,
      sameAs: framework.githubUrl,
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
        url: "https://ethereum.org/favicon-32x32.png",
      },
    },
  }

  return (
    <PageJsonLD structuredData={[webPageJsonLd, developmentFrameworksJsonLd]} />
  )
}
