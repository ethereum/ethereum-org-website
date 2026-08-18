import { getTranslations, setRequestLocale } from "next-intl/server"

import type { PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import { HubHero } from "@/components/Hero"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import {
  Card,
  CardBanner,
  CardButtonFake,
  CardContent,
  CardFooter,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { VStack } from "@/components/ui/flex"
import { Grid } from "@/components/ui/grid"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { getMetadata } from "@/lib/utils/metadata"

import enterpriseImage from "@/public/images/organizations/organizations-enterprise.png"
import foundersImage from "@/public/images/organizations/organizations-founders.png"
import heroImage from "@/public/images/organizations/organizations-hub-hero.png"
import institutionsImage from "@/public/images/organizations/organizations-institutions.png"

const OrganizationsPage = async (props: { params: Promise<PageParams> }) => {
  const { locale } = await props.params
  setRequestLocale(locale)

  const t = await getTranslations("page-organizations")
  const tCommon = await getTranslations("common")

  const paths = [
    {
      href: "/enterprise/",
      image: enterpriseImage,
      title: t("enterprise-title"),
      description: t("enterprise-description"),
      cta: t("enterprise-cta"),
    },
    {
      href: "/institutions/",
      image: institutionsImage,
      title: t("institutions-title"),
      description: t("institutions-description"),
      cta: t("institutions-cta"),
    },
    {
      href: "/founders/",
      image: foundersImage,
      title: t("founders-title"),
      description: t("founders-description"),
      cta: t("founders-cta"),
    },
  ]

  return (
    <VStack className="mx-auto my-0 w-full">
      <HubHero
        heroImg={heroImage}
        title={tCommon("organizations")}
        header={t("hero-title")}
        description={t("hero-description")}
      />

      <MainArticle className="w-full space-y-12 px-8 py-4">
        <Section id="paths" className="space-y-4 py-10 md:py-12">
          <h2>{t("paths-title")}</h2>
          <p>{t("paths-description")}</p>

          <Grid columns={3} size="wide">
            {paths.map(({ href, image, title, description, cta }) => (
              <Card href={href} key={href} size="lg" hoverEffect="lift">
                <CardBanner size="lg" background="primary">
                  <Image src={image} alt="" />
                </CardBanner>
                <CardContent>
                  <CardTitle>{title}</CardTitle>
                  <CardParagraph>{description}</CardParagraph>
                </CardContent>
                <CardFooter buttons="compact">
                  <CardButtonFake variant="outline" isSecondary>
                    {cta}
                  </CardButtonFake>
                </CardFooter>
              </Card>
            ))}
          </Grid>
        </Section>

        <Section
          id="question"
          className={cn(
            "grid grid-cols-1 gap-6 md:gap-10 lg:grid-cols-2",
            "-mx-8 w-screen max-w-screen-2xl items-center bg-background-highlight px-8 py-10 md:py-20"
          )}
        >
          <div className="space-y-4">
            <h2>{t("question-title")}</h2>
            <p>{t("question-description")}</p>
          </div>

          <div className="rounded-4xl border border-primary/20 bg-background p-8 md:p-14">
            <h3 className="mb-4 text-2xl">{t("question-card-title")}</h3>
            <p className="text-body-medium">{t("question-card-description")}</p>
          </div>
        </Section>

        <Section
          id="purpose"
          className="mx-auto max-w-screen-lg space-y-4 py-10 text-center md:py-16"
        >
          <h2>{t("purpose-title")}</h2>
          <p>{t("purpose-description")}</p>
        </Section>
      </MainArticle>

      <ContentFeedback />
    </VStack>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await props.params
  const t = await getTranslations("page-organizations")

  return await getMetadata({
    locale,
    slug: ["organizations"],
    title: t("metadata-title"),
    description: t("metadata-description"),
  })
}

export default OrganizationsPage
