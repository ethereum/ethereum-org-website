import React, { useState } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { getImage } from "gatsby-plugin-image"

import { translateMessageId } from "../../utils/translations"
import Translation from "../../components/Translation"
import Breadcrumbs from "../../components/Breadcrumbs"
import ButtonLink from "../../components/ButtonLink"
import Card from "../../components/Card"
import Emoji from "../../components/Emoji"
import GhostCard from "../../components/GhostCard"
import PageHero from "../../components/PageHero"
import InfoBanner from "../../components/InfoBanner"
import CalloutBanner from "../../components/CalloutBanner"
import Link from "../../components/Link"
import StakingStatsBox from "../../components/StakingStatsBox"
import PageMetadata from "../../components/PageMetadata"
import StakingHierarchy from "../../components/StakingHierarchy"
import {
  CardContainer,
  CardGrid,
  Content,
  Page,
  Divider,
} from "../../components/SharedStyledComponents"

const StyledCallout = styled(CalloutBanner)`
  margin-left: 0rem;
  margin-right: 0rem;
`

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const H2 = styled.h2`
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  margin-top: 0.5rem;
`

const H3 = styled.h3`
  margin-top: 0rem;
`

const Column = styled.div`
  flex: 1 1 33%;
  margin-bottom: 1.5rem;
  margin-right: 2rem;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-right: 0rem;
    margin-left: 0rem;
  }
`

const StyledCard = styled(Card)`
  flex: 1 1 30%;
  min-width: 240px;
  margin: 1rem;
  padding: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
  }
`

const BoxText = styled.div`
  font-size: 1.25rem;
`

const Box = styled.div`
  padding: 1.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  margin: 2rem 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin: 2rem 0;
  }
`

const Vision = styled.div`
  margin-top: 4rem;
`

const OptionContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column;
  }
`

const Option = styled.div`
  border-radius: 32px;
  border: 1px solid
    ${(props) =>
      props.isActive ? props.theme.colors.primary : props.theme.colors.text};
  color: ${(props) =>
    props.isActive ? props.theme.colors.primary : props.theme.colors.text};
  box-shadow: ${(props) =>
    props.isActive ? props.theme.colors.tableBoxShadow : `none`};
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  margin: 0.5rem;
  cursor: pointer;
