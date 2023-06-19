// Library imports
import React, { useEffect, useState } from "react"
import { graphql, PageProps } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { shuffle } from "lodash"
import { Box, Flex, Heading, HeadingProps, Text } from "@chakra-ui/react"
// Component imports
import PageMetadata from "../../components/PageMetadata"
import Translation from "../../components/Translation"
import ButtonLink from "../../components/ButtonLink"
import InfoBanner from "../../components/InfoBanner"
import CalloutBanner from "../../components/CalloutBanner"
import FeedbackCard from "../../components/FeedbackCard"
import LearningToolsCardGrid from "../../components/LearningToolsCardGrid"
// Util imports
import { getImage } from "../../utils/image"
// Type imports
import type { ChildOnlyProp, Context, LearningTool } from "../../types"

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
    {...props}
  />
)

const H1 = (props: ChildOnlyProp) => (
  <Heading
    as="h1"
    my={0}
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

// Page component
const LearningToolsPage = ({
  data,
}: PageProps<Queries.DevelopersLearningToolsPageQuery, Context>) => {
  const { t } = useTranslation()
  const [randomizedSandboxes, setRandomizedSandboxes] = useState<
    Array<LearningTool>
  >([])

  useEffect(() => {
    const sandboxes: Array<LearningTool> = [
      {
        name: "Remix",
        description: t("page-learning-tools-remix-description"),
        url: "https://remix.ethereum.org",
        image: getImage(data.remix)!,
        alt: t("page-learning-tools-remix-logo-alt"),
        background: "#5098d6",
        subjects: ["Solidity", "Vyper"],
      },
      {
        name: "Eth.build",
        description: t("page-learning-tools-eth-dot-build-description"),
        url: "https://eth.build/",
        image: getImage(data.ethdotbuild)!,
        alt: t("page-learning-tools-eth-dot-build-logo-alt"),
        background: "#000000",
        subjects: ["web3"],
      },
      {
        name: "Replit",
        description: t("page-learning-tools-replit-description"),
        url: "https://replit.com/@replit/Solidity-starter-beta",
        image: getImage(data.replit)!,
        alt: t("page-learning-tools-replit-logo-alt"),
        background: "#0f1524",
        subjects: ["Solidity", "web3"],
      },
      {
        name: "ChainIDE",
        description: "page-learning-tools-chainIDE-description",
        url: "https://chainide.com/",
        image: getImage(data.chainIDE)!,
        alt: "page-learning-tools-chainIDE-logo-alt",
        background: "#2C60A3",
        subjects: ["Solidity", "web3"],
      },
    ]
    const randomizedSandboxes = shuffle(sandboxes)
    setRandomizedSandboxes(randomizedSandboxes)
  }, [data])

  const games: Array<LearningTool> = [
    {
      name: "CryptoZombies",
      description: t("page-learning-tools-cryptozombies-description"),
      url: "https://cryptozombies.io/",
      image: getImage(data.cryptoZombie)!,
      alt: t("page-learning-tools-cryptozombies-logo-alt"),
      background: "#2b2f48",
      subjects: ["Solidity"],
    },
    {
      name: "Ethernauts",
      description: t("page-learning-tools-ethernauts-description"),
      url: "https://ethernaut.openzeppelin.com/",
      image: getImage(data.oz)!,
      alt: t("page-learning-tools-ethernauts-logo-alt"),
      background: "#4f62dc",
      subjects: ["Solidity"],
    },
    {
      name: "Capture The Ether",
      description: t("page-learning-tools-capture-the-ether-description"),
      url: "https://capturetheether.com/",
      image: getImage(data.captureTheEther)!,
      alt: t("page-learning-tools-capture-the-ether-logo-alt"),
      background: "#1b9aaa",
      subjects: ["Solidity"],
    },
  ]

  const bootcamps: Array<LearningTool> = [
    {
      name: "ChainShot",
      description: t("page-learning-tools-chainshot-description"),
      url: "https://www.chainshot.com",
      image: getImage(data.chainshot)!,
      alt: t("page-learning-tools-chainshot-logo-alt"),
      background: "#111f29",
      subjects: ["Solidity", "Vyper", "web3"],
    },
    {
      name: "ConsenSys Academy",
      description: t("page-learning-tools-consensys-academy-description"),
      url: "https://consensys.net/academy/bootcamp/",
      image: getImage(data.consensys)!,
      alt: t("page-learning-tools-consensys-academy-logo-alt"),
      background: "#f6f7f9",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "BloomTech",
      description: t("page-learning-tools-bloomtech-description"),
      url: "https://www.bloomtech.com/courses/web3",
      image: getImage(data.bloomtech)!,
      alt: t("page-learning-tools-bloomtech-logo-alt"),
      background: "#ffffff",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "_buildspace",
      description: t("page-learning-tools-buildspace-description"),
      url: "https://buildspace.so",
      image: getImage(data.buildspace)!,
      alt: t("page-learning-tools-buildspace-logo-alt"),
      background: "#f6f7f9",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "Questbook",
      description: t("page-learning-tools-questbook-description"),
      url: "https://learn.questbook.xyz/",
      image: getImage(data.questbook)!,
      alt: t("page-learning-tools-questbook-logo-alt"),
      background: "#141236",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "Metaschool",
      description: "page-learning-tools-metaschool-description",
      url: "https://metaschool.so",
      image: getImage(data.metaschool)!,
      alt: "page-learning-tools-metaschool-logo-alt",
      background: "#f6f7f9",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "NFT School",
      description: t("page-learning-tools-nftschool-description"),
      url: "https://nftschool.dev/",
      image: getImage(data.nftschool)!,
      alt: t("page-learning-tools-nftschool-logo-alt"),
      background: "#111f29",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "Pointer",
      description: t("page-learning-tools-pointer-description"),
      url: "https://pointer.gg/",
      image: getImage(data.pointer)!,
      alt: t("page-learning-tools-pointer-logo-alt"),
      background: "#171717",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "Platzi",
      description: t("page-learning-tools-platzi-description"),
      url: "https://platzi.com/escuela/escuela-blockchain/",
      image: getImage(data.platzi)!,
      alt: t("page-learning-tools-platzi-logo-alt"),
      background: "#121f3d",
      subjects: ["Solidity", "web3"],
      locales: ["es"],
    },
    {
      name: "Speed Run Ethereum",
      description: t("page-learning-tools-speed-run-ethereum-description"),
      url: "https://speedrunethereum.com/",
      image: getImage(data.speedRunEthereum)!,
      alt: t("page-learning-tools-speed-run-ethereum-logo-alt"),
      background: "#ffffff",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "Alchemy University",
      description: "page-learning-tools-alchemy-university-description",
      url: "https://university.alchemy.com/",
      image: getImage(data.alchemyuniversity)!,
      alt: "page-learning-tools-alchemy-university-logo-alt",
      background: "#ffffff",
      subjects: ["Solidity", "web3"],
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={t("page-learning-tools-meta-title")}
        description={t("page-learning-tools-meta-desc")}
      />
      <Header>
        <H1>
          <Translation id="page-learning-tools-coding" />
        </H1>
        <Subtitle>
          <Translation id="page-learning-tools-coding-subtitle" />
        </Subtitle>
      </Header>
      <StackContainer>
        <SubtitleTwo>
          <Translation id="page-learning-tools-sandbox" />
        </SubtitleTwo>
        <Text>
          <Translation id="page-learning-tools-sandbox-desc" />
        </Text>
        <LearningToolsCardGrid category={randomizedSandboxes} />
        <InfoBanner emoji=":point_up:" shouldCenter>
          <Translation id="page-learning-tools-remix-description-2" />
        </InfoBanner>
      </StackContainer>
      <StackContainer>
        <SubtitleTwo>
          <Translation id="page-learning-tools-game-tutorials" />
        </SubtitleTwo>
        <Text>
          <Translation id="page-learning-tools-game-tutorials-desc" />
        </Text>
        <LearningToolsCardGrid category={games} />
      </StackContainer>
      <StackContainer>
        <SubtitleTwo>
          <Translation id="page-learning-tools-bootcamps" />
        </SubtitleTwo>
        <Text>
          <Translation id="page-learning-tools-bootcamps-desc" />
        </Text>
        <LearningToolsCardGrid category={bootcamps} />
      </StackContainer>
      <ContentBox>
        <CalloutBanner
          mx={4}
          mt={24}
          mb={40}
          image={getImage(data.learn)!}
          alt={t("page-index-tout-enterprise-image-alt")}
          titleKey={"page-learning-tools-documentation"}
          descriptionKey={"page-learning-tools-documentation-desc"}
        >
          <Box>
            <ButtonLink to="/developers/docs/">
              <Translation id="page-learning-tools-browse-docs" />
            </ButtonLink>
          </Box>
        </CalloutBanner>
      </ContentBox>
      <ContentBox>
        <FeedbackCard />
      </ContentBox>
    </Page>
  )
}

export default LearningToolsPage

export const learningToolImage = graphql`
  fragment learningToolImage on File {
    childImageSharp {
      gatsbyImageData(
        height: 100
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

export const query = graphql`
  query DevelopersLearningToolsPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-developers-learning-tools", "common"] }
      }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    captureTheEther: file(
      relativePath: { eq: "dev-tools/capturetheether.png" }
    ) {
      ...learningToolImage
    }
    chainshot: file(relativePath: { eq: "dev-tools/chainshot.png" }) {
      ...learningToolImage
    }
    consensys: file(relativePath: { eq: "dev-tools/consensys.png" }) {
      ...learningToolImage
    }
    bloomtech: file(relativePath: { eq: "dev-tools/bloomtech.png" }) {
      ...learningToolImage
    }
    buildspace: file(relativePath: { eq: "dev-tools/buildspace.png" }) {
      ...learningToolImage
    }
    cryptoZombie: file(relativePath: { eq: "dev-tools/crypto-zombie.png" }) {
      ...learningToolImage
    }
    oz: file(relativePath: { eq: "dev-tools/oz.png" }) {
      ...learningToolImage
    }
    metaschool: file(relativePath: { eq: "dev-tools/metaschool.png" }) {
      ...learningToolImage
    }
    questbook: file(relativePath: { eq: "dev-tools/questbook.png" }) {
      ...learningToolImage
    }
    remix: file(relativePath: { eq: "dev-tools/remix.png" }) {
      ...learningToolImage
    }
    replit: file(relativePath: { eq: "dev-tools/replit.png" }) {
      ...learningToolImage
    }
    speedRunEthereum: file(
      relativePath: { eq: "dev-tools/speed-run-ethereum.png" }
    ) {
      ...learningToolImage
    }
    ethdotbuild: file(relativePath: { eq: "dev-tools/eth-dot-build.png" }) {
      ...learningToolImage
    }
    chainIDE: file(relativePath: { eq: "dev-tools/chainIDE.png" }) {
      ...learningToolImage
    }
    nftschool: file(relativePath: { eq: "dev-tools/nftschool.png" }) {
      ...learningToolImage
    }
    pointer: file(relativePath: { eq: "dev-tools/pointer.png" }) {
      ...learningToolImage
    }
    platzi: file(relativePath: { eq: "dev-tools/platzi.png" }) {
      ...learningToolImage
    }
    alchemyuniversity: file(
      relativePath: { eq: "dev-tools/alchemyuniversity.png" }
    ) {
      ...learningToolImage
    }
    learn: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 800
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
