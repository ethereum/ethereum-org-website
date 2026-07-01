import { pick } from "lodash"
import { Atom } from "lucide-react"
import { getImageProps } from "next/image"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import ExpandableCard from "@/components/ExpandableCard"
import { HubHero } from "@/components/Hero"
import I18nProvider from "@/components/I18nProvider"
import {
  AccountAbstractionIcon,
  BetterUserExperienceIcon,
  CheaperTransactionsIcon,
  DankshardingIcon,
  ExtraSecurityIcon,
  FutureProofingIcon,
  SingleSlotFinalityIcon,
  StatelessnessIcon,
} from "@/components/icons/roadmap"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import Translation from "@/components/Translation"
import { AccordionContainer } from "@/components/ui/accordion"
import { Alert } from "@/components/ui/alert"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardButtonFake,
  CardContent,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import Link from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { breakpointAsNumber } from "@/lib/utils/screen"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import ReleaseCarousel from "./_components/ReleaseCarousel"
import RoadmapPageJsonLD from "./page-jsonld"

import ethBlocksImg from "@/public/images/developers-eth-blocks.png"
import communityHeroImg from "@/public/images/heroes/community-hero.png"
import communityHeroPortraitImg from "@/public/images/heroes/community-hero-portrait.png"
import roadmapHeroImg from "@/public/images/heroes/roadmap-hub-hero.jpg"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-roadmap")

  // Messages for the client-only ReleaseCarousel island
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/roadmap")
  const messages = pick(allMessages, requiredNamespaces)

  const { contributors } = await getAppPageContributorInfo(
    "roadmap",
    locale as Lang
  )

  const changesComingItems = [
    {
      title: t("page-roadmap-cheaper-transactions-title"),
      icon: <CheaperTransactionsIcon className="h-auto w-12" />,
      description: t("page-roadmap-cheaper-transactions-description"),
      button: {
        label: t("page-roadmap-cheaper-transactions-button"),
        href: "/roadmap/scaling",
      },
    },
    {
      title: t("page-roadmap-extra-security-title"),
      icon: <ExtraSecurityIcon className="h-auto w-12" />,
      description: t("page-roadmap-extra-security-description"),
      button: {
        label: t("page-roadmap-extra-security-button"),
        href: "/roadmap/security",
      },
    },
    {
      title: t("page-roadmap-better-user-experience-title"),
      icon: <BetterUserExperienceIcon className="h-auto w-12" />,
      description: t("page-roadmap-better-user-experience-description"),
      button: {
        label: t("page-roadmap-better-user-experience-button"),
        href: "/roadmap/user-experience",
      },
    },
    {
      title: t("page-roadmap-future-proofing-title"),
      icon: <FutureProofingIcon className="h-auto w-12" />,
      description: t("page-roadmap-future-proofing-description"),
      button: {
        label: t("page-roadmap-future-proofing-button"),
        href: "/roadmap/future-proofing",
      },
    },
  ]

  const technicalUpgradesItems = [
    {
      icon: <Atom className="size-7" />,
      title: t("page-roadmap-post-quantum-title"),
      description: t("page-roadmap-post-quantum-description"),
      href: "/roadmap/future-proofing/quantum-resistance",
    },
    {
      icon: <SingleSlotFinalityIcon className="size-7" />,
      title: t("page-roadmap-single-slot-finality-title"),
      description: t("page-roadmap-single-slot-finality-description"),
      href: "/roadmap/single-slot-finality",
    },
    {
      icon: <ExtraSecurityIcon className="size-7" />,
      title: t("page-roadmap-zkevm-title"),
      description: t("page-roadmap-zkevm-description"),
      href: "/roadmap/zkevm",
    },
    {
      icon: <StatelessnessIcon className="size-7" />,
      title: t("page-roadmap-statelessness-title"),
      description: t("page-roadmap-statelessness-description"),
      href: "/roadmap/statelessness",
    },
    {
      icon: <AccountAbstractionIcon className="size-7" />,
      title: t("page-roadmap-account-abstraction-title"),
      description: t("page-roadmap-account-abstraction-description"),
      href: "/roadmap/account-abstraction",
    },
    {
      icon: <DankshardingIcon className="size-7" />,
      title: t("page-roadmap-danksharding-title"),
      description: t("page-roadmap-danksharding-description"),
      href: "/roadmap/danksharding",
    },
  ]

  // "Why we need a roadmap" side image: portrait crop on desktop, full
  // landscape on mobile, switched at `lg` via <picture> so only the rendered
  // variant is downloaded (see Homepage/TrustLogos for the same pattern).
  const whyRoadmapAlt = t("page-roadmap-hero-alt")
  const portraitSizes = `(max-width: ${breakpointAsNumber["xl"] - 1}px) 448px, 512px`
  const landscapeSizes = `(max-width: ${breakpointAsNumber["md"] - 1}px) calc(100vw - 32px), calc(100vw - 64px)`

  const {
    props: { srcSet: whyPortraitSrcSet },
  } = getImageProps({
    alt: whyRoadmapAlt,
    ...communityHeroPortraitImg,
    sizes: portraitSizes,
  })

  const {
    props: { srcSet: whyLandscapeSrcSet, ...whyImgRest },
  } = getImageProps({
    alt: whyRoadmapAlt,
    ...communityHeroImg,
    sizes: landscapeSizes,
  })

  // blurWidth/blurHeight aren't valid <img> attributes (avoid React DOM warnings)
  delete (whyImgRest as Record<string, unknown>).blurWidth
  delete (whyImgRest as Record<string, unknown>).blurHeight

  return (
    <>
      <RoadmapPageJsonLD locale={locale} contributors={contributors} />

      <Alert variant="banner">{t("page-roadmap-banner-notification")}</Alert>

      <HubHero
        heroImg={roadmapHeroImg}
        header={t("page-roadmap-title")}
        description={t("page-roadmap-meta-description")}
      />

      <main className="space-y-space-3x pb-page">
        <MainArticle className="flow **:data-[label=button-link]:max-md:w-full *:[section]:px-page">
          <Section
            id="releases"
            dir="ltr"
            className="mt-space-3x overflow-hidden"
          >
            <I18nProvider locale={locale} messages={messages}>
              <ReleaseCarousel />
            </I18nProvider>
          </Section>

          {/* What's changing */}
          <Section id="changes-coming">
            <h2>{t("page-roadmap-changes-coming-title")}</h2>
            <p className="max-w-3xl text-lg">
              <Translation id="page-roadmap:page-roadmap-changes-coming-description" />
            </p>
            <Grid balanced={4}>
              {changesComingItems.map((item) => (
                <Card key={item.title} hoverEffect="lift">
                  <CardHeader className="flex items-center justify-between gap-4">
                    <CardTitle>{item.title}</CardTitle>
                    <div className="shrink-0 text-primary-action">
                      {item.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardParagraph>{item.description}</CardParagraph>
                  </CardContent>
                  <CardFooter>
                    <ButtonLink href={item.button.href} variant="outline">
                      {item.button.label}
                    </ButtonLink>
                  </CardFooter>
                </Card>
              ))}
            </Grid>
          </Section>

          {/* Why we need a roadmap */}
          <Section
            id="why-roadmap"
            data-flow="skip"
            className="flex gap-space-3x max-lg:flex-col-reverse lg:justify-between"
          >
            <div className="flow lg:max-w-3xl lg:flex-1">
              <h2>{t("page-roadmap-why-need-title")}</h2>
              <p>{t("page-roadmap-why-need-description")}</p>
              <h3>{t("page-roadmap-how-defined-title")}</h3>
              <p>{t("page-roadmap-how-defined-p1")}</p>
              <p>
                <Translation id="page-roadmap:page-roadmap-how-defined-p2" />
              </p>
              <p>
                <Translation id="page-roadmap:page-roadmap-how-defined-p3" />
              </p>
              <ButtonLink href="/governance" variant="outline" data-flow="cta">
                {t("page-roadmap-governance-button")}
              </ButtonLink>
            </div>
            <div className="aspect-8/5 max-h-68 w-full overflow-hidden rounded-base lg:aspect-auto lg:max-h-none lg:max-w-lg lg:flex-1 lg:rounded-4xl">
              <picture>
                <source
                  media={`(min-width: ${breakpointAsNumber["lg"]}px)`}
                  srcSet={whyPortraitSrcSet}
                  sizes={portraitSizes}
                />
                <source
                  media={`(max-width: ${breakpointAsNumber["lg"] - 1}px)`}
                  srcSet={whyLandscapeSrcSet}
                  sizes={landscapeSizes}
                />
                <img
                  {...whyImgRest}
                  alt={whyRoadmapAlt}
                  className="size-full object-cover"
                />
              </picture>
            </div>
          </Section>

          {/* Technical upgrades */}
          <Section id="technical-upgrades">
            <h2 className="md:text-center">
              {t("page-roadmap-technical-upgrades-title")}
            </h2>
            <Grid balanced={2}>
              {technicalUpgradesItems.map((item) => (
                <Card
                  key={item.title}
                  href={item.href}
                  hoverEffect="lift"
                  className="bg-card-gradient-secondary"
                >
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 text-primary">{item.icon}</div>
                      <CardTitle size="sm">{item.title}</CardTitle>
                    </div>
                    <CardParagraph>{item.description}</CardParagraph>
                  </CardContent>
                  <CardFooter buttons="inherit">
                    <CardButtonFake variant="link">
                      {t("page-roadmap-learn-more")}
                    </CardButtonFake>
                  </CardFooter>
                </Card>
              ))}
            </Grid>
          </Section>

          {/* Timeline / FAQ */}
          <Section
            id="timeline"
            data-flow="skip"
            className="flex gap-space-3x *:flex-1 max-lg:flex-col lg:items-start"
          >
            <div className="grid place-items-center p-space lg:sticky lg:top-24">
              <Image
                src={ethBlocksImg}
                alt={t("page-roadmap-blocks-alt")}
                className="max-h-68 w-auto object-contain lg:max-h-128"
                sizes="(max-width: 992px) calc(100vw - 64px), (max-width: 1536px) 50vw, 720px"
              />
            </div>
            <div className="flow">
              <h2>{t("page-roadmap-timeline-title")}</h2>
              <AccordionContainer>
                <ExpandableCard title={t("page-roadmap-faq-1-title")}>
                  <p>
                    <strong>{t("page-roadmap-faq-1-p1")}</strong>{" "}
                    {t("page-roadmap-faq-1-p1-continued")}
                  </p>
                  <p>{t("page-roadmap-faq-1-p2")}</p>
                </ExpandableCard>
                <ExpandableCard title={t("page-roadmap-faq-2-title")}>
                  <p>
                    {t("page-roadmap-faq-2-p1")}{" "}
                    <strong>{t("page-roadmap-faq-2-p1-strong")}</strong>{" "}
                    {t("page-roadmap-faq-2-p1-continued")}
                  </p>
                  <p>{t("page-roadmap-faq-2-p2")}</p>
                </ExpandableCard>
                <ExpandableCard title={t("page-roadmap-faq-3-title")}>
                  <p>
                    <Translation
                      id="page-roadmap:page-roadmap-faq-3-p1"
                      transform={{ a: Link }}
                    />
                  </p>
                </ExpandableCard>
                <ExpandableCard title={t("page-roadmap-faq-4-title")}>
                  <p>
                    <Translation
                      id="page-roadmap:page-roadmap-faq-4-p1"
                      transform={{ a: Link }}
                    />
                  </p>
                </ExpandableCard>
              </AccordionContainer>
            </div>
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

  const t = await getTranslations("page-roadmap")

  return await getMetadata({
    locale,
    slug: ["roadmap"],
    title: t("page-roadmap-meta-title"),
    description: t("page-roadmap-meta-description"),
    image: "/images/roadmap/roadmap-hub-hero.png",
  })
}

export default Page