`

const OptionText = styled.div`
  font-size: 1.5rem;
  line-height: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 1rem;
    font-weight: 600;
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
  gap: 1rem;
  grid-auto-rows: minmax(64px, auto);
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    "solo-title saas-title pool-title"
    "solo-rewards saas-rewards pool-rewards"
    "solo-risks saas-risks pool-risks"
    "solo-reqs saas-reqs pool-reqs"
    "solo-cta saas-cta pool-cta";

  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      "solo-title saas-title"
      "solo-rewards saas-rewards"
      "solo-risks saas-risks"
      "solo-reqs saas-reqs"
      "solo-cta saas-cta"
      "pool-title ."
      "pool-rewards ."
      "pool-risks ."
      "pool-reqs ."
      "pool-cta .";
  }

  @media (max-width: 600px) {
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
`

const ComparisonColumn = styled.div`
  h2 {
    color: ${({ color }) => color};
  }
`

const paths = [
  {
    emoji: ":money_with_wings:",
    title: <Translation id="page-staking-title-1" />,
    description: <Translation id="page-staking-desc-1" />,
  },
  {
    emoji: ":warning:",
    title: <Translation id="page-staking-title-2" />,
    description: <Translation id="page-staking-desc-2" />,
  },
  {
    emoji: ":clipboard:",
    title: <Translation id="page-staking-title-3" />,
    description: <Translation id="page-staking-desc-3" />,
    url: "/developers/docs/apis/backend/#available-libraries",
    link: <Translation id="page-staking-link-1" />,
  },
]

const benefits = [
  {
    title: "More sustainable",
    description:
      "Stakers don't need energy-intensive computers in order to participate in a proof-of-stake system–just a laptop or smartphone. This will make Ethereum better for the environment.",
  },
  {
    title: "Better security",
    description:
      "The network gets stronger against attacks as more ETH is staked, as it then requires more ETH to control a majority of the network. To become a threat, you would need to hold the majority of validators, which means you'd need to control the majority of ETH in the system–that's a lot!",
  },
  {
    title: "Earn rewards",
    description:
      "Rewards are given for actions that help the network reach consensus. You'll get rewards for batching transactions into a new block or checking the work of other validators because that's what keeps the chain running securely.",
  },
]
const StakingPage = ({ data, location }) => {
  const intl = useIntl()
  const [isSoloStaking, setIsSoloStaking] = useState(true)

  const heroContent = {
    title: "How to stake your ETH",
    header: "Stake your ETH to earn rewards while securing Ethereum",
    subtitle:
      "Staking is a public good for the Ethereum ecosystem. Any user with any amount of ETH can help secure the network and earn rewards in the process.",
    image: getImage(data.rhino),
    alt: translateMessageId("page-staking-image-alt", intl),
    buttons: [],
  }

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-staking-meta-title", intl)}
        description={translateMessageId("page-staking-meta-description", intl)}
      />
      <PageHero content={heroContent} />
      <StakingStatsBox />
      <Divider />
      <Content>
        <h2>What is staking?</h2>
        <p>
          Staking is the act of locking up ETH to give you the right to
          participate in block proposals on the network. Anyone who holds even a
          small amount of ETH can consider staking.
        </p>
      </Content>
      <Content>
        <h2>Why solo stake your ETH?</h2>
        <CardGrid>
          {benefits.map(({ title, description }) => (
            <Card title={title}>{description}</Card>
          ))}
        </CardGrid>
      </Content>
      <Content>
        <h2>How to stake ETH?</h2>
        <p>
          It all depends on how much you are willing to stake. You'll need
          32 ETH to activate your own validator, but it is possible to stake
          less.
        </p>
        <p>
          Check out the options below and go for the one that is best for you,
          and for the network.
        </p>
      </Content>
      <Content>
        <StakingHierarchy />
        <p>
          Given the number of these unique solutions, they vary in terms of
          risks, rewards, and trust assumptions. Some of them are more
          decentralized, battle-tested and/or risky than others. We'll provide
          some information on popular projects in the space, but{" "}
          <em>always do your own research</em> before sending ETH anywhere.
        </p>
      </Content>
      <Divider />
      <Content>
        <h2>Comparison of staking options</h2>
        <p>
          There is no one-size-fits-all solution for staking, and each is
          unique. Here we'll compare some of the risks, rewards and requirements
          of the different ways you can stake.
        </p>

        <ComparisonGrid>
          <h3 style={{ gridArea: "solo-title", color: "#F2BB2F" }}>
            Solo staking
          </h3>
          <div
            style={{
              gridArea: "solo-rewards",
              borderBottom: "1px solid #3335",
            }}
          >
            <h4>Rewards</h4>
            <ul>
              <li>
                Receive rewards directly from the protocol for actions that help
                the network reach consensus.
              </li>
              <li>
                You'll get rewards for batching transactions into a new block or
                checking the work of other validators to keep the chain running
                securely.
              </li>
            </ul>
          </div>
          <div
            style={{ gridArea: "solo-risks", borderBottom: "1px solid #3335" }}
          >
            <h4>Risks</h4>
            <ul>
              <li>Your ETH is at stake.</li>
              <li>There are penalties, which cost ETH, for going offline.</li>
              <li>
                Malicious behavior can result in “slashing” of larger amounts of
                ETH and forced ejection from the network.
              </li>
            </ul>
          </div>
          <div style={{ gridArea: "solo-reqs" }}>
            <h4>Requirements</h4>
            <ul>
              <li>You must deposit 32 ETH.</li>
              <li>
                Maintain hardware that runs both an Ethereum execution client
                and consensus client while connected to the internet.
              </li>
              <li>
                The{" "}
                <Link to="https://prater.launchpad.ethereum.org">
                  Staking Launchpad
                </Link>{" "}
                will walk you through the process and hardware requirements.
              </li>
            </ul>
          </div>
          <div style={{ gridArea: "solo-cta" }}>
            <ButtonLink to="/staking/solo">More on solo staking</ButtonLink>
          </div>

          <h3 style={{ gridArea: "saas-title", color: "#49DE96" }}>
            Staking as a service
          </h3>
          <div
            style={{
              gridArea: "saas-rewards",
              borderBottom: "1px solid #3335",
            }}
          >
            <h4>Rewards</h4>
            <ul>
              <li>
                Usually involved full protocol rewards minus monthly fee for
                node operations.
              </li>
              <li>
                Dashboards often available to easily track your validator
                client.
              </li>
            </ul>
          </div>
          <div
            style={{ gridArea: "saas-risks", borderBottom: "1px solid #3335" }}
          >
            <h4>Risks</h4>
            <ul>
              <li>
                Subject to same risks as solo staking plus counter-party risk of
                service provider.
              </li>
              <li>
                Your ETH is at stake, and safe use of your signing keys is
                entrusted to someone else who could behave maliciously.
              </li>
            </ul>
          </div>
          <div style={{ gridArea: "saas-reqs" }}>
            <h4>Requirements</h4>
            <ul>
              <li>Deposit 32 ETH and generate your keys with assistance.</li>
              <li>Store your keys securely.</li>
              <li>
                The rest is taken care of, though specific services will vary.
              </li>
            </ul>
          </div>
          <div style={{ gridArea: "saas-cta" }}>
            <ButtonLink to="/staking/saas">
              More on staking as a service
            </ButtonLink>
          </div>

          <h3 style={{ gridArea: "pool-title", color: "#A9D3F2" }}>
            Pooled staking
          </h3>
          <div
            style={{
              gridArea: "pool-rewards",
              borderBottom: "1px solid #3335",
            }}
          >
            <h4>Rewards</h4>
            <ul>
              <li>
                Pooled stakers accrue rewards differently, depending on which
                method of pooled staking chosen.
              </li>
              <li>
                Many pooled staking services offer one or more liquidity tokens
                that represents your staked ETH plus your share of the validator
                rewards.
              </li>
              <li>
                Liquidity tokens can be held in your own wallet, used in defi
                and sold if you decide to exit.
              </li>
            </ul>
          </div>
          <div
            style={{ gridArea: "pool-risks", borderBottom: "1px solid #3335" }}
          >
            <h4>Risks</h4>
            <ul>
              <li>
                The risks to pooled staking vary depending on the method used.
              </li>
              <li>
                In general risks consist of a combination of counter-party,
                smart contract and execution risk.
              </li>
            </ul>
          </div>
          <div style={{ gridArea: "pool-reqs" }}>
            <h4>Requirements</h4>
            <ul>
              <li>
                To join a pool, you will need to have some ETH in your own
                wallet.
              </li>
              <li>
                From there you can deposit directly to different pooled staking
                platforms, or you can simply trade for one of the staking
                liquidity tokens.
              </li>
            </ul>
          </div>
          <div style={{ gridArea: "pool-cta" }}>
            <ButtonLink to="/staking/pools/">More on pooled staking</ButtonLink>
          </div>
        </ComparisonGrid>
      </Content>
      <Divider />
      <StyledCallout
        image={getImage(data.community)}
        alt={translateMessageId("page-staking-image-alt", intl)}
        titleKey={"page-staking-join-community"}
        descriptionKey={"page-staking-join-community-desc"}
      >
        <div style={{ display: "flex", gap: "1rem" }}>
          <ButtonLink to="https://discord.io/ethstaker">
            Join Discord
          </ButtonLink>
          <ButtonLink to="https://reddit.com/r/ethstaker">
            Join Reddit
          </ButtonLink>
          <ButtonLink to="https://ethstaker.cc">Visit Website</ButtonLink>
        </div>
      </StyledCallout>
      <Content>
        {/* TODO: Select FAQs, and answer them */}
        <h2>FAQs of staking</h2>
        <ul>
          <li>How do I withdraw my stake?</li>
          <li>How are the staking rewards calculated?</li>
          <li>More on staking economics</li>
        </ul>
      </Content>
    </Page>
  )
}

export default StakingPage

export const query = graphql`
  {
    community: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 500
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
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
