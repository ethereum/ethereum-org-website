// Libraries
import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"

// Data
import layer2Data from "../data/layer-2/layer-2.json"

// Components
import ButtonLink from "../components/ButtonLink"
import Card from "../components/Card"
import ExpandableCard from "../components/ExpandableCard"
import FeedbackCard from "../components/FeedbackCard"
import InfoBanner from "../components/InfoBanner"
import Layer2Onboard from "../components/Layer2/Layer2Onboard"
import Link from "../components/Link"
import OrderedList from "../components/OrderedList"
import PageHero from "../components/PageHero"
import PageMetadata from "../components/PageMetadata"
import Pill from "../components/Pill"
import Layer2ProductCard from "../components/Layer2ProductCard"
import ProductList from "../components/ProductList"
import { CardGrid, Content, Page } from "../components/SharedStyledComponents"

// Utils
import { getData } from "../utils/cache"
import { translateMessageId } from "../utils/translations"

// Styles

const HeroBackground = styled.div`
  background: ${(props) => props.theme.colors.layer2Gradient};
`

const HeroContainer = styled.div`
  width: 100%;
`

const Hero = styled(PageHero)`
  padding-bottom: 2rem;
`

const PaddedContent = styled(Content)`
  padding-top: 3rem;
  padding-bottom: 3rem;
`

const LightGrayContent = styled(PaddedContent)`
  background: ${(props) => props.theme.colors.layer2ContentSecondary};
`

const FlexContainer = styled.div`
  flex: ${(props) => props.flexPercent}%;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex: 100%;
  }
`

const Flex50 = styled.div`
  flex: 50%;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex: 100%;
  }
`

const TwoColumnContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0rem;
    margin-right: 0rem;
  }
`

const InfoGrid = styled(CardGrid)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
  gap: 1rem 2rem;
  & > div {
    height: fit-content;
    &:hover {
      transition: 0.1s;
      transform: scale(1.01);
      img {
        transition: 0.1s;
        transform: scale(1.1);
      }
    }
  }
`

const RollupCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.ednBackground};
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  padding: 1.5rem;
  flex: 50%;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex: 100%;
  }
`

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin-bottom: 4rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 33%;
  padding: 0 20px;
  text-align: center;
  align-content: center;
  justify-content: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex: 100%;
  }
`

const StatPrimary = styled.p`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.xl};
  color: ${(props) => props.theme.colors.primary};
  font-family: monospace;
`

const StatDescription = styled.p`
  opacity: 0.8;
  margin: 0;
`

const StatDivider = styled.div`
  border-left: 1px solid ${({ theme }) => theme.colors.homeDivider};
  max-height: 100px;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    border-left: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.homeDivider};
    width: 100%;
    height: 0%;
    margin: 2rem 0;
  }
`

