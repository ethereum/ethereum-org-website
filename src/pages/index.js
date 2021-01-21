import React, { useState, useEffect } from "react"
import { useIntl } from "gatsby-plugin-intl"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import axios from "axios"
import Icon from "../components/Icon"
import styled from "styled-components"
import Modal from "../components/Modal"
import CalloutBanner from "../components/CalloutBanner"
import Codeblock from "../components/Codeblock"
import Tooltip from "../components/Tooltip"
import StatsBoxGrid from "../components/StatsBoxGrid"
import CardList from "../components/CardList"
import {
  getLangContentVersion,
  translateMessageId,
} from "../utils/translations"
import Morpher from "../components/Morpher"
import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"
import Link from "../components/Link"
import ButtonLink from "../components/ButtonLink"
import ActionCard from "../components/ActionCard"
import {
  GrayContainer,
  CardContainer,
  Content,
  H2,
  LeftColumn,
} from "../components/SharedStyledComponents"

const Hero = styled(Img)`
  width: 100%;
  min-height: 380px;
  max-height: 440px;
  background-size: cover;
  background: no-repeat 50px;
  margin-bottom: 2rem;
`

const StyledContent = styled(Content)`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 1rem 1rem;
  }
`

const H1 = styled.h1`
  font-size: 40px;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 0rem;
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin: 0 auto;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`

const ButtonRow = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const StyledButtonLink = styled(ButtonLink)`
  margin-left: 0.5rem;
  margin-top: 0rem;
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-top: 1rem;
    margin-left: 0rem;
  }
`

const CodeModal = styled(Modal)`
  .modal-component-container {
    padding: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 1px solid ${(props) => props.theme.colors.border};
    border-left: 0px;
    border-right: none;
    top: 50%;
  }
  .modal-component {
    max-width: 100%;
    max-height: 50%;
    border-radius: 0;
    border-top: 1px solid ${(props) => props.theme.colors.text200};
    padding: 0rem;
    background: #2a2734;
  }
  .modal-component-content {
    margin-top: 3rem;
    width: 100%;
    overflow: auto;
  }
`

const IntroRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  margin-top: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
    margin: 0rem;
  }
`

const RowReverse = styled.div`
  display: flex;
  flex-direction: row-reverse;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
  }
`

const ImageContainer = styled.div`
  background: "#F1FFFD";
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
`

const Description = styled.p`
  color: ${(props) => props.theme.colors.text200};
  max-width: 55ch;
  text-align: center;
  align-self: center;
  font-size: 20px;
  margin-top: 1rem;
`

const StyledGrayContainer = styled(GrayContainer)`
  box-shadow: inset 0px 0px 0px
    ${(props) => props.theme.colors.tableItemBoxShadow};
  padding: 0rem;
  padding-bottom: 4rem;
  margin-top: 0rem;
`
const StyledCard = styled(ActionCard)`
  min-width: 480px;
  margin: 1rem;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
    min-width: 240px;
  }
`
const Tout = styled(ActionCard)`
  min-width: 400px;
  margin: 1rem;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
    min-width: 240px;
  }
`

const StyledCardContainer = styled(CardContainer)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const Banner = styled(Img)`
  width: 100%;
  background-color: "#F1FFFD";
  border: 2px solid ${(props) => props.theme.colors.text};
  margin-top: 1rem;
`

const BannerContainer = styled.div`
  display: flex;
  height: 400px;
  margin-bottom: 2rem;
`

const Image = styled(Img)`
  max-height: 480px;
  background-size: cover;
  background: no-repeat 50px;
`

const IntroImage = styled(Img)`
  width: 100%;
  background-size: cover;
  background: no-repeat 50px;
`

const WhatIsEthereumImage = styled(Img)`
  width: 100%;
`

const Subtitle = styled.div`
  margin-bottom: 2rem;
  font-size: 20px;
  line-height: 140%;
  /*   color: ${(props) => props.theme.colors.text};*/
`

const EthereumIntroContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxTurquoise};
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  padding-left: 2rem;
  height: 720px;
  margin-top: -1px;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    height: 100%;
    padding-top: 2rem;
    padding-left: 0rem;
    padding-bottom: 2rem;
  }
`

const FinanceContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxOrange};
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 720px;
  margin-top: -1px;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    height: 100%;
    height: 100%;
    padding-top: 2rem;
    padding-right: 0rem;
    padding-bottom: 2rem;
  }
