import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import type { BasePageProps, Lang } from "@/lib/types"

import Callout from "@/components/Callout"
import Card from "@/components/Card"
import ExpandableCard from "@/components/ExpandableCard"
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

      {/* TODO: Setup for translation */}
      <div id="layer-2-faq" className="flex w-full flex-col gap-12 px-8 py-9">
        <h2>Frequently asked questions</h2>
        <div>
          <ExpandableCard
            title={"How do I know that a network is part of Ethereum?"}
            eventCategory=""
            eventAction=""
            eventName=""
            visible={true}
          >
            <div className="flex flex-col gap-8">
              <p>
                There are many different ways one can categorize networks in
                relation to Ethereum. Many networks claim to be scaling Ethereum
                to gather popularity. However, one clear perspective is whether
                the network stores its data on the Ethereum main network. This
                greatly enhances user security and Ethereum&apos;s
                permissionless vision. Such projects are often called “rollups”.
                If data is stored somewhere else, then the project is not a
                direct Ethereum extension and is rather independent. Check out
                some of the most popular <a href="">Ethereum networks</a>.
              </p>
              <p>
                Some specific industries might not require such direct close
                relationship such as gaming or non-financial applications where
                different technologies are better fit.
              </p>
            </div>
          </ExpandableCard>
          <ExpandableCard
            title={"Are all these networks safe?"}
            eventCategory=""
            eventAction=""
            eventName=""
            visible={true}
          >
            <div className="flex flex-col gap-8">
              <p>
                While generally designed with robust security features, their
                safety depends on the underlying technology, smart contract
                security, and <a href="">maturity of the network</a>.
              </p>
              <p>
                Users should perform due diligence, starting with small
                transactions and staying updated on developments to ensure
                secure usage.
              </p>
            </div>
          </ExpandableCard>
          <ExpandableCard
            title={
              "Why can't Ethereum scale its own chain instead of relying on these networks?"
            }
            eventCategory=""
            eventAction=""
            eventName=""
            visible={true}
          >
            <p>
              Ethereum can&apos;t easily scale its own main chain because it
              needs to stay secure and decentralized. Making the main chain
              faster could make it less secure and more centralized. Ethereum
              networks help by processing transactions off the main chain and
              then using the main chain for security, allowing Ethereum to
              handle more transactions without losing security or
              decentralization.
            </p>
          </ExpandableCard>
          <ExpandableCard
            title={"Why is there no 'official' Ethereum networks?"}
            eventCategory=""
            eventAction=""
            eventName=""
            visible={true}
          >
            <p>
              Just as there is no &apos;official&apos; Ethereum client, there is
              no &apos;official&apos; Ethereum layer 2. Ethereum is
              permissionless - technically anyone can create a layer 2! Multiple
              teams will implement their version of a layer 2, and the ecosystem
              as a whole will benefit from a diversity of design approaches that
              are optimized for different use cases. Much like we have multiple
              Ethereum clients developed by multiple teams in order to have
              diversity in the network, this too will be how layer 2s develop in
              the future.
            </p>
          </ExpandableCard>
        </div>
      </div>

      {/* TODO: Setup for translation */}
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
