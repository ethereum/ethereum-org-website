import { BadgeCheck, CircleDollarSign, Database, Network } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import { PageHero } from "@/components/Hero"
import Callout from "@/components/ui/callout"
import {
  Card,
  CardContent,
  CardHeader,
  CardIconContainer,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import { ContentLayout } from "@/layouts/ContentLayout"
import heroImage from "@/public/images/institutions/public-infrastructure/public-infrastructure-hero.png"
import operationsImage from "@/public/images/institutions/public-infrastructure/public-infrastructure-operations.png"

const PublicInfrastructurePage = async (props: {
  params: Promise<PageParams>
}) => {
  const { locale } = await props.params
  setRequestLocale(locale)

  const t = await getTranslations("page-institutions-public-infrastructure")
  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo(
      "institutions/public-infrastructure",
      locale as Lang
    )

  const tocItems = [
    { id: "credible-neutrality", title: t("neutrality-title") },
    { id: "public-infrastructure-patterns", title: t("patterns-title") },
    { id: "what-to-weigh", title: t("weigh-title") },
  ]

  const patterns = [
    {
      title: t("credentials-title"),
      description: t("credentials-description"),
      icon: BadgeCheck,
    },
    {
      title: t("records-title"),
      description: t("records-description"),
      icon: Database,
    },
    {
      title: t("payments-title"),
      description: t("payments-description"),
      icon: CircleDollarSign,
    },
    {
      title: t("exchange-title"),
      description: t("exchange-description"),
      icon: Network,
    },
  ]

  return (
    <ContentLayout
      tocItems={tocItems.map(({ id, title }) => ({ title, url: `#${id}` }))}
      contributors={contributors}
      lastEditLocaleTimestamp={lastEditLocaleTimestamp}
      heroSection={
        <PageHero
          breadcrumbs={{ slug: "/institutions/public-infrastructure/" }}
          heroImg={heroImage}
          title={t("hero-title")}
          description={t("hero-description")}
        />
      }
      showDropdown={false}
    >
      <p className="text-lg text-body-medium">{t("intro")}</p>

      <Section id={tocItems[0].id}>
        <Callout
          image={operationsImage}
          title={tocItems[0].title}
          description={t("neutrality-description")}
        />
      </Section>

      <Section id={tocItems[1].id}>
        <h2>{tocItems[1].title}</h2>
        <Grid columns={2} balanced={4}>
          {patterns.map(({ title, description, icon: Icon }) => (
            <Card key={title} variant="base">
              <CardHeader>
                <CardIconContainer>
                  <Icon />
                </CardIconContainer>
              </CardHeader>
              <CardContent>
                <CardTitle>{title}</CardTitle>
                <CardParagraph>{description}</CardParagraph>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section id={tocItems[2].id}>
        <h2>{tocItems[2].title}</h2>
        <p>{t("weigh-description")}</p>
      </Section>
    </ContentLayout>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await props.params
  const t = await getTranslations("page-institutions-public-infrastructure")

  return await getMetadata({
    locale,
    slug: ["institutions", "public-infrastructure"],
    title: t("metadata-title"),
    description: t("metadata-description"),
  })
}

export default PublicInfrastructurePage
