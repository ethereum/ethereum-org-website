import { GetStaticProps } from "next"
import { useRouter } from "next/router"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "react-i18next"

import type { BasePageProps, Lang } from "@/lib/types"

import { ButtonLink } from "@/components/Buttons"
import Card from "@/components/Card"
import { ContentHero, type ContentHeroProps } from "@/components/Hero"
import { TwImage } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import OptimisticRollupImage from "@/public/images/layer-2/optimistic_rollup.png"
import RollupImage from "@/public/images/layer-2/rollup-2.png"
import ZKRollupImage from "@/public/images/layer-2/zk_rollup.png"
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

// TODO: Add matomo events
const Layer2Learn = () => {
  const { t } = useTranslation("page-layer-2-learn")
  const { pathname } = useRouter()

  const heroProps: ContentHeroProps = {
    breadcrumbs: { slug: pathname, startDepth: 1 },
    heroImg: "/images/layer-2/learn-hero.png",
    blurDataURL: "/images/layer-2/learn-hero.png",
    title: t("page-layer-2-learn-title"),
    description: t("page-layer-2-learn-description"),
    // TODO: Check matomo event information to implementc
    buttons: [
      {
        content: "What is layer 2",
        href: "/layer-2/",
        matomo: {
          eventCategory: "",
          eventAction: "",
          eventName: "",
        },
      },
      {
        content: "Use layer 2",
        href: "/layer-2/networks",
        matomo: {
          eventCategory: "",
          eventAction: "",
          eventName: "",
        },
      },
    ],
  }

  // TODO: Setup translation
  const layer2Cards = [
    {
      emoji: ":money_with_wings:",
      title: "Lower Fees",
      description:
        "By combining multiple transactions into a single transaction on layer 1, transaction fees are massively reduced, making Ethereum more accessible for all.",
    },
    {
      emoji: ":closed_lock_with_key:",
      title: "Maintain Security",
      description:
        "Layer 2 blockchains settle their transactions on the Ethereum Mainnet, allowing users who use them to benefit from the security of the Ethereum network.",
    },
    {
      emoji: ":hammer_and_wrench:",
      title: "Expand Use Cases",
      description:
        "With higher transactions per second, lower fees, and new technology, projects will expand into new applications with improved user experience.",
    },
  ]

  // TODO: Setup translation
  const rollupCards = [
    {
      image: OptimisticRollupImage,
      title: "Optimistic Rollups",
      description:
        "Optimistic rollups use fault proofs where transactions are assumed to be valid, but can be challenged if an invalid transaction is suspected. If an invalid tranaction is suspected, a fault proof is ran to see if this has taken place. ",
      childSentence: "More on optimistic rollups",
      childLink: "/developers/docs/scaling/optimistic-rollups/",
    },
    {
      image: ZKRollupImage,
      title: "Zero Knowledge Rollups",
      description:
        "Zero Knowledge rollups use validity proofs where transactions calculations are computed off-chain, and then this data is then supplied to Ethereum Mainnet with a proof of their validity.",
      childSentence: "More on zk-rollups",
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
        {/* TODO: Setup translation */}
        <div className="flex w-full flex-col gap-4 md:w-[70%]">
          <h2>What is layer-2?</h2>
          <p>
            Layer 2 (L2) is a collective term to describe a specific set of
            Ethereum scaling solutions. A layer 2 is separate blockchain that
            extends Ethereum and inherits the security guarantees of Ethereum.
          </p>
          <p>
            Now let&apos;s dig into it a bit more, and to do this we need to
            explain layer 1 (L1).
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
        {/* TODO: Setup translation */}
        <h2>What is layer 1?</h2>
        <div className="flex flex-col justify-between gap-16 md:flex-row">
          <div className="flex w-full flex-col justify-between gap-4 md:w-[50%]">
            <p>
              Layer 1 blockchains, such as Ethereum and Bitcoin, are the
              underlying foundation that layer 2 projects build on top of.
              Examples of layer 2 projects include zero-knowledge rollups and
              optimistic rollups on Ethereum and the Lighting Network on top of
              Bitcoin.
            </p>
            <p>
              Ethereum also functions as a data availability layer for Layer 2s,
              and if there are any disputes on previous transactions data is
              provided from Ethereum for these disputes.
            </p>
          </div>
          <div className="flex w-full flex-col gap-4 md:w-[50%]">
            <p>Ethereum as the layer 1 includes:</p>
            <ol className="list-none space-y-2 pl-0 [counter-reset:item]">
              <li className="flex items-center space-x-3">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-body-inverse text-sm font-medium [counter-increment:item] before:content-[counter(item)]"></span>
                <span>
                  a network of node operators to secure and validate the network
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-body-inverse text-sm font-medium [counter-increment:item] before:content-[counter(item)]"></span>
                <span>a network of block producers</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-body-inverse text-sm font-medium [counter-increment:item] before:content-[counter(item)]"></span>
                <span>
                  the blockchain itself and the history of transaction data
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-body-inverse text-sm font-medium [counter-increment:item] before:content-[counter(item)]"></span>
                <span>the consensus mechanism for the network</span>
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

        {/* TODO: setup translation  */}
        <div className="flex w-full flex-col gap-4 md:w-[50%]">
          <h2>Why do we need layer 2?</h2>
          <p>
            The three desirable properties of a blockchain are that it is
            decentralized, secure, and scalable. The blockchain trilemma states
            that a simple blockchain architecture can only achieve two out of
            three. Want a secure and decentralized blockchain? You need to
            sacrifice scalability. This is where layer 2 networks come in.
          </p>
          <p>
            Ethereum has reached the network&apos;s current capacity with 1+
            million transactions per day, with high demand for each of these
            transactions. The success of Ethereum and the demand to use it has
            caused gas prices to rise substantially. Therefore the need for
            scaling solutions has peaked as well.
          </p>
          <h3>Scalability</h3>
          <p>
            The main goal of scalability is to increase transaction speed
            (faster finality), and transaction throughput (high transactions per
            second), without sacrificing decentralization or security (more on
            the Ethereum vision).
          </p>
          <p>
            The Ethereum community has taken a strong stance that it would not
            throw out decentralization or security in order to scale. Until
            sharding, Ethereum Mainnet (layer 1) will only be able to process
            roughly 15 transactions per second. When demand to use Ethereum is
            high this causes network congestion, increasing transaction fees,
            and pricing out those who cannot afford it from using Ethereum until
            the fees reduce. That is where layer 2 comes in to scale Ethereum
            today.
          </p>
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

      {/* TODO: setup translation  */}
      <div
        id="how-does-layer-2-work"
        className="flex w-full flex-col gap-16 px-8 py-9 md:flex-row"
      >
        <div className="flex w-full flex-col gap-4 md:w-[50%]">
          <h2>How does layer 2 work?</h2>
          <p>
            As we mentioned above, layer 2 is a collective term for Ethereum
            scaling solutions that handle transactions off Ethereum layer 1
            while still taking advantage of the robust decentralized security of
            Ethereum layer 1. A layer 2 is a separate blockchain that extends
            Ethereum. How does that work?
          </p>
          <p>
            There are several different types of layer 2, each having their own
            trade-offs and security models. Layer 2s take the transactional
            burden away from the layer 1 allowing it to become less congested,
            and everything becomes more scalable.
          </p>
          <h3>Rollups</h3>
          <p>
            Rollups bundle (or &apos;roll up&apos;) hundreds of transactions
            into a single transaction on layer 1. This distributes the L1
            transaction fees across everyone in the rollup, making it cheaper
            for each user.
          </p>
          <p>
            The transaction data in the rollup is submitted to layer 1, but the
            execution is done separately by the rollup. By submitting
            transaction data onto layer 1, rollups inherit the security of
            Ethereum. This is because once the data is uploaded to layer 1,
            reverting a rollup transaction requires reverting Ethereum. There
            are two different approaches to rollups: optimistic and
            zero-knowledge - they differ primarily on how this transaction data
            is submitted to L1.
          </p>
        </div>
        <div className="flex w-full md:w-[50%]">
          <TwImage src={RollupImage} alt={""} />
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

      {/* TODO: Setup translations */}
      <div id="dyor-risks" className="w-full px-8 py-9">
        <div className="flex flex-col gap-8 bg-orange-100 px-12 py-12 text-gray-900">
          <h2>Do your own research: Risks of layer 2</h2>
          <div className="flex flex-col gap-4">
            <p>
              Because layer 2 chains inherit security from Ethereum, in an ideal
              world, they are as safe as L1 Ethereum. However, many of the
              projects are still young and somewhat experimental. After years of
              R&D, many of the L2 technologies that will scale Ethereum went
              live in 2021. This is not to say these L2s are not secure, only
              that no layer 2 is as battle tested as Ethereum Mainnet. Always do
              your own research and decide if you&apos;re comfortable with any
              risks involved.
            </p>
            <p>
              For more information on the technology, risks and trust
              assumptions of layer 2s, we recommend checking out L2BEAT, which
              provides a comprehensive risk assessment framework of each
              project.
            </p>
          </div>
          <div>
            <ButtonLink href="https://l2beat.com">Go to L2BEAT</ButtonLink>
          </div>
        </div>
      </div>
    </MainArticle>
  )
}

export default Layer2Learn
