import React, { useEffect, useState } from "react"
import {
  Box,
  Flex,
  Heading,
  Img,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react"

import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import { graphql, PageProps } from "gatsby"
import { useIntl } from "react-intl"
import { shuffle } from "lodash"

// import ActionCard from "../../components/ActionCard"
// import Callout from "../../components/Callout"
// import Card from "../../components/Card"
// import Link from "../../components/Link"
// import ButtonLink from "../../components/ButtonLink"
import Translation from "../../components/Translation"
import PageMetadata from "../../components/PageMetadata"
import ProductCard from "../../components/ProductCard"
import {
  Content,
  CardGrid,
  // Divider,
  // Intro,
  Page,
  // InfoBanner,
} from "../../components/SharedStyledComponents"
import FeedbackCard from "../../components/FeedbackCard"

import { translateMessageId, TranslationKey } from "../../utils/translations"
import { getImage } from "../../utils/image"

import { ChildOnlyProp, Context } from "../../types"

// const Subtitle = styled.div`
//   font-size: 1.25rem;
//   line-height: 140%;
//   color: ${(props) => props.theme.colors.text200};
//   margin-bottom: 0.5rem;
// `

// const HeroContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   @media (max-width: ${(props) => props.theme.breakpoints.m}) {
//     flex-direction: column-reverse;
//   }
// `

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

// const Header = styled.header`
//   margin-top: 3rem;
//   @media (max-width: 1280px) {
//     margin-top: 8rem;
//   }
//   @media (max-width: 1160px) {
//     margin-top: 7rem;
//   }
//   @media (max-width: ${(props) => props.theme.breakpoints.l}) {
//     margin-top: 4rem;
//   }
//   @media (max-width: 920px) {
//     margin-top: 2rem;
//   }
//   @media (max-width: 870px) {
//     margin-top: 1rem;
//   }
//   @media (max-width: 840px) {
//     margin-top: 0;
//   }
// `

// const StyledCard = styled(Card)`
//   flex: 1 1 30%;
//   min-width: 240px;
//   box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
//   margin: 1rem;
//   padding: 1.5rem;
//   @media (max-width: ${(props) => props.theme.breakpoints.l}) {
//     flex: 1 1 30%;
//   }

//   &:hover {
//     border-radius: 4px;
//     box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
//     background: ${(props) => props.theme.colors.tableBackgroundHover};
//     transition: transform 0.1s;
//     transform: scale(1.02);
//   }
// `

// const StackContainer = styled(Content)`
//   border: 1px solid ${(props) => props.theme.colors.border};
//   border-radius: 4px;
//   padding: 3rem 2rem;
//   margin: 2rem;
//   width: 96%;
//   background: ${(props) => props.theme.colors.ednBackground};
//   @media (max-width: ${(props) => props.theme.breakpoints.s}) {
//     width: 100%;
//     margin-left: 0rem;
//     margin-right: 0rem;
//     border-radius: 0px;
//   }
// `

// TODO add remaining stack categories
// const localblockchains = [
//     {
//       id: "ganache",
//       url: "https://www.trufflesuite.com/ganache",
//       background: "#31272A",
//       name: "Ganache",
//       description:
//         "A personal blockchain for Ethereum development you can use to deploy contracts, develop your applications, and run tests. It is available as both a desktop application as well as a command-line tool . Ganache is available for Windows, Mac, and Linux.",
//     },
//     {
//       id: "ethnode",
//       url: "https://github.com/vrde/ethnode",
//       background: "#fff",
//       name: "ethnode",
//       description:
//         "ethnode is a zero configuration tool to run a local Ethereum node. It supports both Openethereum and Geth clients.",
//     },
//     {
//       id: "buidler",
//       url: "https://buidler.dev/buidler-evm/",
//       background: "#2A2C32",
//       name: "Buidler EVM",
//       description:
//         "A local Ethereum network designed for development. It allows you to deploy your contracts, run your tests and debug your code.",
//     },
//   ]

//   const contractLanguages = [
//     {
//       id: "solidity",
//       url: "https://solidity.readthedocs.io/",
//       background: "#fff",
//       name: "Solidity",
//       description:
//         "Solidity, the Contract-Oriented Programming Language. Inspired by C++ and JavaScript.",
//     },
//     {
//       id: "vyper",
//       url: "https://vyper.readthedocs.io/en/stable/",
//       background: "#fff",
//       name: "Vyper",
//       description: "Pythonic Smart Contract Language for the EVM",
//     },
//   ]

//   const ides = [
//     {
//       url:
//       id: "vscode",
//         "https://marketplace.visualstudio.com/items?itemName=AzBlockchain.azure-blockchain",
//       background: "#56338C",
//       name: "VSCode Development Kit for Ethereum",
//       description:
//         "The extension simplifies how you create, build and deploy smart contracts on Ethereum ledgers.",
//     },
//     {
//       url:
//       id: "workbench",
//         "https://azuremarketplace.microsoft.com/en-us/marketplace/apps/microsoft-azure-blockchain.azure-blockchain-workbench?tab=Overview",
//       background: "#3079D0",
//       name: "Azure Blockchain Workbench",
//       description:
//         "The Azure Blockchain Workbench is the fastest way to get started with blockchain on Azure.",
//     },
//     {
//       id: "atom",
//       url: "https://atom.io/packages/language-solidity",
//       background: "#37373B",
//       name: "Atom language-solidity plugin",
//       description: "Adds syntax highlighting for Solidty in Atom.",
//     },
//   ]

//   const testinglibraries = [
//     {
//       id: "waffle",
//       url: "https://getwaffle.io/",
//       background: "#fff",
//       name: "Waffle",
//       description:
//         "Few dependencies, easy to extend syntax, and fast test execution. Used by over 500 projects.",
//     },
//     {
//       id: "truffle",
//       url: "https://trufflesuite.com",
//       background: "#31272A",
//       name: "Truffle",
//       description:
//         "Testing is included in the Truffle framework out-of-the-box.",
//     },
//   ]

//   const jslibraries = [
//     {
//       id: "web3js",
//       url: "http://web3js.readthedocs.io/",
//       background: "#fff",
//       name: "web3.js",
//       description:
//         "The Ethereum JavaScript API which connects to the Generic JSON-RPC spec.",
//     },
//     {
//       id: "ethers",
//       url: "https://docs.ethers.io/",
//       background: "#26389A",
//       name: "Ethers.js",
//       description:
//         "Complete Ethereum library and wallet implementation in JavaScript – supports Typescript",
//     },
//   ]

interface IFramework {
  id: string
  url: string
  githubUrl: string
  background: string
  name: string
  description: TranslationKey
  alt: TranslationKey
  image?: IGatsbyImageData
}

const frameworksList: Array<IFramework> = [
  {
    id: "waffle",
    url: "https://getwaffle.io/",
    githubUrl: "https://github.com/EthWorks/waffle",
    background: "#ffffff",
    name: "Waffle",
    description: "page-local-environment-waffle-desc",
    alt: "page-local-environment-waffle-logo-alt",
  },
  {
    id: "hardhat",
    url: "https://hardhat.org/",
    githubUrl: "https://github.com/nomiclabs/hardhat",
    background: "#faf8fb",
    name: "Hardhat",
    description: "page-local-environment-hardhat-desc",
    alt: "page-local-environment-hardhat-logo-alt",
  },
  {
    id: "truffle",
    url: "https://www.trufflesuite.com/",
    githubUrl: "https://github.com/trufflesuite/truffle",
    background: "#31272a",
    name: "Truffle",
    description: "page-local-environment-truffle-desc",
    alt: "page-local-environment-truffle-logo-alt",
  },
  {
    id: "embark",
    url: "https://framework.embarklabs.io/",
    githubUrl: "https://github.com/embarklabs/embark",
    background: "#1b3e5f",
    name: "Embark",
    description: "page-local-environment-embark-desc",
    alt: "page-local-environment-embark-logo-alt",
  },
  {
    id: "brownie",
    url: "https://github.com/eth-brownie/brownie",
    githubUrl: "https://github.com/eth-brownie/brownie",
    background: "#ffffff",
    name: "Brownie",
    description: "page-local-environment-brownie-desc",
    alt: "page-local-environment-brownie-logo-alt",
  },
  {
    id: "epirus",
    url: "https://www.web3labs.com/epirus",
    githubUrl: "https://github.com/web3labs/epirus-free",
    background: "#ffffff",
    name: "Epirus",
    description: "page-local-environment-epirus-desc",
    alt: "page-local-environment-epirus-logo-alt",
  },
  {
    id: "createethapp",
    url: "https://github.com/PaulRBerg/create-eth-app",
    githubUrl: "https://github.com/PaulRBerg/create-eth-app",
    background: "#ffffff",
    name: "Create Eth App",
    description: "page-local-environment-eth-app-desc",
    alt: "page-local-environment-eth-app-logo-alt",
  },
  {
    id: "scaffoldeth",
    url: "https://github.com/austintgriffith/scaffold-eth",
    githubUrl: "https://github.com/austintgriffith/scaffold-eth",
    background: "#ffffff",
    name: "scaffold-eth",
    description: "page-local-environment-scaffold-eth-desc",
    alt: "page-local-environment-scaffold-eth-logo-alt",
  },
  {
    id: "soliditytemplate",
    url: "https://github.com/paulrberg/solidity-template",
    githubUrl: "https://github.com/paulrberg/solidity-template",
    background: "#ffffff",
    name: "Solidity template",
    description: "page-local-environment-solidity-template-desc",
    alt: "page-local-environment-solidity-template-logo-alt",
  },
  {
    id: "foundry",
    url: "https://getfoundry.sh/",
    githubUrl: "https://github.com/foundry-rs/foundry",
    background: "#ffffff",
    name: "Foundry",
    description: "page-local-environment-foundry-desc",
    alt: "page-local-environment-foundry-logo-alt",
  },
]

const ChooseStackPage = ({
  data,
}: PageProps<Queries.DevelopersLocalEnvironmentPageQuery, Context>) => {
  const intl = useIntl()
  const [frameworks, setFrameworks] = useState<Array<IFramework>>([])

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
        title={translateMessageId(
          "page-local-environment-setup-meta-title",
          intl
        )}
        description={translateMessageId(
          "page-local-environment-setup-meta-desc",
          intl
        )}
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
              alt={translateMessageId("alt-eth-blocks", intl)}
              loading="eager"
            />
          </Column>
        </Flex>
        <CardGrid>
          {frameworks.map((framework, idx) => (
            <ProductCard
              key={idx}
              url={framework.url}
              background={framework.background}
              image={framework.image!}
              name={framework.name}
              githubUrl={framework.githubUrl}
              repoLangCount={2}
              alt={translateMessageId(framework.alt, intl)}
            >
              <Translation id={framework.description} />
            </ProductCard>
          ))}
        </CardGrid>
      </Content>
      <Content>
        <FeedbackCard />
      </Content>
      {/* <Content>
        <h2>Create your own stack</h2>
        <p>
          Want to roll your own stack? Or looking to compare projects to
          integrate into a framework / looking for a specific use case /
          solution to a piece of your ? These categories will help you give the
          full picture of options available for different layers of the stack.
        </p>
      </Content>
      <StackContainer>
        <Subtitle>Local development blockchain</Subtitle>
        <p>
          When creating a new smart contract, you definitely don't want to
          deploy it straight to to Ethereum's public Mainnet (it costs money).
          First, we recommend setting up a personal blockchain for local
          development, where you can run tests & kick the tires on your dapp.
        </p>
        <CardGrid>
          {localblockchains.map((local, idx) => {
            return (
              <ProductCard
                key={idx}
                url={local.url}
                background={local.background}
                image={local.image}
                name={local.name}
                description={local.description}
              />
            )
          })}
        </CardGrid>
      </StackContainer>
      <StackContainer>
        <Subtitle>Smart contract languages (Optional)</Subtitle>
        <p>
          In order to write Ethereum smart contracts, you'll need to use a
          language specifically build for the EVM. You don’t have to write a
          smart contract to build a dapp, but if you want to create new
          functionality, you’ll need to write your own.
        </p>
        <Link to="/developers/docs/smart-contracts/languages/">
          More on smart contract languages
        </Link>
        <CardGrid>
          {contractLanguages.map((language, idx) => {
            return (
              <ProductCard
                key={idx}
                url={language.url}
                background={language.background}
                image={language.image}
                name={language.name}
                description={language.description}
              />
            )
          })}
        </CardGrid>
      </StackContainer>
      <StackContainer>
        <Subtitle>Integrated Development Environments (IDEs)</Subtitle>
        <p>
          You need to write your smart contracts and code somewhere. Most
          established IDEs have plugins for Solidity / Vyper syntax support.{" "}
        </p>
        <Link to="/developers/docs/ides/">More on IDEs</Link>
        <CardGrid>
          {ides.map((ide, idx) => {
            return (
              <ProductCard
                key={idx}
                url={ide.url}
                background={ide.background}
                image={ide.image}
                name={ide.name}
                description={ide.description}
              />
            )
          })}
        </CardGrid>
      </StackContainer>
      <StackContainer>
        <Subtitle>Smart contract testing libraries </Subtitle>
        <p>
          Tools to help write unit and integration tests for your smart
          contracts, typically by using JavaScript. Note: most (if not all)
          Ethereum developer frameworks come with smart contract testing out of
          the box
        </p>
        <Link to="/developers/docs/ides/">More on IDEs</Link>
        <CardGrid>
          {testinglibraries.map((library, idx) => {
            return (
              <ProductCard
                key={idx}
                url={library.url}
                background={library.background}
                image={library.image}
                name={library.name}
                description={library.description}
              />
            )
          })}
        </CardGrid>
      </StackContainer>
      <StackContainer>
        <Subtitle>Frontend JavaScript libraries</Subtitle>
        <p>Description</p>
        <Link to="/developers/docs/apis/javascript/">
          More on JavaScript libraries
        </Link>
        <CardGrid>
          {jslibraries.map((jslibrary, idx) => {
            return (
              <ProductCard
                key={idx}
                url={jslibrary.url}
                background={jslibrary.background}
                image={jslibrary.image}
                name={jslibrary.name}
                description={jslibrary.description}
              />
            )
          })}
        </CardGrid>
        </StackContainer> */}
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
  query DevelopersLocalEnvironmentPage {
    hero: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 800
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
    embark: file(relativePath: { eq: "dev-tools/embark.png" }) {
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
  }
`
