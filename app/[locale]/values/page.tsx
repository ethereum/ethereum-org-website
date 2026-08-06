import { getImageProps } from "next/image"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import ExpandableCard from "@/components/ExpandableCard"
import { HubHero } from "@/components/Hero"
import ExtraSecurityIcon from "@/components/icons/extra-security.svg"
import PrivacyIcon from "@/components/icons/privacy.svg"
import BetterUserExperienceIcon from "@/components/icons/roadmap/better-user-experience.svg"
import OpenSourceStakingIcon from "@/components/icons/staking/open-source-staking.svg"
import { Image } from "@/components/Image"
import { Strong } from "@/components/IntlStringElements"
import MainArticle from "@/components/MainArticle"
import { AccordionContainer } from "@/components/ui/accordion"
import {
  Card,
  CardButtonFake,
  CardContent,
  CardFooter,
  CardHeader,
  CardIconContainer,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { breakpointAsNumber } from "@/lib/utils/screen"

import ValuesPageJsonLD from "./page-jsonld"

import ethBlocksImg from "@/public/images/developers-eth-blocks.png"
import layer2HubHeroImg from "@/public/images/heroes/layer-2-hub-hero.png"
import internetImg from "@/public/images/heroes/roadmap-hub-hero.jpg"
import internetPortraitImg from "@/public/images/heroes/roadmap-hub-hero-portrait.jpg"

type PrincipleCard = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  cta?: { label: string; href: string }
}

