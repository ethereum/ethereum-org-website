import { getTranslations } from "next-intl/server"

import { Lang, WalletData } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function FindWalletPageJsonLD({
  locale,
  wallets,
}: {
  locale: Lang | undefined
  wallets: WalletData[]
}) {
  const t = await getTranslations({
    namespace: "page-find-wallet",
  })

  const url = normalizeUrlForJsonLd(locale, `/wallets/find-wallet/`)

  // JSON-LD structured data for the Find Wallet page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-find-wallet-meta-title"),
    description: t("page-find-wallet-meta-description"),
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
          name: "Wallets",
          item: normalizeUrlForJsonLd(locale, "/wallets/"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: t("page-find-wallet-meta-title"),
          item: url,
        },
      ],
    },
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

  // JSON-LD for the wallet finder article content
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-find-wallet-title"),
    description: t("page-find-wallet-meta-description"),
    image: "https://ethereum.org/images/wallets/wallet-hero.png",
    author: [
      {
        "@type": "Organization",
        name: "ethereum.org",
        url: "https://ethereum.org",
      },
    ],
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
    <PageJsonLD
      structuredData={[webPageJsonLd, articleJsonLd, walletDirectoryJsonLd]}
    />
  )
}
