import { BaseHTMLAttributes } from "react"
import shuffle from "lodash/shuffle"
import { GetStaticProps } from "next"

import { BasePageProps, Lang, LearningTool, Params } from "@/lib/types"

import CalloutBanner from "@/components/CalloutBanner"
import FeedbackCard from "@/components/FeedbackCard"
import InfoBanner from "@/components/InfoBanner"
import LearningToolsCardGrid from "@/components/LearningToolsCardGrid"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

import { useTranslation } from "@/hooks/useTranslation"
import loadNamespaces from "@/i18n/loadNamespaces"
import AlchemyUniversityImage from "@/public/images/dev-tools/alchemyuniversity.png"
import AtlasImage from "@/public/images/dev-tools/atlas.png"
import BloomTechImage from "@/public/images/dev-tools/bloomtech.png"
import CaptureTheEtherImage from "@/public/images/dev-tools/capturetheether.png"
import ChainIDEImage from "@/public/images/dev-tools/chainIDE.png"
import ConsensysImage from "@/public/images/dev-tools/consensys.png"
import CryptoZombieImage from "@/public/images/dev-tools/crypto-zombie.png"
import CyfrinUpdraftImage from "@/public/images/dev-tools/cyfrin-updraft.png"
import DappWorldImage from "@/public/images/dev-tools/dapp-world.png"
import EthDotBuildImage from "@/public/images/dev-tools/eth-dot-build.png"
import LearnWeb3Image from "@/public/images/dev-tools/learnweb3.png"
import MetaschoolImage from "@/public/images/dev-tools/metaschool.png"
import NFTSchoolImage from "@/public/images/dev-tools/nftschool.png"
import NodeGuardiansImage from "@/public/images/dev-tools/node-guardians.jpg"
import EthernautImage from "@/public/images/dev-tools/oz.png"
import PlatziImage from "@/public/images/dev-tools/platzi.png"
import QuestbookImage from "@/public/images/dev-tools/questbook.png"
import RemixImage from "@/public/images/dev-tools/remix.png"
import ReplitImage from "@/public/images/dev-tools/replit.png"
import SpeedRunEthereumImage from "@/public/images/dev-tools/speed-run-ethereum.png"
import TenderlyImage from "@/public/images/dev-tools/tenderly.png"
import EnterpriseEth from "@/public/images/enterprise-eth.png"

const Page = ({ className, ...props }: BaseHTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "mx-auto mb-0 mt-16 flex w-full flex-col items-center",
      className
    )}
    {...props}
  />
)

const Header = ({ className, ...props }: BaseHTMLAttributes<HTMLElement>) => (
  <header
    className={cn(
      "m-auto flex max-w-[896px] flex-col items-center px-8 py-0 text-center",
      className
    )}
    {...props}
  />
)

const H1 = ({
  className,
  ...props
}: BaseHTMLAttributes<HTMLHeadingElement>) => (
  <h1
    className={cn(
      "my-8 text-center font-mono text-3xl font-semibold uppercase leading-[1.4]",
      className
    )}
    {...props}
  />
)

const Subtitle = ({
  className,
  ...props
}: BaseHTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn(
      "text-text300 mb-2 mt-4 max-w-[55ch] text-xl font-normal leading-[1.4]",
      className
    )}
    {...props}
  />
)

const SubtitleTwo = ({
  className,
  ...props
}: BaseHTMLAttributes<HTMLHeadingElement>) => (
  <Subtitle className={cn("mt-0", className)} {...props} />
)

const ContentBox = ({
  className,
  ...props
}: BaseHTMLAttributes<HTMLDivElement>) => (
  <div className={cn("w-full px-8 py-4", className)} {...props} />
)

const StackContainer = ({
  className,
  ...props
}: BaseHTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "mx-0 my-8 w-full border bg-background-highlight px-8 py-12 sm:mx-8 sm:w-[96%] sm:rounded",
      className
    )}
    {...props}
  />
)

export async function getStaticPaths() {
  return {
    paths: LOCALES_CODES.map((locale) => ({ params: { locale } })),
    fallback: false,
  }
}