const Layer2Page = ({ data }) => {
  const intl = useIntl()

  const [tvl, setTVL] = useState("-")
  const [percentChangeL2, setL2PercentChange] = useState("-")
  const [averageFee, setAverageFee] = useState("-")

  useEffect(() => {
    const fetchL2Beat = async () => {
      try {
        const l2BeatData = await getData("https://l2beat.com/api/tvl.json")
        // formatted TVL from L2beat API formatted
        setTVL(
          new Intl.NumberFormat(intl.locale, {
            style: "currency",
            currency: "USD",
            notation: "compact",
            minimumSignificantDigits: 2,
            maximumSignificantDigits: 3,
          }).format(l2BeatData.data[l2BeatData.data.length - 1][1])
        )
        // Calculate percent change ((new value - old value) / old value) *100)
        setL2PercentChange(
          (
            ((l2BeatData.data[l2BeatData.data.length - 1][1] -
              l2BeatData.data[l2BeatData.data.length - 31][1]) /
              l2BeatData.data[l2BeatData.data.length - 31][1]) *
            100
          ).toFixed(2)
        )
      } catch (error) {
        console.error(error)
      }
    }

    fetchL2Beat()

    const fetchCryptoStats = async () => {
      try {
        // Average eth transfer fee from L2's supported by cryptostats API
        const feeData = await getData(
          "https://api.cryptostats.community/api/v1/l2-fees/feeTransferEth?metadata=false"
        )
        const feeAverage =
          feeData.data.reduce(
            (acc, curr) => (acc += curr.results.feeTransferEth),
            0
          ) / feeData.data.length
        setAverageFee(feeAverage.toFixed(2))
      } catch (error) {
        console.error(error)
      }
    }
    fetchCryptoStats()
  }, [])

  const heroContent = {
    title: "Layer 2",
    header: "Layer 2",
    subtitle:
      "Scaling Ethereum without compromising on security and decentralization.",
    image: getImage(data.ethBlocks),
    alt: "test",
    buttons: [
      {
        content: "What is layer 2",
        pathId: "what-is-layer-2",
      },
      {
        content: "Use layer 2",
        pathId: "use-layer-2",
        isSecondary: "isSecondary",
      },
    ],
  }

  const layer2Cards = [
    {
      emoji: ":money_with_wings:",
      title: "Lower fees",
      description:
        "By combining multiple transactions into a single transaction on layer 1, transaction fees are massively reduced, making Ethereum more accessible for all.",
    },
    {
      emoji: ":closed_lock_with_key:",
      className: "security-card",
      title: "Maintain Security",
      description:
        "Layer 2 blockchains settle their transactions on the Ethereum Mainnet, allowing users who use them to benefit from the security of the Ethereum network.",
    },
    {
      emoji: ":hammer_and_wrench:",
      title: "Expand Use Cases",
      description:
        "With higher transactions per second, lower fees, and new technology, projects will expand into new applications with improved user experience.",
    },
  ]

  const rollupCards = [
    {
      image: getImage(data.optimisticRollup),
      title: "Optimistic rollups",
      description:
        "Optimistic rollups use fault proofs where transactions are assumed to be valid, but can be challenged if the alleged state after the transaction is suspected. If an invalid tranaction is suspected, a fault proof is ran to see if this has taken place.",
      childSentence: "More on optimistic rollups",
      childLink: "/developers/docs/scaling/optimistic-rollups/",
    },
    {
      image: getImage(data.zkRollup),
      title: "Zero-knowledge rollups",
      description:
        "Zero-knowledge rollups use validity proofs where transactions calculations are computed off-chain, and then this data is then supplied to Ethereum Mainnet with a proof of their validity.",
      childSentence: "More on zk-rollups",
      childLink: "/developers/docs/scaling/zk-rollups/",
    },
  ]

  const toolsData = {
    information: [
      {
        title: "L2BEAT",
        description:
          "L2BEAT is a great resource for looking at technical risk assessments of layer 2 projects. We recommend checking out their resources when researching specific layer 2 projects.",
        link: "https://l2beat.com",
        image: getImage(data.l2beat),
        alt: "L2BEAT",
      },
      {
        title: "L2 Fees",
        description:
          "L2 Fees lets you see the current cost (denominated in USD) for doing transactions on different layer 2s.",
        link: "https://l2fees.info",
        image: getImage(data.doge),
        alt: "L2 Fees",
      },
      {
        title: "Chainlist",
        description:
          "Chainlist is a great resource for importing network RPC's into supporting wallets. You will find RPC's for layer 2 projects here to help get you connected.",
        link: "https://chainlist.org",
        image: getImage(data.doge),
        alt: "Chainlist",
      },
    ],
    walletManagers: [
      {
        title: "Zapper",
        link: "https://zapper.fi/",
        description:
          "Manage your entire web3 portfolio from DeFi to NFTs and whatever comes next. Invest in the latest opportunities from one convenient place.",
        image: getImage(data.zapper),
        alt: "Zapper",
      },
      {
        title: "Zerion",
        description:
          "Build and manage your entire DeFi portfolio from one place. Discover the world of decentralized finance today.",
        link: "https://zerion.io",
        image: getImage(data.zerion),
        alt: "Zerion",
      },
      {
        title: "DeBank",
        description:
          "Keep up with all the important happenings in the web3 world",
        link: "https://debank.com",
        image: getImage(data.debank),
        alt: "DeBank",
      },
    ],
  }

  const layer2DataCombined = [...layer2Data.optimistic, ...layer2Data.zk]

  return (
    <Page>
      <PageMetadata
        title={"Layer 2"}
        description={"Introduction page to layer 2"}
      />

      <HeroBackground>
        <HeroContainer>
          <Hero content={heroContent} isReverse />
        </HeroContainer>

        <PaddedContent>
          <StatsContainer>
            <StatBox>
              <StatPrimary>{tvl} (USD)</StatPrimary>
              <StatDescription>TVL locked in layer 2</StatDescription>
            </StatBox>
            <StatDivider />
            <StatBox>
              <StatPrimary>${averageFee} (USD)</StatPrimary>
              <StatDescription>
                Average layer 2 ETH transfer fee
              </StatDescription>
            </StatBox>
            <StatDivider />
            <StatBox>
              <StatPrimary>{percentChangeL2}%</StatPrimary>
              <StatDescription>Layer 2 TVL Last 30 days</StatDescription>
            </StatBox>
          </StatsContainer>
        </PaddedContent>
      </HeroBackground>

      <PaddedContent id="what-is-layer-2">
        <TwoColumnContent>
          <Flex50>
            <h2>What is layer 2?</h2>
            <p>
              Layer 2 (L2) is a collective term to describe a specific set of
              Ethereum scaling solutions.{" "}
              <b>
                A layer 2 is separate blockchain that extends Ethereum and
                inherits the security guarantees of Ethereum
              </b>
              .
            </p>
            <p>
              Now let’s dig into it a bit more, and to do this we need to
              explain layer 1 (L1).
            </p>
          </Flex50>
          <Flex50>
            <GatsbyImage
              image={getImage(data.whatIsEthereum)}
              style={{ maxHeight: "400px" }}
              objectFit="contain"
            />
          </Flex50>
        </TwoColumnContent>
      </PaddedContent>
      <LightGrayContent>
        <h2>Layer 1 function</h2>
        <TwoColumnContent>
          <Flex50>
            <p>
              Layer 1 is the base blockchain. Ethereum and Bitcoin are both
              layer 1 blockchains because they are the{" "}
              <b>
                underlying foundation that various layer 2 networks build on top
                of
              </b>
              . Examples of layer 2 projects include "rollups" on Ethereum and
              the Lighting Network on top of Bitcoin. All user transaction
              activity on these layer 2 projects can ultimately settle back to
              the layer 1 blockchain.
            </p>
            <p>
              Ethereum also functions as a data availability layer for Layer 2s,
              and if there are any disputes on previous transactions data is
              provided from Ethereum for these disputes.
            </p>
          </Flex50>
          {/* TODO: Convert these inline styles into styled components */}
          <Flex50>
            <p>
              <b>Ethereum as the layer 1 includes:</b>
            </p>
            <OrderedList
              listData={[
                <p>
                  <b>A network of node operators</b> to secure and validate the
                  network
                </p>,
                <p>
                  <b>A network of block producers</b>
                </p>,
                <p>
                  <b>The blockchain</b> itself and the history of transaction
                  data
                </p>,
                <p>
                  <b>The consensus mechanism</b> for the network
                </p>,
              ]}
            />
            <p>
              Still confused on Ethereum?{" "}
              <Link to="/what-is-ethereum/">Learn what Ethereum is</Link>.
            </p>
          </Flex50>
        </TwoColumnContent>
      </LightGrayContent>

      <PaddedContent>
        <TwoColumnContent>
          <FlexContainer
            flexPercent="50"
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <GatsbyImage
              image={getImage(data.dao)}
              style={{ width: "100%" }}
              objectFit="contain"
            />
          </FlexContainer>
          <FlexContainer flexPercent="50">
            <h2>Why do we need layer 2?</h2>
            <p>
              The three desirable properties of a blockchain are that it is
              <b>decentralized, secure, and scalable</b>. The{" "}
              <Link to="https://www.ledger.com/academy/what-is-the-blockchain-trilemma">
                blockchain trilemma
              </Link>{" "}
              states that a simple blockchain architecture can only achieve two
              out of three. Want a secure and decentralized blockchain? You need
              to sacrifice scalability. This is where layer 2 networks come in.
            </p>
            <p>
              Ethereum has reached the network's current capacity with{" "}
              <Link to="https://etherscan.io/chart/tx">
                1+ million transactions per day
              </Link>
              , with high demand for each of these transactions. The success of
              Ethereum and the demand to use it has caused gas prices to rise
              substantially. Therefore the{" "}
              <Link to="/developers/docs/scaling/">
                need for scaling solutions
              </Link>{" "}
              has increased in demand as well.
            </p>

            <h3>Scalability</h3>
            <p>
              The main goal of scalability is to increase transaction speed
              (faster finality), and transaction throughput (high transactions
              per second), without sacrificing decentralization or security.
            </p>
            <p>
              The Ethereum community has taken a strong stance that it would not
              throw out decentralization or security in order to scale. Until
              sharding, Ethereum Mainnet will only be able to process{" "}
              <Link to="https://ethtps.info/Network/Ethereum">
                roughly 15 transactions per second
              </Link>
              . When the demand to use Ethereum is high, it causes network
              congestion, increasing transaction fees, and pricing out those who
              cannot afford it from using Ethereum until the fees reduce. That
              is where layer 2 comes in to scale Ethereum today.
            </p>
            <Link to="/upgrades/vision/">More on Ethereum's vision</Link>
          </FlexContainer>
        </TwoColumnContent>
        <h3>Benefits</h3>
        <InfoGrid>
          {layer2Cards.map(({ emoji, title, description }, idx) => (
            <Card
              description={description}
              title={title}
              emoji={emoji}
              key={idx}
            />
          ))}
        </InfoGrid>
      </PaddedContent>

      <PaddedContent>
        <TwoColumnContent>
          <FlexContainer flexPercent="50">
            <h2>How layer 2 works</h2>
            <p>
              As we mentioned above, Layer 2 is a collective term for Ethereum
              scaling solutions that handle transactions off Ethereum layer 1
              while taking advantage of the robust decentralized security model
              of Ethereum layer 1.{" "}
              <b>
                A layer 2 is a separate blockchain that is connected to Ethereum
              </b>
              . How does that work?
            </p>
            <p>
              A layer 2 blockchain regularly communicates with Ethereum (by
              submitting bundles of transactions) in order to ensure it has
              similar security and decentralization guarantees, and requires no
              changes to the layer 1 protocol (Ethereum). This lets layer 1
              handle security, data availability, and decentralization, while
              the layer above (layer 2) handles scaling. Layer 2s takes the
              transactional burden away from the layer 1, and posts finalized
              proofs back to the layer 1 to finalize the state. By taking this
              transaction load away from layer 1, the base layer will become
              less congested, and everything becomes more scalable.
            </p>
            <h3>Rollups</h3>
            <p>
              Rollups are currently the preferred layer 2 solution for scaling
              Ethereum. By using rollups, users can{" "}
              <Link to="https://l2fees.info/">
                reduce gas fees by up to 100x
              </Link>{" "}
              in comparison to a layer 1 transaction.
            </p>
            <p>
              Rollups bundle (or ’roll up’) hundreds of transactions into a
              single transaction on layer 1. This allows the transaction fees to
              be shared across everyone in the rollup. Rollup transactions get
              executed outside of layer 1 but the transaction data gets posted
              to layer 1. This data is either proof of transaction validity in
              ZK rollups or can be used to create a fraud or fault proof in case
              of optimistic rollup. Therefore by posting transaction data onto
              layer 1, rollups are able to inherit the security of Ethereum.
            </p>
          </FlexContainer>
          {/* TODO: Convert these inline styles into styled components */}
          <FlexContainer
            flexPercent="50"
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <GatsbyImage
              image={getImage(data.rollup)}
              style={{ width: "100%" }}
              objectFit="contain"
            />
          </FlexContainer>
        </TwoColumnContent>
        <TwoColumnContent>
          {rollupCards.map(
            ({ image, title, description, childSentence, childLink }) => (
              <RollupCard>
                <GatsbyImage
                  image={image}
                  objectPosition="0"
                  objectFit="contain"
                />
                <h3>{title}</h3>
                <p>{description}</p>
                <p>
                  <Link to={childLink}>{childSentence}</Link>
                </p>
              </RollupCard>
            )
          )}
        </TwoColumnContent>
      </PaddedContent>

      <PaddedContent>
        <InfoBanner isWarning={true}>
          <h2>Do your own research: Risks of layer 2</h2>
          <p>
            Because layer 2 chains inherit security from Ethereum, in an ideal
            world, they are as safe as L1 Ethereum. However, many of the{" "}
            <b>projects are still young and somewhat experimental</b>. After
            years of R&D, many of the L2 technologies that will scale Ethereum
            went live in 2021. This is not to say these L2s are not secure, only
            that no layer 2 is as battle tested as Ethereum Mainnet. Always do
            your own research and decide if you're comfortable with any risks
            involved.
          </p>
          <p>
            For more information on the technology, risks and trust assumptions
            of layer 2s, we recommend checking out L2BEAT, which provides a
            comprehensive risk assessment framework of each project.
          </p>
          <p>
            <ButtonLink to="https://l2beat.com/?view=risk">
              Go to L2BEAT
            </ButtonLink>
          </p>
        </InfoBanner>
      </PaddedContent>

      <PaddedContent id="use-layer-2">
        <h2>Use layer 2</h2>
        <p>
          Now that you understand why layer 2 exists and how it works, let's get
          you up and running!
        </p>
        <h3>Generalized layer 2s</h3>
        <p>
          Generalized layer 2s behave just like Ethereum — but cheaper. Anything
          that you can do on Ethereum layer 1, you can also do on layer 2. Many
          dapps have already begun to migrate to these networks, or are skipping
          deploying to Mainnet altogether.
        </p>
        <CardGrid>
          {layer2DataCombined
            .filter((l2) => !l2.purpose.indexOf("universal"))
            .map((l2, idx) => {
              return (
                <Layer2ProductCard
                  key={idx}
                  background={l2.background}
                  image={getImage(data[l2.imageKey])}
                  description={l2.description}
                  url={l2.website}
                  note={translateMessageId(l2.noteKey, intl)}
                  name={l2.name}
                  bridge={l2.bridge}
                  ecosystemPortal={l2.ecosystemPortal}
                  tokenLists={l2.tokenLists}
                />
              )
            })}
        </CardGrid>
      </PaddedContent>

      <PaddedContent>
        <h3>Application specific layer 2s</h3>
        <p>
          Application specific layer 2s are projects that specialize in
          optimizing for a specific application space, bringing improved
          performance.
        </p>
        <CardGrid>
          {layer2DataCombined
            .filter((l2) => l2.purpose.indexOf("universal"))
            .map((l2, idx) => {
              return (
                <Layer2ProductCard
                  key={idx}
                  background={l2.background}
                  image={getImage(data[l2.imageKey])}
                  description={l2.description}
                  url={l2.website}
                  note={translateMessageId(l2.noteKey, intl)}
                  name={l2.name}
                  bridge={l2.bridge}
                  ecosystemPortal={l2.ecosystemPortal}
                  tokenLists={l2.tokenLists}
                >
                  {l2.purpose.map((purpose) => (
                    <Pill>{purpose}</Pill>
                  ))}
                </Layer2ProductCard>
              )
            })}
        </CardGrid>
      </PaddedContent>

      <PaddedContent>
        <h2>A note on alt L1s, sidechains, and validiums</h2>
        <TwoColumnContent>
          <Flex50>
            <p>
              <b>Alternative layer 1s</b> have higher throughput and lower
              transaction fees than Ethereum. These alt L1s have had to{" "}
              <b>sacrifice on security or decentralization</b> in order to
              achieve higher transactions per second and lower fees.
            </p>
            <p>
              The Ethereum ecosystem is firmly aligned that{" "}
              <b>
                layer 2 scaling is the only way to solve the scalability
                trilemma
              </b>{" "}
              while remaining decentralized and secure.
            </p>
          </Flex50>
          <Flex50>
            <p>
              <b>Sidechains and validiums</b> are blockchains that allow assets
              from one blockchain to be bridged over and used on another
              blockchain. Sidechains and validiums run in parallel with the main
              chain, and interact with the main chain through bridges, but they
              do not derive their security or data availability from the main
              chain.
            </p>
            <p>
              Both scale similarly to layer 2s, but have different trust
              assumptions. They offer lower transaction fees, and higher
              transaction throughput. More on{" "}
              <Link to="/developers/docs/scaling/sidechains/">sidechains</Link>{" "}
              and <Link to="/developers/docs/scaling/validium/">validiums</Link>
            </p>
          </Flex50>
        </TwoColumnContent>
      </PaddedContent>

      <PaddedContent>
        <Layer2Onboard
          layer2DataCombined={layer2DataCombined}
          ethIcon={getImage(data.ethHome)}
        />
      </PaddedContent>

      <PaddedContent>
        <h2>Tools to be effective on layer 2</h2>
        <TwoColumnContent>
          <Flex50>
            <ProductList
              category="Information"
              content={toolsData.information}
            />
          </Flex50>
          <Flex50>
            <ProductList
              category="Wallet managers"
              content={toolsData.walletManagers}
            />
          </Flex50>
        </TwoColumnContent>
      </PaddedContent>

      <PaddedContent>
        <h2>FAQ</h2>
        <ExpandableCard title="Why is there no 'official' Ethereum L2?">
          <p>
            Just as there is no “official” Ethereum client, there is no
            “official” Ethereum layer 2. Multiple teams will implement their
            version of a layer 2, and the ecosystem as a whole will benefit from
            diversity in these clients as a decentralizing point. Much like we
            have multiple Ethereum clients developed by multiple teams in order
            to have diversity in the network, this too will be how layer 2s
            develop in the future.
          </p>
        </ExpandableCard>
        <ExpandableCard title="What is the difference between optimistic and zero-knowledge rollups?">
          <p>
            Main difference being, validity proofs run the computations and post
            a proof, whereas fault proofs only run the computations when faults
            is suspected and needs to be checked. At the moment, most zk-rollups
            are application specific, in contrast with optimistic rollups which
            have largely been generalizable.
          </p>
        </ExpandableCard>
        <ExpandableCard title="Is scaling at layer 1 possible?">
          <p>
            Yes. Currently in the Ethereum roadmap there are plans for shard
            chains. While these are in the roadmap, further scaling through
            layer 2 networks is still necessary.{" "}
            <Link to="/upgrades/shard-chains/">More info on sharding</Link>.
          </p>
        </ExpandableCard>
        <ExpandableCard title="What are the risks with layer 2?">
          <p>
            Sequencers may go down, leading you to have to wait to access funds.
            While there may be a waiting period, you do still have access to
            your funds unlike alt-l1's or sidechains.
          </p>
          <p>
            Bridges are in their early stages of development, and it is likely
            that the optimal bridge design has not been discovered yet. There
            have been{" "}
            <Link to="https://rekt.news/wormhole-rekt/">
              recent hacks of bridges
            </Link>
            . <Link to="/bridges/">More information on bridges</Link>.
          </p>
        </ExpandableCard>
      </PaddedContent>

      <PaddedContent>
        <h2>Further reading</h2>
        <ul>
          <li>
            <Link to="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">
              A rollup-centric ethereum roadmap
            </Link>{" "}
            <i>- Vitalik Buterin </i>
          </li>
          <li>
            <Link to="https://vitalik.ca/general/2021/01/05/rollup.html">
              An Incomplete Guide to Rollups
            </Link>{" "}
            <i>- Vitalik Buterin</i>
          </li>
          <li>
            <Link to="https://www.youtube.com/watch?v=DyNbmgkyxJI">
              Polygon sidechain vs Ethereum rollups: Layer 2 scaling approaches
              | Vitalik Buterin and Lex Fridman
            </Link>{" "}
            <i>- Lex Clips</i>
          </li>
          <li>
            <Link to="https://www.youtube.com/watch?v=7pWxCklcNsU">
              ROLLUPS - The Ultimate Ethereum Scaling Strategy? Arbitrum &
              Optimism Explained
            </Link>{" "}
            <i>- Finematics</i>
          </li>
          <li>
            <Link to="/upgrades/shard-chains/">
              Scaling layer 1 with shard chains
            </Link>
          </li>
          <li>
            <Link to="https://barnabe.substack.com/p/understanding-rollup-economics-from?s=r">
              Understanding rollup economics from first principals
            </Link>{" "}
            <i>- Barnabé Monnot</i>
          </li>
          <li>
            <Link to="https://eips.Ethereum.org/EIPS/eip-4488">
              EIP-4488 proposed to reduce transaction call data gas cost
            </Link>
          </li>
        </ul>
      </PaddedContent>
      <PaddedContent>
        <FeedbackCard />
      </PaddedContent>
    </Page>
  )
}

