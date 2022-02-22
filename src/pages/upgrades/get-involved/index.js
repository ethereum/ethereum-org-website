import React, { useContext, useState, useEffect } from "react"
import { ThemeContext } from "styled-components"
import styled from "styled-components"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { shuffle } from "lodash"
import { getImage } from "gatsby-plugin-image"
import { translateMessageId } from "../../../utils/translations"
import Card from "../../../components/Card"
import Leaderboard from "../../../components/Leaderboard"
import CalloutBanner from "../../../components/CalloutBanner"
import Emoji from "../../../components/Emoji"
import ProductCard from "../../../components/ProductCard"
import ButtonLink from "../../../components/ButtonLink"
import PageMetadata from "../../../components/PageMetadata"
import CardList from "../../../components/CardList"
import Translation from "../../../components/Translation"

import {
  CardContainer,
  CardGrid,
  Content,
  Page,
  GrayContainer,
  Divider,
  SloganGradient,
} from "../../../components/SharedStyledComponents"
import Breadcrumbs from "../../../components/Breadcrumbs"

const HeroContainer = styled.div`
  padding-left: 0rem;
  padding-top: 8rem;
  padding-bottom: 8rem;
  width: 50%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 2rem;
    padding-left: 0rem;
    width: 100%;
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

const LeaderboardContainer = styled.div`
  padding-left: 0rem;
  padding-top: 2rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
    margin-top: 2rem;
  }
`

const HeroCard = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: -2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 1rem;
  }
`

const Subtitle = styled.div`
  font-size: 1.5rem;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  margin-top: 1rem;
  text-align: center;
  display: flex;
  justify-content: center;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const ReverseRow = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
  }
`

const StyledCardContainer = styled(CardContainer)`
  margin-top: 2rem;
  margin-bottom: 3rem;
`

const StyledCardGrid = styled(CardGrid)`
  margin-top: 2rem;
  margin-bottom: 3rem;
`

const StyledCardList = styled(CardList)`
  margin-right: 2rem;
`

const Staking = styled.div`
  padding: 4rem;
  background: ${(props) => props.theme.colors.cardGradient};
  width: 100%;
  margin-top: 2rem;
  margin-bottom: -2rem;
  display: flex;
  flex-direction: column;
`

const LeftColumn = styled.div`
  width: 50%;
  margin-right: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
    margin-left: 4rem;
  }
`

const RightColumn = styled.div`
  width: 50%;
  margin-left: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
    margin-right: 4rem;
    margin-bottom: -2rem;
  }
`

const StyledBreadcrumbs = styled(Breadcrumbs)`
  justify-content: center;
`

const StyledGrayContainer = styled(GrayContainer)`
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

const StyledCalloutBanner = styled(CalloutBanner)`
  background: transparent;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
    padding: 0rem;
    padding-top: 4rem;
    margin-left: 0rem;
  }
