import type { StaticImageData } from "next/image"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import DocLink from "@/components/DocLink"
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
import architectureImage from "@/public/images/enterprise/enterprise-architecture.png"
import foundationsImage from "@/public/images/enterprise/enterprise-foundations.png"
import heroImage from "@/public/images/enterprise/enterprise-hub-hero.png"
import patternsImage from "@/public/images/enterprise/enterprise-patterns.png"
import resilienceImage from "@/public/images/enterprise/enterprise-resilience.png"

type EnterpriseCardProps = {
  href: string
  image: StaticImageData
  title: string
  description: string
  ctaLabel: string
}

const EnterpriseCard = ({
  href,
  image,
  title,
  description,
  ctaLabel,
}: EnterpriseCardProps) => (
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

const EnterprisePage = async (props: { params: Promise<PageParams> }) => {
  const { locale } = await props.params
  setRequestLocale(locale)

  const t = await getTranslations("page-enterprise")
  const tCommon = await getTranslations("common")
  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("enterprise", locale as Lang)

  const tocItems = [
    { id: "start-with-your-question", title: t("questions-title") },
    { id: "foundation-not-product", title: t("foundation-title") },
    { id: "continue-evaluation", title: t("continue-title") },
  ]

  const cards: EnterpriseCardProps[] = [
    {
      href: "/enterprise/why-ethereum/",
      image: foundationsImage,
      title: t("foundation-card-title"),
      description: t("foundation-card-description"),
      ctaLabel: t("foundation-card-cta"),
    },
    {
      href: "/enterprise/use-cases/",
      image: patternsImage,
      title: t("patterns-card-title"),
      description: t("patterns-card-description"),
      ctaLabel: t("patterns-card-cta"),
    },
    {
      href: "/enterprise/architecture/",
      image: architectureImage,
      title: t("architecture-card-title"),
      description: t("architecture-card-description"),
      ctaLabel: t("architecture-card-cta"),
    },
    {
      href: "/enterprise/operational-resilience/",
      image: resilienceImage,
      title: t("resilience-card-title"),
      description: t("resilience-card-description"),
      ctaLabel: t("resilience-card-cta"),
    },
  ]

  return (
    <ContentLayout
      tocItems={tocItems.map(({ id, title }) => ({ title, url: `#${id}` }))}
      contributors={contributors}
      lastEditLocaleTimestamp={lastEditLocaleTimestamp}
      heroSection={
        <PageHero
          header={tCommon("enterprise")}
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
        <p>{t("questions-description")}</p>
        <Grid columns={2}>
          {cards.map((card) => (
            <EnterpriseCard key={card.href} {...card} />
          ))}
        </Grid>
      </Section>

      <Section id={tocItems[1].id}>
        <Callout
          title={tocItems[1].title}
          description={t("foundation-description")}
        />
      </Section>

      <Section id={tocItems[2].id}>
        <h2>{tocItems[2].title}</h2>
        <p>{t("continue-description")}</p>
        <div className="flex flex-col gap-4">
          <DocLink href="/enterprise/why-ethereum/">
            {t("continue-foundation")}
          </DocLink>
          <DocLink href="/enterprise/use-cases/">
            {t("continue-patterns")}
          </DocLink>
          <DocLink href="/enterprise/due-diligence/">
            {t("continue-evaluation")}
          </DocLink>
          <DocLink href="/enterprise/get-started/">
            {t("continue-deployment")}
          </DocLink>
        </div>
      </Section>
    </ContentLayout>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await props.params
  const t = await getTranslations("page-enterprise")

  return await getMetadata({
    locale,
    slug: ["enterprise"],
    title: t("metadata-title"),
    description: t("metadata-description"),
  })
}

export default EnterprisePage
