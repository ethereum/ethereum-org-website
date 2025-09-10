import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function BugBountyJsonLD({ locale }: { locale: string }) {
  const t = await getTranslations({ namespace: "page-bug-bounty" })

  const url = normalizeUrlForJsonLd(locale, `/bug-bounty/`)

  // JSON-LD structured data for the bug bounty page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-upgrades-bug-bounty-meta-title"),
    description: t("page-upgrades-bug-bounty-meta-description"),
    url: url,
    inLanguage: locale,
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
          name: t("page-upgrades-bug-bounty-meta-title"),
          item: normalizeUrlForJsonLd(locale, "/bug-bounty/"),
        },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/favicon-32x32.png",
      },
    },
  }

  return <PageJsonLD structuredData={[webPageJsonLd]} />
}