`

const InternetContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxPink};
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  padding-left: 2rem;
  height: 720px;
  margin-top: -1px;
  margin-bottom: 0rem;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    align-items: center;
    height: 100%;
    padding-top: 2rem;
    padding-left: 0rem;
    padding-bottom: 2rem;
  }
`

const DeveloperContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxPurple};
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 720px;
  margin-top: -1px;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    height: 100%;
  }
`

const FeatureContent = styled(LeftColumn)`
  padding: 6rem;
  height: 100%;
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 2rem;
  }
`

const LeftColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const IntroLeftColumn = styled(LeftColumn)`
  padding: 6rem;
  height: 100%;
  width: 100%;
  margin: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 1rem;
  }
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
  margin-right: 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
  }
  &:hover {
    fill: ${(props) => props.theme.colors.primary};
  }
  &:active {
    fill: ${(props) => props.theme.colors.primary};
  }
  &:focus {
    fill: ${(props) => props.theme.colors.primary};
  }
`

const StyledH2 = styled(H2)`
  margin-bottom: 0.5rem;
  font-family: serif;
`

const StyledCardList = styled(CardList)`
  margin-right: 4rem;
  max-width: 624px;
  border: 1px solid ${(props) => props.theme.colors.text};
  box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-right: 0rem;
    max-width: 100%;
  }
`

const StyledCalloutBanner = styled(CalloutBanner)`
  margin: 8rem 0 4rem;
  padding: 0rem 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-bottom: 4rem;
    padding: 2rem;
  }
`

const ChangeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 33px; /* prevents jump when price loads*/
`

const Change = styled.div`
  font-size: 24px;
  line-height: 140%;
  color: ${(props) =>
    props.isNegativeChange
      ? props.theme.colors.success
      : props.theme.colors.fail300};
`

const ChangeTime = styled.span`
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0.04em;
  margin-left: 0.5rem;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.text300};
`

const StatRow = styled.div`
  display: flex;
  flex-direction: column;
`

const tooltipContent = (
  <div>
    <Translation id="common-data-provided-by" />{" "}
    <Link to="https://www.coingecko.com/en/api">coingecko.com</Link>
  </div>
)

const defiTooltipContent = (
  <div>
    <Translation id="common-data-provided-by" />{" "}
    <Link to="https://www.coingecko.com/en/api">defipulse.com</Link>
  </div>
)

const nodeTooltipContent = (
  <div>
    Ethereum is run by thousands of volunteers around the globe, known as nodes.
    The more nodes, the healthier the network. Data provided by{" "}
    <Link to="https://www.coingecko.com/en/api">etherscan.io</Link>
  </div>
)

