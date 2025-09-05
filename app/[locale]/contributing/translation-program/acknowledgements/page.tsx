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

import Acknowledgements from "./_components/acknowledgements"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/contributing/translation-program/acknowledgements"
  )
  const messages = pick(allMessages, requiredNamespaces)

  const t = await getTranslations({
    locale,
    namespace: "page-contributing-translation-program-acknowledgements",
  })

  // JSON-LD structured data for the translation acknowledgements page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://ethereum.org/${locale}/contributing/translation-program/acknowledgements/`,
    name: t(
      "page-contributing-translation-program-acknowledgements-meta-title"
    ),
    description: t(
      "page-contributing-translation-program-acknowledgements-meta-description"
    ),
    url: `https://ethereum.org/${locale}/contributing/translation-program/acknowledgements/`,
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
          name: "Contributing",
          item: `https://ethereum.org/${locale}/contributing/`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Translation Program",
          item: `https://ethereum.org/${locale}/contributing/translation-program/`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: t(
            "page-contributing-translation-program-acknowledgements-meta-title"
          ),
          item: `https://ethereum.org/${locale}/contributing/translation-program/acknowledgements/`,
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
        id="jsonld-webpage-translation-acknowledgements"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />
      <I18nProvider locale={locale} messages={messages}>
        <Acknowledgements />
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
    namespace: "page-contributing-translation-program-acknowledgements",
  })

  return await getMetadata({
    locale,
    slug: ["contributing", "translation-program", "acknowledgements"],
    title: t(
      "page-contributing-translation-program-acknowledgements-meta-title"
    ),
    description: t(
      "page-contributing-translation-program-acknowledgements-meta-description"
    ),
  })
}

export default Page
