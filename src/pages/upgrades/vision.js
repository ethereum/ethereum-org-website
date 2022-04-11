import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { getImage } from "gatsby-plugin-image"

import { translateMessageId } from "../../utils/translations"
import Translation from "../../components/Translation"
import Card from "../../components/Card"
import ActionCard from "../../components/ActionCard"
import Link from "../../components/Link"
import Emoji from "../../components/Emoji"
import Trilemma from "../../components/Trilemma"
import PageHero from "../../components/PageHero"
import Breadcrumbs from "../../components/Breadcrumbs"
import ButtonLink from "../../components/ButtonLink"
import PageMetadata from "../../components/PageMetadata"
import {
  CardContainer,
  Content,
  Page,
  Divider,
} from "../../components/SharedStyledComponents"

const StyledCardContainer = styled(CardContainer)`
  margin-top: 2rem;
  margin-bottom: 3rem;
`

const H2 = styled.h2`
  margin-top: 0;
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
    title: <Translation id="page-upgrades-vision-title-1" />,
    description: <Translation id="page-upgrades-vision-desc-1" />,
  },
  {
    emoji: ":minidisc:",
    title: <Translation id="page-upgrades-vision-title-2" />,
    description: <Translation id="page-upgrades-vision-desc-2" />,
  },
  {
    emoji: ":high_voltage_sign:",
    title: <Translation id="page-upgrades-vision-title-3" />,
    description: <Translation id="page-upgrades-vision-desc-3" />,
  },
]

const VisionPage = ({ data, location }) => {
  const intl = useIntl()

  const heroContent = {
    title: translateMessageId("page-upgrades-vision-title", intl),
    header: translateMessageId("page-upgrades-vision-future", intl),
    subtitle: translateMessageId("page-upgrades-vision-subtitle", intl),
    image: getImage(data.oldship),
    alt: translateMessageId("page-eth-whats-eth-hero-alt", intl),
  }

  const upgrades = [
    {
      image: getImage(data.beaconchain),
      title: <Translation id="page-upgrades-beacon-chain-title" />,
      description: <Translation id="page-upgrades-beacon-chain-desc" />,
      to: "/upgrades/beacon-chain/",
      date: <Translation id="page-upgrades-beacon-chain-estimate" />,
    },
    {
      image: getImage(data.themerge),
      title: <Translation id="page-upgrades-docking" />,
      description: <Translation id="page-upgrades-merge-desc" />,
      to: "/upgrades/merge/",
      date: <Translation id="page-upgrades-merge-estimate" />,
    },
    {
      image: getImage(data.shards),
      title: <Translation id="page-upgrades-shard-title" />,
      description: <Translation id="page-upgrades-shard-desc" />,
      to: "/upgrades/shard-chains/",
      date: <Translation id="page-upgrades-shard-estimate" />,
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-upgrades-vision-meta-title", intl)}
        description={translateMessageId("page-upgrades-vision-meta-desc", intl)}
      />
      <PageHero content={heroContent} />
      <Divider />
      <Content>
        <StyledBreadcrumbs slug={location.pathname} startDepth={1} />
        <CentralContent>
          <CenterH2>
            <Translation id="page-upgrades-vision-upgrade-needs" />
          </CenterH2>
          <p>
            <Translation id="page-upgrades-vision-upgrade-needs-desc" />
          </p>
          <p>
            <Translation id="page-upgrades-vision-upgrade-needs-desc-2" />
          </p>
          <p>
            <Translation id="page-upgrades-vision-upgrade-needs-desc-3" />{" "}
          </p>
          <ul>
            <li>
              <Link to="https://trent.mirror.xyz/82eyq_NXZzzqFmCNXiKJgSdayf6omCW7BgDQIneyPoA">
                <Translation id="page-upgrades-vision-2021-updates" />
              </Link>
            </li>
            <li>
              <Link to="https://tim.mirror.xyz/CHQtTJb1NDxCK41JpULL-zAJe7YOtw-m4UDw6KDju6c">
                <Translation id="page-upgrades-vision-2021" />
              </Link>
            </li>
            <li>
              <Link to="https://blog.ethereum.org/2015/03/03/ethereum-launch-process/">
                <Translation id="page-upgrades-vision-upgrade-needs-serenity" />
              </Link>
            </li>
            <li>
              <Link to="https://blog.ethereum.org/2014/01/15/slasher-a-punitive-proof-of-stake-algorithm/">
                <Translation id="page-upgrades-vision-2014" />
              </Link>
            </li>
          </ul>
          <p>
            <Translation id="page-upgrades-vision-upgrade-needs-desc-5" />
          </p>
          <p>
            <Translation id="page-upgrades-vision-upgrade-needs-desc-6" />
          </p>
        </CentralContent>
      </Content>
      <Divider />
      <Content>
        <CenterH2>
          <Translation id="page-upgrades-vision-problems" />
        </CenterH2>
        <CardContainer>
          {paths.map((path, idx) => (
            <CentreCard
              key={idx}
              emoji={path.emoji}
              title={path.title}
              description={path.description}
            />
          ))}
        </CardContainer>
      </Content>
      <TrilemmaContent>
        <Trilemma />
      </TrilemmaContent>
      <Divider />
      <Content>
        <CentralContent>
          <CenterH2>
            <Translation id="page-upgrades-vision-understanding" />
          </CenterH2>
          <h3>
            <Translation id="page-upgrades-vision-scalability" />{" "}
            <Emoji text=":rocket:" />
          </h3>
          <p>
            <Translation id="page-upgrades-vision-scalability-desc" />
          </p>
          <p>
            <Translation id="page-upgrades-vision-scalability-desc-3" />{" "}
            <Link to="/upgrades/shard-chains/">
              <Translation id="page-upgrades-vision-shard-upgrade" />
            </Link>{" "}
          </p>
          <p>
            <Translation id="page-upgrades-vision-scalability-desc-4" />
          </p>
          <h3>
            <Translation id="page-upgrades-vision-security" />{" "}
            <Emoji text=":shield:" />
          </h3>
          <p>
            <Translation id="page-upgrades-vision-security-desc" />
          </p>
          <p>
            <Translation id="page-upgrades-vision-security-desc-3" />{" "}
            <Link to="/developers/docs/consensus-mechanisms/pos/">
              <Translation id="page-upgrades-proof-stake-link" />
            </Link>{" "}
          </p>
          <p>
            <Translation id="page-upgrades-vision-security-desc-5" />{" "}
            <Link to="/developers/docs/consensus-mechanisms/pow/">
              <Translation id="page-upgrades-vision-security-desc-5-link" />
            </Link>
          </p>
          <p>
            <Translation id="page-upgrades-vision-security-desc-8" />
          </p>
          <p>
            <Translation id="page-upgrades-vision-security-desc-10" />{" "}
            <Link to="/developers/docs/nodes-and-clients/">
              <Translation id="page-upgrades-vision-ethereum-node" />
            </Link>
          </p>
          <p>
            <Translation id="page-upgrades-vision-security-validator" />
          </p>
          <ButtonLink to="/staking/">
            <Translation id="page-upgrades-vision-security-staking" />
          </ButtonLink>
          <h3>
            <Translation id="page-upgrades-vision-sustainability" />{" "}
            <Emoji text=":evergreen_tree:" />
          </h3>
          <p>
            <Translation id="page-upgrades-vision-sustainability-subtitle" />
          </p>
          <p>
            <Translation id="page-upgrades-vision-sustainability-desc-1" />{" "}
            <Link to="/developers/docs/consensus-mechanisms/pow/mining/">
              <Translation id="page-upgrades-vision-mining" />
            </Link>
          </p>
          <p>
            <Translation id="page-upgrades-vision-sustainability-desc-2" />{" "}
            <Link to="/staking/">
              <Translation id="page-upgrades-vision-staking-lower" />
            </Link>
          </p>
          <p>
            <Translation id="page-upgrades-vision-sustainability-desc-3" />{" "}
          </p>
          <p>
            <Translation id="page-upgrades-vision-sustainability-desc-8" />{" "}
          </p>
        </CentralContent>
      </Content>
      <Divider />
      <Content>
        <H2>
          <Translation id="page-upgrades-vision-explore-upgrades" />
        </H2>
        <StyledCardContainer>
          {upgrades.map((upgrade, idx) => (
            <ActionCard
              isRight
              key={idx}
              image={upgrade.image}
              title={upgrade.title}
              description={upgrade.description}
              to={upgrade.to}
            >
              <h6>{upgrade.date}</h6>
            </ActionCard>
          ))}
        </StyledCardContainer>
      </Content>
    </Page>
  )
}

export default VisionPage

export const query = graphql`
  {
    oldship: file(relativePath: { eq: "upgrades/oldship.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 800
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    rhino: file(relativePath: { eq: "upgrades/upgrade_rhino.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 600
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    merge: file(relativePath: { eq: "upgrades/merge.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    beaconchain: file(relativePath: { eq: "upgrades/core.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 420
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    shards: file(relativePath: { eq: "upgrades/newrings.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 420
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    themerge: file(relativePath: { eq: "upgrades/merge.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 420
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
