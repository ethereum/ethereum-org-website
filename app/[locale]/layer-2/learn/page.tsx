import { pick } from "lodash"
import { getMessages, getTranslations } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import FileContributors from "@/components/FileContributors"
import PageHero from "@/components/Hero/PageHero"
import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import MarkdownCard from "@/components/MarkdownCard"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Callout from "@/components/ui/callout"
import {
  Card,
  CardBanner,
  CardContent,
  CardFooter,
  CardHeader,
  CardLinkFake,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import PageJsonLD from "./page-jsonld"

import layer2NetworksCalloutImage from "@/public/images/counter-screen-network-towers-rings-collage-cut-out.png"
import optimisticRollupImage from "@/public/images/layer-2/optimistic_rollup.png"
import rollupImage from "@/public/images/layer-2/rollup-2.png"
import zkRollupImage from "@/public/images/layer-2/zk_rollup.png"
import layer2CalloutImage from "@/public/images/man-and-dog-playing.png"
import heroImg from "@/public/images/network-column-rooftop-piping-construction.png"
import daoImage from "@/public/images/use-cases/dao-2.png"
import whatIsEthereumImage from "@/public/images/what-is-ethereum.png"

const SLUG = "/layer-2/learn"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(SLUG)
  const messages = pick(allMessages, requiredNamespaces)

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("layer-2/learn", locale as Lang)

  const t = await getTranslations("page-layer-2-learn")

  const layer2Cards = [
    {
      emoji: ":money_with_wings:",
      title: t("page-layer-2-learn-layer2Cards-1-title"),
      description: t("page-layer-2-learn-layer2Cards-1-description"),
    },
    {
      emoji: ":closed_lock_with_key:",
      title: t("page-layer-2-learn-layer2Cards-2-title"),
      description: t("page-layer-2-learn-layer2Cards-2-description"),
    },
    {
      emoji: ":hammer_and_wrench:",
      title: t("page-layer-2-learn-layer2Cards-3-title"),
      description: t("page-layer-2-learn-layer2Cards-3-description"),
    },
  ]

  const rollupCards = [
    {
      image: optimisticRollupImage,
      title: t("page-layer-2-learn-rollupCards-optimistic-title"),
      description: t("page-layer-2-learn-rollupCards-optimistic-description"),
      childSentence: t(
        "page-layer-2-learn-rollupCards-optimistic-childSentence"
      ),
      childLink: "/developers/docs/scaling/optimistic-rollups/",
    },
    {
      image: zkRollupImage,
      title: t("page-layer-2-learn-rollupCards-zk-title"),
      description: t("page-layer-2-learn-rollupCards-zk-description"),
      childSentence: t("page-layer-2-learn-rollupCards-zk-childSentence"),
      childLink: "/developers/docs/scaling/zk-rollups/",
    },
  ]

  return (
    <>
      <PageJsonLD
        locale={locale}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
      />

      <PageHero
        breadcrumbs={{ slug: SLUG, startDepth: 1 }}
        heroImg={heroImg}
        title={t("page-layer-2-learn-title")}
        description={t("page-layer-2-learn-description")}
        buttons={[
          {
            content: t("page-layer-2-learn-button-1-label"),
            href: "/layer-2/",
            matomo: {
              eventCategory: "l2_learn",
              eventAction: "button_click",
              eventName: "what_is_l2",
            },
          },
          {
            content: t("page-layer-2-learn-button-2-label"),
            href: "/layer-2/networks",
            matomo: {
              eventCategory: "l2_learn",
              eventAction: "button_click",
              eventName: "use_l2",
            },
          },
        ]}
      />

      <I18nProvider locale={locale} messages={messages}>
        <MainArticle className="flow px-page pt-page-2x pb-page">
          <Section
            id="what-is-layer-2"
            data-flow="skip"
            className="flex gap-space-3x *:first:flex-2 *:last:flex-1 max-lg:flex-col lg:items-center"
          >
            <div className="flow">
              <h2>{t("page-layer-2-learn-what-is-layer-2-title")}</h2>
              <p>
                <Translation id="page-layer-2-learn:page-layer-2-learn-what-is-layer-2-1" />
              </p>
              <p>
                <Translation id="page-layer-2-learn:page-layer-2-learn-what-is-layer-2-2" />
              </p>
            </div>
            <div className="grid place-items-center lg:justify-items-end">
              <Image
                src={whatIsEthereumImage}
                alt=""
                className="w-full max-w-md object-contain"
                sizes="(min-width: 992px) 30vw, 360px"
              />
            </div>
          </Section>

          <Section
            id="what-is-layer-1"
            className="rounded-base bg-background-highlight p-8 md:p-12"
          >
            <h2>{t("page-layer-2-learn-what-is-layer-1-title")}</h2>
            <div className="flex gap-space-2x *:flex-1 max-md:flex-col">
              <div className="flow">
                <p>
                  <Translation id="page-layer-2-learn:page-layer-2-learn-what-is-layer-1-1" />
                </p>
                <p>
                  <Translation id="page-layer-2-learn:page-layer-2-learn-what-is-layer-1-2" />
                </p>
              </div>
              <div className="flow">
                <p>
                  <strong>{t("page-layer-2-learn-layer-1-list-title")}</strong>
                </p>
                <ol className="list-none space-y-2 ps-0 [counter-reset:item]">
                  <li className="flex items-center gap-3">
                    <span className="flex size-8 flex-none items-center justify-center rounded-full bg-body-inverse text-sm font-medium [counter-increment:item] before:content-[counter(item)]"></span>
                    <span>
                      <Translation id="page-layer-2-learn:page-layer-2-learn-layer-1-list-1" />
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex size-8 flex-none items-center justify-center rounded-full bg-body-inverse text-sm font-medium [counter-increment:item] before:content-[counter(item)]"></span>
                    <span>
                      <Translation id="page-layer-2-learn:page-layer-2-learn-layer-1-list-2" />
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex size-8 flex-none items-center justify-center rounded-full bg-body-inverse text-sm font-medium [counter-increment:item] before:content-[counter(item)]"></span>
                    <span>
                      <Translation id="page-layer-2-learn:page-layer-2-learn-layer-1-list-3" />
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex size-8 flex-none items-center justify-center rounded-full bg-body-inverse text-sm font-medium [counter-increment:item] before:content-[counter(item)]"></span>
                    <span>
                      <Translation id="page-layer-2-learn:page-layer-2-learn-layer-1-list-4" />
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </Section>

          <Section
            id="why-do-we-need-layer-2"
            data-flow="skip"
            className="flex gap-space-2x *:flex-1 max-lg:flex-col"
          >
            <div className="relative max-lg:min-h-64">
              <Image
                src={daoImage}
                alt=""
                className="absolute inset-0 size-full object-contain"
                sizes="(max-width: 992px) 100vw, 45vw"
              />
            </div>
            <div className="flow">
              <h2>{t("page-layer-2-learn-why-do-we-need-layer-2-title")}</h2>
              <p>{t("page-layer-2-learn-why-do-we-need-layer-2-1")}</p>
              <p>{t("page-layer-2-learn-why-do-we-need-layer-2-2")}</p>
              <h3>
                {t("page-layer-2-learn-why-do-we-need-layer-2-scalability")}
              </h3>
              <p>
                <Translation id="page-layer-2-learn:page-layer-2-learn-why-do-we-need-layer-2-scalability-1" />
              </p>
              <p>
                {t("page-layer-2-learn-why-do-we-need-layer-2-scalability-2")}
              </p>
            </div>
          </Section>

          <Section id="layer-2-cards">
            <Grid columns={3}>
              {layer2Cards.map((card, idx) => (
                <MarkdownCard
                  key={idx}
                  description={card.description}
                  title={card.title}
                  emoji={card.emoji}
                />
              ))}
            </Grid>
          </Section>

          <Section
            id="how-does-layer-2-work"
            data-flow="skip"
            className="flex gap-space-2x *:flex-1 max-lg:flex-col lg:items-center"
          >
            <div className="flow">
              <h2>{t("page-layer-2-learn-how-does-layer-2-work-title")}</h2>
              <p>{t("page-layer-2-learn-how-does-layer-2-work-1")}</p>
              <p>{t("page-layer-2-learn-how-does-layer-2-work-2")}</p>
              <h3>
                {t("page-layer-2-learn-how-does-layer-2-work-rollups-title")}
              </h3>
              <p>{t("page-layer-2-learn-how-does-layer-2-work-rollups-1")}</p>
              <p>{t("page-layer-2-learn-how-does-layer-2-work-rollups-2")}</p>
            </div>
            <div className="grid place-items-center">
              {/* Diagram contains text -- size by width, keep legible on mobile */}
              <Image
                src={rollupImage}
                alt=""
                className="h-auto w-full max-w-2xl object-contain"
                sizes="(max-width: 992px) 100vw, 45vw"
              />
            </div>
          </Section>

          <Section id="rollup-cards">
            <Grid columns={2} size="wide">
              {rollupCards.map((card, idx) => (
                <Card key={idx} href={card.childLink}>
                  <CardHeader>
                    <CardBanner
                      fit="contain"
                      background="none"
                      size="thumbnail-lg"
                    >
                      <Image src={card.image} alt="" sizes="128px" />
                    </CardBanner>
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{card.title}</CardTitle>
                    <CardParagraph>{card.description}</CardParagraph>
                  </CardContent>
                  <CardFooter>
                    <CardLinkFake withForwardArrow>
                      {card.childSentence}
                    </CardLinkFake>
                  </CardFooter>
                </Card>
              ))}
            </Grid>
          </Section>

          <Section
            id="dyor-risks"
            className="rounded-base bg-tint-warning p-8 *:max-w-4xl md:p-12"
          >
            <h2>{t("page-layer-2-learn-dyor-title")}</h2>
            <p>
              <Translation id="page-layer-2-learn:page-layer-2-learn-dyor-1" />
            </p>
            <p>{t("page-layer-2-learn-dyor-2")}</p>
            <ButtonLink
              data-flow="cta"
              href="https://l2beat.com"
              customEventOptions={{
                eventCategory: "l2_learn",
                eventAction: "button_click",
                eventName: "l2beat_link",
              }}
            >
              {t("page-layer-2-learn-dyor-link")}
            </ButtonLink>
          </Section>

          <Section id="note-on-alt-l1" className="*:max-w-4xl">
            <h2>{t("page-layer-2-learn-note-on-alt-l1-title")}</h2>
            <p>{t("page-layer-2-learn-note-on-alt-l1-1")}</p>
            <p>
              <Translation id="page-layer-2-learn:page-layer-2-learn-note-on-alt-l1-2" />
            </p>
          </Section>

          <Section id="callouts">
            <Grid columns={2} size="wide">
              <Callout
                image={layer2CalloutImage}
                title={t("page-layer-2-learn-callout-1-title")}
                description={t("page-layer-2-learn-callout-1-description")}
              >
                <ButtonLink
                  href="/layer-2"
                  customEventOptions={{
                    eventCategory: "l2_learn",
                    eventAction: "button_click",
                    eventName: "learn_more",
                  }}
                >
                  {t("page-layer-2-learn-learn-more")}
                </ButtonLink>
              </Callout>
              <Callout
                image={layer2NetworksCalloutImage}
                title={t("page-layer-2-learn-callout-2-title")}
                description={t("page-layer-2-learn-callout-2-description")}
              >
                <ButtonLink
                  href="/layer-2/networks"
                  customEventOptions={{
                    eventCategory: "l2_learn",
                    eventAction: "button_click",
                    eventName: "explore_networks",
                  }}
                >
                  {t("page-layer-2-learn-explore-networks")}
                </ButtonLink>
              </Callout>
            </Grid>
          </Section>

          <StandaloneQuizWidget quizKey="layer-2" />

          <FileContributors
            className="border-t"
            contributors={contributors}
            lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          />
        </MainArticle>
      </I18nProvider>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  const t = await getTranslations("page-layer-2-learn")

  return await getMetadata({
    locale,
    slug: ["layer-2", "learn"],
    title: t("page-layer-2-learn-meta-title"),
    description: t("page-layer-2-learn-description"),
    image: "/images/layer-2/learn-hero.png",
  })
}

export default Page
