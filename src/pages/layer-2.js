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
import Icon from "../components/Icon"
import InfoBanner from "../components/InfoBanner"
import Layer2Onboard from "../components/Layer2/Layer2Onboard"
import Link from "../components/Link"
import OrderedList from "../components/OrderedList"
import PageHero from "../components/PageHero"
import PageMetadata from "../components/PageMetadata"
import Pill from "../components/Pill"
import Layer2ProductCard from "../components/Layer2ProductCard"
import ProductList from "../components/ProductList"
import Tooltip from "../components/Tooltip"
import Translation from "../components/Translation"
import { CardGrid, Content, Page } from "../components/SharedStyledComponents"

// Utils
import { getData } from "../utils/cache"
import {
  translateMessageId,
  getLocaleForNumberFormat,
} from "../utils/translations"

// Constants
import { GATSBY_FUNCTIONS_PATH } from "../constants"

// Styles

const HeroBackground = styled.div`
  width: 100%;
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

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
  margin-right: 0.5rem;
  opacity: 0.8;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
  }
  &:hover,
  &:active,
  &:focus {
    fill: ${({ theme }) => theme.colors.primary};
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

const StatSpan = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
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
  const localeForStatsBoxNumbers = getLocaleForNumberFormat(intl.locale)
  const [tvl, setTVL] = useState("loading...")
  const [percentChangeL2, setL2PercentChange] = useState("loading...")
  const [averageFee, setAverageFee] = useState("loading...")

  useEffect(() => {
    const fetchL2Beat = async () => {
      try {
        const l2BeatData = await getData(`${GATSBY_FUNCTIONS_PATH}/l2beat`)
        // formatted TVL from L2beat API formatted
        const TVL = new Intl.NumberFormat(localeForStatsBoxNumbers, {
          style: "currency",
          currency: "USD",
          notation: "compact",
          minimumSignificantDigits: 2,
          maximumSignificantDigits: 3,
        }).format(l2BeatData.data[l2BeatData.data.length - 1][1])
        setTVL(`${TVL}`)
        // Calculate percent change ((new value - old value) / old value) *100)
        const percentage = (
          ((l2BeatData.data[l2BeatData.data.length - 1][1] -
            l2BeatData.data[l2BeatData.data.length - 31][1]) /
            l2BeatData.data[l2BeatData.data.length - 31][1]) *
          100
        ).toFixed(2)
        setL2PercentChange(
          percentage > 0 ? `+${percentage}%` : `${percentage}%`
        )
      } catch (error) {
        console.error(error)
        setTVL("Error, please refresh.")
        setL2PercentChange("Error, please refresh.")
      }
    }
    fetchL2Beat()

    const fetchCryptoStats = async () => {
      try {
        // Average eth transfer fee from L2's supported by cryptostats API
        let feeData = await getData(
          "https://api.cryptostats.community/api/v1/l2-fees/feeTransferEth?metadata=false"
        )

        // Temporary, but filtering out L2's we arent listing
        feeData = feeData.data.filter(
          (l2) => l2.id !== "aztec-network" && l2.id !== "hermez"
        )

        const feeAverage =
          feeData.reduce(
            (acc, curr) => (acc += curr.results.feeTransferEth),
            0
          ) / feeData.length

        const intlFeeAverage = new Intl.NumberFormat(localeForStatsBoxNumbers, {
          style: "currency",
          currency: "USD",
          notation: "compact",
          minimumSignificantDigits: 2,
          maximumSignificantDigits: 3,
        }).format(feeAverage)
        setAverageFee(`${intlFeeAverage}`)
      } catch (error) {
        setAverageFee("Error, please refresh.")
        console.error(error)
      }
    }
    fetchCryptoStats()
  }, [])

  const heroContent = {
    title: translateMessageId("layer-2-hero-title", intl),
    header: translateMessageId("layer-2-hero-header", intl),
    subtitle: translateMessageId("layer-2-hero-subtitle", intl),
    image: getImage(data.heroImage),
    alt: translateMessageId("layer-2-hero-alt-text", intl),
    buttons: [
      {
        content: translateMessageId("layer-2-hero-button-1", intl),
        pathId: "what-is-layer-2",
      },
      {
        content: translateMessageId("layer-2-hero-button-2", intl),
        pathId: "use-layer-2",
        isSecondary: "isSecondary",
      },
      {
        content: "Move to layer 2",
        pathId: "how-to-get-onto-layer-2",
        isSecondary: "isSecondary",
      },
    ],
  }

  const layer2Cards = [
    {
      emoji: ":money_with_wings:",
      title: translateMessageId("layer-2-lower-fees-title", intl),
      description: translateMessageId("layer-2-lower-fees-description", intl),
    },
    {
      emoji: ":closed_lock_with_key:",
      title: translateMessageId("layer-2-maintain-security-title", intl),
      description: translateMessageId(
        "layer-2-maintain-security-description",
        intl
      ),
    },
    {
      emoji: ":hammer_and_wrench:",
      title: translateMessageId("layer-2-expand-use-cases-title", intl),
      description: translateMessageId(
        "layer-2-expand-use-cases-description",
        intl
      ),
    },
  ]

  const rollupCards = [
    {
      image: getImage(data.optimisticRollup),
      title: translateMessageId("layer-2-optimistic-rollups-title", intl),
      description: translateMessageId(
        "layer-2-optimistic-rollups-description",
        intl
      ),
      childSentence: translateMessageId(
        "layer-2-optimistic-rollups-childSentance",
        intl
      ),
      childLink: "/developers/docs/scaling/optimistic-rollups/",
    },
    {
      image: getImage(data.zkRollup),
      title: translateMessageId("layer-2-zk-rollups-title", intl),
      description: translateMessageId("layer-2-zk-rollups-description", intl),
      childSentence: translateMessageId(
        "layer-2-zk-rollups-childSentance",
        intl
      ),
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

  const tooltipContent = (metric) => (
    <div>
      <Translation id="data-provided-by" />{" "}
      <Link to={metric.apiUrl}>{metric.apiProvider}</Link>
    </div>
  )

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
              <StatPrimary>{tvl}</StatPrimary>
              <StatSpan>
                <StatDescription>
                  <Translation id="layer-2-statsbox-1" />
                </StatDescription>
                <Tooltip
                  content={tooltipContent({
                    apiUrl: "https://l2beat.com/",
                    apiProvider: "L2BEAT",
                  })}
                >
                  <StyledIcon name="info" />
                </Tooltip>
              </StatSpan>
            </StatBox>
            <StatDivider />
            <StatBox>
              <StatPrimary>{averageFee}</StatPrimary>
              <StatSpan>
                <StatDescription>
                  <Translation id="layer-2-statsbox-2" />
                </StatDescription>
                <Tooltip
                  content={tooltipContent({
                    apiUrl: "https://cryptostats.community/",
                    apiProvider: "CryptoStats",
                  })}
                >
                  <StyledIcon name="info" />
                </Tooltip>
              </StatSpan>
            </StatBox>
            <StatDivider />
            <StatBox>
              <StatPrimary>{percentChangeL2}</StatPrimary>
              <StatSpan>
                <StatDescription>
                  <Translation id="layer-2-statsbox-3" />
                </StatDescription>
                <Tooltip
                  content={tooltipContent({
                    apiUrl: "https://l2beat.com/",
                    apiProvider: "L2BEAT",
                  })}
                >
                  <StyledIcon name="info" />
                </Tooltip>
              </StatSpan>
            </StatBox>
          </StatsContainer>
        </PaddedContent>
      </HeroBackground>

      <PaddedContent id="what-is-layer-2">
        <TwoColumnContent>
          <Flex50>
            <h2>
              <Translation id="layer-2-what-is-layer-2-title" />
            </h2>
            <p>
              <Translation id="layer-2-what-is-layer-2-1" />
              Layer 2 (L2) is a collective term to describe a specific set of
              Ethereum scaling solutions.{" "}
              <b>
                A layer 2 is a separate blockchain that extends Ethereum and
                inherits the security guarantees of Ethereum
              </b>
              .
            </p>
            <p>
              <Translation id="layer-2-what-is-layer-2-2" />
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
        <h2>
          <Translation id="layer-2-what-is-layer-1-title" />
        </h2>
        <TwoColumnContent>
          <Flex50>
            <p>
              <Translation id="layer-2-what-is-layer-1-1" />
              Layer 1 is the base blockchain. Ethereum and Bitcoin are both
              layer 1 blockchains because they are the{" "}
              <b>
                underlying foundation that various layer 2 networks build on top
                of
              </b>
              . Examples of layer 2 projects include "rollups" on Ethereum and
              the Lightning Network on top of Bitcoin. All user transaction
              activity on these layer 2 projects can ultimately settle back to
              the layer 1 blockchain.
            </p>
            <p>
              <Translation id="layer-2-what-is-layer-1-2" />
            </p>
          </Flex50>
          <Flex50>
            <p>
              <Translation id="layer-2-what-is-layer-1-list-title" />
            </p>
            <OrderedList
              listData={[
                <p>
                  <Translation id="layer-2-what-is-layer-1-list-1" />
                </p>,
                <p>
                  <Translation id="layer-2-what-is-layer-1-list-2" />
                </p>,
                <p>
                  <Translation id="layer-2-what-is-layer-1-list-3" />
                </p>,
                <p>
                  <Translation id="layer-2-what-is-layer-1-list-4" />
                </p>,
              ]}
            />
            <p>
              <Translation id="layer-2-what-is-layer-1-list-link-1" />{" "}
              <Link to="/what-is-ethereum/">
                <Translation id="layer-2-what-is-layer-1-list-link-2" />
              </Link>
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
            <h2>
              <Translation id="layer-2-why-do-we-need-layer-2-title" />
            </h2>
            <p>
              <Translation id="layer-2-why-do-we-need-layer-2-1" />
            </p>
            <p>
              <Translation id="layer-2-why-do-we-need-layer-2-2" />
            </p>

            <h3>
              <Translation id="layer-2-why-do-we-need-layer-2-scalability" />
            </h3>
            <p>
              <Translation id="layer-2-why-do-we-need-layer-2-scalability-1" />
            </p>
            <p>
              <Translation id="layer-2-why-do-we-need-layer-2-scalability-2" />
              The Ethereum community has taken a strong stance that it would not
              throw out decentralization or security in order to scale. Until{" "}
              <Link to="/upgrades/shard-chains/">sharding</Link>, Ethereum
              Mainnet (layer 1) is only able to process{" "}
              <Link to="https://ethtps.info/Network/Ethereum">
                roughly 15 transactions per second
              </Link>
              . When demand to use Ethereum is high, the network becomes
              congested, which increases transaction fees and prices out users
              who cannot afford those fees. That is where layer 2 comes in to
              scale Ethereum today.
            </p>
            <Link to="/upgrades/vision/">
              <Translation id="layer-2-why-do-we-need-layer-2-scalability-3" />
            </Link>
          </FlexContainer>
        </TwoColumnContent>
        <h3>
          <Translation id="layer-2-benefits-of-layer-2-title" />
        </h3>
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
            <h2>
              <Translation id="layer-2-how-does-layer-2-work-title" />
            </h2>
            <p>
              <Translation id="layer-2-how-does-layer-2-work-1" />
            </p>
            <p>
              <Translation id="layer-2-how-does-layer-2-work-2" />
            </p>
            <h3>
              <Translation id="layer-2-rollups-title" />
            </h3>
            <p>
              <Translation id="layer-2-rollups-1" />
            </p>
            <p>
              <Translation id="layer-2-rollups-2" />
            </p>
          </FlexContainer>
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
          <h2>
            <Translation id="layer-2-dyor-title" />
          </h2>
          <p>
            <Translation id="layer-2-dyor-1" />
          </p>
          <p>
            <Translation id="layer-2-dyor-2" />
          </p>
          <p>
            <ButtonLink to="https://l2beat.com/?view=risk">
              <Translation id="layer-2-dyor-3" />
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
          dapps have already begun to migrate to these networks or have skipped
          Mainnet altogether to deploy straight on a layer 2.
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
        <h2>A note on sidechains, validiums, and alternative blockchains</h2>
        <TwoColumnContent>
          <Flex50>
            <p>
              <b>Sidechains and validiums</b> are blockchains that allow assets
              from Ethereum to be bridged over and used on another blockchain.
              Sidechains and validiums run in parallel with Ethereum, and
              interact with Ethereum through bridges, but they do not derive
              their security or data availability from Ethereum.
            </p>
            <p>
              Both scale similarly to layer 2s - they offer lower transaction
              fees and higher transaction throughput - but have different trust
              assumptions.
            </p>
            <p>
              More on{" "}
              <Link to="/developers/docs/scaling/sidechains/">sidechains</Link>{" "}
              and <Link to="/developers/docs/scaling/validium/">validiums</Link>
            </p>
          </Flex50>
          <Flex50>
            <p>
              Some <b>layer 1 blockchains</b> have higher throughput and lower
              transaction fees than Ethereum. These alternative layer 1s have
              had to <b>sacrifice on security or decentralization</b> in order
              to achieve higher transactions per second and lower transaction
              fees.
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
        </TwoColumnContent>
      </PaddedContent>

      <PaddedContent id="how-to-get-onto-layer-2">
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
            Just as there is no 'official' Ethereum client, there is no
            'official' Ethereum layer 2. Ethereum is permissionless -
            technically anyone can create a layer 2! Multiple teams will
            implement their version of a layer 2, and the ecosystem as a whole
            will benefit from a diversity of design approaches that are
            optimized for different use cases. Much like we have multiple
            Ethereum clients developed by multiple teams in order to have
            diversity in the network, this too will be how layer 2s develop in
            the future.
          </p>
        </ExpandableCard>
        <ExpandableCard title="What is the difference between optimistic and zero-knowledge rollups?">
          <p>
            Both optimistic and zero-knowledge rollups bundle (or ’roll up’)
            hundreds of transactions into a single transaction on layer 1.
            Rollup transactions get executed outside of layer 1 but transaction
            data gets posted to layer 1.
          </p>
          <p>
            The primary difference is what data is posted to the layer 1 and how
            the data is verified. Validity proofs (used by zero-knowledge
            rollups) run the computations off-chain and post a proof, whereas
            fault proofs (used by optimistic rollups) only run the computations
            on-chain when fault is suspected and must be checked.
          </p>
          <p>
            At the moment, most zk-rollups are application specific, in contrast
            with optimistic rollups which have largely been generalizable.
          </p>
          <p>
            More info on{" "}
            <Link to="/developers/docs/scaling/optimistic-rollups/">
              optimistic rollups
            </Link>{" "}
            and{" "}
            <Link to="/developers/docs/scaling/zk-rollups/">
              zero-knowledge rollups
            </Link>
            .
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
            Layer 2 projects contain additional risks compared to holding funds
            and transacting directly on Ethereum Mainnet. For instance,
            sequencers may go down, leading you to have to wait to access funds.
          </p>
          <p>
            We encourage you to do your own research before transferring
            significant funds to a layer 2. For more information on the
            technology, risks, and trust assumptions of layer 2s, we recommend
            checking out <Link to="https://l2beat.com/?view=risk">L2BEAT</Link>,
            which provides a comprehensive risk assessment framework of each
            project.
          </p>
          <p>
            Blockchain bridges, which facilitate asset transfers to layer 2, are
            in their early stages of development and it is likely that the
            optimal bridge design has not been discovered yet. There have been{" "}
            <Link to="https://rekt.news/wormhole-rekt/">
              recent hacks of bridges
            </Link>
            . <Link to="/bridges/">More information on bridges</Link>.
          </p>
        </ExpandableCard>
        <ExpandableCard title="Why aren't some layer 2 projects listed here?">
          <p>
            We want to make sure we list the best resources possible so users
            can navigate the layer 2 space in a safe and confident manner. We
            maintain a framework of criteria for how projects are evaluated for
            inclusion.{" "}
            <Link to="/contributing/adding-layer-2/">
              View our layer 2 listing policy here
            </Link>
            .
          </p>
          <p>
            Anyone is free to suggest adding a layer 2 on ethereum.org. If
            there's a layer 2 that we have missed,{" "}
            <Link to="https://github.com/ethereum/ethereum-org-website/issues/new?&template=suggest_layer2.md">
              please suggest it
            </Link>
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
    heroImage: file(relativePath: { eq: "layer-2/hero.png" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, quality: 100)
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
