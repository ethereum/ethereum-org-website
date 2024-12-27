import type { GetStaticProps } from "next/types"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import type { BasePageProps, GrowThePieData, Lang } from "@/lib/types"

import Callout from "@/components/Callout"
import Card from "@/components/Card"
import ExpandableCard from "@/components/ExpandableCard"
import HubHero, { HubHeroProps } from "@/components/Hero/HubHero"
import { TwImage } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import { ButtonLink } from "@/components/ui/buttons/Button"
import InlineLink from "@/components/ui/Link"

import { dataLoader } from "@/lib/utils/data/dataLoader"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { layer2Data, Rollups } from "@/data/networks/networks"

import { BASE_TIME_UNIT } from "@/lib/constants"

import { fetchGrowThePie } from "@/lib/api/fetchGrowThePie"
import HeroImage from "@/public/images/heroes/layer-2-hub-hero.jpg"
import EthereumLogo from "@/public/images/layer-2/ethereum.png"
import WalkingImage from "@/public/images/layer-2/layer-2-walking.png"
import ExploreImage from "@/public/images/layer-2/learn-hero.png"
import ManDogCardImage from "@/public/images/man-and-dog-playing.png"

// In seconds
const REVALIDATE_TIME = BASE_TIME_UNIT * 24

const loadData = dataLoader(
  [["growThePieData", fetchGrowThePie]],
  REVALIDATE_TIME * 1000
)