const HomePage = ({ data }) => {
  const intl = useIntl()
  const [isModalOpen, setModalOpen] = useState(false)
  const [activeCode, setActiveCode] = useState(0)
  const [ethPrice, setEthPrice] = useState({
    currentPriceUSD: 0,
    percentChangeUSD: 0,
    hasError: false,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true"
        )
        const currentPriceUSD = response.data.ethereum.usd
        const percentChangeUSD = +response.data.ethereum.usd_24h_change.toFixed(
          2
        )
        setEthPrice({
          currentPriceUSD,
          percentChangeUSD,
          hasError: false,
        })
      } catch (error) {
        console.error(error)
        setEthPrice({
          hasError: true,
        })
      }
    }

    fetchData()
  }, [])

  const isNegativeChange =
    ethPrice.percentChangeUSD && ethPrice.percentChangeUSD < 0

  const change = ethPrice.percentChangeUSD
    ? isNegativeChange
      ? `${ethPrice.percentChangeUSD}% ↘`
      : `${ethPrice.percentChangeUSD}% ↗`
    : ``

  const isLoadingPrice = !ethPrice.currentPriceUSD
  let price = isLoadingPrice ? (
    <Translation id="loading" />
  ) : (
    <StatRow>
      ${ethPrice.currentPriceUSD}
      <div>
        <Change>
          {change}
          <ChangeTime>
            <Translation id="last-24-hrs" />
          </ChangeTime>
        </Change>
      </div>
    </StatRow>
  )
  if (ethPrice.hasError) {
    price = <Translation id="loading-error-refresh" />
  }

  const toggleCodeExample = (id) => {
    setActiveCode(id)
    setModalOpen(true)
  }

  const cards = [
    {
      image: data.robotfixed.childImageSharp.fixed,
      title: "Download a wallet",
      description:
        "A wallet lets you connect to Ethereum and manage your funds.",
      to: "/wallets/find-wallet/",
    },

    {
      image: data.ethfixed.childImageSharp.fixed,
      title: "Get ETH",
      description:
        "ETH is the currency of Ethereum – you can use it in applications.",
      to: "/get-eth/",
    },
    {
      image: data.dogefixed.childImageSharp.fixed,
      title: "Use a dapp",
      description:
        "Dapps are applications powered by Ethereum. See what you can do.",
      to: "/dapps/",
    },
    {
      image: data.devfixed.childImageSharp.fixed,
      title: "Start building",
      description:
        "If you want to start coding with Ethereum, check out our docs.",
      to: "/developers/",
    },
  ]

  const touts = [
    {
      image: data.docking.childImageSharp.fixed,
      title: "Upgrade your knowledge on Eth2",
      description:
        "Ethereum 2.0 is a program of interconnected upgrades designed to make Ethereum more scalable, secure, and sustainable.",
      to: "/eth2/",
    },
    {
      image: data.infrastructurefixed.childImageSharp.fixed,
      title: "Ethereum for enterprise",
      description:
        "See how Ethereum can open up new business models, reduce your costs and future-proof your business.",
      to: "/enterprise/",
    },
    {
      image: data.enterprise.childImageSharp.fixed,
      title: "The Ethereum community",
      description:
        "Ethereum is all about community. It's made up of people from all different backgrounds and interests. See how you can join in.",
      to: "/enterprise/",
    },
  ]

  const features = [
    {
      title: price,
      description: "ETH price (USD)",
      emoji: ":money_with_wings:",
      color: "background",
      explainer:
        "The latest price for 1 ether. You can buy as little as 0.000000000000000001 – you don't need to buy 1 whole ETH.",
    },
    {
      title: "10,000,000,000",
      description: "Transactions today",
      emoji: ":handshake:",
      color: "background",
      explainer:
        "The number of transactions succesfully processed on the network in the last 24 hours",
    },
    {
      title: "$24,500,000,000",
      description: "Value locked in Defi (USD)",
      emoji: ":chart_with_upwards_trend:",
      color: "background",
      explainer:
        "The amount of money in decentralized finance (defi) applications, the Ethereum digital economy. Yes, that's billions.",
    },
    {
      title: "12,000",
      description: "Nodes",
      emoji: ":computer:",
      color: "background",
      explainer:
        "Ethereum is run by thousands of volunteers around the globe, known as nodes.",
    },
  ]

  // TODO import code content from source file for easier maintenance
  // so we don't have to set here as plain text, e.g.
  // import { SimpleToken } from "../data/SimpleToken.sol"
  const codeExamples = [
    {
      title: "Simple token contract",
      description:
        "Issue a token that can be transfered and used across applications.",
      codeLanguage: "language-solidity",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

// This is a smart contract - a program that can be deployed to the Ethereum blockchain.
contract SimpleToken {
    // An address is comparable to an email address - it's used to identify an account on Ethereum.
    address public owner;
    uint256 public constant token_supply = 1000000000000;

    // A mapping is essentially a hash table data structure.
    // This mapping assigns an unsigned integer (the token balance) to an address (the token holder).
    mapping (address => uint) public balances;


  // When 'SimpleToken' contract is deployed:
  // 1. set the deploying address as the owner of the contract
  // 2. set the token balance of the owner to the total token supply
    constructor() {
        owner = msg.sender;
        balances[owner] = token_supply;
    }

    // Sends an amount of tokens from any caller to any address.
    function transfer(address receiver, uint amount) public {
        // The sender must have enough tokens to send
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Adjusts token balances of the two addresses
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
    }
}
      `,
    },
    {
      title: "Ethereum with JavaScript",
      description: "Create an Ethereum wallet and send transactions.",
      codeLanguage: "language-javascript",
      code: `const ethers = require("ethers");

// Create a wallet instance from a mnemonic...
const mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol";
const walletMnemonic = ethers.Wallet.fromMnemonic(mnemonic);

// ...or from a private key
const walletPrivateKey = new ethers.Wallet(walletMnemonic.privateKey);

// ...or create a wallet from a random private key
const randomWallet = ethers.Wallet.createRandom();

walletMnemonic.address;
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// The internal cryptographic components
walletMnemonic.privateKey;
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey;
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

const tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: ethers.utils.parseEther("1.0"),
};

// Sign a transaction
walletMnemonic.signTransaction(tx);
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// Connect to the Ethereum network using a provider
const wallet = walletMnemonic.connect(provider);

// Query the network
wallet.getBalance();
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount();
// { Promise: 0 }

// Send ether
wallet.sendTransaction(tx);

// Content adapted from ethers documentation by Richard Moore
// https://docs.ethers.io/v5/api/signer/#Wallet
// https://github.com/ethers-io/ethers.js/blob/master/docs/v5/api/signer/README.md#methods
// Content is licensed under the Creative Commons License:
// https://choosealicense.com/licenses/cc-by-4.0/      
      `,
    },
    {
      title: "Simple registry contract",
      description: "A decentralized DNS implementation.",
      codeLanguage: "language-solidity",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

// This is a smart contract - a program that can be deployed to the Ethereum blockchain.
contract SimpleDomainRegistry {

    address public owner;
    // Hypothetical cost to register a domain name
    uint constant public DOMAIN_NAME_COST = 1 ether;

    // A mapping is essentially a hash table data structure.
    // This mapping assigns an address (the domain holder) to a string (the domain name).
    mapping (string => address) public domainNames;


  // When 'SimpleDomainRegistry' contract is deployed,
  // set the deploying address as the owner of the contract.
    constructor() {
        owner = msg.sender;
    }

    // Registers a domain name (if not already registerd)
    function register(string memory domainName) public payable {
        require(msg.value >= DOMAIN_NAME_COST, "Insufficient amount.");
        require(domainNames[domainName] == address(0), "Domain name already registered.");
        domainNames[domainName] = msg.sender;
    }

    // Transfers a domain name to another address
    function transfer(address receiver, string memory domainName) public {
        require(domainNames[domainName] == msg.sender, "Only the domain name owner can transfer.");
        domainNames[domainName] = receiver;
    }

    // Withdraw funds from contract
    function withdraw() public {
        require(msg.sender == owner, "Only the contract owner can withdraw.");
        msg.sender.transfer(address(this).balance);
    }
}
      `,
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-index-meta-title", intl)}
        description={translateMessageId("page-index-meta-description", intl)}
      />
      <Hero
        fluid={data.hero.childImageSharp.fluid}
        alt={translateMessageId("page-index-hero-image-alt", intl)}
        loading="eager"
      />
      <H1>Ethereum</H1>
      <StyledContent>
        <Header>
          <Description>
            Ethereum is the community-run technology powering the
            cryptocurrency, ether (ETH) and thousands of decentralized
            applications.
          </Description>
          <Morpher />
        </Header>
      </StyledContent>
      <StyledGrayContainer>
        <StyledContent>
          <IntroRow>
            <IntroLeftColumn>
              <H2>Get started</H2>
              <Subtitle>
                ethereum.org is your portal into the world of Ethereum. The tech
                is new and exciting – it helps to have a guide. Here's what we
                recommend you do if you want to dive in.
              </Subtitle>
            </IntroLeftColumn>
            <ImageContainer>
              <IntroImage fluid={data.hackathon.childImageSharp.fluid} />
            </ImageContainer>
          </IntroRow>
          <StyledCardContainer>
            {cards.map((card, idx) => {
              return (
                <StyledCard
                  key={idx}
                  title={card.title}
                  description={card.description}
                  to={card.to}
                  image={card.image}
                ></StyledCard>
              )
            })}
          </StyledCardContainer>
        </StyledContent>
      </StyledGrayContainer>
      <EthereumIntroContainer>
        <RowReverse>
          <FeatureContent>
            <StyledH2>What is Ethereum?</StyledH2>
            <Subtitle>
              Ethereum is a new technology working towards a fairer online
              future. Built by a diverse community, Ethereum is for everyone. It
              doesn't care where you live or who you are – if you have the
              internet, you can use digital money. You can also use a growing
              list of apps for things like file storage and financial services
              without costly intermediaries.
            </Subtitle>
            <div>
              <ButtonLink to="/what-is-ethereum/">What is Ethereum?</ButtonLink>
            </div>
          </FeatureContent>
          <ImageContainer>
            <WhatIsEthereumImage fluid={data.ethereum.childImageSharp.fluid} />
          </ImageContainer>
        </RowReverse>
      </EthereumIntroContainer>
      <FinanceContainer>
        <FeatureContent>
          <LeftColumnContent>
            <StyledH2>A fairer financial system</StyledH2>
            <Subtitle>
              Today, millions of people can’t open bank accounts, others have
              their payments blocked. Ethereum's decentralized finance (defi)
              system never sleeps or discriminates. With just an internet
              connection, you can send, borrow, earn interest, and even stream
              funds anywhere in the world.
            </Subtitle>
            <div>
              <ButtonLink to="/dapps/">Explore Defi</ButtonLink>
            </div>
          </LeftColumnContent>
        </FeatureContent>
        <ImageContainer>
          <WhatIsEthereumImage fluid={data.impact.childImageSharp.fluid} />
        </ImageContainer>
      </FinanceContainer>

      <InternetContainer>
        <RowReverse>
          <FeatureContent>
            <LeftColumnContent>
              <StyledH2>An open internet</StyledH2>
              <Subtitle>
                Today, internet services are closed and opaque. You pay for
                access with your personal data, which feeds business models
                based on advertising. Ethereum services are open by default –
                you just need a wallet. These are easy to set up, controlled by
                you, and work without any personal info.
              </Subtitle>
              <ButtonRow>
                <ButtonLink to="/dapps/">Explore the open internet</ButtonLink>
                <StyledButtonLink isSecondary to="/wallets/">
                  More on wallets
                </StyledButtonLink>
              </ButtonRow>
            </LeftColumnContent>
          </FeatureContent>
          <ImageContainer>
            <WhatIsEthereumImage fluid={data.future.childImageSharp.fluid} />
          </ImageContainer>
        </RowReverse>
      </InternetContainer>
      <DeveloperContainer>
        <CodeModal isOpen={isModalOpen} setIsOpen={setModalOpen}>
          <Codeblock
            codeLanguage={codeExamples[activeCode].codeLanguage}
            allowCollapse={false}
          >
            {codeExamples[activeCode].code}
          </Codeblock>
        </CodeModal>
        <FeatureContent>
          <LeftColumnContent>
            <StyledH2>A new frontier for development</StyledH2>
            <Subtitle>
              The Ethereum protocol and the apps built on it are transparent and
              open source. You can check the code yourself and use anything you
              like. You don't even need to learn a new language to start. You
              can build with Ethereum using JavaScript and other existing
              languages. Take a look at some examples.
            </Subtitle>
            <ButtonRow>
              <ButtonLink to="/developers/">
                More developer resources
              </ButtonLink>
            </ButtonRow>
          </LeftColumnContent>
        </FeatureContent>
        <Content>
          <Image fixed={data.devfixed.childImageSharp.fixed} />
          <StyledCardList
            content={codeExamples}
            limit={5}
            clickHandler={toggleCodeExample}
          />
        </Content>
      </DeveloperContainer>
      <StyledGrayContainer>
        <StyledContent>
          <H2>Ethereum today</H2>
          <Subtitle>The latest network statistics</Subtitle>
        </StyledContent>
        <StatsBoxGrid items={features} />
      </StyledGrayContainer>
      <StyledContent>
        <H2>Explore ethereum.org</H2>
      </StyledContent>
      <StyledContent>
        <StyledCardContainer>
          {touts.map((tout, idx) => {
            return (
              <Tout
                key={idx}
                title={tout.title}
                description={tout.description}
                to={tout.to}
                image={tout.image}
              ></Tout>
            )
          })}
        </StyledCardContainer>
        <StyledCalloutBanner
          title="Contribute to ethereum.org"
          description="This website is open source with hundreds of community contributors. You can propose edits to any of the content on this site, suggest awesome new features, or help us squash bugs. "
          image={data.finance.childImageSharp.fluid}
          maxImageWidth={600}
          alt={translateMessageId("page-dapps-wallet-callout-image-alt", intl)}
        >
          <ButtonRow>
            <ButtonLink to="/contributing/">More on contributing</ButtonLink>
            <StyledButtonLink
              isSecondary
              to="https://github.com/ethereum/ethereum-org-website"
            >
              <StyledIcon name="github" /> GitHub
            </StyledButtonLink>
          </ButtonRow>
        </StyledCalloutBanner>
      </StyledContent>
    </Page>
  )
}

export default HomePage

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "home/hero.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ethereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    enterprise: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    dogefixed: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    robotfixed: file(relativePath: { eq: "wallet-cropped.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    ethfixed: file(relativePath: { eq: "eth.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    devfixed: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    future: file(relativePath: { eq: "future_transparent.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    impact: file(relativePath: { eq: "impact_transparent.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    finance: file(relativePath: { eq: "finance_transparent.png" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    hackathon: file(relativePath: { eq: "hackathon_transparent.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    infrastructurefixed: file(
      relativePath: { eq: "infrastructure_transparent.png" }
    ) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    docking: file(relativePath: { eq: "eth2/docking.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
