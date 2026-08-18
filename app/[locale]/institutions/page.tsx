import type { StaticImageData } from "next/image"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import { PageHero } from "@/components/Hero"
import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Callout from "@/components/ui/callout"
import {
  Card,
  CardBanner,
  CardContent,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import { ContentLayout } from "@/layouts/ContentLayout"
import civilSocietyImage from "@/public/images/institutions/institutions-civil-society.png"
import evidenceImage from "@/public/images/institutions/institutions-evidence.png"
import heroImage from "@/public/images/institutions/institutions-hero.png"
import policyImage from "@/public/images/institutions/institutions-policy-procurement.png"
import publicInfrastructureImage from "@/public/images/institutions/institutions-public-infrastructure.png"

type InstitutionCardProps = {
  href: string
  image: StaticImageData
  title: string
  description: string
  ctaLabel: string
}

const InstitutionCard = ({
  href,
  image,
  title,
  description,
  ctaLabel,
}: InstitutionCardProps) => (
  <Card>
    <CardHeader>
      <CardBanner background="none" fit="contain">
        <Image
          src={image}
          alt=""
          sizes="(min-width: 1280px) 340px, (min-width: 992px) 440px, (min-width: 640px) calc(50vw - 2.5rem), calc(100vw - 4rem)"
        />
      </CardBanner>
    </CardHeader>
    <CardContent>
      <CardTitle>{title}</CardTitle>
      <CardParagraph>{description}</CardParagraph>
    </CardContent>
    <CardFooter>
      <ButtonLink href={href}>{ctaLabel}</ButtonLink>
    </CardFooter>
  </Card>
)

const InstitutionsPage = async (props: { params: Promise<PageParams> }) => {
  const { locale } = await props.params
  setRequestLocale(locale)

  const t = await getTranslations("page-institutions")
  const tCommon = await getTranslations("common")
  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("institutions", locale as Lang)

  const tocItems = [
    { id: "start-with-your-mission", title: t("mission-title") },
    { id: "public-interest-standard", title: t("standard-title") },
  ]

  const cards: InstitutionCardProps[] = [
    {
      href: "/institutions/public-infrastructure/",
      image: publicInfrastructureImage,
      title: t("infrastructure-card-title"),
      description: t("infrastructure-card-description"),
      ctaLabel: t("infrastructure-card-cta"),
    },
    {
      href: "/institutions/civil-society-and-development/",
      image: civilSocietyImage,
      title: t("civil-society-card-title"),
      description: t("civil-society-card-description"),
      ctaLabel: t("civil-society-card-cta"),
    },
    {
      href: "/institutions/policy-and-procurement/",
      image: policyImage,
      title: t("policy-card-title"),
      description: t("policy-card-description"),
      ctaLabel: t("policy-card-cta"),
    },
    {
      href: "/institutions/evidence-and-case-studies/",
      image: evidenceImage,
      title: t("evidence-card-title"),
      description: t("evidence-card-description"),
      ctaLabel: t("evidence-card-cta"),
    },
  ]

  return (
    <ContentLayout
      tocItems={tocItems.map(({ id, title }) => ({ title, url: `#${id}` }))}
      contributors={contributors}
      lastEditLocaleTimestamp={lastEditLocaleTimestamp}
      heroSection={
        <PageHero
          header={tCommon("institutions")}
          heroImg={heroImage}
          title={t("hero-title")}
          description={t("hero-description")}
        />
      }
      showDropdown={false}
    >
      <p className="text-lg text-body-medium">{t("intro")}</p>

      <Section id={tocItems[0].id}>
        <h2>{tocItems[0].title}</h2>
        <p>{t("mission-description")}</p>
        <Grid columns={2}>
          {cards.map((card) => (
            <InstitutionCard key={card.href} {...card} />
          ))}
        </Grid>
      </Section>

      <Section id={tocItems[1].id}>
        <Callout
          title={tocItems[1].title}
          description={t("standard-description")}
        />
      </Section>
    </ContentLayout>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await props.params
  const t = await getTranslations("page-institutions")

  return await getMetadata({
    locale,
    slug: ["institutions"],
    title: t("metadata-title"),
    description: t("metadata-description"),
  })
}

export default InstitutionsPage