export const getStaticProps = (async ({ locale }) => {
  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const requiredNamespaces = getRequiredNamespacesForPage("/layer-2")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const [growThePieData] = await loadData()

  const randomL2s = layer2Data.sort(() => 0.5 - Math.random()).slice(0, 9)

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      randomL2s,
      contentNotTranslated,
      lastDeployLocaleTimestamp,
      locale,
      growThePieData,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const Layer2Hub = ({
  randomL2s,
  growThePieData,
  locale,
}: {
  randomL2s: Rollups
  growThePieData: GrowThePieData
  locale: Lang
}) => {
  const medianTxCost =
    "error" in growThePieData.txCostsMedianUsd
      ? { error: growThePieData.txCostsMedianUsd.error }
      : growThePieData.txCostsMedianUsd.value

  // TODO: setup translation
  const heroContent: HubHeroProps = {
    title: "Layer 2",
    header: "Ethereum networks",
    description: "Use Ethereum for a fraction of the cost.",
    heroImg: HeroImage,
    buttons: [
      {
        content: "Explore networks",
        href: "/layer-2/networks",
        matomo: {
          eventCategory: "l2_hub",
          eventAction: "button_click",
          eventName: "hero_explore_networks",
        },
      },
      {
        content: "Learn more",
        href: "#layer-2-powered-by-ethereum",
        matomo: {
          eventCategory: "l2_hub",
          eventAction: "button_click",
          eventName: "hero_get_started",
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
        "Whether you are making a quick payment or engaging in decentralized finance (DeFi), all transactions take only a few seconds. ",
      emoji: ":closed_lock_with_key:",
    },
    {
      title: "Backed by Ethereum",
      description:
        "Ethereum’s time-proven and decentralized blockchain functions as the settlement layer for other newer networks.",
      emoji: ":hammer_and_wrench:",
    },
  ]

  return (
    <MainArticle className="relative flex flex-col">
      {/* TODO: Clarify title and description here */}
      {/* TODO: Setup for translation */}
      <PageMetadata
        title={"Intro to Ethereum Layer 2: benefits and uses"}
        description={"Learn about Ethereum layer 2 networks"}
        image="/images/layer-2/learn-hero.png"
      />

      <HubHero {...heroContent} />

      {/* TODO: Setup for translation */}
      <div
        id="layer-2-powered-by-ethereum"
        className="flex w-full flex-col gap-8 px-8 py-9"
      >
        <div className="flex flex-col gap-16 md:flex-row">
          <div className="flex flex-1 flex-col gap-8">
            <h2>Powered by Ethereum</h2>
            <p>
              <strong>Ethereum is no longer just a single network</strong>. With
              hundreds of blockchains now built on top of it, Ethereum has
              become more cost-effective, faster, and accessible for everyday
              use.
            </p>
            <p>
              Embrace the future by joining one of the many networks powered by
              Ethereum!
            </p>
          </div>
          <div className="flex flex-1">
            <TwImage
              src={ManDogCardImage}
              alt="Man and dog playing"
              style={{
                width: "100%",
                maxHeight: "240px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>

      {/* TODO: Setup for translation */}
      <div id="layer-2-stats-box" className="w-full px-8 py-9">
        <div className="m-auto max-w-[992px] py-9">
          <div className="flex flex-col gap-8 border border-body-light p-8 md:flex-row md:gap-14">
            <div className="flex-1">
              <div className="max-w-[224px]">
                <p className="text-5xl">
                  $
                  {growThePieData.dailyTxCosts["ethereum"].toLocaleString(
                    locale as Lang,
                    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                  )}
                </p>
                <p className="text-body-medium">
                  Average transaction cost on the Ethereum blockchain
                </p>
              </div>
            </div>
            <div className="h-auto w-auto self-stretch border-b border-body-light md:border-r" />
            <div className="flex-1">
              <div className="max-w-[224px]">
                <p className="text-5xl">
                  $
                  {medianTxCost.toLocaleString(locale as Lang, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 3,
                  })}
                </p>
                <p className="text-body-medium">
                  Average transaction cost on Ethereum backed networks
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* TODO: Commented out for now, remove before release if we don't ship with it. */}
        {/* <div className="relative m-auto -mt-4 h-44 w-44 -rotate-12 rounded-full bg-primary sm:absolute sm:right-10 sm:-mt-28 md:-mt-80 xl:right-52">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <p className="text-background">over</p>
            <p className="text-5xl text-background">100x</p>
            <p className="text-background">cheaper</p>
          </div>
        </div> */}
      </div>

      {/* TODO: Setup for translation */}
      <div id="layer-2-the-network-of-networks" className="w-full py-9 sm:px-8">
        <div className="flex flex-col gap-8 overflow-hidden bg-[#B9B9F1] bg-opacity-20 px-4 py-10 text-center">
          <h2>The network of networks</h2>
          <p className="font-md">
            Ethereum&apos;s strength and security provides a platform for other
            networks to build upon. With a single account, everything is
            compatible and connects seamlessly.
          </p>
          <div className="relative m-auto h-[275px] w-[275px] sm:h-[375px] sm:w-[375px]">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-body-medium"></div>
            <div className="absolute inset-0 animate-spin-30 rounded-full">
              {/* Top logo */}
              <div className="absolute -top-[12px] left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform animate-counter-spin-30 rounded-full bg-primary">
                <TwImage
                  className="rounded-full"
                  src={randomL2s[0].logo}
                  alt={randomL2s[0].name}
                  width={24}
                  height={24}
                />
              </div>
              {/* Bottom right logo */}
              <div className="absolute bottom-[17%] right-[8%] h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform animate-counter-spin-30 rounded-full">
                <TwImage
                  className="rounded-full"
                  src={randomL2s[1].logo}
                  alt={randomL2s[1].name}
                  width={24}
                  height={24}
                />
              </div>
              {/* Bottom left logo */}
              <div className="absolute bottom-[17%] left-[8%] h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform animate-counter-spin-30 rounded-full">
                <TwImage
                  className="rounded-full"
                  src={randomL2s[2].logo}
                  alt={randomL2s[2].name}
                  width={24}
                  height={24}
                />
              </div>
            </div>

            {/* Middle ring */}
            <div className="absolute inset-[30px] rounded-full border border-dashed border-body-medium sm:inset-[54px]"></div>
            <div className="absolute inset-[30px] animate-spin-21 rounded-full sm:inset-[54px]">
              {/* Top logo */}
              <div className="absolute -top-[12px] left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform animate-counter-spin-21 rounded-full">
                <TwImage
                  className="rounded-full"
                  src={randomL2s[3].logo}
                  alt={randomL2s[3].name}
                  width={24}
                  height={24}
                />
              </div>
              {/* Bottom right logo */}
              <div className="absolute bottom-[15%] right-[5%] h-6 w-6 transform animate-counter-spin-21 rounded-full">
                <TwImage
                  className="rounded-full"
                  src={randomL2s[4].logo}
                  alt={randomL2s[4].name}
                  width={24}
                  height={24}
                />
              </div>
              {/* Bottom left logo */}
              <div className="absolute bottom-[15%] left-[5%] h-6 w-6 transform animate-counter-spin-21 rounded-full">
                <TwImage
                  className="rounded-full"
                  src={randomL2s[5].logo}
                  alt={randomL2s[5].name}
                  width={24}
                  height={24}
                />
              </div>
            </div>

            {/* Inner ring */}
            <div className="absolute inset-[60px] rounded-full border border-dashed border-body-medium sm:inset-[108px]"></div>
            <div className="absolute inset-[60px] animate-spin-9 rounded-full sm:inset-[108px]">
              {/* Top logo */}
              <div className="absolute -top-[12px] left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform animate-counter-spin-9 rounded-full">
                <TwImage
                  className="rounded-full"
                  src={randomL2s[6].logo}
                  alt={randomL2s[6].name}
                  width={24}
                  height={24}
                />
              </div>
              {/* Bottom right logo */}
              <div className="absolute bottom-[15%] right-[5%] h-6 w-6 transform animate-counter-spin-9 rounded-full">
                <TwImage
                  className="rounded-full"
                  src={randomL2s[7].logo}
                  alt={randomL2s[7].name}
                  width={24}
                  height={24}
                />
              </div>
              {/* Bottom left logo */}
              <div className="absolute bottom-[15%] left-[5%] h-6 w-6 transform animate-counter-spin-9 rounded-full">
                <TwImage
                  className="rounded-full"
                  src={randomL2s[8].logo}
                  alt={randomL2s[8].name}
                  width={24}
                  height={24}
                />
              </div>
            </div>

            {/* Center Ethereum Logo */}
            <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform">
              <TwImage
                src={EthereumLogo}
                alt="Ethereum"
                width={48}
                height={48}
              />
            </div>
          </div>
        </div>
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
            <ButtonLink
              href="/layer-2/networks"
              customEventOptions={{
                eventCategory: "l2_hub",
                eventAction: "button_click",
                eventName: "mid_explore_networks",
              }}
            >
              Explore networks
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* TODO: Setup for translation */}
      <div id="layer-2-cta" className="w-full px-8 py-9">
        <div className="mx-auto flex max-w-[640px] flex-col gap-6 rounded bg-main-gradient p-8">
          <div className="flex flex-col gap-6">
            {randomL2s.slice(0, 3).map((l2, idx) => {
              return (
                <div
                  key={idx}
                  className={`flex flex-1 flex-col items-start gap-4 p-4 md:flex-row md:items-center ${
                    idx < randomL2s.slice(0, 3).length - 1
                      ? "border-b border-background"
                      : ""
                  }`}
                >
                  <div className="flex flex-1 flex-col items-start gap-4 md:flex-row md:items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-md bg-background shadow-drop">
                      <TwImage
                        src={l2.logo}
                        alt={l2.name}
                        style={{
                          width: "46px",
                          height: "46px",
                        }}
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <p className="text-xl font-bold">{l2.name}</p>
                      <p className="text-body-medium">{l2.description}</p>
                    </div>
                  </div>
                  <div className="flex w-full md:w-auto">
                    <ButtonLink
                      href={l2.website}
                      variant="outline"
                      className="w-full"
                      customEventOptions={{
                        eventCategory: "l2_hub",
                        eventAction: "button_click",
                        eventName: "mid_powered_by_ethereum",
                      }}
                    >
                      Go
                    </ButtonLink>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center">
            <div className="mx-auto inline-flex items-center justify-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-bold">
              <TwImage
                src={EthereumLogo}
                alt="Ethereum"
                style={{
                  width: "24px",
                  height: "24px",
                }}
              />
              <p>Powered by Ethereum</p>
            </div>
          </div>
        </div>
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
              <ButtonLink
                href="/layer-2/learn"
                customEventOptions={{
                  eventCategory: "l2_hub",
                  eventAction: "button_click",
                  eventName: "mid_l2_learn",
                }}
              >
                Learn more
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      {/* TODO: Setup for translation */}
      <div
        id="layer-2-faq"
        className="flex w-full max-w-[832px] flex-col gap-12 px-8 py-9"
      >
        <h2>Frequently asked questions</h2>
        <div>
          <ExpandableCard
            title={"How do I know that a network is part of Ethereum?"}
            eventCategory="l2_hub"
            eventAction="expand"
            eventName="how do i know if a network is part of ethereum"
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
                some of the most popular{" "}
                <InlineLink href="/layer-2/networks">
                  Ethereum networks
                </InlineLink>
                .
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
            eventCategory="l2_hub"
            eventAction="expand"
            eventName="are all these networks safe"
          >
            <div className="flex flex-col gap-8">
              <p>
                While generally designed with robust security features, their
                safety depends on the underlying technology, smart contract
                security, and{" "}
                <InlineLink href="/layer-2/networks">
                  maturity of the network
                </InlineLink>
                .
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
            eventCategory="l2_hub"
            eventAction="expand"
            eventName="why can't ethereum scale its own chain instead of relying on these networks"
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
            eventCategory="l2_hub"
            eventAction="expand"
            eventName="why is there no official ethereum networks"
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
        className="flex w-full flex-col px-8 py-8 md:flex-row"
      >
        <Callout
          image={ExploreImage}
          title={"Explore different networks"}
          description={
            "Learn how networks differ from each other and how far have gotten in their development."
          }
        >
          <div>
            <ButtonLink
              href="/layer-2/networks"
              customEventOptions={{
                eventCategory: "l2_hub",
                eventAction: "button_click",
                eventName: "bottom_explore_networks",
              }}
            >
              Explore networks
            </ButtonLink>
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
            <ButtonLink
              href="/layer-2/learn"
              customEventOptions={{
                eventCategory: "l2_hub",
                eventAction: "button_click",
                eventName: "bottom_l2_learn",
              }}
            >
              Learn more
            </ButtonLink>
          </div>
        </Callout>
      </div>
    </MainArticle>
  )
}

export default Layer2Hub
