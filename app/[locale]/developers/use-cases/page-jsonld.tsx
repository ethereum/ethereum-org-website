import { getTranslations } from "next-intl/server"

interface UseCasesJsonLDProps {
  locale: string
}

const UseCasesJsonLD = async ({ locale }: UseCasesJsonLDProps) => {
  const t = await getTranslations({ locale, namespace: "page-use-cases" })

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("meta-title"),
    description: t("meta-description"),
    url: `https://ethereum.org/${locale}/developers/use-cases/`,
    mainEntity: {
      "@type": "ItemList",
      name: t("title"),
      description: t("subtitle"),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default UseCasesJsonLD
