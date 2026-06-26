import { HandCoins, MessageCircleHeart, Sparkles } from "lucide-react"
import { StaticImageData } from "next/image"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import { HubHero } from "@/components/Hero"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import MarkdownCard, { MarkdownCardProps } from "@/components/MarkdownCard"
import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Callout from "@/components/ui/callout"
import {
  Card,
  CardBanner,
  CardContent,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import { Divider } from "@/components/ui/hr"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import PageJsonLD from "./page-jsonld"

import developersEthBlockImg from "@/public/images/developers-eth-blocks.png"
import dogeComputerImg from "@/public/images/doge-computer.png"
import ethImg from "@/public/images/eth.png"
import financeTransparentImg from "@/public/images/finance_transparent.png"
import futureTransparentImg from "@/public/images/future_transparent.png"
import hackathonTransparentImg from "@/public/images/hackathon_transparent.png"
import heroImg from "@/public/images/heroes/community-hero.png"
import upgradesCoreImg from "@/public/images/upgrades/core.png"
import whatIsEthereumImg from "@/public/images/what-is-ethereum.png"

export default async function Page(props: { params: Promise<PageParams> }) {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const { contributors } = await getAppPageContributorInfo(
    "community",
    locale as Lang
  )

  const t = await getTranslations("page-community")

  const cards: {
    image: StaticImageData
    title: string
    description: string
    href: string
  }[] = [
    {
      image: upgradesCoreImg,
      title: t("page-community-card-1-title"),
      description: t("page-community-card-1-description"),
      href: "/community/online/",
    },
    {
      image: ethImg,
      title: t("page-community-card-2-title"),
      description: t("page-community-card-2-description"),
      href: "/community/events/",
    },
    {
      image: dogeComputerImg,
      title: t("page-community-card-3-title"),
      description: t("page-community-card-3-description"),
      href: "/community/get-involved/",
    },
    {
      image: futureTransparentImg,
      title: t("page-community-card-4-title"),
      description: t("page-community-card-4-description"),
      href: "/community/grants/",
    },
  ]

  const whyGetInvolvedCards: MarkdownCardProps[] = [
    {
      icon: <Sparkles />,
      title: t("page-community-why-get-involved-card-1-title"),
      description: t("page-community-why-get-involved-card-1-description"),
    },
    {
      icon: <HandCoins />,
      title: t("page-community-why-get-involved-card-2-title"),
      description: t("page-community-why-get-involved-card-2-description"),
    },
    {
      icon: <MessageCircleHeart />,
      title: t("page-community-why-get-involved-card-3-title"),
      description: t("page-community-why-get-involved-card-3-description"),
    },
  ]

  return (
    <>
      <PageJsonLD locale={locale} contributors={contributors} />

      <HubHero
        heroImg={heroImg}
        title={t("page-community-hero-title")}
        header={t("page-community-hero-header")}
        description={t("page-community-hero-subtitle")}
      />

      <Divider className="mx-auto" />

      <main className="pb-page">
        <MainArticle className="flow **:data-[label=button-link]:max-md:w-full *:[section]:px-page *:[section]:py-space-2x">
          {/* Why get involved */}
          <Section>
            <h2 className="md:text-center">
              {t("page-community-why-get-involved-title")}
            </h2>
            <Grid columns={3}>
              {whyGetInvolvedCards.map((card, idx) => (
                <MarkdownCard
                  key={idx}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </Grid>
          </Section>

          {/* Get involved */}
          <Section
            id="get-involved"
            className="space-y-space-2x bg-background-highlight"
          >
            <div className="flex gap-space-3x *:first:flex-2 *:last:flex-1 max-lg:flex-col-reverse lg:items-center">
              <div className="flow max-w-3xl">
                <h2>{t("page-community-get-involved-title")}</h2>
                <p>
                  <Translation id="page-community:page-community-get-involved-description" />
                </p>
              </div>
              <div className="grid place-items-center">
                <Image
                  className="max-h-64 w-auto object-contain"
                  src={developersEthBlockImg}
                  alt={t("page-community-get-involved-image-alt")}
                  sizes="360px"
                />
              </div>
            </div>
            <Grid balanced={4}>
              {cards.map((card, idx) => (
                <Card
                  key={idx}
                  href={card.href}
                  variant="nested"
                  hoverEffect="lift"
                >
                  <CardHeader>
                    <CardBanner background="none" fit="contain" zoom={false}>
                      <Image
                        src={card.image}
                        alt=""
                        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                      />
                    </CardBanner>
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{card.title}</CardTitle>
                    <CardParagraph>{card.description}</CardParagraph>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Section>

          {/* Open source */}
          <Section
            data-flow="skip"
            className="flex gap-space-3x *:flex-1 max-md:flex-col md:items-center"
          >
            <div className="grid place-items-center">
              <Image
                className="max-h-64 w-auto max-w-full object-contain md:max-h-128 md:w-full"
                src={whatIsEthereumImg}
                alt={t("page-community-open-source-image-alt")}
                sizes="(min-width: 768px) 50vw, 360px"
              />
            </div>
            <div className="flow md:max-w-2xl">
              <h2>{t("page-community-open-source")}</h2>
              <p>{t("page-community-open-source-description")}</p>
              <div className="flex gap-4 max-md:flex-col max-md:items-start">
                <ButtonLink href="/community/get-involved#ethereum-jobs">
                  {t("page-community-find-a-job")}
                </ButtonLink>
                <ButtonLink
                  variant="outline"
                  href="/community/grants/"
                  isSecondary
                >
                  {t("page-community-explore-grants")}
                </ButtonLink>
              </div>
            </div>
          </Section>

          {/* Contribute */}
          <Section
            data-flow="skip"
            className="flex flex-col gap-space-3x *:flex-1 md:flex-row-reverse md:items-center"
          >
            <div className="grid place-items-center">
              <Image
                className="max-h-64 w-auto max-w-full object-contain md:max-h-128 md:w-full"
                src={financeTransparentImg}
                alt={t("page-index-internet-image-alt")}
                sizes="(min-width: 768px) 50vw, 360px"
              />
            </div>
            <div className="flow md:max-w-2xl">
              <h2>{t("page-community-contribute")}</h2>
              <p>{t("page-community-contribute-description")}</p>
              <div className="flex gap-4 max-md:flex-col max-md:items-start">
                <ButtonLink href="/contributing/">
                  {t("page-community-contribute-button")}
                </ButtonLink>
                <ButtonLink
                  variant="outline"
                  href="https://github.com/ethereum/ethereum-org-website/"
                  isSecondary
                >
                  {t("page-community-contribute-secondary-button")}
                </ButtonLink>
              </div>
            </div>
          </Section>

          {/* Support */}
          <Section
            data-flow="skip"
            className="flex gap-space-3x *:flex-1 max-md:flex-col md:items-center"
          >
            <div className="grid place-items-center">
              <Image
                className="max-h-64 w-auto max-w-full object-contain md:max-h-128 md:w-full"
                src={hackathonTransparentImg}
                alt={t("page-community-support-alt")}
                sizes="(min-width: 768px) 50vw, 360px"
              />
            </div>
            <div className="flow md:max-w-2xl">
              <h2>{t("page-community-support")}</h2>
              <p>{t("page-community-support-description")}</p>
              <ButtonLink href="/community/support/">
                {t("page-community-support-button")}
              </ButtonLink>
            </div>
          </Section>

          {/* Try Ethereum */}
          <Section>
            <h2>{t("page-community-try-ethereum")}</h2>
            <Grid columns={2} size="wide">
              <Callout
                title={t("page-community-get-eth-title")}
                description={t("page-community-get-eth-description")}
                image={ethImg}
              >
                <ButtonLink href="/get-eth/">
                  {t("page-community-get-eth")}
                </ButtonLink>
              </Callout>
              <Callout
                title={t("page-community-explore-dapps-title")}
                description={t("page-community-explore-dapps-description")}
                image={dogeComputerImg}
              >
                <ButtonLink href="/apps/">
                  {t("page-community-explore-dapps")}
                </ButtonLink>
              </Callout>
            </Grid>
          </Section>
        </MainArticle>

        {/* End-of-page actions */}
        <div className="px-page">
          <ContentFeedback />
        </div>
      </main>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  const t = await getTranslations("page-community")
  return await getMetadata({
    locale,
    slug: ["community"],
    title: t("page-community-meta-title"),
    description: t("page-community-meta-description"),
  })
}
