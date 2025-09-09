import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

interface TenYearJsonLdProps {
  locale: string
}

export default async function TenYearJsonLD({ locale }: TenYearJsonLdProps) {
  const t = await getTranslations({
    locale,
    namespace: "page-10-year-anniversary",
  })

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://ethereum.org/${locale}/10years/`,
    name: t("page-10-year-anniversary-meta-title"),
    description: t("page-10-year-anniversary-meta-description"),
    url: `https://ethereum.org/${locale}/10years/`,
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
          name: t("page-10-year-anniversary-meta-title"),
          item: `https://ethereum.org/${locale}/10years/`,
        },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "Ethereum Foundation",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/assets/eth-logo.png",
        width: "256",
        height: "417",
      },
    },
    mainEntity: {
      "@type": "Event",
      "@id": `https://ethereum.org/${locale}/10years/#ethereum-10-year-anniversary`,
    },
  }

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `https://ethereum.org/${locale}/10years/#ethereum-10-year-anniversary`,
    name: t("page-10-year-anniversary-meta-title"),
    description: t("page-10-year-anniversary-meta-description"),
    startDate: "2024-07-30",
    endDate: "2024-07-30",
    eventStatus: "https://schema.org/EventCompleted",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    url: `https://ethereum.org/${locale}/10years/`,
    organizer: {
      "@type": "Organization",
      name: "Ethereum Foundation",
      url: "https://ethereum.org",
    },
    location: {
      "@type": "VirtualLocation",
      url: `https://ethereum.org/${locale}/10years/`,
    },
    image: {
      "@type": "ImageObject",
      url: "https://ethereum.org/assets/10-years/10-years-hero.png",
      width: "1200",
      height: "630",
    },
  }

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Ethereum: 10 Years Anniversary",
    description: t("page-10-year-anniversary-meta-description"),
    thumbnailUrl: "https://i.ytimg.com/vi/gjwr-7PgpTC/maxresdefault.jpg",
    uploadDate: "2024-07-30",
    duration: "PT5M30S",
    embedUrl: "https://www.youtube.com/embed/gjwr-7PgpTC",
    publisher: {
      "@type": "Organization",
      name: "Ethereum Foundation",
      url: "https://ethereum.org",
    },
  }

  return (
    <PageJsonLD structuredData={[webPageJsonLd, eventJsonLd, videoJsonLd]} />
  )
}
