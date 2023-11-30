import { GetStaticProps } from "next"
import { StaticImageData } from "next/image"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "react-i18next"
import { Box, Flex, ListItem, SimpleGrid, UnorderedList } from "@chakra-ui/react"

import { ChildOnlyProp } from "@/lib/types"

import FeedbackCard from "@/components/FeedbackCard"
import { Image } from "@/components/Image"
import Heading from "@/components/OldHeading"
import Text from "@/components/OldText"
import PageMetadata from "@/components/PageMetadata"
import ProductCard from "@/components/ProductCard"
import Translation from "@/components/Translation"

import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { ghRepoData } from "@/lib/api/ghRepoData"
import EthDiamondBlackImage from '@/public/assets/eth-diamond-black.png'
import EpirusImage from '@/public/dev-tools/epirus.png'
import FoundryImage from '@/public/dev-tools/foundry.png'
import HardhatImage from '@/public/dev-tools/hardhat.png'
import KurtosisImage from '@/public/dev-tools/kurtosis.png'
import ScaffoldEthImage from '@/public/dev-tools/scaffoldeth.png'
import TruffleImage from '@/public/dev-tools/truffle.png'
import WaffleImage from '@/public/dev-tools/waffle.png'
import EthBlocksImage from '@/public/developers-eth-blocks.png'

const Content = ({ children }: ChildOnlyProp) => {
  return (
    <Box py={4} px={8} w="full">
      {children}
    </Box>
  )
}

const Column = ({ children }: ChildOnlyProp) => {
  return (
    <Box
      flex="1 0 33%"
      justifyContent="flex-end"
      mb={6}
      mr={8}
      w="full"
      maxW={{ base: "full", md: "none" }}
    >
      {children}
    </Box>
  )
}

interface IFramework {
  id: string
  url: string
  githubUrl: string
  background: string
  name: string
  description: string
  alt: string
  image: StaticImageData
  starCount?: number
  languages?: string[]
}

export const getStaticProps: GetStaticProps = async (
  context
) => {
  const { locale } = context
  // load i18n required namespaces for the given page
  const requiredNamespaces = getRequiredNamespacesForPage('/developers/local-environment')

  // TODO: fetch github repo data
  let frameworksList: Array<IFramework> = [
    {
      id: "waffle",
      url: "https://getwaffle.io/",
      githubUrl: "https://github.com/EthWorks/waffle",
      background: "#ffffff",
      name: "Waffle",
      description: "page-developers-local-environment:page-local-environment-waffle-desc",
      alt: "page-developers-local-environment:page-local-environment-waffle-logo-alt",
      image: WaffleImage,
    },
    {
      id: "kurtosis",
      url: "https://www.kurtosis.com/",
      githubUrl: "https://github.com/kurtosis-tech/kurtosis",
      background: "#000000",
      name: "Kurtosis",
      description: "page-developers-local-environment:page-local-environment-kurtosis-desc",
      alt: "page-developers-local-environment:page-local-environment-kurtosis-logo-alt",
      image: KurtosisImage,
    },
    {
      id: "hardhat",
      url: "https://hardhat.org/",
      githubUrl: "https://github.com/nomiclabs/hardhat",
      background: "#faf8fb",
      name: "Hardhat",
      description: "page-developers-local-environment:page-local-environment-hardhat-desc",
      alt: "page-developers-local-environment:page-local-environment-hardhat-logo-alt",
      image: HardhatImage,
    },
    {
      id: "truffle",
      url: "https://www.trufflesuite.com/",
      githubUrl: "https://github.com/trufflesuite/truffle",
      background: "#31272a",
      name: "Truffle",
      description: "page-developers-local-environment:page-local-environment-truffle-desc",
      alt: "page-developers-local-environment:page-local-environment-truffle-logo-alt",
      image: TruffleImage,
    },
    {
      id: "brownie",
      url: "https://github.com/eth-brownie/brownie",
      githubUrl: "https://github.com/eth-brownie/brownie",
      background: "#ffffff",
      name: "Brownie",
      description: "page-developers-local-environment:page-local-environment-brownie-desc",
      alt: "page-developers-local-environment:page-local-environment-brownie-logo-alt",
      image: EthDiamondBlackImage,
    },
    {
      id: "epirus",
      url: "https://www.web3labs.com/epirus",
      githubUrl: "https://github.com/web3labs/epirus-free",
      background: "#ffffff",
      name: "Epirus",
      description: "page-developers-local-environment:page-local-environment-epirus-desc",
      alt: "page-developers-local-environment:page-local-environment-epirus-logo-alt",
      image: EpirusImage,
    },
    {
      id: "createethapp",
      url: "https://github.com/PaulRBerg/create-eth-app",
      githubUrl: "https://github.com/PaulRBerg/create-eth-app",
      background: "#ffffff",
      name: "Create Eth App",
      description: "page-developers-local-environment:page-local-environment-eth-app-desc",
      alt: "page-developers-local-environment:page-local-environment-eth-app-logo-alt",
      image: EthDiamondBlackImage,
    },
    {
      id: "scaffoldeth",
      url: "https://github.com/austintgriffith/scaffold-eth",
      githubUrl: "https://github.com/austintgriffith/scaffold-eth",
      background: "#ffffff",
      name: "scaffold-eth",
      description: "page-developers-local-environment:page-local-environment-scaffold-eth-desc",
      alt: "page-developers-local-environment:page-local-environment-scaffold-eth-logo-alt",
      image: ScaffoldEthImage,
    },
    {
      id: "soliditytemplate",
      url: "https://github.com/paulrberg/solidity-template",
      githubUrl: "https://github.com/paulrberg/solidity-template",
      background: "#ffffff",
      name: "Solidity template",
      description: "page-developers-local-environment:page-local-environment-solidity-template-desc",
      alt: "page-developers-local-environment:page-local-environment-solidity-template-logo-alt",
      image: EthDiamondBlackImage,
    },
    {
      id: "foundry",
      url: "https://getfoundry.sh/",
      githubUrl: "https://github.com/foundry-rs/foundry",
      background: "#ffffff",
      name: "Foundry",
      description: "page-developers-local-environment:page-local-environment-foundry-desc",
      alt: "page-developers-local-environment:page-local-environment-foundry-logo-alt",
      image: FoundryImage,
    },
  ]
  
  frameworksList = await Promise.all(frameworksList.map(async (framework) => {
    const repoData = await ghRepoData(framework.githubUrl)
    return {
      ...framework,
      starCount: repoData.starCount,
      languages: repoData.languages.slice(0,2),
    }
  }))

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      frameworksList,
    },
  }
}

