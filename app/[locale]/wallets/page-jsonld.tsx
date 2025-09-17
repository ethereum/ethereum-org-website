import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function WalletsPageJsonLD({
  locale,
  types,
  lastEditLocaleTimestamp,
  contributors,
}) {
  const t = await getTranslations({
    namespace: "page-find-wallet",
  })

  const url = normalizeUrlForJsonLd(locale, `/wallets/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // JSON-LD structured data for the Wallets page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-wallets-meta-title"),
    description: t("page-wallets-meta-description"),
    url: url,
    inLanguage: locale,
    contributor: contributorList,
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
          name: t("page-wallets-meta-title"),
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
        url: "https://ethereum.org/images/eth-home-icon.png",
      },
    },
  }

  // JSON-LD for the wallets guide article content
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-wallets-title"),
    description: t("page-wallets-meta-description"),
    image: "https://ethereum.org/images/wallets/wallet-hero.png",
    author: [
      {
        "@type": "Organization",
        name: "ethereum.org",
        url: "https://ethereum.org",
      },
    ],
    contributor: contributorList,
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
        url: "https://ethereum.org/images/eth-home-icon.png",
      },
    },
    about: {
      "@type": "Thing",
      name: "Ethereum Wallets",
      description:
        "Complete guide to Ethereum wallets, types, features, and how to use them safely",
    },
    dateModified: lastEditLocaleTimestamp,
  }

  // JSON-LD for the wallet types list
  const walletTypesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ethereum Wallet Types",
    description: "Different types of Ethereum wallets available",
    itemListElement: types.map((type, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        additionalType: "https://schema.org/SoftwareApplication",
        category: "Cryptocurrency Wallet",
        name: `Ethereum ${type.emoji === ":cd:" ? "Hardware" : type.emoji === ":mobile_phone:" ? "Mobile" : type.emoji === ":desktop_computer:" ? "Desktop" : "Web"} Wallet`,
        description:
          typeof type.description === "string"
            ? type.description
            : `${type.emoji === ":cd:" ? "Hardware" : type.emoji === ":mobile_phone:" ? "Mobile" : type.emoji === ":desktop_computer:" ? "Desktop" : "Web"} wallet for Ethereum`,
      },
    })),
  }

  return (
    <PageJsonLD
      structuredData={[webPageJsonLd, articleJsonLd, walletTypesJsonLd]}
    />
  )
}
