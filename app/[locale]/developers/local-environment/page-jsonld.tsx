import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"
import { Framework } from "@/lib/interfaces"

import PageJsonLD from "@/components/organisms/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function LocalEnvironmentJsonLD({
  locale,
  frameworksListData,
  contributors,
}: {
  locale: string
  frameworksListData: Framework[]
  contributors: FileContributor[]
}) {
  const t = await getTranslations({
    namespace: "page-developers-local-environment",
  })

  const url = normalizeUrlForJsonLd(locale, `/developers/local-environment/`)

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
        name: t("page-local-environment-setup-meta-title"),
        description: t("page-local-environment-setup-meta-desc"),
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
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
        mainEntity: { "@id": `${url}#local-environment` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#local-environment`,
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
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
