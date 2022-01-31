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

import PageMetadata from "../../components/PageMetadata"
import {
  CardContainer,
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
  font-size: 1.25rem;`

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

const StakingPage = ({ data, location }) => {
  const intl = useIntl()
  const [isSoloStaking, setIsSoloStaking] = useState(true)

  const heroContent = {
    title: translateMessageId("page-staking-title-4", intl),
    header: translateMessageId("page-staking-header-1", intl),
    subtitle: translateMessageId("page-staking-subtitle", intl),
    image: getImage(data.rhino),
    alt: translateMessageId("page-staking-image-alt", intl),
    buttons: [
      {
        path: "#stake",
        content: translateMessageId("page-staking-start", intl),
      },
    ],
  }

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-staking-meta-title", intl)}
        description={translateMessageId("page-staking-meta-description", intl)}
      />
      <PageHero content={heroContent} />
      <Divider />
      <Content>
        <Vision>
          <Breadcrumbs slug={location.pathname} startDepth={1} />
          <h2>
            <Translation id="page-staking-just-staking" />
          </h2>
          <p>
            <Translation id="page-staking-description" />{" "}
            <Link to="/upgrades/beacon-chain/">
              <Translation id="page-staking-the-beacon-chain" />
            </Link>
          </p>
          <CardContainer>
            {paths.map((path, idx) => (
              <StyledCard
                key={idx}
                emoji={path.emoji}
                title={path.title}
                description={path.description}
              >
                {path.url && <Link to={path.url}>{path.link}</Link>}
              </StyledCard>
            ))}
          </CardContainer>
        </Vision>
      </Content>
      <Divider id="stake" />
      <Content>
        <StakeContainer>
          <h2>
            <Translation id="page-staking-how-to-stake" />
          </h2>
          <p>
            <Translation id="page-staking-how-to-stake-desc" />{" "}
          </p>
          <h3>
            <Translation id="page-staking-how-much" />
          </h3>
          <OptionContainer>
            <Option
              isActive={isSoloStaking}
              onClick={() => setIsSoloStaking(true)}
            >
              <Emoji mr={`1rem`} text=":moneybag:" />
              <OptionText>32 ETH</OptionText>
            </Option>
            <Option
              isActive={!isSoloStaking}
              onClick={() => setIsSoloStaking(false)}
            >
              <Emoji mr={`1rem`} text=":swimmer:" />
              <OptionText>
                <Translation id="page-staking-less-than" /> 32 ETH
              </OptionText>
            </Option>
          </OptionContainer>
          {isSoloStaking && (
            <GhostCard>
              <InfoBanner isWarning={true} mb={`2rem`}>
                <H2>
                  <Translation id="page-staking-withdrawals" />
                </H2>
                <div>
                  <Translation id="page-staking-withdrawals-desc" />{" "}
                  <Link to="/upgrades/merge/">
                    <Translation id="page-staking-docked" />
                  </Link>
                </div>
              </InfoBanner>
              <h3>
                <Translation id="page-staking-solo" />
              </h3>
              <p>
                <Translation id="page-staking-solo-desc" />
              </p>
              <ButtonLink mb={`2rem`} to="https://launchpad.ethereum.org">
                <Translation id="page-staking-start" />
              </ButtonLink>
              <h3>
                <Translation id="page-staking-deposit-address" />
              </h3>
              <p>
                <Translation id="page-staking-deposit-address-desc" />
              </p>
              <ButtonLink mb={`2rem`} to="/staking/deposit-contract/">
                <Translation id="page-staking-check-address" />
              </ButtonLink>
            </GhostCard>
          )}
          {!isSoloStaking && (
            <GhostCard>
              <H3>
                <Translation id="page-staking-pool" />
              </H3>
              <p>
                <Translation id="page-staking-pool-desc" />
              </p>
              <p>
                <Link to="https://beaconcha.in/stakingServices">
                  <Translation id="page-staking-services" />
                </Link>
              </p>
              <InfoBanner isWarning={true}>
                <H2>
                  <Translation id="page-staking-dyor" />
                </H2>
                <div>
                  <Translation id="page-staking-dyor-desc" />{" "}
                </div>
              </InfoBanner>
            </GhostCard>
          )}
        </StakeContainer>
      </Content>
      <Divider />
      <StyledCallout
        image={getImage(data.rhino)}
        alt={translateMessageId("page-staking-image-alt", intl)}
        titleKey={"page-staking-join-community"}
        descriptionKey={"page-staking-join-community-desc"}
      >
        <div>
          <ButtonLink to="https://www.reddit.com/r/ethstaker/">
            <Translation id="page-staking-join" /> r/ethstaker
          </ButtonLink>
        </div>
      </StyledCallout>
      <Content>
        <Row>
          <Column>
            <H2>
              <Translation id="page-staking-pos-explained" />
            </H2>
            <p>
              <Translation id="page-staking-pos-explained-desc" />{" "}
              <Link to="/developers/docs/consensus-mechanisms/">
                <Translation id="page-staking-consensus" />
              </Link>
            </p>

            <p>
              <Translation id="page-staking-pos-explained-desc-1" />
            </p>
            <h3>
              <Translation id="page-staking-at-stake" />
            </h3>
            <p>
              <Translation id="page-staking-at-stake-desc" />
            </p>
            <h3>
              <Translation id="page-staking-validators" />
            </h3>
            <p>
              <Translation id="page-staking-validators-desc" />
            </p>
          </Column>
          <Column>
            <Box>
              <H2>
                <Translation id="page-staking-upgrades-title" />
              </H2>
              <BoxText>
                <ul>
                  <li>
                    <Translation id="page-staking-upgrades-li" />
                  </li>
                  <li>
                    <Translation id="page-staking-upgrades-li-2" />
                  </li>
                  <li>
                    <Translation id="page-staking-upgrades-li-3" />
                  </li>
                  <li>
                    <Translation id="page-staking-upgrades-li-4" />
                  </li>
                  <li>
                    <Translation id="page-staking-upgrades-li-5" />
                  </li>
                </ul>
              </BoxText>
            </Box>
          </Column>
        </Row>
        <H2>
          <Translation id="page-staking-benefits" />
        </H2>
        <CardContainer>
          <StyledCard
            emoji=":evergreen_tree:"
            title={translateMessageId("page-staking-sustainability", intl)}
            description={translateMessageId(
              "page-staking-sustainability-desc",
              intl
            )}
          />
          <StyledCard
            emoji=":globe_showing_americas:"
            title={translateMessageId("page-staking-accessibility", intl)}
            description={translateMessageId(
              "page-staking-accessibility-desc",
              intl
            )}
          />
          <StyledCard
            emoji=":old_key:"
            title={translateMessageId("page-staking-sharding", intl)}
            description={translateMessageId("page-staking-sharding-desc", intl)}
          >
            <Link to="/upgrades/shard-chains/">
              <Translation id="page-staking-more-sharding" />
            </Link>
          </StyledCard>
        </CardContainer>
      </Content>
    </Page>
  )
}

export default StakingPage

export const poolImage = graphql`
  fragment poolImage on File {
    childImageSharp {
      gatsbyImageData(
        height: 20
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

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
    consensys: file(relativePath: { eq: "projects/consensys.png" }) {
      ...poolImage
    }
    ethhub: file(relativePath: { eq: "projects/ethhub.png" }) {
      ...poolImage
    }
    etherscan: file(
      relativePath: { eq: "projects/etherscan-logo-circle.png" }
    ) {
      ...poolImage
    }
  }
`
