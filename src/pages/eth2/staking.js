import React, { useState } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

import { getDefaultMessage } from "../../utils/translations"
import Translation from "../../components/Translation"
import Breadcrumbs from "../../components/Breadcrumbs"
import ButtonLink from "../../components/ButtonLink"
import Card from "../../components/Card"
import Emoji from "../../components/Emoji"
import GhostCard from "../../components/GhostCard"
import InfoBanner from "../../components/InfoBanner"
import CalloutBanner from "../../components/CalloutBanner"
import Link from "../../components/Link"

import PageMetadata from "../../components/PageMetadata"
import {
  CardContainer,
  Content,
  Page,
  Divider,
  Eth2Header,
  Eth2HeaderGradient,
} from "../../components/SharedStyledComponents"

const HeroCard = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 4rem;
  border-radius: 2px;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const HeroContainer = styled.div`
  padding-left: 0rem;
  padding-right: 2rem;
  padding-top: 0rem;
  padding-bottom: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 0rem;
    padding-left: 0rem;
    padding-bottom: 0rem;
  }
`

const HeroCopy = styled.div`
  padding-left: 4rem;
  padding-right: 2rem;
  padding-top: 8rem;
  padding-bottom: 8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: -6rem;
    margin-left: -4rem;
    padding-bottom: 4rem;
    padding-right: 0rem;
  }
`

const StyledCallout = styled(CalloutBanner)`
  margin-left: 0rem;
  margin-right: 0rem;
`

