import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

import { translateMessageId } from "../../utils/translations"
import Translation from "../../components/Translation"
import Card from "../../components/Card"
import Link from "../../components/Link"
import Emoji from "../../components/Emoji"
import Trilemma from "../../components/Trilemma"

import Breadcrumbs from "../../components/Breadcrumbs"
import ButtonLink from "../../components/ButtonLink"
import PageMetadata from "../../components/PageMetadata"
import {
  CardContainer,
  Content,
  Page,
  Divider,
  Eth2Header,
  Eth2HeaderGradient,
} from "../../components/SharedStyledComponents"

const HeroContainer = styled.div`
  padding-left: 4rem;
  padding-right: 2rem;
  padding-top: 8rem;
  padding-bottom: 8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 6rem;
    padding-left: 2rem;
    padding-bottom: 4rem;
  }
`

const HeroCard = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 4rem;
  border-radius: 2px;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    margin-right: -2rem;
    margin-left: -2rem;
    margin-top: -2rem;
  }
`

const Hero = styled(Img)`
  flex: 1 1 50%;
  max-width: 500px;
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 3rem;
  margin-right: 3rem;
  align-self: center;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-top: 0;
    margin-right: 0;
  }
`

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 14px;
  color: ${(props) => props.theme.colors.text300};
`

const Subtitle = styled.div`
  font-size: 24px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  max-width: 480px;
  margin-top: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 20px;
  }
`

const StyledCardContainer = styled(CardContainer)`
  margin-top: 2rem;
  margin-bottom: 3rem;
`

const H2 = styled.h2`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
`

const CenterH2 = styled(H2)`
  text-align: center;
  margin-bottom: 2rem;
`

const CentreCard = styled(Card)`
  flex: 1 1 30%;
  min-width: 240px;
  margin: 1rem;
  padding: 1.5rem;
  border: 0px;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
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

const CentralContent = styled.div`
  margin: 0rem 12rem;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 0rem 0rem;
  }
`

const TrilemmaContent = styled.div`
  width: 100%;
  margin: 2rem 0;
  background: ${(props) => props.theme.colors.cardGradient};
  padding: 2rem;
`

const StyledBreadcrumbs = styled(Breadcrumbs)`
  justify-content: center;
