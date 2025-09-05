import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import LocalEnvironmentPage from "./_components/local-environment"

import { getLocalEnvironmentFrameworkData } from "@/lib/api/ghRepoData"

const loadData = dataLoader([
  ["frameworksListData", getLocalEnvironmentFrameworkData],
])

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  const [frameworksListData] = await loadData()

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/developers/local-environment"
  )
  const messages = pick(allMessages, requiredNamespaces)

  const t = await getTranslations({
    locale,
    namespace: "page-developers-local-environment",
  })

  // JSON-LD structured data for the developers local environment page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://ethereum.org/${locale}/developers/local-environment/`,
    name: t("page-local-environment-setup-meta-title"),
    description: t("page-local-environment-setup-meta-desc"),
    url: `https://ethereum.org/${locale}/developers/local-environment/`,
    inLanguage: locale,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `https://ethereum.org/${locale}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Developers",
          item: `https://ethereum.org/${locale}/developers/`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: t("page-local-environment-setup-meta-title"),
          item: `https://ethereum.org/${locale}/developers/local-environment/`,
        },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "Ethereum Foundation",
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
    url: `https://ethereum.org/${locale}/developers/local-environment/`,
    numberOfItems: frameworksListData.length,
    itemListElement: frameworksListData.map((framework, index) => ({
      "@type": "SoftwareApplication",
      position: index + 1,
      name: framework.name,
      description: framework.description,
      url: framework.url,
      applicationCategory: "DeveloperApplication",
      operatingSystem: ["Windows", "macOS", "Linux"],
      author: {
        "@type": "Organization",
        name: framework.githubUrl || "Community",
      },
      downloadUrl: framework.url,
      sameAs: framework.githubUrl,
    })),
    publisher: {
      "@type": "Organization",
      name: "Ethereum Foundation",
      url: "https://ethereum.org",
    },
  }

  return (
    <>
      <script
        id="jsonld-webpage-local-environment"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />
      <script
        id="jsonld-frameworks-local-environment"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(developmentFrameworksJsonLd),
        }}
      />
      <I18nProvider locale={locale} messages={messages}>
        <LocalEnvironmentPage frameworksList={frameworksListData} />
      </I18nProvider>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const t = await getTranslations({
    locale,
    namespace: "page-developers-local-environment",
  })

  return await getMetadata({
    locale,
    slug: ["developers", "local-environment"],
    title: t("page-local-environment-setup-meta-title"),
    description: t("page-local-environment-setup-meta-desc"),
  })
}

export default Page
