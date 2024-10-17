import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import type { BasePageProps, Lang } from "@/lib/types"

import Card from "@/components/Card"
import HubHero, { HubHeroProps } from "@/components/Hero/HubHero"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import HeroImage from "@/public/images/heroes/layer-2-hub-hero.jpg"

export const getStaticProps = (async ({ locale }) => {
  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const requiredNamespaces = getRequiredNamespacesForPage("/layer-2")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const Layer2Hub = () => {
  // TODO: setup translation
  const heroContent: HubHeroProps = {
    title: "Layer 2",
    header: "Ethereum networks",
    description: "Use Ethereum for a fraction of the cost.",
    heroImg: HeroImage,
    buttons: [
      {
        content: "Learn more",
        href: "/layer-2/learn",
        matomo: {
          eventCategory: "layer 2 hub hero buttons",
          eventAction: "click",
          eventName: "/layer-2/learn clicked",
        },
      },
      {
        content: "Choose network",
        href: "/layer-2/networks",
        matomo: {
          eventCategory: "layer 2 hub hero buttons",
          eventAction: "click",
          eventName: "/layer-2/networks clicked",
        },
      },
    ],
  }

  // TODO: Setup for translation
  const calloutCards = [
    {
      title: "$0.01 fees",
      description:
        "You can trade, send money globally, or use  applications without worrying about high costs.",
      emoji: ":money_with_wings:",
    },
    {
      title: "Near instant transactions",
      description:
        "Whether you are making a quick payment or engaging in decentralized finance (DeFi), all transactions take only few seconds. ",
      emoji: ":closed_lock_with_key:",
    },
    {
      title: "Backed by Ethereum",
      description:
        "Ethereum’s time proven and decentralized blockchain functions as the settlement layer for other newer networks.",
      emoji: ":hammer_and_wrench:",
    },
  ]

  return (
    <MainArticle className="relative flex flex-col">
      {/* TODO: Clarify title and description here */}
      {/* TODO: Setup for translation */}
      <PageMetadata
        title={"Ethereum layer 2 networks"}
        description={"Learn about Ethereum layer 2 networks"}
        image="/images/layer-2/learn-hero.png"
      />

      <HubHero {...heroContent} />

      <div id="layer-2-callout-cards" className="w-full px-8 py-9">
        <div className="flex flex-col gap-9 md:flex-row">
          {calloutCards.map((card, idx) => {
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
    </MainArticle>
  )
}

export default Layer2Hub
