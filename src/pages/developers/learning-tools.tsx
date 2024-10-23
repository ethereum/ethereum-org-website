import shuffle from "lodash/shuffle"
import { GetStaticProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Box, Flex, HeadingProps } from "@chakra-ui/react"

import { BasePageProps, ChildOnlyProp, Lang, LearningTool } from "@/lib/types"

import ButtonLink from "@/components/Buttons/ButtonLink"
import CalloutBanner from "@/components/CalloutBanner"
import FeedbackCard from "@/components/FeedbackCard"
import InfoBanner from "@/components/InfoBanner"
import LearningToolsCardGrid from "@/components/LearningToolsCardGrid"
import MainArticle from "@/components/MainArticle"
import Heading from "@/components/OldHeading"
import Text from "@/components/OldText"
import PageMetadata from "@/components/PageMetadata"
import Translation from "@/components/Translation"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

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

const Page = (props: ChildOnlyProp) => (
  <Flex
    direction="column"
    align="center"
    w="full"
    mx="auto"
    mt={16}
    mb={0}
    {...props}
  />
)

const Header = (props: ChildOnlyProp) => (
  <Flex
    as="header"
    direction="column"
    align="center"
    textAlign="center"
    maxW="896px"
    py={0}
    px={8}
    m="auto"
    {...props}
  />
)

const H1 = (props: ChildOnlyProp) => (
  <Heading
    as="h1"
    color="text"
    fontStyle="normal"
    fontFamily="monospace"
    textTransform="uppercase"
    fontWeight="semibold"
    fontSize="2rem"
    lineHeight={1.4}
    textAlign="center"
    {...props}
  />
)

const Subtitle = (props: HeadingProps) => (
  <Heading
    fontSize="xl"
    lineHeight={1.4}
    fontWeight="normal"
    color="text300"
    maxW="55ch"
    mb={2}
    mt={4}
    {...props}
  />
)

const SubtitleTwo = (props: ChildOnlyProp) => <Subtitle mt={0} {...props} />

const ContentBox = (props: ChildOnlyProp) => (
  <Box py={4} px={8} w="full" {...props} />
)

const StackContainer = (props: ChildOnlyProp) => (
  <Box
    border="1px"
    borderColor="border"
    borderRadius={{ base: 0, sm: "base" }}
    w={{ base: "full", sm: "96%" }}
    mx={{ base: 0, sm: 8 }}
    my={8}
    px={8}
    py={12}
    background="ednBackground"
    {...props}
  />
)

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/developers/learning-tools"
  )

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

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
        <Box w="full">
          <Header>
            <H1>
              <Translation id="page-developers-learning-tools:page-learning-tools-coding" />
            </H1>
            <Subtitle>
              <Translation id="page-developers-learning-tools:page-learning-tools-coding-subtitle" />
            </Subtitle>
          </Header>
        </Box>
        <StackContainer>
          <SubtitleTwo>
            <Translation id="page-developers-learning-tools:page-learning-tools-sandbox" />
          </SubtitleTwo>
          <Text>
            <Translation id="page-developers-learning-tools:page-learning-tools-sandbox-desc" />
          </Text>
          <LearningToolsCardGrid category={randomizedSandboxes} />
          <InfoBanner emoji=":point_up:" shouldCenter>
            <Translation id="page-developers-learning-tools:page-learning-tools-remix-description-2" />
          </InfoBanner>
        </StackContainer>
        <StackContainer>
          <SubtitleTwo>
            <Translation id="page-developers-learning-tools:page-learning-tools-game-tutorials" />
          </SubtitleTwo>
          <Text>
            <Translation id="page-developers-learning-tools:page-learning-tools-game-tutorials-desc" />
          </Text>
          <LearningToolsCardGrid category={games} />
        </StackContainer>
        <StackContainer>
          <SubtitleTwo>
            <Translation id="page-developers-learning-tools:page-learning-tools-bootcamps" />
          </SubtitleTwo>
          <Text>
            <Translation id="page-developers-learning-tools:page-learning-tools-bootcamps-desc" />
          </Text>
          <LearningToolsCardGrid category={bootcamps} />
        </StackContainer>
        <ContentBox>
          <CalloutBanner
            className="mx-4 mb-40 mt-24"
            image={EnterpriseEth}
            alt={t(
              "page-developers-learning-tools:page-index-tout-enterprise-image-alt"
            )}
            titleKey={
              "page-developers-learning-tools:page-learning-tools-documentation"
            }
            descriptionKey={
              "page-developers-learning-tools:page-learning-tools-documentation-desc"
            }
          >
            <Box>
              <ButtonLink href="/developers/docs/">
                <Translation id="page-developers-learning-tools:page-learning-tools-browse-docs" />
              </ButtonLink>
            </Box>
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