const LocalEnvironmentPage = ({ frameworksList }) => {
  const { t } = useTranslation("page-developers-local-environment")

  return (
    <Flex direction="column" alignItems="center" w="full" mx="auto" mt={16}>
      <PageMetadata
        title={t("page-developers-local-environment:page-local-environment-setup-meta-title")}
        description={t("page-developers-local-environment:page-local-environment-setup-meta-desc")}
      />
      <Box
        pt={{ base: 0, xl: 4 }}
        pb={{ base: 8, xl: 4 }}
        px={8}
        w="full"
        mb={8}
        justifyContent="center"
      >
        <Heading
          as="h1"
          fontStyle="normal"
          fontFamily="monospace"
          textTransform="uppercase"
          fontWeight="semibold"
          fontSize="2rem"
          lineHeight={1.4}
          textAlign="center"
          mt={0}
          mb="1.625rem"
        >
          <Translation id="page-developers-local-environment:page-local-environment-setup-title" />
        </Heading>
        <Text
          fontSize="xl"
          lineHeight={1.4}
          color="text200"
          mb={2}
          textAlign="center"
        >
          <Translation id="page-developers-local-environment:page-local-environment-setup-subtitle" />
          <br />
          <Translation id="page-developers-local-environment:page-local-environment-setup-subtitle-2" />
        </Text>
      </Box>
      <Content>
        <Flex
          direction={{ base: "column-reverse", lg: "row" }}
          alignItems={{ base: "flex-start", lg: "center" }}
          w="full"
          justifyContent="space-between"
        >
          <Column>
            <Heading
              fontSize={{ base: "2xl", md: "2rem" }}
              lineHeight={1.4}
              mt={0}
              mb="1.625rem"
            >
              <Translation id="page-developers-local-environment:page-local-environment-frameworks-title" />
            </Heading>
            <Text>
              <Translation id="page-developers-local-environment:page-local-environment-frameworks-desc" />
            </Text>
            <Text>
              <Translation id="page-developers-local-environment:page-local-environment-framework-features" />
            </Text>
            <UnorderedList>
              <ListItem>
                <Translation id="page-developers-local-environment:page-local-environment-framework-feature-1" />
              </ListItem>
              <ListItem>
                <Translation id="page-developers-local-environment:page-local-environment-framework-feature-2" />
              </ListItem>
              <ListItem>
                <Translation id="page-developers-local-environment:page-local-environment-framework-feature-3" />
              </ListItem>
              <ListItem>
                <Translation id="page-developers-local-environment:page-local-environment-framework-feature-4" />
              </ListItem>
              <ListItem>
                <Translation id="page-developers-local-environment:page-local-environment-framework-feature-5" />
              </ListItem>
            </UnorderedList>
          </Column>
          <Column>
            <Image
              flex="1 1 100%"
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
              src={EthBlocksImage}
              alt={t("page-developers-index:alt-eth-blocks")}
              loading="eager"
            />
          </Column>
        </Flex>
        <SimpleGrid minChildWidth="min(100%, 280px)" spacing={8}>
          {frameworksList.map((framework, idx) => (
            <ProductCard
              key={idx}
              url={framework.url}
              background={framework.background}
              image={framework.image!}
              name={framework.name}
              alt={t(framework.alt)}
              githubUrl={framework.githubUrl}
              githubRepoStars={framework.starCount}
              githubRepoLanguages={framework.languages}
            >
              {t(framework.description)}
            </ProductCard>
          ))}
        </SimpleGrid>
      </Content>
      <Content>
        <FeedbackCard />
      </Content>
    </Flex>
  )
}

export default LocalEnvironmentPage