export default Layer2Page

export const query = graphql`
  query {
    dao: file(relativePath: { eq: "use-cases/dao-2.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 500
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    doge: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    ethBlocks: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    ethHome: file(relativePath: { eq: "eth-home-icon.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 50
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    financeTransparent: file(relativePath: { eq: "finance_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 300
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    impact: file(relativePath: { eq: "impact_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 300
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    optimisticRollup: file(
      relativePath: { eq: "layer-2/optimistic_rollup.png" }
    ) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
          width: 122
        )
      }
    }
    rollup: file(relativePath: { eq: "layer-2/rollup-2.png" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, quality: 100)
      }
    }
    zkRollup: file(relativePath: { eq: "layer-2/zk_rollup.png" }) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
          width: 122
        )
      }
    }
    whatIsEthereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    arbitrum: file(relativePath: { eq: "layer-2/arbitrum.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    boba: file(relativePath: { eq: "layer-2/boba.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    chainlist: file(relativePath: { eq: "layer-2/chainlist.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    debank: file(relativePath: { eq: "layer-2/debank.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    dydx: file(relativePath: { eq: "layer-2/dydx.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    l2beat: file(relativePath: { eq: "layer-2/l2beat.jpg" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    loopring: file(relativePath: { eq: "layer-2/loopring.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    metis: file(relativePath: { eq: "layer-2/metis-dark.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    optimism: file(relativePath: { eq: "layer-2/optimism.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    zapper: file(relativePath: { eq: "layer-2/zapper.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    zerion: file(relativePath: { eq: "layer-2/zerion.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    zkspace: file(relativePath: { eq: "layer-2/zkspace.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    zksync: file(relativePath: { eq: "layer-2/zksync.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
