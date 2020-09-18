import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import ActionCard from "../../components/ActionCard"
import Callout from "../../components/Callout"
import Card from "../../components/Card"
import Link from "../../components/Link"
import Button from "../../components/Button"
import PageMetadata from "../../components/PageMetadata"
import {
  Content,
  Divider,
  Intro,
  EdnPage,
  InfoBanner,
} from "../../components/SharedStyledComponents"
import ProductCard from "../../components/ProductCard"

const HeroContent = styled(Content)`
  margin: 2rem 0rem;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    padding: 1rem 2rem 2rem;
  }
`

const Slogan = styled.h1`
  font-style: normal;
  font-weight: normal;
  font-family: "SFMono-Regular", monospace;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 32px;
  line-height: 140%;
  text-align: center;
`

const Subtitle = styled.div`
  font-size: 20px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  margin-bottom: 0.5rem;
`

const SubSlogan = styled.p`
  font-size: 20px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  margin-bottom: 0.5rem;
  text-align: center;
`

const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
  }
`
const TwoColumnContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
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

const Hero = styled(Img)`
  flex: 1 1 100%;
  max-width: 800px;
  background-size: cover;
  background-repeat: no-repeat;
`

const Header = styled.header`
  margin-top: 3rem;
  @media (max-width: 1280px) {
    margin-top: 8rem;
  }
  @media (max-width: 1160px) {
    margin-top: 7rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 4rem;
  }
  @media (max-width: 920px) {
    margin-top: 2rem;
  }
  @media (max-width: 870px) {
    margin-top: 1rem;
  }
  @media (max-width: 840px) {
    margin-top: 0;
  }
`

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 2rem -1rem;
`

const StyledCard = styled(Card)`
  flex: 1 1 30%;
  min-width: 240px;
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  margin: 1rem;
  padding: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
  }

  &:hover {
    border-radius: 4px;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background: ${(props) => props.theme.colors.tableBackgroundHover};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

const frameworks = [
  {
    emoji: ":chocolate_bar:",
    title: "Truffle",
    description: "Add description here",
  },
  {
    emoji: ":construction_worker:",
    title: "Buidler",
    description: "Add description here",
  },
  {
    emoji: ":busts_in_silhouette:",
    title: "OpenZeppelin",
    description: "Add description here",
  },
]

const languages = [
  {
    emoji: ":page_with_curl:",
    title: "Solidity",
    description: "Add description here",
  },
  {
    emoji: ":snake:",
    title: "Vyper",
    description: "Add description here",
  },
]

const StackContainer = styled(Content)`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  padding: 3rem 2rem;
  margin: 2rem;
  width: 96%;
  background: ${(props) => props.theme.colors.ednBackground};
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    width: 100%;
    margin-left: 0rem;
    margin-right: 0rem;
    border-radius: 0px;
  }
