import Translation from "@/components/Translation"
import { getRequiredNamespacesForPath } from "@/lib/utils/translations"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { GetStaticProps } from "next"
import { ChildOnlyProp } from "@/lib/types"
import { Box, Flex, ListItem, SimpleGrid, UnorderedList } from "@chakra-ui/react"
import FeedbackCard from "@/components/FeedbackCard"
import ProductCard from "@/components/ProductCard"
import PageMetadata from "@/components/PageMetadata"
import Heading from "@/components/OldHeading"
import Text from "@/components/OldText"
import { useTranslation } from "react-i18next"
import { Image } from "@/components/Image"
import EthBlocksImage from '@/public/developers-eth-blocks.png'
import { StaticImageData } from "next/image"
import WaffleImage from '@/public/dev-tools/waffle.png'
import KurtosisImage from '@/public/dev-tools/kurtosis.png'
import HardhatImage from '@/public/dev-tools/hardhat.png'
import TruffleImage from '@/public/dev-tools/truffle.png'
import EthDiamondBlackImage from '@/public/assets/eth-diamond-black.png'
import EpirusImage from '@/public/dev-tools/epirus.png'
import ScaffoldEthImage from '@/public/dev-tools/scaffoldeth.png'
import FoundryImage from '@/public/dev-tools/foundry.png'

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
  background: string
  name: string
  description: string
  alt: string
  image: StaticImageData
}

export const getStaticProps: GetStaticProps = async (
  context
) => {
  const { locale } = context
  // load i18n required namespaces for the given page
  const requiredNamespaces = getRequiredNamespacesForPath('/developers/local-environment')

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
    },
  }
}

const DevelopersPage = () => {
  const { t } = useTranslation("page-developers-local-environment")

  const frameworksList: Array<IFramework> = [
    {
      id: "waffle",
      url: "https://getwaffle.io/",
      background: "#ffffff",
      name: "Waffle",
      description: t("page-developers-local-environment:page-local-environment-waffle-desc"),
      alt: t("page-developers-local-environment:page-local-environment-waffle-logo-alt"),
      image: WaffleImage,
    },
    {
      id: "kurtosis",
      url: "https://www.kurtosis.com/",
      background: "#000000",
      name: "Kurtosis",
      description: t("page-developers-local-environment:page-local-environment-kurtosis-desc"),
      alt: t("page-developers-local-environment:page-local-environment-kurtosis-logo-alt"),
      image: KurtosisImage,
    },
    {
      id: "hardhat",
      url: "https://hardhat.org/",
      background: "#faf8fb",
      name: "Hardhat",
      description: t("page-developers-local-environment:page-local-environment-hardhat-desc"),
      alt: t("page-developers-local-environment:page-local-environment-hardhat-logo-alt"),
      image: HardhatImage,
    },
    {
      id: "truffle",
      url: "https://www.trufflesuite.com/",
      background: "#31272a",
      name: "Truffle",
      description: t("page-developers-local-environment:page-local-environment-truffle-desc"),
      alt: t("page-developers-local-environment:page-local-environment-truffle-logo-alt"),
      image: TruffleImage,
    },
    {
      id: "brownie",
      url: "https://github.com/eth-brownie/brownie",
      background: "#ffffff",
      name: "Brownie",
      description: t("page-developers-local-environment:page-local-environment-brownie-desc"),
      alt: t("page-developers-local-environment:page-local-environment-brownie-logo-alt"),
      image: EthDiamondBlackImage,
    },
    {
      id: "epirus",
      url: "https://www.web3labs.com/epirus",
      background: "#ffffff",
      name: "Epirus",
      description: t("page-developers-local-environment:page-local-environment-epirus-desc"),
      alt: t("page-developers-local-environment:page-local-environment-epirus-logo-alt"),
      image: EpirusImage,
    },
    {
      id: "createethapp",
      url: "https://github.com/PaulRBerg/create-eth-app",
      background: "#ffffff",
      name: "Create Eth App",
      description: t("page-developers-local-environment:page-local-environment-eth-app-desc"),
      alt: t("page-developers-local-environment:page-local-environment-eth-app-logo-alt"),
      image: EthDiamondBlackImage,
    },
    {
      id: "scaffoldeth",
      url: "https://github.com/austintgriffith/scaffold-eth",
      background: "#ffffff",
      name: "scaffold-eth",
      description: t("page-developers-local-environment:page-local-environment-scaffold-eth-desc"),
      alt: t("page-developers-local-environment:page-local-environment-scaffold-eth-logo-alt"),
      image: ScaffoldEthImage,
    },
    {
      id: "soliditytemplate",
      url: "https://github.com/paulrberg/solidity-template",
      background: "#ffffff",
      name: "Solidity template",
      description: t("page-developers-local-environment:page-local-environment-solidity-template-desc"),
      alt: t("page-developers-local-environment:page-local-environment-solidity-template-logo-alt"),
      image: EthDiamondBlackImage,
    },
    {
      id: "foundry",
      url: "https://getfoundry.sh/",
      background: "#ffffff",
      name: "Foundry",
      description: t("page-developers-local-environment:page-local-environment-foundry-desc"),
      alt: t("page-developers-local-environment:page-local-environment-foundry-logo-alt"),
      image: FoundryImage,
    },
  ]

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
              maxW="50rem"
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
              alt={framework.alt}
            >
              {framework.description}
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

export default DevelopersPage