export const getStaticProps = (async ({ params }) => {
  const { locale = DEFAULT_LOCALE } = params || {}

  const requiredNamespaces = getRequiredNamespacesForPage(
    "/developers/learning-tools"
  )

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const messages = await loadNamespaces(locale!, requiredNamespaces)

  return {
    props: {
      messages,
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps, Params>

const LearningToolsPage = () => {
  const { t } = useTranslation(["page-developers-learning-tools"])

  const randomizedSandboxes: Array<LearningTool> = shuffle([
    {
      name: "Remix",
      description: t(
        "page-developers-learning-tools:page-learning-tools-remix-description"
      ),
      url: "https://remix.ethereum.org",
      image: RemixImage,
      alt: t(
        "page-developers-learning-tools:page-learning-tools-remix-logo-alt"
      ),
      background: "#5098d6",
      subjects: ["Solidity", "Vyper"],
    },
    {
      name: "Eth.build",
      description: t(
        "page-developers-learning-tools:page-learning-tools-eth-dot-build-description"
      ),
      url: "https://eth.build/",
      image: EthDotBuildImage,
      alt: t(
        "page-developers-learning-tools:page-learning-tools-eth-dot-build-logo-alt"
      ),
      background: "#000000",
      subjects: ["web3"],
    },
    {
      name: "Replit",
      description: t(
        "page-developers-learning-tools:page-learning-tools-replit-description"
      ),
      url: "https://replit.com/@replit/Solidity-starter-beta",
      image: ReplitImage,
      alt: t(
        "page-developers-learning-tools:page-learning-tools-replit-logo-alt"
      ),
      background: "#0f1524",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "ChainIDE",
      description: t(
        "page-developers-learning-tools:page-learning-tools-chainIDE-description"
      ),
      url: "https://chainide.com/",
      image: ChainIDEImage,
      alt: t(
        "page-developers-learning-tools:page-learning-tools-chainIDE-logo-alt"
      ),
      background: "#2C60A3",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "Tenderly",
      description: t(
        "page-developers-learning-tools:page-learning-tools-tenderly-description"
      ),
      url: "https://sandbox.tenderly.co",
      image: TenderlyImage,
      alt: t(
        "page-developers-learning-tools:page-learning-tools-tenderly-logo-alt"
      ),
      background: "#0f1524",
      subjects: ["Solidity", "Vyper", "web3"],
    },
    {
      name: "Atlas",
      description: t(
        "page-developers-learning-tools:page-learning-tools-atlas-description"
      ),
      url: "https://www.atlaszk.com",
      image: AtlasImage,
      alt: t(
        "page-developers-learning-tools:page-learning-tools-atlas-logo-alt"
      ),
      background: "#000000",
      subjects: ["Solidity"],
    },
    {
      name: "DApp World",
      description: t(
        "page-developers-learning-tools:page-learning-tools-dapp-world-description"
      ),
      url: "https://dapp-world.com",
      image: DappWorldImage,
      alt: t(
        "page-developers-learning-tools:page-learning-tools-dapp-world-logo-alt"
      ),
      background: "#e5e7eb",
      subjects: ["Solidity", "web3"],
    },
  ])

  const games: Array<LearningTool> = [
    {
      name: "CryptoZombies",
      description: t(
        "page-developers-learning-tools:page-learning-tools-cryptozombies-description"
      ),
      url: "https://cryptozombies.io/",
      image: CryptoZombieImage,
      alt: t(
        "page-developers-learning-tools:page-learning-tools-cryptozombies-logo-alt"
      ),
      background: "#2b2f48",
      subjects: ["Solidity"],
    },
    {
      name: "Ethernauts",
      description: t(
        "page-developers-learning-tools:page-learning-tools-ethernauts-description"
      ),
      url: "https://ethernaut.openzeppelin.com/",
      image: EthernautImage,
      alt: t(
        "page-developers-learning-tools:page-learning-tools-ethernauts-logo-alt"
      ),
      background: "#4f62dc",
      subjects: ["Solidity"],
    },
    {
      name: "Capture The Ether",
      description: t(
        "page-developers-learning-tools:page-learning-tools-capture-the-ether-description"
      ),
      url: "https://capturetheether.com/",
      image: CaptureTheEtherImage,
      alt: t(
        "page-developers-learning-tools:page-learning-tools-capture-the-ether-logo-alt"
      ),
      background: "#1b9aaa",
      subjects: ["Solidity"],
    },
    {
      name: "Node Guardians",
      description: t(
        "page-developers-learning-tools:page-learning-tools-node-guardians-description"
      ),
      url: "https://nodeguardians.io/",
      image: NodeGuardiansImage,
      alt: t(
        "page-developers-learning-tools:page-learning-tools-node-guardians-logo-alt"
      ),
      background: "#000",
      subjects: ["Solidity", "web3"],
    },
  ]

  const bootcamps: Array<LearningTool> = [
    {
      name: "ConsenSys Academy",
      description: t(
        "page-developers-learning-tools:page-learning-tools-consensys-academy-description"
      ),
      url: "https://consensys.net/academy/bootcamp/",
      image: ConsensysImage,
      alt: t(
        "page-developers-learning-tools:page-learning-tools-consensys-academy-logo-alt"
      ),
      background: "#f6f7f9",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "BloomTech",
      description: t(
        "page-developers-learning-tools:page-learning-tools-bloomtech-description"
      ),
      url: "https://www.bloomtech.com/courses/web3",
      image: BloomTechImage,
      alt: t(
        "page-developers-learning-tools:page-learning-tools-bloomtech-logo-alt"
      ),
      background: "#ffffff",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "Questbook",
      description: t(
        "page-developers-learning-tools:page-learning-tools-questbook-description"
      ),
      url: "https://learn.questbook.xyz/",
      image: QuestbookImage,
      alt: t(
        "page-developers-learning-tools:page-learning-tools-questbook-logo-alt"
      ),
      background: "#141236",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "Metaschool",
      description: t(
        "page-developers-learning-tools:page-learning-tools-metaschool-description"
      ),
      url: "https://metaschool.so",
      image: MetaschoolImage,
      alt: t(
        "page-developers-learning-tools:page-learning-tools-metaschool-logo-alt"
      ),
      background: "#f6f7f9",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "NFT School",
      description: t(
        "page-developers-learning-tools:page-learning-tools-nftschool-description"
      ),
      url: "https://nftschool.dev/",
      image: NFTSchoolImage,
      alt: t(
        "page-developers-learning-tools:page-learning-tools-nftschool-logo-alt"
      ),
      background: "#111f29",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "Platzi",
      description: t(
        "page-developers-learning-tools:page-learning-tools-platzi-description"
      ),
      url: "https://platzi.com/escuela/escuela-blockchain/",
      image: PlatziImage,
      alt: t(
        "page-developers-learning-tools:page-learning-tools-platzi-logo-alt"
      ),
      background: "#121f3d",
      subjects: ["Solidity", "web3"],
      locales: ["es"],
    },
    {
      name: "Speed Run Ethereum",
      description: t(
        "page-developers-learning-tools:page-learning-tools-speed-run-ethereum-description"
      ),
      url: "https://speedrunethereum.com/",
      image: SpeedRunEthereumImage,
      alt: t(
        "page-developers-learning-tools:page-learning-tools-speed-run-ethereum-logo-alt"
      ),
      background: "#ffffff",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "Alchemy University",
      description: t(
        "page-developers-learning-tools:page-learning-tools-alchemy-university-description"
      ),
      url: "https://university.alchemy.com/",
      image: AlchemyUniversityImage,
      alt: t(
        "page-developers-learning-tools:page-learning-tools-alchemy-university-logo-alt"
      ),
      background: "#ffffff",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "LearnWeb3",
      description: t(
        "page-developers-learning-tools:page-learning-tools-learnweb3-description"
      ),
      url: "https://www.learnweb3.io/",
      image: LearnWeb3Image,
      alt: t(
        "page-developers-learning-tools:page-learning-tools-learnweb3-logo-alt"
      ),
      background: "#ffffff",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "Cyfrin Updraft",
      description: t(
        "page-developers-learning-tools:page-learning-tools-cyfrin-updraft-description"
      ),
      url: "https://updraft.cyfrin.io/",
      image: CyfrinUpdraftImage,
      alt: t(
        "page-developers-learning-tools:page-learning-tools-cyfrin-updraft-logo-alt"
      ),
      background: "#000000",
      subjects: ["Solidity", "web3"],
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={t(
          "page-developers-learning-tools:page-learning-tools-meta-title"
        )}
        description={t(
          "page-developers-learning-tools:page-learning-tools-meta-desc"
        )}
      />
      <MainArticle className="w-full">
        <div className="w-full">
          <Header>
            <H1>
              <Translation id="page-developers-learning-tools:page-learning-tools-coding" />
            </H1>
            <Subtitle>
              <Translation id="page-developers-learning-tools:page-learning-tools-coding-subtitle" />
            </Subtitle>
          </Header>
        </div>
        <StackContainer>
          <SubtitleTwo>
            <Translation id="page-developers-learning-tools:page-learning-tools-sandbox" />
          </SubtitleTwo>
          <p>
            <Translation id="page-developers-learning-tools:page-learning-tools-sandbox-desc" />
          </p>
          <LearningToolsCardGrid category={randomizedSandboxes} />
          <InfoBanner emoji=":point_up:" shouldCenter>
            <Translation id="page-developers-learning-tools:page-learning-tools-remix-description-2" />
          </InfoBanner>
        </StackContainer>
        <StackContainer>
          <SubtitleTwo>
            <Translation id="page-developers-learning-tools:page-learning-tools-game-tutorials" />
          </SubtitleTwo>
          <p>
            <Translation id="page-developers-learning-tools:page-learning-tools-game-tutorials-desc" />
          </p>
          <LearningToolsCardGrid category={games} />
        </StackContainer>
        <StackContainer>
          <SubtitleTwo>
            <Translation id="page-developers-learning-tools:page-learning-tools-bootcamps" />
          </SubtitleTwo>
          <p>
            <Translation id="page-developers-learning-tools:page-learning-tools-bootcamps-desc" />
          </p>
          <LearningToolsCardGrid category={bootcamps} />
        </StackContainer>
        <ContentBox>
          <CalloutBanner
            className="mx-4 mb-40 mt-24"
            image={EnterpriseEth}
            alt="Enterprise ETH"
            titleKey={
              "page-developers-learning-tools:page-learning-tools-documentation"
            }
            descriptionKey={
              "page-developers-learning-tools:page-learning-tools-documentation-desc"
            }
          >
            <div>
              <ButtonLink href="/developers/docs/">
                <Translation id="page-developers-learning-tools:page-learning-tools-browse-docs" />
              </ButtonLink>
            </div>
          </CalloutBanner>
        </ContentBox>

        <ContentBox>
          <FeedbackCard />
        </ContentBox>
      </MainArticle>
    </Page>
  )
}

export default LearningToolsPage
