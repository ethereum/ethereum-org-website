import React from "react"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { getImage } from "gatsby-plugin-image"
import styled from "styled-components"

import ButtonDropdown from "../../components/ButtonDropdown"
import ButtonLink from "../../components/ButtonLink"
import Card from "../../components/Card"
import Link from "../../components/Link"
import PageHero from "../../components/PageHero"
import PageMetadata from "../../components/PageMetadata"
import Translation from "../../components/Translation"
import {
  Content,
  Page as PageContainer,
  Divider,
  OptionContainer,
  Option,
  OptionText,
} from "../../components/SharedStyledComponents"
import FeedbackCard from "../../components/FeedbackCard"
import ExpandableCard from "../../components/ExpandableCard"
import StakingStatsBox from "../../components/Staking/StakingStatsBox"
import StakingHierarchy from "../../components/Staking/StakingHierarchy"
import StakingHomeTableOfContents from "../../components/Staking/StakingHomeTableOfContents"
import StakingCommunityCallout from "../../components/Staking/StakingCommunityCallout"

import { translateMessageId } from "../../utils/translations"

const HeroStatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.layer2Gradient};
  padding-bottom: 2rem;
`

const Page = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto 4rem;

  padding-top: 4rem;
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
  display: none;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: block;
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

const StakeContainer = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.breakpoints.m};
  display: flex;
  flex-direction: column;
  text-align: center;
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

const StyledButtonLink = styled(ButtonLink)`
  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
    width: 100%;
  }
`

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: 1fr;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    grid-template-columns: 1fr;
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
      "Rewards are given for actions that help the network reach consensus. You'll get rewards for running software that properly batches transactions into new blocks and checks the work of other validators because that's what keeps the chain running securely.",
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
      "Stakers don't need energy-intensive computers to participate in a proof-of-stake system–just a home computer or smartphone. This will make Ethereum better for the environment.",
    linkText: "More on Ethereum's energy consumption",
    to: "/energy-consumption",
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
        text: "Staking home",
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
      <HeroStatsWrapper>
        <PageHero content={heroContent} />
        <StakingStatsBox />
      </HeroStatsWrapper>
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
              {benefits.map(
                ({ title, description, emoji, linkText, to }, idx) => (
                  <StyledCard
                    title={title}
                    emoji={emoji}
                    key={idx}
                    description={description}
                  >
                    {to && <Link to={to}>{linkText}</Link>}
                  </StyledCard>
                )
              )}
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
              Ethereum staking. These paths target a wide range of users and
              ultimately are each unique and vary in terms of risks, rewards,
              and trust assumptions. Some are more decentralized, battle-tested
              and/or risky than others. We provide some information on popular
              projects in the space, but <em>always do your own research</em>{" "}
              before sending ETH anywhere.
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
                <StyledButtonLink to="/staking/solo/">
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
                <StyledButtonLink to="/staking/saas">
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
                <StyledButtonLink to="/staking/pools/">
                  More on pooled staking
                </StyledButtonLink>
              </div>
            </ComparisonGrid>
          </Content>
          <Divider />
          <StakingCommunityCallout id={tocItems.joinTheCommunity.id} />
          <Content>
            <h2 id={tocItems.faq.id}>{tocItems.faq.title}</h2>
            <ExpandableCard title="What is a validator?">
              A <em>validator</em> is a virtual entity that lives on the Beacon
              Chain and participates in the consensus of the Ethereum protocol.
              Validators are represented by a balance, public key, and other
              properties. A <em>validator client</em> is the software that acts
              on behalf of the validator by holding and using its private key. A
              single validator client can hold many key pairs, controlling many
              validators.
            </ExpandableCard>
            <ExpandableCard title="Why do I need to have funds at stake?">
              A validator has the ability to propose and attest to blocks for
              the network. To prevent dishonest behavior, users must have their
              funds at stake. This allows the protocol to penalize malicious
              actors. Staking is a means to keep you honest, as your actions
              will have financial consequences.
            </ExpandableCard>
            <ExpandableCard title="Can I buy 'Eth2'?">
              <p>
                There is no 'Eth2' token native to the protocol, as the native
                token ether (ETH) will not change with the transition to
                proof-of-stake.
              </p>
              <p>
                There are derivative tokens/tickers that may represent staked
                ETH (ie. rETH from Rocket Pool, stETH from Lido, ETH2 from
                Coinbase). Learn more about{" "}
                <Link to="/staking/pools/">staking pools</Link>
              </p>
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
                <Link to="https://notes.ethereum.org/9l707paQQEeI-GPzVK02lA?view#">
                  Serenity Design Rationale
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
                <Link to="https://hackmd.io/@benjaminion/eth2_news">
                  Eth2 News
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
                <Link to="https://www.attestant.io/posts/">
                  Attestant Posts
                </Link>
              </li>
              <li>
                <Link to="https://kb.beaconcha.in/">
                  Beaconcha.in Knowledge Base
                </Link>
              </li>
              <li>
                <Link to="https://beaconcha.in/education">
                  Beaconcha.in Community-Contributed Educational Materials
                </Link>
              </li>
              <li>
                <Link to="https://launchpad.ethereum.org/en/faq">
                  Ethereum Staking Launchpad FAQ
                </Link>
              </li>
            </ul>
          </Content>
          <Content>
            <FeedbackCard prompt="Did this page help answer your question?" />
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
