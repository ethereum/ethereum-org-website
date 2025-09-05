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

import AssetsPage from "./_components/assets"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Lang }>
}) {
  const { locale } = await params

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/assets")
  const messages = pick(allMessages, requiredNamespaces)

  const t = await getTranslations({ locale, namespace: "page-assets" })

  // JSON-LD structured data for the assets page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://ethereum.org/${locale}/assets/`,
    name: t("page-assets-meta-title"),
    description: t("page-assets-meta-desc"),
    url: `https://ethereum.org/${locale}/assets/`,
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
          name: t("page-assets-meta-title"),
          item: `https://ethereum.org/${locale}/assets/`,
        },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "Ethereum Foundation - Digital Studio",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/favicon-32x32.png",
      },
    },
  }

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("page-assets-h1"),
    description: t("page-assets-meta-desc"),
    url: `https://ethereum.org/${locale}/assets/`,
    numberOfItems: 3,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("page-assets-illustrations"),
        description:
          "Artistic works by Liam Cobb, Viktor Hachmang, Patrick Atkins, and others",
        url: `https://ethereum.org/${locale}/assets/#illustrations`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("page-assets-historical-artwork"),
        description: "Historical Ethereum artwork and graphics",
        url: `https://ethereum.org/${locale}/assets/#historical`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: t("page-assets-ethereum-brand-assets"),
        description: "Official Ethereum brand assets, logos, and graphics",
        url: `https://ethereum.org/${locale}/assets/#brand`,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Ethereum Foundation - Digital Studio",
      url: "https://ethereum.org",
    },
  }

  return (
    <>
      <script
        id="jsonld-webpage-assets"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />
      <script
        id="jsonld-assets-collection"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(creativeWorkJsonLd),
        }}
      />
      <I18nProvider locale={locale} messages={messages}>
        <AssetsPage />
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

  const t = await getTranslations({ locale, namespace: "page-assets" })

  return await getMetadata({
    locale,
    slug: ["assets"],
    title: t("page-assets-meta-title"),
    description: t("page-assets-meta-desc"),
  })
}
