import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import type { BasePageProps, Lang } from "@/lib/types"

import Callout from "@/components/Callout"
import Card from "@/components/Card"
import HubHero, { HubHeroProps } from "@/components/Hero/HubHero"
import { TwImage } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import { ButtonLink } from "@/components/ui/buttons/Button"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import HeroImage from "@/public/images/heroes/layer-2-hub-hero.jpg"
import WalkingImage from "@/public/images/layer-2/layer-2-walking.png"
import ExploreImage from "@/public/images/layer-2/learn-hero.png"

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

      <div id="layer-2-powered-by-ethereum" className="w-full px-8 py-9">
        <h2>Powered by Ethereum</h2>
      </div>

      <div id="layer-2-stats-box" className="w-full px-8 py-9">
        <h2>Stats box</h2>
      </div>

      <div id="layer-2-the-network-of-networks" className="w-full px-8 py-9">
        <h2>The network of networks</h2>
      </div>

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

      {/* TODO: Setup for translation */}
      <div id="layer-2-ready-to-start" className="w-full px-8 py-9">
        <div className="flex flex-col items-center gap-8">
          <h2>Ready to start?</h2>
          <p>
            Have a look at all the different networks that are available to you.
          </p>
          <div>
            <ButtonLink href="/layer-2/networks">Explore networks</ButtonLink>
          </div>
        </div>
      </div>

      <div id="layer-2-cta" className="w-full px-8 py-9">
        <h2>Call to action</h2>
      </div>

      {/* TODO: Setup for translation */}
      <div
        id="layer-2-why-do-we-need-multiple-networks"
        className="w-full px-8 py-9"
      >
        <div className="flex flex-col gap-8 bg-background-highlight px-12 py-12 md:flex-row">
          <div className="flex flex-1 items-center justify-center">
            <TwImage
              src={WalkingImage}
              alt="Walking"
              height={345}
              width={264}
            />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-6">
            <h2>Why do we need multiple networks on Ethereum?</h2>
            <p>
              Why are there all these networks and not just one Ethereum
              network?
            </p>
            <div>
              <ButtonLink href="/layer-2/learn">Learn more</ButtonLink>
            </div>
          </div>
        </div>
      </div>

      <div id="layer-2-faq" className="w-full px-8 py-9">
        <h2>FAQ</h2>
      </div>

      <div
        id="layer-2-callout-cards"
        className="flex w-full flex-col gap-16 px-8 py-8 md:flex-row"
      >
        <Callout
          image={ExploreImage}
          title={"Explore different networks"}
          description={
            "Learn how networks differ from each other and how far have gotten in their development."
          }
        >
          <div>
            <ButtonLink href="/layer-2/networks">Explore networks</ButtonLink>
          </div>
        </Callout>
        <Callout
          image={WalkingImage}
          title={"Interested in more details?"}
          description={
            "Curious about the technology and reasons for this scaling approach? Learn more about the thinking and different technological approaches."
          }
          headerClassName="-mt-6"
        >
          <div>
            <ButtonLink href="/layer-2/learn">Learn more</ButtonLink>
          </div>
        </Callout>
      </div>
    </MainArticle>
  )
}

export default Layer2Hub
