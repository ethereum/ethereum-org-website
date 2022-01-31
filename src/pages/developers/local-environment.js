import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { shuffle } from "lodash"

// import ActionCard from "../../components/ActionCard"
// import Callout from "../../components/Callout"
// import Card from "../../components/Card"
// import Link from "../../components/Link"
// import ButtonLink from "../../components/ButtonLink"
import Translation from "../../components/Translation"
import { translateMessageId } from "../../utils/translations"
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

const StyledPage = styled(Page)`
  margin-top: 4rem;
`

const HeroContent = styled(Content)`
  margin-bottom: 2rem;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    padding: 0 2rem 2rem;
  }
`

const Slogan = styled.h1`
  font-style: normal;
  font-weight: normal;
  font-family: ${(props) => props.theme.fonts.monospace};
  text-transform: uppercase;
  font-weight: 600;
  font-size: 2rem;
  line-height: 140%;
  text-align: center;
  margin: 0 0 1.625rem;
`

// const Subtitle = styled.div`
//   font-size: 1.25rem;
//   line-height: 140%;
//   color: ${(props) => props.theme.colors.text200};
//   margin-bottom: 0.5rem;
// `

const SubSlogan = styled.p`
  font-size: 1.25rem;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  margin-bottom: 0.5rem;
  text-align: center;
`

// const HeroContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   @media (max-width: ${(props) => props.theme.breakpoints.m}) {
//     flex-direction: column-reverse;
//   }
// `
const TwoColumnContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`

const Column = styled.div`
  flex: 1 0 33%;
  justify-content: flex-end;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    max-width: 100%;
  }
  margin-bottom: 1.5rem;
  margin-right: 2rem;
  width: 100%;
`

const Hero = styled(GatsbyImage)`
  flex: 1 1 100%;
  max-width: 800px;
  background-size: cover;
  background-repeat: no-repeat;
`

const H2 = styled.h2`
  margin: 0 0 1.625rem;
`

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
//         "Solidity, the Contract-Oriented Programming Language. Inspired by C++ and Javascript.",
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

const frameworksList = [
  {
    id: "dapptools",
    url: "https://dapp.tools/",
    githubUrl: "https://github.com/dapphub/dapptools",
    background: "#fff",
    name: "Dapptools",
    description: "page-local-environment-dapptools-desc",
    alt: "page-local-environment-dapptools-logo-alt",
  },
  {
    id: "waffle",
    url: "https://getwaffle.io/",
    githubUrl: "https://github.com/EthWorks/waffle",
    background: "#fff",
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
    image: "https://hardhat.org/assets/img/Hardhat-logo.652a7049.svg",
    description: "page-local-environment-hardhat-desc",
    alt: "page-local-environment-hardhat-logo-alt",
  },
  {
    id: "truffle",
    url: "https://www.trufflesuite.com/",
    githubUrl: "https://github.com/trufflesuite/truffle",
    background: "#31272A",
    name: "Truffle",
    description: "page-local-environment-truffle-desc",
    alt: "page-local-environment-truffle-logo-alt",
  },
  {
    id: "embark",
    url: "https://framework.embarklabs.io/",
    githubUrl: "https://github.com/embarklabs/embark",
    background: "#1B3E5F",
    name: "Embark",
    description: "page-local-environment-embark-desc",
    alt: "page-local-environment-embark-logo-alt",
  },
  {
    id: "brownie",
    url: "https://github.com/eth-brownie/brownie",
    githubUrl: "https://github.com/eth-brownie/brownie",
    background: "#fff",
    name: "Brownie",
    description: "page-local-environment-brownie-desc",
    alt: "page-local-environment-brownie-logo-alt",
  },
  {
    id: "epirus",
    url: "https://www.web3labs.com/epirus",
    githubUrl: "https://github.com/web3labs/epirus-free",
    background: "#fff",
    name: "Epirus",
    description: "page-local-environment-epirus-desc",
    alt: "page-local-environment-epirus-logo-alt",
  },
  {
    id: "createethapp",
    url: "https://github.com/PaulRBerg/create-eth-app",
    githubUrl: "https://github.com/PaulRBerg/create-eth-app",
    background: "#fff",
    name: "Create Eth App",
    description: "page-local-environment-eth-app-desc",
    alt: "page-local-environment-eth-app-logo-alt",
  },
  {
    id: "scaffoldeth",
    url: "https://github.com/austintgriffith/scaffold-eth",
    githubUrl: "https://github.com/austintgriffith/scaffold-eth",
    background: "#fff",
    name: "scaffold-eth",
    description: "page-local-environment-scaffold-eth-desc",
    alt: "page-local-environment-scaffold-eth-logo-alt",
  },
  {
    id: "soliditytemplate",
    url: "https://github.com/paulrberg/solidity-template",
    githubUrl: "https://github.com/paulrberg/solidity-template",
    background: "#fff",
    name: "Solidity template",
    description: "page-local-environment-solidity-template-desc",
    alt: "page-local-environment-solidity-template-logo-alt",
  },
]

const ChooseStackPage = ({ data }) => {
  const intl = useIntl()
  const [frameworks, setFrameworks] = useState([])

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
    <StyledPage>
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
      <HeroContent>
        <Slogan>
          <Translation id="page-local-environment-setup-title" />
        </Slogan>
        <SubSlogan>
          <Translation id="page-local-environment-setup-subtitle" />
          <br />
          <Translation id="page-local-environment-setup-subtitle-2" />
        </SubSlogan>
      </HeroContent>
      <Content>
        <TwoColumnContent>
          <Column>
            <H2>
              <Translation id="page-local-environment-frameworks-title" />
            </H2>
            <p>
              <Translation id="page-local-environment-frameworks-desc" />
            </p>
            <p>
              <Translation id="page-local-environment-framework-features" />
            </p>
            <ul>
              <li>
                <Translation id="page-local-environment-framework-feature-1" />
              </li>
              <li>
                <Translation id="page-local-environment-framework-feature-2" />
              </li>
              <li>
                <Translation id="page-local-environment-framework-feature-3" />
              </li>
              <li>
                <Translation id="page-local-environment-framework-feature-4" />
              </li>
              <li>
                <Translation id="page-local-environment-framework-feature-5" />
              </li>
            </ul>
          </Column>
          <Column>
            <Hero
              image={getImage(data.hero)}
              alt={translateMessageId("alt-eth-blocks", intl)}
              loading="eager"
            />
          </Column>
        </TwoColumnContent>
        <CardGrid>
          {frameworks.map((framework, idx) => (
            <ProductCard
              key={idx}
              url={framework.url}
              background={framework.background}
              image={framework.image}
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
          More on Javascript libraries
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
    </StyledPage>
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
  {
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
    dapptools: file(relativePath: { eq: "dev-tools/dapptools.png" }) {
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
  }
`
