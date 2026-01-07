import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

type EventsJsonLDProps = {
  locale: string
  contributors: FileContributor[]
}

const EventsJsonLD = async ({ locale, contributors }: EventsJsonLDProps) => {
  const t = await getTranslations({ locale, namespace: "page-events" })

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("page-events-meta-title"),
    description: t("page-events-meta-description"),
    url: `https://ethereum.org/${locale}/events`,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
    about: {
      "@type": "Thing",
      name: "Ethereum Events",
      description: "Community events, conferences, and meetups for Ethereum",
    },
    contributor: contributors.map((c) => ({
      "@type": "Person",
      name: c.login,
      url: c.html_url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default EventsJsonLD
