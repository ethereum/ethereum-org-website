import { GetStaticProps } from "next"
import { useRouter } from "next/router"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "react-i18next"

import type { BasePageProps, Lang } from "@/lib/types"

import { ContentHero, type ContentHeroProps } from "@/components/Hero"
import { TwImage } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

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
          <h2>What is layer-2?</h2>
          <p>
            Layer 2 (L2) is a collective term to describe a specific set of
            Ethereum scaling solutions. A layer 2 is separate blockchain that
            extends Ethereum and inherits the security guarantees of Ethereum.
          </p>
          <p>
            Now let’s dig into it a bit more, and to do this we need to explain
            layer 1 (L1).
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
    </MainArticle>
  )
}

export default Layer2Learn
