import React from "react"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { getImage } from "gatsby-plugin-image"
import styled from "styled-components"

import ButtonDropdown from "../../components/ButtonDropdown"
import ButtonLink from "../../components/ButtonLink"
import CalloutBanner from "../../components/CalloutBanner"
import Card from "../../components/Card"
import Link from "../../components/Link"
import PageHero from "../../components/PageHero"
import PageMetadata from "../../components/PageMetadata"
import StakingStatsBox from "../../components/StakingStatsBox"
import StakingHierarchy from "../../components/StakingHierarchy"
import Translation from "../../components/Translation"
import {
  CardGrid,
  Content,
  Page as PageContainer,
  Divider,
} from "../../components/SharedStyledComponents"
import StakingHomeTableOfContents from "../../components/StakingHomeTableOfContents"
import FeedbackCard from "../../components/FeedbackCard"
import ExpandableCard from "../../components/ExpandableCard"
import StakingCommunityCallout from "../../components/StakingCommunityCallout"

import { translateMessageId } from "../../utils/translations"
import { trackCustomEvent } from "../../utils/matomo"

const Page = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto 4rem;

  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 4rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const InfoTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  text-align: right;
  margin-top: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    text-align: left;
    font-size: 2.5rem
    display: none;
  }
`

const StyledButtonDropdown = styled(ButtonDropdown)`
  margin-bottom: 2rem;
  display: flex;
  justify-content: flex-end;
  text-align: center;
  @media (min-width: ${(props) => props.theme.breakpoints.s}) {
    align-self: flex-end;
  }
`

const InfoColumn = styled.aside`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 6.25rem; /* account for navbar */
  height: calc(100vh - 80px);
  flex: 0 1 330px;
  margin: 0 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const MobileButton = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    background: ${(props) => props.theme.colors.background};
    box-shadow: 0 -1px 0px ${(props) => props.theme.colors.border};
    width: 100%;
    bottom: 0;
    position: sticky;
    padding: 2rem;
    z-index: 99;
    margin-bottom: 0rem;
  }
`

const MobileButtonDropdown = styled(StyledButtonDropdown)`
  margin-bottom: 0rem;
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

// Apply styles for classes within markdown here
const ContentContainer = styled.article`
  flex: 1 1 ${(props) => props.theme.breakpoints.l};
  position: relative;
  padding: 2rem;
  padding-top: 0rem;
  gap: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    padding: 0rem;
  }
  .featured {
    padding-left: 1rem;
    margin-left: -1rem;
    border-left: 1px dotted ${(props) => props.theme.colors.primary};
  }

  .citation {
    p {
      color: ${(props) => props.theme.colors.text200};
    }
  }
  h2:first-of-type,
  & > div:first-child {
    margin-top: 0;
    padding-top: 0;
  }
`

const ComparisonGrid = styled.div`
  display: grid;
  grid-column-gap: 3rem;
  grid-auto-rows: minmax(64px, auto);
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    "solo-title saas-title pool-title"
    "solo-rewards saas-rewards pool-rewards"
    "solo-risks saas-risks pool-risks"
    "solo-reqs saas-reqs pool-reqs"
    "solo-cta saas-cta pool-cta";

  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "solo-title"
      "solo-rewards"
      "solo-risks"
      "solo-reqs"
      "solo-cta"
      "saas-title"
      "saas-rewards"
      "saas-risks"
      "saas-reqs"
      "saas-cta"
      "pool-title"
      "pool-rewards"
      "pool-risks"
      "pool-reqs"
      "pool-cta";
  }

  h4 {
    color: #787878;
  }
`

const ColorH3 = styled.h3`
  grid-area: ${({ color }) => {
    switch (color) {
      case "stakingGold":
        return "solo-title"
      case "stakingGreen":
        return "saas-title"
      case "stakingBlue":
        return "pool-title"
      default:
        return ""
    }
  }};
  color: ${({ theme, color }) => theme.colors[color]};
`

const ButtonContaier = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const StyledButtonLink = styled(ButtonLink)`
  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
    width: 100%;
  }
`

const StyledCard = styled(Card)`
  justify-content: flex-start;
  h3 {
    font-weight: 700;
    margin: 0 0 1rem;
  }
`

