import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { Lang } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import FindWalletProductTable from "@/components/FindWalletProductTable/lazy"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import {
  getNonSupportedLocaleWallets,
  getSupportedLanguages,
  getSupportedLocaleWallets,
} from "@/lib/utils/wallets"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params
  const t = await getTranslations({
    locale,
    namespace: "page-wallets-find-wallet",
  })

  setRequestLocale(locale)

  const supportedLocaleWallets = getSupportedLocaleWallets(locale!)
  const noSupportedLocaleWallets = getNonSupportedLocaleWallets(locale!)
  const walletsData = supportedLocaleWallets.concat(noSupportedLocaleWallets)

  const wallets = walletsData.map((wallet) => ({
    ...wallet,
    supportedLanguages: getSupportedLanguages(
      wallet.languages_supported,
      locale!
    ),
  }))

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/wallets/find-wallet"
  )
  const messages = pick(allMessages, requiredNamespaces)

  // JSON-LD structured data for the Find Wallet page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://ethereum.org/${locale}/wallets/find-wallet/`,
    name: t("page-find-wallet-meta-title"),
    description: t("page-find-wallet-meta-description"),
    url: `https://ethereum.org/${locale}/wallets/find-wallet/`,
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
          name: "Wallets",
          item: `https://ethereum.org/${locale}/wallets/`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: t("page-find-wallet-meta-title"),
          item: `https://ethereum.org/${locale}/wallets/find-wallet/`,
        },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
  }

  // JSON-LD for the wallet finder article content
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-find-wallet-title"),
    description: t("page-find-wallet-meta-description"),
    image: "https://ethereum.org/images/wallets/wallet-hero.png",
    author: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
    about: {
      "@type": "Thing",
      name: "Ethereum Wallet Finder",
      description:
        "Tool to find and compare Ethereum wallets based on features and requirements",
    },
  }

  // JSON-LD for the wallet directory list
  const walletDirectoryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ethereum Wallet Directory",
    description:
      "Comprehensive list of Ethereum wallets with features and comparisons",
    numberOfItems: wallets.length,
    itemListElement: wallets.slice(0, 20).map((wallet, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        additionalType: "https://schema.org/SoftwareApplication",
        name: wallet.name,
        description: `${wallet.name} Ethereum wallet`,
        category: "Cryptocurrency Wallet",
        url: wallet.url,
        applicationCategory: "Finance",
        operatingSystem: "Multiple platforms",
      },
    })),
  }

  return (
    <>
      <script
        id="jsonld-webpage-find-wallet"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />

      <script
        id="jsonld-article-find-wallet"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />

      <script
        id="jsonld-wallet-directory"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(walletDirectoryJsonLd),
        }}
      />

      <I18nProvider locale={locale} messages={messages}>
        <MainArticle className="relative flex flex-col">
          <div className="flex w-full flex-col gap-8 px-4 pb-4 pt-11 md:w-1/2">
            <Breadcrumbs slug="wallets/find-wallet" />
            <h1 className="text-[2.5rem] leading-[1.4] md:text-5xl">
              {t("page-find-wallet-title")}
            </h1>
            <p className="mb-6 text-xl leading-[1.4] text-body-medium last:mb-8">
              {t("page-find-wallet-description")}
            </p>
          </div>

          <FindWalletProductTable wallets={wallets} />
        </MainArticle>
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
    namespace: "page-wallets-find-wallet",
  })

  return await getMetadata({
    locale,
    slug: ["wallets", "find-wallet"],
    title: t("page-find-wallet-meta-title"),
    description: t("page-find-wallet-meta-description"),
    image: "/images/wallets/wallet-hero.png",
  })
}

export default Page
