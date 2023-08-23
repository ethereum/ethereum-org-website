import React, { useEffect, useState } from "react"
import {
  Box,
  Flex,
  Heading,
  Img,
  ListItem,
  SimpleGrid,
  Text,
  UnorderedList,
} from "@chakra-ui/react"

import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import { graphql, PageProps } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { shuffle } from "lodash"

import Translation from "../../components/Translation"
import PageMetadata from "../../components/PageMetadata"
import ProductCard from "../../components/ProductCard"
import FeedbackCard from "../../components/FeedbackCard"

import { getImage } from "../../utils/image"

import { ChildOnlyProp, Context } from "../../types"

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
  image?: IGatsbyImageData
}

const ChooseStackPage = ({
  data,
}: PageProps<Queries.DevelopersLocalEnvironmentPageQuery, Context>) => {
  const { t } = useTranslation()
  const [frameworks, setFrameworks] = useState<Array<IFramework>>([])

  const frameworksList: Array<IFramework> = [
    {
      id: "waffle",
      url: "https://getwaffle.io/",
      githubUrl: "https://github.com/EthWorks/waffle",
      background: "#ffffff",
      name: "Waffle",
      description: t("page-local-environment-waffle-desc"),
      alt: t("page-local-environment-waffle-logo-alt"),
    },
    {
      id: "kurtosis",
      url: "https://www.kurtosis.com/",
      githubUrl: "https://github.com/kurtosis-tech/kurtosis",
      background: "#000000",
      name: "Kurtosis",
      description: t("page-local-environment-kurtosis-desc"),
      alt: t("page-local-environment-kurtosis-logo-alt"),
    },
    {
      id: "hardhat",
      url: "https://hardhat.org/",
      githubUrl: "https://github.com/nomiclabs/hardhat",
      background: "#faf8fb",
      name: "Hardhat",
      description: t("page-local-environment-hardhat-desc"),
      alt: t("page-local-environment-hardhat-logo-alt"),
    },
    {
      id: "truffle",
      url: "https://www.trufflesuite.com/",
      githubUrl: "https://github.com/trufflesuite/truffle",
      background: "#31272a",
      name: "Truffle",
      description: t("page-local-environment-truffle-desc"),
      alt: t("page-local-environment-truffle-logo-alt"),
    },
    {
      id: "brownie",
      url: "https://github.com/eth-brownie/brownie",
      githubUrl: "https://github.com/eth-brownie/brownie",
      background: "#ffffff",
      name: "Brownie",
      description: t("page-local-environment-brownie-desc"),
      alt: t("page-local-environment-brownie-logo-alt"),
    },
    {
      id: "epirus",
      url: "https://www.web3labs.com/epirus",
      githubUrl: "https://github.com/web3labs/epirus-free",
      background: "#ffffff",
      name: "Epirus",
      description: t("page-local-environment-epirus-desc"),
      alt: t("page-local-environment-epirus-logo-alt"),
    },
    {
      id: "createethapp",
      url: "https://github.com/PaulRBerg/create-eth-app",
      githubUrl: "https://github.com/PaulRBerg/create-eth-app",
      background: "#ffffff",
      name: "Create Eth App",
      description: t("page-local-environment-eth-app-desc"),
      alt: t("page-local-environment-eth-app-logo-alt"),
    },
    {
      id: "scaffoldeth",
      url: "https://github.com/austintgriffith/scaffold-eth",
      githubUrl: "https://github.com/austintgriffith/scaffold-eth",
      background: "#ffffff",
      name: "scaffold-eth",
      description: t("page-local-environment-scaffold-eth-desc"),
      alt: t("page-local-environment-scaffold-eth-logo-alt"),
    },
    {
      id: "soliditytemplate",
      url: "https://github.com/paulrberg/solidity-template",
      githubUrl: "https://github.com/paulrberg/solidity-template",
      background: "#ffffff",
      name: "Solidity template",
      description: t("page-local-environment-solidity-template-desc"),
      alt: t("page-local-environment-solidity-template-logo-alt"),
    },
    {
      id: "foundry",
      url: "https://getfoundry.sh/",
      githubUrl: "https://github.com/foundry-rs/foundry",
      background: "#ffffff",
      name: "Foundry",
      description: t("page-local-environment-foundry-desc"),
      alt: t("page-local-environment-foundry-logo-alt"),
    },
  ]

  useEffect(() => {
    const list = shuffle(
      frameworksList.map((item) => {
        if (item.image) return item
        item.image = getImage(data[item.id])
        return item
      })
    )
    setFrameworks(list)
  }, [data])

  return (
    <Flex direction="column" alignItems="center" w="full" mx="auto" mt={16}>
      <PageMetadata
        title={t("page-local-environment-setup-meta-title")}
        description={t("page-local-environment-setup-meta-desc")}
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
          <Translation id="page-local-environment-setup-title" />
        </Heading>
        <Text
          fontSize="xl"
          lineHeight={1.4}
          color="text200"
          mb={2}
          textAlign="center"
        >
          <Translation id="page-local-environment-setup-subtitle" />
          <br />
          <Translation id="page-local-environment-setup-subtitle-2" />
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
              <Translation id="page-local-environment-frameworks-title" />
            </Heading>
            <Text>
              <Translation id="page-local-environment-frameworks-desc" />
            </Text>
            <Text>
              <Translation id="page-local-environment-framework-features" />
            </Text>
            <UnorderedList>
              <ListItem>
                <Translation id="page-local-environment-framework-feature-1" />
              </ListItem>
              <ListItem>
                <Translation id="page-local-environment-framework-feature-2" />
              </ListItem>
              <ListItem>
                <Translation id="page-local-environment-framework-feature-3" />
              </ListItem>
              <ListItem>
                <Translation id="page-local-environment-framework-feature-4" />
              </ListItem>
              <ListItem>
                <Translation id="page-local-environment-framework-feature-5" />
              </ListItem>
            </UnorderedList>
          </Column>
          <Column>
            <Img
              as={GatsbyImage}
              flex="1 1 100%"
              maxW="50rem"
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
              image={getImage(data.hero)!}
              alt={t("alt-eth-blocks")}
              loading="eager"
            />
          </Column>
        </Flex>
        <SimpleGrid minChildWidth="min(100%, 280px)" spacing={8}>
          {frameworks.map((framework, idx) => (
            <ProductCard
              key={idx}
              url={framework.url}
              background={framework.background}
              image={framework.image!}
              name={framework.name}
              githubUrl={framework.githubUrl}
              repoLangCount={2}
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
export default ChooseStackPage

export const devtoolImage = graphql`
  fragment devtoolImage on File {
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
  query DevelopersLocalEnvironmentPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-developers-local-environment", "common"] }
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
    hero: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 700
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    ogImage: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 1200
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    hardhat: file(relativePath: { eq: "dev-tools/hardhat.png" }) {
      ...devtoolImage
    }
    waffle: file(relativePath: { eq: "dev-tools/waffle.png" }) {
      ...devtoolImage
    }

    truffle: file(relativePath: { eq: "dev-tools/truffle.png" }) {
      ...devtoolImage
    }
    brownie: file(relativePath: { eq: "assets/eth-diamond-black.png" }) {
      ...devtoolImage
    }
    epirus: file(relativePath: { eq: "dev-tools/epirus.png" }) {
      ...devtoolImage
    }
    createethapp: file(relativePath: { eq: "assets/eth-diamond-black.png" }) {
      ...devtoolImage
    }
    scaffoldeth: file(relativePath: { eq: "dev-tools/scaffoldeth.png" }) {
      ...devtoolImage
    }
    soliditytemplate: file(
      relativePath: { eq: "assets/eth-diamond-black.png" }
    ) {
      ...devtoolImage
    }
    ganache: file(relativePath: { eq: "dev-tools/ganache.png" }) {
      ...devtoolImage
    }
    ethnode: file(relativePath: { eq: "assets/eth-diamond-black.png" }) {
      ...devtoolImage
    }
    solidity: file(relativePath: { eq: "dev-tools/solidity.png" }) {
      ...devtoolImage
    }
    vyper: file(relativePath: { eq: "dev-tools/vyper.png" }) {
      ...devtoolImage
    }
    vscode: file(relativePath: { eq: "dev-tools/Vscode.png" }) {
      ...devtoolImage
    }
    workbench: file(relativePath: { eq: "dev-tools/workbench.png" }) {
      ...devtoolImage
    }
    atom: file(relativePath: { eq: "dev-tools/atom.png" }) {
      ...devtoolImage
    }
    web3js: file(relativePath: { eq: "dev-tools/web3js.png" }) {
      ...devtoolImage
    }
    ethers: file(relativePath: { eq: "dev-tools/ethers.png" }) {
      ...devtoolImage
    }
    foundry: file(relativePath: { eq: "dev-tools/foundry.png" }) {
      ...devtoolImage
    }
    kurtosis: file(relativePath: { eq: "dev-tools/kurtosis.png" }) {
      ...devtoolImage
    }
  }
`
