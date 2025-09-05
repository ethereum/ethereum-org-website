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

import CommunityPage from "./_components/community"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Lang }>
}) {
  const { locale } = await params

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/community")
  const pickedMessages = pick(allMessages, requiredNamespaces)

  const t = await getTranslations({ locale, namespace: "page-community" })

  // JSON-LD structured data for the community page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://ethereum.org/${locale}/community/`,
    name: t("page-community-meta-title"),
    description: t("page-community-meta-description"),
    url: `https://ethereum.org/${locale}/community/`,
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
          name: t("page-community-meta-title"),
          item: `https://ethereum.org/${locale}/community/`,
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

  const communityResourcesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("page-community-meta-title"),
    description: t("page-community-meta-description"),
    url: `https://ethereum.org/${locale}/community/`,
    numberOfItems: 4,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("page-community-card-1-title"),
        description: t("page-community-card-1-description"),
        url: `https://ethereum.org/${locale}/community/online/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("page-community-card-2-title"),
        description: t("page-community-card-2-description"),
        url: `https://ethereum.org/${locale}/community/events/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: t("page-community-card-3-title"),
        description: t("page-community-card-3-description"),
        url: `https://ethereum.org/${locale}/community/get-involved/`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: t("page-community-card-4-title"),
        description: t("page-community-card-4-description"),
        url: `https://ethereum.org/${locale}/community/grants/`,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Ethereum Foundation",
      url: "https://ethereum.org",
    },
  }

  return (
    <>
      <script
        id="jsonld-webpage-community"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />
      <script
        id="jsonld-community-resources"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(communityResourcesJsonLd),
        }}
      />
      <I18nProvider locale={locale} messages={pickedMessages}>
        <CommunityPage />
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

  const t = await getTranslations({ locale, namespace: "page-community" })

  return await getMetadata({
    locale,
    slug: ["community"],
    title: t("page-community-meta-title"),
    description: t("page-community-meta-description"),
  })
}
