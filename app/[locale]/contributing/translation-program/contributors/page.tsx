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

import Contributors from "./_components/contributors"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/contributing/translation-program/contributors"
  )
  const messages = pick(allMessages, requiredNamespaces)

  const t = await getTranslations({
    locale,
    namespace: "page-contributing-translation-program-contributors",
  })

  // JSON-LD structured data for the translation contributors page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://ethereum.org/${locale}/contributing/translation-program/contributors/`,
    name: t("page-contributing-translation-program-contributors-meta-title"),
    description: t(
      "page-contributing-translation-program-contributors-meta-description"
    ),
    url: `https://ethereum.org/${locale}/contributing/translation-program/contributors/`,
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
            "page-contributing-translation-program-contributors-meta-title"
          ),
          item: `https://ethereum.org/${locale}/contributing/translation-program/contributors/`,
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
        id="jsonld-webpage-translation-contributors"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />
      <I18nProvider locale={locale} messages={messages}>
        <Contributors />
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
    namespace: "page-contributing-translation-program-contributors",
  })

  return await getMetadata({
    locale,
    slug: ["contributing", "translation-program", "contributors"],
    title: t("page-contributing-translation-program-contributors-meta-title"),
    description: t(
      "page-contributing-translation-program-contributors-meta-description"
    ),
  })
}

export default Page