const Hero = styled(Img)`
  flex: 1 1 50%;
  max-width: 500px;
  background-size: cover;
  background-repeat: no-repeat;
  align-self: center;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    display: flex;
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
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 20px;
  }
`

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const H2 = styled.h2`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
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
  font-size: 20px;
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
  font-size: 24px;
  line-height: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 16px;
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
    title: <Translation id="page-eth2-staking-title-1" />,
    description: <Translation id="page-eth2-staking-desc-1" />,
  },
  {
    emoji: ":warning:",
    title: <Translation id="page-eth2-staking-title-2" />,
    description: <Translation id="page-eth2-staking-desc-2" />,
  },
  {
    emoji: ":clipboard:",
    title: <Translation id="page-eth2-staking-title-3" />,
    description: <Translation id="page-eth2-staking-desc-3" />,
    url: "/developers/docs/apis/backend/#available-libraries",
    link: <Translation id="page-eth2-staking-link-1" />,
  },
]

const StakingPage = ({ data, location }) => {
  const intl = useIntl()
  const [isSoloStaking, setIsSoloStaking] = useState(true)
  return (
    <Page>
      <PageMetadata
        title={intl.formatMessage({
          id: "page-eth2-staking-meta-title",
          defaultMessage: getDefaultMessage("page-eth2-staking-meta-title"),
        })}
        description={intl.formatMessage({
          id: "page-eth2-staking-meta-description",
          defaultMessage: getDefaultMessage(
            "page-eth2-staking-meta-description"
          ),
        })}
      />
      <Content>
        <HeroCard>
          <HeroContainer>
            <HeroCopy>
              <Title>
                <Translation id="page-eth2-staking-title-4" />
              </Title>
              <Eth2Header>
                <Translation id="page-eth2-staking-header-1" />{" "}
                <Eth2HeaderGradient>
                  <Translation id="page-eth2-staking-header-2" />
                </Eth2HeaderGradient>
              </Eth2Header>
              <Subtitle>
                <Translation id="page-eth2-staking-subtitle" />
              </Subtitle>
            </HeroCopy>
          </HeroContainer>
          <Hero fluid={data.rhino.childImageSharp.fluid} />
        </HeroCard>
        <Vision>
          <Breadcrumbs slug={location.pathname} startDepth={1} />
          <H2>
            <Translation id="page-eth2-just-staking" />
          </H2>
          <p>
            <Translation id="page-eth2-staking-description" />{" "}
            <Link to="/eth2/beacon-chain/">
              <Translation id="page-eth2-the-beacon-chain" />
            </Link>
            .
          </p>
          <CardContainer>
            {paths.map((path, idx) => {
              return (
                <StyledCard
                  key={idx}
                  emoji={path.emoji}
                  title={path.title}
                  description={path.description}
                >
                  {path.url && <Link to={path.url}>{path.link}</Link>}
                </StyledCard>
              )
            })}
          </CardContainer>
        </Vision>
      </Content>
      <Divider />
      <Content>
        <StakeContainer>
          <H2>
            <Translation id="page-eth2-staking-how-to-stake" />
          </H2>
          <p>
            <Translation id="page-eth2-staking-how-to-stake-desc" />{" "}
          </p>
          <h3>
            <Translation id="page-eth2-staking-how-much" />
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
                <Translation id="page-eth2-staking-less-than" /> 32 ETH
              </OptionText>
            </Option>
          </OptionContainer>
          {isSoloStaking && (
            <GhostCard>
              <InfoBanner isWarning={true} mb={`2rem`}>
                <H2>
                  <Translation id="page-eth2-staking-withdrawals" />
                </H2>
                <div>
                  <Translation id="page-eth2-staking-withdrawals-desc" />{" "}
                  <Link to="/eth2/docking/">
                    <Translation id="page-eth2-staking-docked" />
                  </Link>
                  .
                </div>
              </InfoBanner>
              <h3>
                <Translation id="page-eth2-staking-solo" />
              </h3>
              <p>
                <Translation id="page-eth2-staking-solo-desc" />
              </p>
              <ButtonLink mb={`2rem`} to="https://launchpad.ethereum.org">
                <Translation id="page-eth2-staking-start" />
              </ButtonLink>
              <h3>
                <Translation id="page-eth2-staking-deposit-address" />
              </h3>
              <p>
                <Translation id="page-eth2-staking-deposit-address-desc" />
              </p>
              <ButtonLink mb={`2rem`} to="/eth2/deposit-contract/">
                <Translation id="page-eth2-staking-check-address" />
              </ButtonLink>
            </GhostCard>
          )}
          {!isSoloStaking && (
            <GhostCard>
              <h3>
                <Translation id="page-eth2-staking-pool" />
              </h3>
              <p>
                <Translation id="page-eth2-staking-pool-desc" />
              </p>
              <p>
                <Link to="https://beaconcha.in/stakingServices">
                  <Translation id="page-eth2-staking-services" />
                </Link>
              </p>
              <InfoBanner isWarning={true}>
                <H2>
                  <Translation id="page-eth2-staking-dyor" />
                </H2>
                <div>
                  <Translation id="page-eth2-staking-dyor-desc-1" />{" "}
                  <Link to="/eth2/beacon-chain/">
                    <Translation id="page-eth2-staking-dyor-desc-2" />
                  </Link>{" "}
                  <Translation id="page-eth2-staking-dyor-desc-3" />
                </div>
              </InfoBanner>
            </GhostCard>
          )}
        </StakeContainer>
      </Content>
      <Divider />
      <StyledCallout
        image={data.rhino.childImageSharp.fluid}
        title={intl.formatMessage({
          id: "page-eth2-staking-join-community",
          defaultMessage: getDefaultMessage("page-eth2-staking-join-community"),
        })}
        description={intl.formatMessage({
          id: "page-eth2-staking-join-community-desc",
          defaultMessage: getDefaultMessage(
            "page-eth2-staking-join-community-desc"
          ),
        })}
      >
        <div>
          <ButtonLink to="https://www.reddit.com/r/ethstaker/">
            <Translation id="page-eth2-staking-join" /> r/ethstaker
          </ButtonLink>
        </div>
      </StyledCallout>
      <Content>
        <Row>
          <Column>
            <H2>
              <Translation id="page-eth2-staking-pos-explained" />
            </H2>
            <p>
              <Translation id="page-eth2-staking-pos-explained-desc" />{" "}
              <Link to="/developers/docs/consensus-mechanisms/">
                <Translation id="page-eth2-staking-consensus" />
              </Link>
            </p>

            <p>
              <Translation id="page-eth2-staking-pos-explained-desc-1" />
            </p>
            <h3>
              <Translation id="page-eth2-staking-at-stake" />
            </h3>
            <p>
              <Translation id="page-eth2-staking-at-stake-desc" />
            </p>
            <h3>
              <Translation id="page-eth2-staking-validators" />
            </h3>
            <p>
              <Translation id="page-eth2-staking-validators-desc" />{" "}
              <Link to="/glossary/#51-attack">
                <Translation id="page-eth2-staking-51" />
              </Link>
              <Translation id="page-eth2-staking-51-desc" />
            </p>
            <p>
              <Translation id="page-eth2-staking-51-desc-1" />
            </p>
          </Column>
          <Column>
            <Box>
              <H2>
                <Translation id="page-eth2-staking-upgrades-title" />
              </H2>
              <BoxText>
                <ul>
                  <li>
                    <Translation id="page-eth2-staking-upgrades-li" />
                  </li>
                  <li>
                    <Translation id="page-eth2-staking-upgrades-li-2" />
                  </li>
                  <li>
                    <Translation id="page-eth2-staking-upgrades-li-3" />{" "}
                    <Link to="/glossary/#mainnet">
                      <Translation id="page-eth2-docking-mainnet" />
                    </Link>{" "}
                    <Translation id="page-eth2-staking-transactions" />
                  </li>
                  <li>
                    <Translation id="page-eth2-staking-upgrades-li-4" />
                  </li>
                  <li>
                    <Translation id="page-eth2-staking-upgrades-li-5" />
                  </li>
                </ul>
              </BoxText>
            </Box>
          </Column>
        </Row>
        <H2>
          <Translation id="page-eth2-staking-benefits" />
        </H2>
        <CardContainer>
          <StyledCard
            emoji=":evergreen_tree:"
            title={intl.formatMessage({
              id: "page-eth2-staking-sustainability",
              defaultMessage: getDefaultMessage(
                "page-eth2-staking-sustainability"
              ),
            })}
            description={intl.formatMessage({
              id: "page-eth2-staking-sustainability-desc",
              defaultMessage: getDefaultMessage(
                "page-eth2-staking-sustainability-desc"
              ),
            })}
          />
          <StyledCard
            emoji=":globe_showing_americas:"
            title={intl.formatMessage({
              id: "page-eth2-staking-accessibility",
              defaultMessage: getDefaultMessage(
                "page-eth2-staking-accessibility"
              ),
            })}
            description={intl.formatMessage({
              id: "page-eth2-staking-accessibility-desc",
              defaultMessage: getDefaultMessage(
                "page-eth2-staking-accessibility-desc"
              ),
            })}
          />
          <StyledCard
            emoji=":old_key:"
            title={intl.formatMessage({
              id: "page-eth2-staking-sharding",
              defaultMessage: getDefaultMessage("page-eth2-staking-sharding"),
            })}
            description={intl.formatMessage({
              id: "page-eth2-staking-sharding-desc",
              defaultMessage: getDefaultMessage(
                "page-eth2-staking-sharding-desc"
              ),
            })}
          >
            <Link to="/eth2/shard-chains/">
              <Translation id="page-eth2-staking-more-sharding" />
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
      fixed(height: 20) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const query = graphql`
  query {
    rhino: file(relativePath: { eq: "eth2/eth2_rhino.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
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