`

const ChooseStackPage = ({ data }) => {
  // TODO add features for comparison to dev tools
  const premadeStacks = [
    {
      url: "https://buidler.dev/",
      background: "#2A2C32",
      image: data.buidler.childImageSharp.fixed,
      name: "Buidler",
      description:
        "Buidler is a task runner for Ethereum smart contract developers.",
    },
    {
      url: "https://www.trufflesuite.com/",
      background: "#31272A",
      image: data.truffle.childImageSharp.fixed,
      name: "Truffle",
      description:
        "The Truffle Suite gets developers from idea to dapp as comfortably as possible.",
    },
    {
      url: "https://openzeppelin.com/sdk/",
      background: "#4E5EE4",
      image: data.openzeppelin.childImageSharp.fixed,
      name: "OpenZeppelin SDK",
      description:
        "Save hours of development time by compiling, upgrading, deploying, and interacting with smart contracts with our CLI.",
    },
    {
      url: "https://framework.embarklabs.io/",
      background: "#1B3E5F",
      image: data.embark.childImageSharp.fixed,
      name: "Embark",
      description:
        "The all-in-one developer platform for building and deploying decentralized applications.",
    },
    {
      url: "https://github.com/eth-brownie/brownie",
      background: "#fff",
      image: data.brownie.childImageSharp.fixed,
      name: "Brownie",
      description:
        "A Python-based development and testing framework for smart contracts targeting the Ethereum Virtual Machine.",
    },
    {
      url: "https://www.web3labs.com/epirus",
      background: "#fff",
      image: data.epirus.childImageSharp.fixed,
      name: "Epirus",
      description:
        "A platform for developing, deploying and monitoring blockchain applications on the Javascript Virtual Machine",
    },
    {
      url: "https://github.com/PaulRBerg/create-eth-app",
      background: "#fff",
      image: data.createethapp.childImageSharp.fixed,
      name: "Create-eth-app",
      description:
        "Create Ethereum-powered apps with one command. Comes with a wide offerring of UI frameworks and DeFi templates to choose from.",
    },
    {
      url: "https://github.com/austintgriffith/scaffold-eth",
      background: "#fff",
      image: data.scaffoldeth.childImageSharp.fixed,
      name: "Scaffold-eth",
      description:
        "Buidler + Create-eth-app: everything you need to get started building decentralized applications powered by smart contracts",
    },
  ]

  const localblockchains = [
    {
      url: "https://www.trufflesuite.com/ganache",
      background: "#31272A",
      image: data.ganache.childImageSharp.fixed,
      name: "Ganache",
      description:
        "A personal blockchain for Ethereum development you can use to deploy contracts, develop your applications, and run tests. It is available as both a desktop application as well as a command-line tool . Ganache is available for Windows, Mac, and Linux.",
    },
    {
      url: "https://github.com/vrde/ethnode",
      background: "#fff",
      image: data.ethnode.childImageSharp.fixed,
      name: "ethnode",
      description:
        "ethnode is a zero configuration tool to run a local Ethereum node. It supports both Openethereum and Geth clients.",
    },
    {
      url: "https://buidler.dev/buidler-evm/",
      background: "#2A2C32",
      image: data.buidler.childImageSharp.fixed,
      name: "Buidler EVM",
      description:
        "A local Ethereum network designed for development. It allows you to deploy your contracts, run your tests and debug your code.",
    },
  ]

  const contractLanguages = [
    {
      url: "https://solidity.readthedocs.io/",
      background: "#fff",
      image: data.solidity.childImageSharp.fixed,
      name: "Solidity",
      description:
        "Solidity, the Contract-Oriented Programming Language. Inspired by C++ and Javascript.",
    },
    {
      url: "https://vyper.readthedocs.io/en/stable/",
      background: "#fff",
      image: data.vyper.childImageSharp.fixed,
      name: "Vyper",
      description: "Pythonic Smart Contract Language for the EVM",
    },
  ]

  const ides = [
    {
      url:
        "https://marketplace.visualstudio.com/items?itemName=AzBlockchain.azure-blockchain",
      background: "#56338C",
      image: data.vscode.childImageSharp.fixed,
      name: "VSCode Development Kit for Ethereum",
      description:
        "The extension simplifies how you create, build and deploy smart contracts on Ethereum ledgers.",
    },
    {
      url:
        "https://azuremarketplace.microsoft.com/en-us/marketplace/apps/microsoft-azure-blockchain.azure-blockchain-workbench?tab=Overview",
      background: "#3079D0",
      image: data.workbench.childImageSharp.fixed,
      name: "Azure Blockchain Workbench",
      description:
        "The Azure Blockchain Workbench is the fastest way to get started with blockchain on Azure.",
    },
    {
      url: "https://atom.io/packages/language-solidity",
      background: "#37373B",
      image: data.atom.childImageSharp.fixed,
      name: "Atom language-solidity plugin",
      description: "Adds syntax highlighting for Solidty in Atom.",
    },
  ]

  const testinglibraries = [
    {
      url: "https://getwaffle.io/",
      background: "#fff",
      image: data.waffle.childImageSharp.fixed,
      name: "Waffle",
      description:
        "Few dependencies, easy to extend syntax, and fast test execution. Used by over 500 projects.",
    },
    {
      url: "https://trufflesuite.com",
      background: "#31272A",
      image: data.truffle.childImageSharp.fixed,
      name: "Truffle",
      description:
        "Testing is included in the Truffle framework out-of-the-box.",
    },
  ]

  const jslibraries = [
    {
      url: "http://web3js.readthedocs.io/",
      background: "#fff",
      image: data.web3js.childImageSharp.fixed,
      name: "web3.js",
      description:
        "The Ethereum JavaScript API which connects to the Generic JSON-RPC spec.",
    },
    {
      url: "https://docs.ethers.io/",
      background: "#26389A",
      image: data.ethers.childImageSharp.fixed,
      name: "Ethers.js",
      description:
        "Complete Ethereum library and wallet implementation in JavaScript – supports Typescript",
    },
  ]

  return (
    <EdnPage>
      <PageMetadata
        title="Ethereum local development setup"
        description="Guide on how to choose your software stack for Ethereum development."
      />
      <HeroContent>
        <Slogan>Set up your local development environment</Slogan>
        <SubSlogan>
          If you're ready to start building, it's time to choose your stack.
          <br />
          Here are the tools and frameworks you can use to help you build your
          Ethereum application.
        </SubSlogan>

        {/* <Hero
            fluid={data.hero.childImageSharp.fluid}
            alt="Illustration of blocks being organised like an ETH symbol"
            loading="eager"
          /> */}

        <CardContainer>
          <StyledCard
            emoji=":fast_forward:"
            title="Skip setup"
            description="Use a pre-made stack."
          ></StyledCard>
          <StyledCard
            emoji=":pancakes:"
            title="Create your own stack"
            description="Looking to compare projects to integrate into a framework? Get an idea of the options available for different layers of the stack."
          ></StyledCard>
          <StyledCard
            emoji=":woman_student:"
            title="Learn about the stack"
            description="If you're not ready and want to brush up on your Ethereum knowledge, check out our docs."
          ></StyledCard>
        </CardContainer>
      </HeroContent>
      <Content>
        <h2>Frameworks and pre-made stacks</h2>
        <TwoColumnContent>
          <Column>
            <p>
              We recommend picking a framework, particularly if you're just
              getting started. Frameworks include many of the pieces needed to
              pull together a fully-fledged dapp, or provide easy plugin systems
              that allow you to pick the tools you need.
            </p>
            <p>
              These tools come with a lot of out-of-the-box functionality, like:
            </p>
            <ul>
              <li>Features to spin up a local blockchain instance.</li>
              <li>
                Configuration to connect to and deploy contracts to Ethereum,
                whether that's a locally running instance, or one of Ethereum's
                public networks (like testnests or mainnet).
              </li>
              <li>
                Smart contract utilities to compile and deploy your smart
                contracts.
              </li>
              <li>
                Client development add-ons to build your user-facing application
                within the same project/repository.
              </li>
              <li>
                Decentralized app distribution - integrations with storage
                options like IPFS.
              </li>
            </ul>
          </Column>
          <Column>
            <Hero
              fluid={data.hero.childImageSharp.fluid}
              alt="Illustration of blocks being organised like an ETH symbol"
              loading="eager"
            />
          </Column>
        </TwoColumnContent>
        <CardContainer>
          {premadeStacks.map((premadeStack, idx) => {
            return (
              <ProductCard
                key={idx}
                url={premadeStack.url}
                background={premadeStack.background}
                image={premadeStack.image}
                name={premadeStack.name}
                description={premadeStack.description}
              />
            )
          })}
        </CardContainer>
      </Content>
      <Content>
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
          deploy it straight to to Ethereum's public mainnet (it costs money).
          First, we recommend setting up a personal blockchain for local
          development, where you can run tests & kick the tires on your dapp.
        </p>
        <CardContainer>
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
        </CardContainer>
      </StackContainer>
      <StackContainer>
        <Subtitle>Smart contract languages (Optional)</Subtitle>
        <p>
          In order to write Ethereum smart contracts, you'll need to use a
          language specifically build for the EVM. You don’t have to write a
          smart contract to build a dapp, but if you want to create new
          functionality, you’ll need to write your own.
        </p>
        <Link to="/en/developers/docs/smart-contracts/languages/">
          More on smart contract languages
        </Link>
        <CardContainer>
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
        </CardContainer>
      </StackContainer>
      <StackContainer>
        <Subtitle>Integrated Development Environments (IDEs)</Subtitle>
        <p>
          You need to write your smart contracts and code somewhere. Most
          established IDEs have plugins for Solidity / Vyper syntax support.{" "}
        </p>
        <Link to="/en/developers/docs/IDEs/">More on IDEs</Link>
        <CardContainer>
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
        </CardContainer>
      </StackContainer>
      <StackContainer>
        <Subtitle>Smart contract testing libraries </Subtitle>
        <p>
          Tools to help write unit and integration tests for your smart
          contracts, typically by using JavaScript. Note: most (if not all)
          Ethereum developer frameworks come with smart contract testing out of
          the box
        </p>
        <Link to="/en/developers/docs/IDEs/">More on IDEs</Link>
        <CardContainer>
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
        </CardContainer>
      </StackContainer>
      <StackContainer>
        <Subtitle>Frontend JavaScript libraries</Subtitle>
        <p>Description</p>
        <Link to="/en/developers/docs/apis/javascript/">
          More on Javascript libraries
        </Link>
        <CardContainer>
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
        </CardContainer>
      </StackContainer>
    </EdnPage>
  )
}
export default ChooseStackPage

export const devtoolImage = graphql`
  fragment devtoolImage on File {
    childImageSharp {
      fixed(height: 100) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ogImage: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        fixed(width: 1200) {
          src
        }
      }
    }
    buidler: file(relativePath: { eq: "devtools/buidler.png" }) {
      ...devtoolImage
    }
    truffle: file(relativePath: { eq: "devtools/truffle.png" }) {
      ...devtoolImage
    }
    openzeppelin: file(relativePath: { eq: "devtools/openzeppelin.png" }) {
      ...devtoolImage
    }
    embark: file(relativePath: { eq: "devtools/embark.png" }) {
      ...devtoolImage
    }
    brownie: file(relativePath: { eq: "assets/eth-diamond-black.png" }) {
      ...devtoolImage
    }
    epirus: file(relativePath: { eq: "devtools/epirus.png" }) {
      ...devtoolImage
    }
    createethapp: file(relativePath: { eq: "assets/eth-diamond-black.png" }) {
      ...devtoolImage
    }
    scaffoldeth: file(relativePath: { eq: "devtools/scaffoldeth.png" }) {
      ...devtoolImage
    }
    ganache: file(relativePath: { eq: "devtools/ganache.png" }) {
      ...devtoolImage
    }
    ethnode: file(relativePath: { eq: "assets/eth-diamond-black.png" }) {
      ...devtoolImage
    }
    solidity: file(relativePath: { eq: "devtools/solidity.png" }) {
      ...devtoolImage
    }
    vyper: file(relativePath: { eq: "devtools/vyper.png" }) {
      ...devtoolImage
    }
    vscode: file(relativePath: { eq: "devtools/Vscode.png" }) {
      ...devtoolImage
    }
    workbench: file(relativePath: { eq: "devtools/workbench.png" }) {
      ...devtoolImage
    }
    atom: file(relativePath: { eq: "devtools/atom.png" }) {
      ...devtoolImage
    }
    waffle: file(relativePath: { eq: "devtools/waffle.png" }) {
      ...devtoolImage
    }
    web3js: file(relativePath: { eq: "devtools/web3js.png" }) {
      ...devtoolImage
    }
    ethers: file(relativePath: { eq: "devtools/ethers.png" }) {
      ...devtoolImage
    }
  }
`