const Page = async (props: { params: Promise<PageParams> }) => {
  const { locale } = await props.params

  setRequestLocale(locale)

  const t = await getTranslations("page-values")

  const { contributors } = await getAppPageContributorInfo(
    "values",
    locale as Lang
  )

  const principleCards: PrincipleCard[] = [
    {
      id: "privacy",
      title: t("page-values-card-privacy-title"),
      description: t("page-values-card-privacy-description"),
      icon: <PrivacyIcon />,
      // Only Privacy has a live destination; the other three deep-dive pages
      // are WIP, so their CTAs are intentionally omitted.
      cta: { label: t("page-values-card-privacy-cta"), href: "/privacy" },
    },
    {
      id: "open-source",
      title: t("page-values-card-open-source-title"),
      description: t("page-values-card-open-source-description"),
      icon: <OpenSourceStakingIcon />,
    },
    {
      id: "censorship-resistance",
      title: t("page-values-card-censorship-resistance-title"),
      description: t("page-values-card-censorship-resistance-description"),
      icon: <BetterUserExperienceIcon />,
    },
    {
      id: "security",
      title: t("page-values-card-security-title"),
      description: t("page-values-card-security-description"),
      icon: <ExtraSecurityIcon />,
    },
  ]

  // "What would the internet look like" side image: a portrait crop on desktop,
  // the full landscape on mobile, switched at `lg` via <picture> so only the
  // rendered variant downloads (same pattern as /roadmap and Homepage).
  // Decorative -- empty alt keeps it out of the accessibility tree.
  const portraitSizes = `(max-width: ${breakpointAsNumber["xl"] - 1}px) 448px, 512px`
  const landscapeSizes = `(max-width: ${breakpointAsNumber["md"] - 1}px) calc(100vw - 32px), calc(100vw - 64px)`

  const {
    props: { srcSet: internetPortraitSrcSet },
  } = getImageProps({
    alt: "",
    ...internetPortraitImg,
    sizes: portraitSizes,
  })

  const {
    props: { srcSet: internetLandscapeSrcSet, ...internetImgRest },
  } = getImageProps({
    alt: "",
    ...internetImg,
    sizes: landscapeSizes,
  })

  // blurWidth/blurHeight aren't valid <img> attributes (avoid React DOM warnings)
  delete (internetImgRest as Record<string, unknown>).blurWidth
  delete (internetImgRest as Record<string, unknown>).blurHeight

  return (
    <>
      <ValuesPageJsonLD locale={locale} contributors={contributors} />

      <HubHero
        heroImg={layer2HubHeroImg}
        header={t("page-values-hero-header")}
        description={t("page-values-hero-description")}
      />

      <main className="px-page pb-page">
        <MainArticle className="flow **:data-[label=button-link]:max-md:w-full *:[section]:py-space-2x">
          {/* The hidden cost of living online */}
          <Section id="hidden-cost" className="*:[p]:max-w-3xl">
            <h2>{t("page-values-cost-title")}</h2>
            <p>{t("page-values-cost-description")}</p>
            <p>{t.rich("page-values-cost-inevitable", { strong: Strong })}</p>
            <Grid balanced={4}>
              {principleCards.map((card) => (
                <Card
                  href={card.cta?.href}
                  hoverLift={!!card.cta}
                  key={card.id}
                >
                  <CardHeader className="flex items-center justify-between gap-4">
                    <CardTitle>{card.title}</CardTitle>
                    <CardIconContainer>{card.icon}</CardIconContainer>
                  </CardHeader>
                  <CardContent>
                    <CardParagraph>{card.description}</CardParagraph>
                  </CardContent>
                  {card.cta && (
                    <CardFooter buttons="full">
                      <CardButtonFake variant="outline">
                        {card.cta.label}
                      </CardButtonFake>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </Grid>
          </Section>

          {/* What would the internet look like if it worked for people? */}
          <Section
            id="internet-for-people"
            data-flow="skip"
            className="flex gap-space-3x max-lg:flex-col-reverse lg:justify-between"
          >
            <div className="flow lg:max-w-3xl lg:flex-1">
              <h2>{t("page-values-internet-title")}</h2>
              <p>{t("page-values-internet-p1")}</p>
              <p>
                <strong>{t("page-values-internet-p2")}</strong>
              </p>
              <ul>
                <li>
                  {t.rich("page-values-internet-list-open-code", {
                    strong: Strong,
                  })}
                </li>
                <li>
                  {t.rich("page-values-internet-list-privacy", {
                    strong: Strong,
                  })}
                </li>
                <li>
                  {t.rich("page-values-internet-list-censorship", {
                    strong: Strong,
                  })}
                </li>
                <li>
                  {t.rich("page-values-internet-list-security", {
                    strong: Strong,
                  })}
                </li>
              </ul>
              <p>{t("page-values-internet-p3")}</p>
            </div>
            <div className="aspect-8/5 max-h-68 w-full overflow-hidden rounded-base lg:aspect-auto lg:max-h-none lg:max-w-lg lg:flex-1 lg:rounded-4xl">
              <picture>
                <source
                  media={`(min-width: ${breakpointAsNumber["lg"]}px)`}
                  srcSet={internetPortraitSrcSet}
                  sizes={portraitSizes}
                />
                <source
                  media={`(max-width: ${breakpointAsNumber["lg"] - 1}px)`}
                  srcSet={internetLandscapeSrcSet}
                  sizes={landscapeSizes}
                />
                <img
                  {...internetImgRest}
                  alt=""
                  className="size-full object-cover"
                />
              </picture>
            </div>
          </Section>

          {/* FAQ: sticky image on desktop stays in view as answers expand */}
          <Section
            id="faq"
            data-flow="skip"
            className="flex gap-space-3x *:flex-1 max-lg:flex-col lg:items-start"
          >
            <div className="grid place-items-center p-space lg:sticky lg:top-24">
              <Image
                src={ethBlocksImg}
                alt={t("page-values-faq-image-alt")}
                className="max-h-68 w-auto object-contain lg:max-h-128"
                sizes="(max-width: 992px) calc(100vw - 64px), (max-width: 1536px) 50vw, 720px"
              />
            </div>
            <div className="flow">
              <h2>{t("page-values-faq-title")}</h2>
              <AccordionContainer>
                <ExpandableCard title={t("page-values-faq-1-title")}>
                  <p>{t("page-values-faq-1-p1")}</p>
                </ExpandableCard>
                <ExpandableCard title={t("page-values-faq-2-title")}>
                  <p>{t("page-values-faq-2-p1")}</p>
                </ExpandableCard>
                <ExpandableCard title={t("page-values-faq-3-title")}>
                  <p>{t("page-values-faq-3-p1")}</p>
                </ExpandableCard>
                <ExpandableCard title={t("page-values-faq-4-title")}>
                  <p>{t("page-values-faq-4-p1")}</p>
                </ExpandableCard>
              </AccordionContainer>
            </div>
          </Section>
        </MainArticle>

        <ContentFeedback />
      </main>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await props.params

  setRequestLocale(locale)

  const t = await getTranslations("page-values")

  return await getMetadata({
    locale,
    slug: ["values"],
    title: t("page-values-meta-title"),
    description: t("page-values-meta-description"),
    image: "/images/heroes/layer-2-hub-hero.png",
  })
}

export default Page
