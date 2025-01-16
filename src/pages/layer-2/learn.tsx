import { GetStaticProps } from "next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import type { BasePageProps, Lang } from "@/lib/types"

import Callout from "@/components/Callout"
import Card from "@/components/Card"
import { ContentHero, type ContentHeroProps } from "@/components/Hero"
import { TwImage } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import Callout2Image from "@/public/images/layer-2/learn-hero.png"
import OptimisticRollupImage from "@/public/images/layer-2/optimistic_rollup.png"
import RollupImage from "@/public/images/layer-2/rollup-2.png"
import ZKRollupImage from "@/public/images/layer-2/zk_rollup.png"
import Callout1Image from "@/public/images/man-and-dog-playing.png"
import DAOImage from "@/public/images/use-cases/dao-2.png"
import WhatIsEthereumImage from "@/public/images/what-is-ethereum.png"

export const getStaticProps = (async ({ locale }) => {
  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const requiredNamespaces = getRequiredNamespacesForPage("/layer-2/learn")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const Layer2Learn = () => {
  const { t } = useTranslation("page-layer-2-learn")
  const { pathname } = useRouter()

  const heroProps: ContentHeroProps = {
    breadcrumbs: { slug: pathname, startDepth: 1 },
    heroImg: "/images/layer-2/learn-hero.png",
    blurDataURL: "/images/layer-2/learn-hero.png",
    title: t("page-layer-2-learn-title"),
    description: t("page-layer-2-learn-description"),
    buttons: [
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
    ],
  }

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
      image: OptimisticRollupImage,
      title: t("page-layer-2-learn-rollupCards-optimistic-title"),
      description: t("page-layer-2-learn-rollupCards-optimistic-description"),
      childSentence: t(
        "page-layer-2-learn-rollupCards-optimistic-childSentence"
      ),
      childLink: "/developers/docs/scaling/optimistic-rollups/",
    },
    {
      image: ZKRollupImage,
      title: t("page-layer-2-learn-rollupCards-zk-title"),
      description: t("page-layer-2-learn-rollupCards-zk-description"),
      childSentence: t("page-layer-2-learn-rollupCards-zk-childSentence"),
      childLink: "/developers/docs/scaling/zk-rollups/",
    },
  ]

  return (
    <MainArticle className="relative flex flex-col">
      <PageMetadata
        title={t("page-layer-2-learn-meta-title")}
        description={t("page-layer-2-learn-description")}
        image="/images/layer-2/learn-hero.png"
      />

      <ContentHero {...heroProps} />

      <div
        id="what-is-layer-2"
        className="flex w-full flex-col items-center gap-4 px-8 py-9 md:flex-row"
      >
        <div className="flex w-full flex-col gap-4 md:w-[70%]">
          <h2>{t("page-layer-2-learn-what-is-layer-2-title")}</h2>
          <p>
            <Translation id="page-layer-2-learn:page-layer-2-learn-what-is-layer-2-1" />
          </p>
          <p>
            <Translation id="page-layer-2-learn:page-layer-2-learn-what-is-layer-2-2" />
          </p>
        </div>
        <div className="w-full md:w-[30%]">
          <TwImage
            src={WhatIsEthereumImage}
            alt="What is Ethereum"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div
        id="what-is-layer-1"
        className="flex w-full flex-col gap-4 bg-body-light px-8 py-9"
      >
        <h2>{t("page-layer-2-learn-what-is-layer-1-title")}</h2>
        <div className="flex flex-col justify-between gap-16 md:flex-row">
          <div className="flex w-full flex-col justify-between gap-4 md:w-[50%]">
            <p>
              <Translation id="page-layer-2-learn:page-layer-2-learn-what-is-layer-1-1" />
            </p>
            <p>
              <Translation id="page-layer-2-learn:page-layer-2-learn-what-is-layer-1-2" />
            </p>
          </div>
          <div className="flex w-full flex-col gap-4 md:w-[50%]">
            <p>
              <strong>{t("page-layer-2-learn-layer-1-list-title")}</strong>
            </p>
            <ol className="list-none space-y-2 pl-0 [counter-reset:item]">
              <li className="flex items-center space-x-3">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-body-inverse text-sm font-medium [counter-increment:item] before:content-[counter(item)]"></span>
                <span>
                  <Translation id="page-layer-2-learn:page-layer-2-learn-layer-1-list-1" />
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-body-inverse text-sm font-medium [counter-increment:item] before:content-[counter(item)]"></span>
                <span>
                  <Translation id="page-layer-2-learn:page-layer-2-learn-layer-1-list-2" />
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-body-inverse text-sm font-medium [counter-increment:item] before:content-[counter(item)]"></span>
                <span>
                  <Translation id="page-layer-2-learn:page-layer-2-learn-layer-1-list-3" />
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-body-inverse text-sm font-medium [counter-increment:item] before:content-[counter(item)]"></span>
                <span>
                  <Translation id="page-layer-2-learn:page-layer-2-learn-layer-1-list-4" />
                </span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div
        id="why-do-we-need-layer-2"
        className="flex w-full flex-col gap-16 px-8 py-9 md:flex-row"
      >
        <div className="w-full items-center justify-center md:w-[50%]">
          <TwImage src={DAOImage} alt="" />
        </div>

        <div className="flex w-full flex-col gap-4 md:w-[50%]">
          <h2>{t("page-layer-2-learn-why-do-we-need-layer-2-title")}</h2>
          <p>{t("page-layer-2-learn-why-do-we-need-layer-2-1")}</p>
          <p>{t("page-layer-2-learn-why-do-we-need-layer-2-2")}</p>
          <h3>{t("page-layer-2-learn-why-do-we-need-layer-2-scalability")}</h3>
          <p>
            <Translation id="page-layer-2-learn:page-layer-2-learn-why-do-we-need-layer-2-scalability-1" />
          </p>
          <p>{t("page-layer-2-learn-why-do-we-need-layer-2-scalability-2")}</p>
        </div>
      </div>

      <div id="layer-2-cards" className="w-full px-8 py-9">
        <div className="flex flex-col gap-9 md:flex-row">
          {layer2Cards.map((card, idx) => {
            return (
              <div key={idx} className="flex flex-1">
                <Card
                  description={card.description}
                  title={card.title}
                  emoji={card.emoji}
                  className="flex flex-1 flex-col"
                />
              </div>
            )
          })}
        </div>
      </div>

      <div
        id="how-does-layer-2-work"
        className="flex w-full flex-col gap-16 px-8 py-9 md:flex-row"
      >
        <div className="flex w-full flex-col gap-4 md:w-[50%]">
          <h2>{t("page-layer-2-learn-how-does-layer-2-work-title")}</h2>
          <p>{t("page-layer-2-learn-how-does-layer-2-work-1")}</p>
          <p>{t("page-layer-2-learn-how-does-layer-2-work-2")}</p>
          <h3>{t("page-layer-2-learn-how-does-layer-2-work-rollups-title")}</h3>
          <p>{t("page-layer-2-learn-how-does-layer-2-work-rollups-1")}</p>
          <p>{t("page-layer-2-learn-how-does-layer-2-work-rollups-2")}</p>
        </div>
        <div className="flex w-full md:w-[50%]">
          <TwImage src={RollupImage} alt={""} className="object-contain" />
        </div>
      </div>

      <div
        id="rollup-cards"
        className="flex w-full flex-col gap-8 px-8 py-9 md:flex-row"
      >
        {rollupCards.map((card, idx) => {
          return (
            <div
              key={idx}
              className="flex w-full flex-col gap-4 rounded-sm border border-solid border-body-light bg-background-highlight p-6 md:w-[50%]"
            >
              <TwImage src={card.image} alt={""} />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <a href={card.childLink}>{card.childSentence}</a>
            </div>
          )
        })}
      </div>

      <div id="dyor-risks" className="w-full px-8 py-9">
        <div className="flex flex-col gap-8 bg-orange-100 px-12 py-12 text-gray-900">
          <h2>{t("page-layer-2-learn-dyor-title")}</h2>
          <div className="flex flex-col gap-4">
            <p>
              <Translation id="page-layer-2-learn:page-layer-2-learn-dyor-1" />
            </p>
            <p>{t("page-layer-2-learn-dyor-2")}</p>
          </div>
          <div>
            <ButtonLink
              href="https://l2beat.com"
              customEventOptions={{
                eventCategory: "l2_learn",
                eventAction: "button_click",
                eventName: "l2beat_link",
              }}
            >
              {t("page-layer-2-learn-dyor-link")}
            </ButtonLink>
          </div>
        </div>
      </div>

      <div
        id="a-not-on-alt-l1s"
        className="flex w-full flex-col gap-8 px-8 py-9"
      >
        <h2>{t("page-layer-2-learn-note-on-alt-l1-title")}</h2>
        <div className="flex flex-col gap-8 md:flex-row">
          <div>
            <p>{t("page-layer-2-learn-note-on-alt-l1-1")}</p>
          </div>
          <div>
            <p>
              <Translation id="page-layer-2-learn:page-layer-2-learn-note-on-alt-l1-2" />
            </p>
          </div>
        </div>
      </div>

      <div id="callout-cards" className="px-8 py-9">
        <div className="flex w-full flex-col lg:flex-row">
          <Callout
            image={Callout1Image}
            title={t("page-layer-2-learn-callout-1-title")}
            description={t("page-layer-2-learn-callout-1-description")}
          >
            <div>
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
            </div>
          </Callout>
          <Callout
            image={Callout2Image}
            title={t("page-layer-2-learn-callout-2-title")}
            description={t("page-layer-2-learn-callout-2-description")}
          >
            <div>
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
            </div>
          </Callout>
        </div>
      </div>

      <div id="quiz" className="px-8 py-9">
        <StandaloneQuizWidget quizKey="layer-2" />
      </div>
    </MainArticle>
  )
}

export default Layer2Learn