`

const GetInvolvedPage = ({ data, location }) => {
  const intl = useIntl()
  const themeContext = useContext(ThemeContext)
  const isDarkTheme = themeContext.isDark

  // TODO sort query isn't working :(
  const bountyHunters = data.bountyHunters.nodes.sort(
    (a, b) => b.score - a.score
  )

  const [clients, setClients] = useState([])

  useEffect(() => {
    const consensusClients = [
      {
        name: "Prysm",
        background: "#23292E",
        description: <Translation id="page-upgrades-get-involved-written-go" />,
        alt: "consensus-client-prysm-logo-alt",
        url: "https://docs.prylabs.network/docs/getting-started/",
        image: () => data.prysm,
        githubUrl: "https://github.com/prysmaticlabs/prysm",
      },
      {
        name: "Lighthouse",
        background: "",
        description: (
          <Translation id="page-upgrades-get-involved-written-rust" />
        ),
        alt: "consensus-client-lighthouse-logo-alt",
        url: "https://lighthouse-book.sigmaprime.io/",
        image: (isDarkTheme) =>
          isDarkTheme ? data.lighthouseDark : data.lighthouseLight,
        githubUrl: "https://github.com/sigp/lighthouse",
      },
      {
        name: "Teku",
        background: "#3359D5",
        description: (
          <Translation id="page-upgrades-get-involved-written-java" />
        ),
        alt: "consensus-client-teku-logo-alt",
        url: "https://pegasys.tech/teku",
        image: (isDarkTheme) => (isDarkTheme ? data.tekuLight : data.tekuDark),
        githubUrl: "https://github.com/ConsenSys/teku",
      },
      {
        name: "Lodestar",
        background: "#14140B",
        description: (
          <Translation id="page-upgrades-get-involved-written-javascript" />
        ),
        alt: "consensus-client-lodestar-logo-alt",
        url: "https://lodestar.chainsafe.io/",
        image: () => data.lodestar,
        githubUrl: "https://github.com/ChainSafe/lodestar",
        isBeta: true,
        children: <Translation id="consensus-client-under-review" />,
      },
      {
        name: "Nimbus",
        background: "#DC8600",
        description: (
          <Translation id="page-upgrades-get-involved-written-nim" />
        ),
        alt: "consensus-client-nimbus-logo-alt",
        url: "https://nimbus.team/",
        image: () => data.nimbus,
        githubUrl: "https://github.com/status-im/nimbus-eth2",
      },
    ]

    const randomizedClients = shuffle(consensusClients)
    // Sort beta clients to the end
    const randClientsBetaLast = randomizedClients.sort((_, { isBeta }) =>
      isBeta ? -1 : 0
    )
    setClients(randClientsBetaLast)
  }, [data])

  const ethresearch = [
    {
      title: <Translation id="page-upgrades-get-involved-ethresearch-1" />,
      description: "",
      link: "https://ethresear.ch/c/sharding/6",
    },
    {
      title: <Translation id="page-upgrades-get-involved-ethresearch-2" />,
      description: "",
      link: "https://ethresear.ch/c/the-merge/38",
    },
    {
      title: <Translation id="page-upgrades-get-involved-ethresearch-3" />,
      description: "",
      link: "https://ethresear.ch/c/sharded-execution/35",
    },
    {
      title: <Translation id="page-upgrades-get-involved-ethresearch-4" />,
      description: "",
      link: "https://ethresear.ch/",
    },
  ]

  const paths = [
    {
      emoji: ":computer:",
      title: <Translation id="page-upgrades-get-involved-title-1" />,
      description: <Translation id="page-upgrades-get-involved-desc-1" />,
      url: "#clients",
      button: <Translation id="page-upgrades-get-involved-btn-1" />,
    },
    {
      emoji: ":moneybag:",
      title: <Translation id="page-upgrades-get-involved-title-2" />,
      description: <Translation id="page-upgrades-get-involved-desc-2" />,
      url: "/staking/",
      button: <Translation id="page-upgrades-get-involved-btn-2" />,
    },
    {
      emoji: ":bug:",
      title: <Translation id="page-upgrades-get-involved-title-3" />,
      description: <Translation id="page-upgrades-get-involved-desc-3" />,
      url: "/upgrades/get-involved/bug-bounty/",
      button: <Translation id="page-upgrades-get-involved-btn-3" />,
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-upgrades-get-involved", intl)}
        description={translateMessageId(
          "page-upgrades-get-involved-meta-description",
          intl
        )}
      />
      <Content>
        <HeroCard>
          <HeroContainer>
            <StyledBreadcrumbs slug={location.pathname} startDepth={1} />
            <SloganGradient>
              <Translation id="page-upgrades-get-involved" />{" "}
              <Emoji size={1} text=":wave:" />
            </SloganGradient>
            <Subtitle>
              <Translation id="page-upgrades-get-involved-subtitle" />
            </Subtitle>
          </HeroContainer>
        </HeroCard>
        <h2>
          <Translation id="page-upgrades-get-involved-how" />
        </h2>
        <p>
          <Translation id="page-upgrades-get-involved-how-desc" />
        </p>
        <StyledCardContainer>
          {paths.map((path, idx) => (
            <StyledCard
              key={idx}
              emoji={path.emoji}
              title={path.title}
              description={path.description}
            >
              <ButtonLink to={path.url}>{path.button}</ButtonLink>
            </StyledCard>
          ))}
        </StyledCardContainer>
      </Content>
      <Divider id="clients" />
      <Content>
        <h2>
          <Translation id="page-upgrades-get-involved-run-clients" />
        </h2>
        <p>
          <Translation id="page-upgrades-get-involved-run-clients-desc" />
        </p>
        <p>
          <Translation id="page-upgrades-get-involved-run-clients-desc-2" />
        </p>
        <h3>
          <Translation id="page-upgrades-get-involved-run-clients-production" />
        </h3>
        <StyledCardGrid>
          {clients.map((client, idx) => (
            <ProductCard
              key={idx}
              url={client.url}
              background={client.background}
              image={getImage(client.image(isDarkTheme))}
              name={client.name}
              description={client.description}
              alt={translateMessageId(client.alt, intl)}
              githubUrl={client.githubUrl}
              hideStars={true}
            >
              {client.children}
            </ProductCard>
          ))}
        </StyledCardGrid>
      </Content>
      <Staking>
        <StyledCalloutBanner
          image={getImage(data.rhino)}
          alt={translateMessageId("page-staking-image-alt", intl)}
          titleKey={translateMessageId(
            "page-upgrades-get-involved-stake",
            intl
          )}
          descriptionKey={translateMessageId(
            "page-upgrades-get-involved-stake-desc",
            intl
          )}
        >
          <div>
            <ButtonLink to="/staking/">
              <Translation id="page-upgrades-get-involved-stake-eth" />
            </ButtonLink>
          </div>
        </StyledCalloutBanner>
      </Staking>
      <StyledGrayContainer>
        <Content>
          <Row>
            <LeftColumn>
              <h2 id="#bug-bounty">
                <Translation id="page-upgrades-get-involved-bug-hunting" />
              </h2>
              <p>
                <Translation id="page-upgrades-get-involved-bug-hunting-desc" />
              </p>
              <p>
                <Translation id="page-upgrades-get-involved-bug" />
              </p>
              <ul>
                <li>
                  <Translation id="page-upgrades-get-involved-bug-li" />
                </li>
                <li>
                  <Translation id="page-upgrades-get-involved-bug-li-2" />
                </li>
                <li>
                  <Translation id="page-upgrades-get-involved-bug-li-3" />
                </li>
                <li>
                  <Translation id="page-upgrades-get-involved-bug-li-4" />
                </li>
              </ul>
              <ButtonLink to="/upgrades/get-involved/bug-bounty/">
                <Translation id="page-upgrades-get-involved-bug-hunting" />
              </ButtonLink>
            </LeftColumn>
            <LeaderboardContainer>
              <Leaderboard content={bountyHunters} limit={5} />
            </LeaderboardContainer>
          </Row>
        </Content>
      </StyledGrayContainer>
      <Content>
        <ReverseRow>
          <LeftColumn>
            <StyledCardList content={ethresearch} />
          </LeftColumn>
          <RightColumn>
            <h2>
              <Translation id="page-upgrades-get-involved-join" />
            </h2>
            <p>
              <Translation id="page-upgrades-get-involved-join-desc" />
            </p>
          </RightColumn>
        </ReverseRow>
      </Content>
    </Page>
  )
}

export default GetInvolvedPage

export const Clients = graphql`
  fragment Clients on File {
    childImageSharp {
      gatsbyImageData(
        width: 80
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

export const query = graphql`
  {
    bountyHunters: allConsensusBountyHuntersCsv(
      sort: { order: DESC, fields: score }
    ) {
      nodes {
        username
        name
        score
      }
    }
    rhino: file(relativePath: { eq: "upgrades/upgrade_rhino.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 800
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    prysm: file(relativePath: { eq: "upgrades/prysm.png" }) {
      ...Clients
    }
    lighthouseLight: file(
      relativePath: { eq: "upgrades/lighthouse-light.png" }
    ) {
      ...Clients
    }
    lighthouseDark: file(relativePath: { eq: "upgrades/lighthouse-dark.png" }) {
      ...Clients
    }
    tekuDark: file(relativePath: { eq: "upgrades/teku-dark.png" }) {
      ...Clients
    }
    tekuLight: file(relativePath: { eq: "upgrades/teku-light.png" }) {
      ...Clients
    }
    lodestar: file(relativePath: { eq: "upgrades/lodestar.png" }) {
      ...Clients
    }
    nimbus: file(relativePath: { eq: "upgrades/nimbus.png" }) {
      ...Clients
    }
  }
`