`

const paths = [
  {
    emoji: ":vertical_traffic_light:",
    title: <Translation id="page-eth2-vision-title-1" />,
    description: <Translation id="page-eth2-vision-desc-1" />,
  },
  {
    emoji: ":minidisc:",
    title: <Translation id="page-eth2-vision-title-2" />,
    description: <Translation id="page-eth2-vision-desc-2" />,
  },
  {
    emoji: ":high_voltage_sign:",
    title: <Translation id="page-eth2-vision-title-3" />,
    description: <Translation id="page-eth2-vision-desc-3" />,
  },
]

const upgrades = [
  {
    emoji: ":police_car_light:",
    title: <Translation id="page-eth2-vision-beacon-chain" />,
    description: <Translation id="page-eth2-vision-beacon-chain-desc" />,
    url: "/eth2/beacon-chain/",
    button: <Translation id="page-eth2-vision-beacon-chain-btn" />,
    date: <Translation id="page-eth2-vision-beacon-chain-date" />,
  },
  {
    emoji: ":chains:",
    title: <Translation id="page-eth2-shard-title" />,
    description: <Translation id="page-eth2-vision-shard-desc-4" />,
    url: "/eth2/shard-chains/",
    button: <Translation id="page-eth2-shard-button" />,
    date: <Translation id="page-eth2-vision-shard-date" />,
  },
  {
    emoji: ":ship:",
    title: <Translation id="page-eth2-docking" />,
    description: <Translation id="page-eth2-vision-docking-desc" />,
    url: "/eth2/docking/",
    button: <Translation id="page-eth2-docking-btn" />,
    date: <Translation id="page-eth2-vision-docking-date" />,
  },
]

const VisionPage = ({ data, location }) => {
  const intl = useIntl()

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-eth2-vision-meta-title", intl)}
        description={translateMessageId("page-eth2-vision-meta-desc", intl)}
      />
      <Content>
        <HeroCard>
          <HeroContainer>
            <Title>
              <Translation id="page-eth2-vision-title" />
            </Title>
            <Eth2Header>
              <Eth2HeaderGradient>
                <Translation id="page-eth2-vision-future" />
              </Eth2HeaderGradient>{" "}
              <Translation id="page-eth2-vision-global" />
            </Eth2Header>
            <Subtitle>
              <Translation id="page-eth2-vision-subtitle" />
            </Subtitle>
          </HeroContainer>
          <Hero fluid={data.eth.childImageSharp.fluid} />
        </HeroCard>
        <StyledBreadcrumbs slug={location.pathname} startDepth={1} />
        <CentralContent>
          <CenterH2>
            <Translation id="page-eth2-vision-upgrade-needs" />
          </CenterH2>
          <p>
            <Translation id="page-eth2-vision-upgrade-needs-desc" />
          </p>
          <p>
            <Translation id="page-eth2-vision-upgrade-needs-desc-2" />
          </p>
          <p>
            <Translation id="page-eth2-vision-upgrade-needs-desc-3" />{" "}
          </p>
          <ul>
            <li>
              <Link to="https://blog.ethereum.org/2015/03/03/ethereum-launch-process/">
                <Translation id="page-eth2-vision-upgrade-needs-serenity" />
              </Link>
            </li>
            <li>
              <Link to="https://blog.ethereum.org/2014/01/15/slasher-a-punitive-proof-of-stake-algorithm/">
                <Translation id="page-eth2-vision-2014" />
              </Link>
            </li>
          </ul>
          <p>
            <Translation id="page-eth2-vision-uprade-needs-desc-5" />
          </p>
          <p>
            <Translation id="page-eth2-vision-upgrade-needs-desc-6" />
          </p>
        </CentralContent>
      </Content>
      <Divider />
      <Content>
        <CenterH2>
          <Translation id="page-eth2-vision-problems" />
        </CenterH2>
        <CardContainer>
          {paths.map((path, idx) => {
            return (
              <CentreCard
                key={idx}
                emoji={path.emoji}
                title={path.title}
                description={path.description}
              />
            )
          })}
        </CardContainer>
      </Content>
      <TrilemmaContent>
        <Trilemma />
      </TrilemmaContent>
      <Divider />
      <Content>
        <CentralContent>
          <CenterH2>
            <Translation id="page-eth2-vision-understanding" />
          </CenterH2>
          <h3>
            <Translation id="page-eth2-vision-scalability" />{" "}
            <Emoji text=":rocket:" />
          </h3>
          <p>
            <Translation id="page-eth2-vision-scalability-desc" />{" "}
            <Link to="/developers/docs/nodes-and-clients/#what-are-nodes-and-clients">
              <Translation id="page-eth2-vision-nodes" />
            </Link>{" "}
            <Translation id="page-eth2-vision-scalability-desc-2" />{" "}
          </p>
          <p>
            <Translation id="page-eth2-vision-the" />{" "}
            <Link to="/eth2/shard-chains/">
              <Translation id="page-eth2-vision-shard-upgrade" />
            </Link>{" "}
            <Translation id="page-eth2-vision-scalability-desc-3" />{" "}
          </p>
          <p>
            <Translation id="page-eth2-vision-scalability-desc-4" />
          </p>
          <h3>
            <Translation id="page-eth2-vision-security" />{" "}
            <Emoji text=":shield:" />
          </h3>
          <p>
            <Translation id="page-eth2-vision-security-desc" />
          </p>
          <p>
            <Translation id="page-eth2-vision-security-desc-3" />{" "}
            <Link to="/developers/docs/consensus-mechanisms/pos/">
              <Translation id="page-eth2-proof-stake-link" />
            </Link>{" "}
          </p>
          <p>
            <Translation id="page-eth2-vision-security-desc-5" />{" "}
            <Link to="/developers/docs/consensus-mechanisms/pow/">
              <Translation id="page-eth2-vision-security-desc-5-link" />
            </Link>
          </p>
          <p>
            <Translation id="page-eth2-vision-security-desc-8" />
          </p>
          <ul>
            <li>
              <Link to="/eth2/beacon-chain/">
                <Translation id="page-eth2-beacon-chain-btn" />
              </Link>
            </li>
            <li>
              <Link to="/eth2/shard-chains/">
                <Translation id="page-eth2-shard-lower" />
              </Link>
            </li>
          </ul>
          <p>
            <Translation id="page-eth2-vision-security-desc-9" />
          </p>
          <p>
            <Translation id="page-eth2-vision-security-desc-10" />{" "}
            <Link to="/developers/docs/nodes-and-clients/">
              <Translation id="page-eth2-vision-ethereum-node" />
            </Link>
          </p>
          <p>
            <Translation id="page-eth2-vision-security-validator" />
          </p>
          <ButtonLink to="/eth2/staking/">
            <Translation id="page-eth2-vision-security-staking" />
          </ButtonLink>
          <h3>
            <Translation id="page-eth2-vision-sustainability" />{" "}
            <Emoji text=":evergreen_tree:" />
          </h3>
          <p>
            <Translation id="page-eth2-vision-sustainability-subtitle" />
          </p>
          <p>
            <Translation id="page-eth2-vision-sustainability-desc-1" />{" "}
            <Link to="/developers/docs/consensus-mechanisms/pow/mining/">
              <Translation id="page-eth2-vision-mining" />
            </Link>
            <Translation id="page-eth2-vision-sustainability-desc-2" />{" "}
            <Link to="/eth2/staking/">
              <Translation id="page-eth2-vision-staking-lower" />
            </Link>{" "}
            <Translation id="page-get-eth-and" />{" "}
            <Link to="/developers/docs/consensus-mechanisms/pos/">
              <Translation id="page-eth2-proof-of-stake" />
            </Link>
            .
          </p>
          <p>
            <Translation id="page-eth2-vision-sustainability-desc-3" />{" "}
            <Link to="/eth2/beacon-chain/">
              <Translation id="page-eth2-vision-the-beacon-chain" />
            </Link>
            <Translation id="page-eth2-vision-sustainability-desc-4" />{" "}
            <Link to="/eth2/docking/">
              <Translation id="page-eth2-vision-sustainability-docks" />
            </Link>
            <Translation id="page-eth2-vision-sustainability-desc-5" />{" "}
            <Link to="/eth2/shard-chains/">
              <Translation id="page-eth2-vision-shards" />
            </Link>{" "}
            <Translation id="page-eth2-vision-sustainability-desc-6" />{" "}
            <Link to="/dapps">
              <Translation id="page-eth2-vision-dapps" />
            </Link>
            <Translation id="page-eth2-vision-sustainability-desc-7" />{" "}
            <Link to="/developers/docs/consensus-mechanisms/pow/">
              <Translation id="page-eth2-proof-of-work" />
            </Link>{" "}
            <Translation id="page-eth2-vision-secured" />{" "}
            <Link to="/glossary/#mainnet">
              <Translation id="page-eth2-docking-mainnet" />
            </Link>
            .{" "}
          </p>
          <p>
            <Translation id="page-eth2-vision-sustainability-desc-8" />{" "}
            <Link to="/eth2/docking/">
              <Translation id="page-eth2-vision-docking-mainnet" />
            </Link>
            <Translation id="page-eth2-vision-sustainability-desc-9" />{" "}
          </p>
        </CentralContent>
      </Content>
      <Divider />
      <Content>
        <H2>
          <Translation id="page-eth2-vision-explore-upgrades" />
        </H2>
        <StyledCardContainer>
          {upgrades.map((upgrade, idx) => {
            return (
              <StyledCard
                key={idx}
                emoji={upgrade.emoji}
                title={upgrade.title}
                description={upgrade.description}
              >
                <h6>{upgrade.date}</h6>
                <ButtonLink to={upgrade.url}>{upgrade.button}</ButtonLink>
              </StyledCard>
            )
          })}
        </StyledCardContainer>
      </Content>
    </Page>
  )
}

export default VisionPage

export const query = graphql`
  query {
    eth: file(relativePath: { eq: "eth2/eth2_eth.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    rhino: file(relativePath: { eq: "eth2/eth2_rhino.png" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