const benefits = [
  {
    title: "Earn rewards",
    emoji: "💰",
    description:
      "Rewards are given for actions that help the network reach consensus. You'll get rewards for batching transactions into a new block or checking the work of other validators because that's what keeps the chain running securely.",
  },
  {
    title: "Better security",
    emoji: ":shield:",
    description:
      "The network gets stronger against attacks as more ETH is staked, as it then requires more ETH to control a majority of the network. To become a threat, you would need to hold the majority of validators, which means you'd need to control the majority of ETH in the system–that's a lot!",
  },
  {
    title: "More sustainable",
    emoji: "🍃",
    description:
      "Stakers don't need energy-intensive computers in order to participate in a proof-of-stake system–just a home computer or smartphone. This will make Ethereum better for the environment.",
  },
]

const StakingPage = ({ data }) => {
  const intl = useIntl()

  const heroContent = {
    title: "How to stake your ETH",
    header: "Earn rewards while securing Ethereum",
    subtitle:
      "Staking is a public good for the Ethereum ecosystem. Any user with any amount of ETH can help secure the network and earn rewards in the process.",
    image: getImage(data.rhino),
    alt: translateMessageId("page-staking-image-alt", intl),
    buttons: [],
  }

  const dropdownLinks = {
    text: "Staking Options",
    ariaLabel: "Staking options dropdown menu",
    items: [
      {
        text: "Staking Home",
        to: "/staking/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked staking home",
        },
      },
      {
        text: "Solo staking",
        to: "/staking/solo/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked solo staking",
        },
      },
      {
        text: "Staking as a service",
        to: "/staking/saas/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked staking as a service",
        },
      },
      {
        text: "Pooled staking",
        to: "/staking/pools/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked pooled staking",
        },
      },
    ],
  }

  // TODO: use translateMessageId() for these strings
  const tocItems = {
    whatIsStaking: {
      id: "what-is-staking",
      title: "What is staking?",
    },
    whyStakeYourEth: {
      id: "why-stake-your-eth",
      title: "Why stake your ETH?",
    },
    howToStakeYourEth: {
      id: "how-to-stake-your-eth",
      title: "How to stake your ETH",
    },
    comparisonOfOptions: {
      id: "comparison-of-options",
      title: "Comparison of staking options",
    },
    joinTheCommunity: {
      id: "join-the-community",
      title: translateMessageId("page-staking-join-community", intl),
    },
    faq: {
      id: "faq",
      title: "FAQ",
    },
    further: {
      id: "further",
      title: "Further reading",
    },
  }

  const tocArray = Object.keys(tocItems).map((item) => tocItems[item])

  return (
    <PageContainer>
      <PageMetadata
        title={translateMessageId("page-staking-meta-title", intl)}
        description={translateMessageId("page-staking-meta-description", intl)}
      />
      <PageHero content={heroContent} />
      <StakingStatsBox />
      <Divider />
      <Page>
        <InfoColumn>
          <StyledButtonDropdown list={dropdownLinks} />
          <InfoTitle>Staking with Ethereum</InfoTitle>
          <StakingHomeTableOfContents items={tocArray} />
        </InfoColumn>
        <ContentContainer id="content">
          <Content>
            <h2 id={tocItems.whatIsStaking.id}>
              {tocItems.whatIsStaking.title}
            </h2>
            <p>
              Staking is the act of locking up ETH to give you the right to
              participate in block proposals on the network. Anyone who holds
              even a small amount of ETH can consider staking.
            </p>
            <p>
              <Link to="/get-eth/">Learn how to get ETH</Link>
            </p>
          </Content>
          <Content>
            <h2 id={tocItems.whyStakeYourEth.id}>
              {tocItems.whyStakeYourEth.title}
            </h2>
            <CardGrid>
              {benefits.map(({ title, description, emoji }, idx) => (
                <StyledCard title={title} emoji={emoji} key={idx}>
                  {description}
                </StyledCard>
              ))}
            </CardGrid>
          </Content>
          <Content>
            <h2 id={tocItems.howToStakeYourEth.id}>
              {tocItems.howToStakeYourEth.title}
            </h2>
            <p>
              It all depends on how much you are willing to stake. You'll need
              32 ETH to activate your own validator, but it is possible to stake
              less.
            </p>
            <p>
              Check out the options below and go for the one that is best for
              you, and for the network.
            </p>
          </Content>
          <StakingHierarchy />
          <Content>
            <p style={{ marginTop: "1rem" }}>
              As you may have noticed, there are many ways to participate in
              Ethereum staking. These paths target a wide range of users, and
              ultimately are each unique and vary in terms of risks, rewards,
              and trust assumptions. Some of them are more decentralized,
              battle-tested and/or risky than others. We provide some
              information on popular projects in the space, but{" "}
              <em>always do your own research</em> before sending ETH anywhere.
            </p>
          </Content>
          <Divider />
          <Content>
            <h2 id={tocItems.comparisonOfOptions.id}>
              {tocItems.comparisonOfOptions.title}
            </h2>
            <p>
              There is no one-size-fits-all solution for staking, and each is
              unique. Here we'll compare some of the risks, rewards and
              requirements of the different ways you can stake.
            </p>
            <ComparisonGrid>
              <ColorH3 color="stakingGold">Solo staking</ColorH3>
              <div
                style={{
                  gridArea: "solo-rewards",
                  borderBottom: "1px solid #3335",
                }}
              >
                <h4>Rewards</h4>
                <ul>
                  <li>
                    Maximum rewards - receive full rewards directly from the
                    protocol
                  </li>
                  <li>
                    You'll get rewards for batching transactions into a new
                    block or checking the work of other validators to keep the
                    chain running securely
                  </li>
                  <li>
                    After The Merge you'll receive unburnt transaction fees for
                    blocks you propose
                  </li>
                </ul>
              </div>
              <div
                style={{
                  gridArea: "solo-risks",
                  borderBottom: "1px solid #3335",
                }}
              >
                <h4>Risks</h4>
                <ul>
                  <li>Your ETH is at stake</li>
                  <li>
                    There are penalties, which cost ETH, for going offline
                  </li>
                  <li>
                    Malicious behavior can result in "slashing" of larger
                    amounts of ETH and forced ejection from the network
                  </li>
                </ul>
              </div>
              <div style={{ gridArea: "solo-reqs" }}>
                <h4>Requirements</h4>
                <ul>
                  <li>You must deposit 32 ETH</li>
                  <li>
                    Maintain hardware that runs both an Ethereum execution
                    client and consensus client while connected to the internet
                  </li>
                  <li>
                    The{" "}
                    <Link to="https://prater.launchpad.ethereum.org">
                      Staking Launchpad
                    </Link>{" "}
                    will walk you through the process and hardware requirements
                  </li>
                </ul>
              </div>
              <div style={{ gridArea: "solo-cta" }}>
                <StyledButtonLink
                  onClick={() => {
                    trackCustomEvent({
                      eventCategory: `Staking Comparison`,
                      eventAction: `Clicked`,
                      eventName: "clicked solo staking",
                    })
                  }}
                  to="/staking/solo/"
                >
                  More on solo staking
                </StyledButtonLink>
              </div>
              <ColorH3 color="stakingGreen">Staking as a service</ColorH3>
              <div
                style={{
                  gridArea: "saas-rewards",
                  borderBottom: "1px solid #3335",
                }}
              >
                <h4>Rewards</h4>
                <ul>
                  <li>
                    Usually involves full protocol rewards minus monthly fee for
                    node operations
                  </li>
                  <li>
                    Dashboards often available to easily track your validator
                    client
                  </li>
                </ul>
              </div>
              <div
                style={{
                  gridArea: "saas-risks",
                  borderBottom: "1px solid #3335",
                }}
              >
                <h4>Risks</h4>
                <ul>
                  <li>
                    Same risks as solo staking plus counter-party risk of
                    service provider
                  </li>
                  <li>
                    Use of your signing keys is entrusted to someone else who
                    could behave maliciously
                  </li>
                </ul>
              </div>
              <div style={{ gridArea: "saas-reqs" }}>
                <h4>Requirements</h4>
                <ul>
                  <li>Deposit 32 ETH and generate your keys with assistance</li>
                  <li>Store your keys securely</li>
                  <li>
                    The rest is taken care of, though specific services will
                    vary
                  </li>
                </ul>
              </div>
              <div style={{ gridArea: "saas-cta" }}>
                <StyledButtonLink
                  onClick={() => {
                    trackCustomEvent({
                      eventCategory: `Staking Comparison`,
                      eventAction: `Clicked`,
                      eventName: "clicked staking as a service",
                    })
                  }}
                  to="/staking/saas"
                >
                  More on staking as a service
                </StyledButtonLink>
              </div>

              <ColorH3 color="stakingBlue">Pooled staking</ColorH3>
              <div
                style={{
                  gridArea: "pool-rewards",
                  borderBottom: "1px solid #3335",
                }}
              >
                <h4>Rewards</h4>
                <ul>
                  <li>
                    Pooled stakers accrue rewards differently, depending on
                    which method of pooled staking chosen
                  </li>
                  <li>
                    Many pooled staking services offer one or more liquidity
                    tokens that represents your staked ETH plus your share of
                    the validator rewards
                  </li>
                  <li>
                    Liquidity tokens can be held in your own wallet, used in
                    DeFi and sold if you decide to exit
                  </li>
                </ul>
              </div>
              <div
                style={{
                  gridArea: "pool-risks",
                  borderBottom: "1px solid #3335",
                }}
              >
                <h4>Risks</h4>
                <ul>
                  <li>Risks vary depending on the method used</li>
                  <li>
                    In general, risks consist of a combination of counter-party,
                    smart contract and execution risk
                  </li>
                </ul>
              </div>
              <div style={{ gridArea: "pool-reqs" }}>
                <h4>Requirements</h4>
                <ul>
                  <li>
                    Lowest ETH requirements, some projects require as little as
                    0.01 ETH
                  </li>
                  <li>
                    Deposit directly from your wallet to different pooled
                    staking platforms or simply trade for one of the staking
                    liquidity tokens
                  </li>
                </ul>
              </div>
              <div style={{ gridArea: "pool-cta" }}>
                <StyledButtonLink
                  onClick={() => {
                    trackCustomEvent({
                      eventCategory: `Staking Comparison`,
                      eventAction: `Clicked`,
                      eventName: "clicked pooled staking",
                    })
                  }}
                  to="/staking/pools/"
                >
                  More on pooled staking
                </StyledButtonLink>
              </div>
            </ComparisonGrid>
          </Content>
          <Divider />
          <StakingCommunityCallout id={tocItems.joinTheCommunity.id} />
          <Content>
            {/* TODO: FAQ completion */}
            <h2 id={tocItems.faq.id}>{tocItems.faq.title}</h2>
            <ExpandableCard title="How do I withdraw my stake?">
              <p>Lorem ipsum...</p>
            </ExpandableCard>
            <ExpandableCard title="How are the staking rewards calculated?">
              <p>Lorem ipsum...</p>
            </ExpandableCard>
          </Content>
          <Content>
            <h2 id={tocItems.further.id}>{tocItems.further.title}</h2>
            <ul>
              <li>
                <Link to="https://vitalik.ca/general/2020/11/06/pos2020.html">
                  Why Proof of Stake (Nov 2020)
                </Link>{" "}
                <i>- Vitalik Buterin </i>
              </li>
              <li>
                <Link to="https://vitalik.ca/general/2017/12/31/pos_faq.html">
                  Proof of Stake FAQ (Dec 2017)
                </Link>{" "}
                <i>- Vitalik Buterin</i>
              </li>
              <li>
                <Link to="https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_220225">
                  What’s New in Eth2 (Feb 2022)
                </Link>{" "}
                <i>- Ben Edgington</i>
              </li>
              <li>
                <Link to="https://blog.ethereum.org/2022/01/31/finalized-no-33/">
                  Finalized no. 33, the Ethereum consensus-layer (Jan 2022)
                </Link>{" "}
                <i>- Danny Ryan</i>
              </li>
              <li>
                <Link to="https://www.attestant.io/posts/page/4/">
                  Attestant posts on proof-of-stake
                </Link>
              </li>
              <li>
                <Link to="/upgrades/merge/">More on The Merge</Link>
              </li>
            </ul>
          </Content>
          <Content>
            <FeedbackCard />
          </Content>
        </ContentContainer>
        <MobileButton>
          <MobileButtonDropdown list={dropdownLinks} />
        </MobileButton>
      </Page>
    </PageContainer>
  )
}

export default StakingPage

export const query = graphql`
  {
    rhino: file(relativePath: { eq: "upgrades/upgrade_rhino.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 500
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
