import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import LearningTools from "./_components/learning-tools"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/developers/learning-tools"
  )
  const messages = pick(allMessages, requiredNamespaces)

  const t = await getTranslations({
    locale,
    namespace: "page-developers-learning-tools",
  })

  // JSON-LD structured data for the developers learning tools page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://ethereum.org/${locale}/developers/learning-tools/`,
    name: t("page-learning-tools-meta-title"),
    description: t("page-learning-tools-meta-desc"),
    url: `https://ethereum.org/${locale}/developers/learning-tools/`,
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
          name: t("page-learning-tools-meta-title"),
          item: `https://ethereum.org/${locale}/developers/learning-tools/`,
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

  return (
    <>
      <script
        id="jsonld-webpage-learning-tools"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />

      <I18nProvider locale={locale} messages={messages}>
        <LearningTools locale={locale} />
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
    namespace: "page-developers-learning-tools",
  })

  return await getMetadata({
    locale,
    slug: ["developers", "learning-tools"],
    title: t("page-learning-tools-meta-title"),
    description: t("page-learning-tools-meta-desc"),
  })
}

export default Page
