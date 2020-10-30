import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Card from "../../components/Card"
import Callout from "../../components/Callout"
import ExpandableCard from "../../components/ExpandableCard"
import CalloutBanner from "../../components/CalloutBanner"
import Link from "../../components/Link"
import Warning from "../../components/Warning"
import Emoji from "../../components/Emoji"
import Eth2Articles from "../../components/Eth2Articles"

import ButtonLink from "../../components/ButtonLink"
import PageMetadata from "../../components/PageMetadata"
import {
  CardContainer,
  Content,
  Page,
  GrayContainer,
  Divider,
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
  background: linear-gradient(
    285.24deg,
    #f7cbc0 0%,
    #fbeae3 17.81%,
    #f4b1ab 29.8%,
    #8476d9 49.78%,
    #85acf9 54.14%,
    #1c1ce1 61.77%,
    #000000 69.77%
  );
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    margin-right: -2rem;
    margin-left: -2rem;
    margin-top: -2rem;
    background: linear-gradient(
      360deg,
      #f7cbc0 0%,
      #fbeae3 -0.19%,
      #f4b1ab 5.8%,
      #8476d9 16.78%,
      #85acf9 26%,
      #1c1ce1 36.77%,
      #000000 57.77%
    );
  }
`

const Hero = styled(Img)`
  flex: 1 1 50%;
  max-width: 500px;
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 3rem;
  margin-right: 3rem;
  @media (min-width: ${(props) => props.theme.breakpoints.m}) {
    align-self: center;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-top: 0;
    margin-left: 0;
  }
`

const Slogan = styled.p`
  font-style: normal;
  font-weight: normal;
  font-weight: 800;
  font-size: 64px;
  line-height: 100%;
  max-width: 780px;
  margin-bottom: 0rem;
  color: ${(props) => props.theme.colors.white600};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 48px;
  }
`

const SloganGradient = styled.p`
  font-weight: 800;
  font-size: 64px;
  line-height: 100%;
  max-width: 720px;
  margin-right: 1rem;
  background-clip: text;
  background-image: linear-gradient(
    285.24deg,
    #f7cbc0 0%,
    #fbeae3 17.81%,
    #f4b1ab 29.8%,
    #8476d9 49.78%,
    #85acf9 54.14%,
    #d2d2f9 69.77%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 48px;
  }
`

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 14px;
  color: ${(props) => props.theme.colors.white600};
`

const Subtitle = styled.div`
  font-size: 24px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.white700};
  max-width: 480px;
  margin-top: 1rem;
`

const Image = styled(Img)``

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`

const StyledCardContainer = styled(CardContainer)`
  margin-top: 2rem;
  margin-bottom: 3rem;
`

const TwoColumnContent = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-left: 2rem;
  margin-right: 2rem;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0rem;
    margin-right: 0rem;
  }
`

const ThreeColumnContent = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0rem 2rem;
  width: 100%;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const H2 = styled.h2`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
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

const HeroCopyContainer = styled.div`
  flex: 0 1 500px;
  max-width: 500px;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex: 0 1 400px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
    max-width: 100%;
    max-height: 340px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    max-height: 280px;
  }
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

const StyledButton = styled(ButtonLink)`
  margin-right: 1rem;
`

const Definition = styled.div`
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background};
  padding: 1rem;
  margin-right: 2rem;
  width: 100%;
  z-index: 999;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-bottom: 1rem;
  }
`

const GhostBox = styled.div`
  top: 739px;
  position: absolute;
  width: 46.5%;
  height: 22%;
  left: 40px;
  background-color: ${(props) => props.theme.colors.white600};
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 1rem;
  margin-right: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    top: 1043px;
    width: 87%;
    height: 31.5%;
  }
`

const StyledCard = styled(Card)`
  flex: 1 1 30%;
  min-width: 240px;
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  margin: 1rem;
  padding: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
  }

  &:hover {
    border-radius: 4px;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background: ${(props) => props.theme.colors.tableBackgroundHover};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

const WarningMessage = styled.div`
  display: flex;
  flex-direction: column;
`

const Disclaimer = styled.div`
  margin: 0rem 12rem;
  display: flex;
  text-align: center;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 0rem 2rem;
  }
`

const StyledWarning = styled(Warning)`
  margin-top: 0rem;
  margin-left: 2rem;
  width: 100%;
`

const Vision = styled.div`
  margin-top: 4rem;
`

const ContributeCard = styled.div`
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0rem 3rem;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-left: 0rem;
    margin-right: 0rem;
    flex-direction: column;
    align-items: flex-start;
  }
`

const ContributeButton = styled(ButtonLink)`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
    margin-top: 1.5rem;
  }
`

const Staking = styled.div`
  padding: 4rem;
  background: ${(props) => props.theme.colors.cardGradient};
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`

const StakingColumns = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const StakingLeftColumn = styled.div``

const StakingRightColumn = styled.div`
  display: flex;
  flex-direction: center;
  margin: 0rem 2rem;
  margin-left: 8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 0rem;
    margin-top: 2rem;
  }
`

const LeftColumn = styled.div`
  width: 100%;
`

const RightColumn = styled.div`
  width: 100%;
  margin-left: 2rem;
  flex-direction: column;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-left: 0rem;
    flex-direction: column;
  }
`

const Faq = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const StakingImage = styled.div`
  display: flex;
  justify-content: center;
`

const paths = [
  {
    emoji: ":rocket:",
    title: "More scalable",
    description:
      "Ethereum needs to support 1000s of transactions per second, to make applications faster and cheaper to use.",
  },
  {
    emoji: ":shield:",
    title: "More secure",
    description:
      "Ethereum needs to be more secure. As the adoption of Ethereum grows, the protocol needs to become more secure against all forms of attack.",
  },
  {
    emoji: ":evergreen_tree:",
    title: "More sustainable",
    description:
      "Ethereum needs to be better for the environment. The technology today requires too much computing power and energy.",
  },
]

const upgrades = [
  {
    emoji: ":police_car_light:",
    title: "The beacon chain",
    description:
      "The first Eth2 addition to the ecosystem. The beacon chain will coordinate the new system, bring staking to Ethereum and lay the groundwork for future upgrades.",
    url: "/en/eth2/beacon-chain/",
    button: "More on the beacon chain",
    date: "November 2020",
  },
  {
    emoji: ":chains:",
    title: "Shard chains",
    description:
      "Shard chains will expand Ethereum's capacity to process transactions and store data. The shards themselves will gain more features over time, rolled out in multiple phases.",
    url: "/en/eth2/shard-chains/",
    button: "More on the shard chains",
    date: "Estimate: 2021",
  },
  {
    emoji: ":ship:",
    title: "The docking",
    description:
      "Mainnet Ethereum will need to “dock” or “merge” with the beacon chain at some point. This will enable staking for the entire network and signal the end of energy-intensive mining.",
    url: "/en/eth2/docking/",
    button: "More on the docking",
    date: "Estimate: 2022",
  },
]

const Eth2IndexPage = ({ data }) => {
  return (
    <Page>
      <PageMetadata
        title="The Eth2 upgrades"
        description="An overview of the Ethereum 2.0 upgrades and the vision they hope to make a reality."
      />
      <Content>
        <HeroCard>
          <HeroContainer>
            <Title>The ETH2 Upgrades</Title>
            <Slogan>Upgrading Ethereum to</Slogan>
            <Row>
              <SloganGradient>radical</SloganGradient>
              <Slogan>new heights</Slogan>
            </Row>
            <Subtitle>
              The Ethereum we know and love, just more secure, more sustainable,
              and more scalable...
            </Subtitle>
            <ButtonRow>
              <StyledButton to="/en/eth2/beacon-chain/">
                Explore upgrades
              </StyledButton>
              <StyledButton isSecondary to="#">
                Wait, what's Ethereum?
              </StyledButton>
            </ButtonRow>
          </HeroContainer>
          <Hero fluid={data.doge.childImageSharp.fluid} />
        </HeroCard>
        <GhostBox />
        <Row>
          <Definition>
            <H2>What is Eth2?</H2>
            Eth2 refers to a set of interconnected upgrades that will make
            Ethereum more scalable, more secure, and more sustainable. These
            upgrades are being built by multiple teams from across the Ethereum
            ecosystem.
          </Definition>
          <StyledWarning>
            <WarningMessage>
              <H2>What do you need to do?</H2>
              If you're a dapp user or ETH holder, you probably don't need to do
              anything. If you're a developer or want to start staking, there
              are ways you can get involved today.{" "}
              <Link to="#">What to do about Eth2</Link>
            </WarningMessage>
          </StyledWarning>
        </Row>
        <Vision>
          <H2>
            The vision
            <Emoji marginLeft={0.5} text=":sparkles:" />
          </H2>
          <p>
            To bring Ethereum into the mainstream and serve all of humanity, we
            have to make Ethereum more scalable, secure, and sustainable.
          </p>
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
        </Vision>
        <CalloutBanner
          image={data.eth.childImageSharp.fluid}
          title="Dive into the vision"
          description="How are we going to make Ethereum more scalable, secure, and sustainable?"
        >
          <div>
            <ButtonLink to="/en/eth2/vision/">The Eth2 vision</ButtonLink>
          </div>
        </CalloutBanner>
        <H2>The Eth2 upgrades</H2>
        <p>
          Eth2 is a set of upgrades that improve the scalability, security, and
          sustainability of Ethereum. Although each is being worked on in
          parallel, they have certain dependencies that determine when they will
          be deployed.
        </p>
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
        <ContributeCard>
          <div>
            <H2>Want to help with Eth2?</H2>
            There’s plenty of opportunities to weigh in on the Eth2 upgrades,
            help with testing, and even earn rewards in the process.
          </div>
          <ContributeButton isSecondary to="/en/eth2/get-involved/">
            Get involved
          </ContributeButton>
        </ContributeCard>
        <Disclaimer>
          <em>
            This is not the official roadmap. This is how we view what’s
            happening based on the information out there. But this is
            technology, things can change in an instant. So please don’t read
            this as a commitment.
          </em>
        </Disclaimer>
      </Content>
      <Staking>
        <H2>Staking is here</H2>
        <StakingImage>
          <Image fluid={data.rhino.childImageSharp.fluid} />
        </StakingImage>
        <StakingColumns>
          <StakingLeftColumn>
            <p>
              If you want to use your ETH to help secure the Ethereum network,
              make sure you follow these steps.
            </p>
            <h3>1. Set up with the launchpad</h3>
            <p>
              To stake in Eth2 you’ll need to use the launchpad – this will walk
              you through the process.
            </p>
            <ButtonLink to="#">Visit staking launchpad</ButtonLink>
            <h3>2. Confirm staking address</h3>
            <p>
              Before you stake your ETH, be sure to check you’ve got the right
              address. You must have gone through the launchpad before doing
              this.
            </p>
            <ButtonLink to="/en/eth2/deposit-contract">
              Confirm deposit contract address
            </ButtonLink>
          </StakingLeftColumn>
          <StakingRightColumn>
            <StyledCard
              emoji=":money_with_wings:"
              title="Learn about staking"
              description="The beacon chain will bring staking to Ethereum. This means if you have ETH, you can do a public good by securing the network and earn more ETH in the process."
            >
              <ButtonLink to="/en/eth2/staking/">More on staking</ButtonLink>
            </StyledCard>
            <Image fluid={data.rhino.childImageSharp.fluid} />
          </StakingRightColumn>
          <Image fluid={data.rhino.childImageSharp.fluid} />
        </StakingColumns>
        <StakingImage>
          <Image fluid={data.rhino.childImageSharp.fluid} />
        </StakingImage>
      </Staking>
      <Divider />
      <H2>Questions and answers</H2>
      <Content>
        <Faq>
          <LeftColumn>
            <ExpandableCard
              contentPreview="It’s not accurate to think of Eth2 as a separate blockchain."
              title="Is Eth2 a separate blockchain?"
            >
              <p>
                Think of Eth2 as a series of upgrades being added to improve the
                Ethereum we use today. These upgrades include the creation of a
                new chain called the beacon chain and up to 64 chains known as
                shards.{" "}
              </p>
              <p>
                These are separate to the Ethereum mainnet we use today but
                won’t replace it. Instead mainnet will transition into this
                parallel system that’s being added over time.
              </p>
              <p>
                In other words the Ethereum we use today will eventually embody
                all the features that we’re aiming towards in{" "}
                <Link to="#">the Eth2 vision</Link>.
              </p>
              <p>
                To learn more, check out <Link to="#">the Eth2 upgrades</Link>.
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview="It’s not accurate to think of Eth2 as a separate blockchain."
              title="Is Eth2 a separate blockchain?"
            >
              <p>
                Think of Eth2 as a series of upgrades being added to improve the
                Ethereum we use today. These upgrades include the creation of a
                new chain called the beacon chain and up to 64 chains known as
                shards.{" "}
              </p>
              <p>
                These are separate to the Ethereum mainnet we use today but
                won’t replace it. Instead mainnet will transition into this
                parallel system that’s being added over time.
              </p>
              <p>
                In other words the Ethereum we use today will eventually embody
                all the features that we’re aiming towards in{" "}
                <Link to="#">the Eth2 vision</Link>.
              </p>
              <p>
                To learn more, check out <Link to="#">the Eth2 upgrades</Link>.
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview="It’s not accurate to think of Eth2 as a separate blockchain."
              title="Is Eth2 a separate blockchain?"
            >
              <p>
                Think of Eth2 as a series of upgrades being added to improve the
                Ethereum we use today. These upgrades include the creation of a
                new chain called the beacon chain and up to 64 chains known as
                shards.{" "}
              </p>
              <p>
                These are separate to the Ethereum mainnet we use today but
                won’t replace it. Instead mainnet will transition into this
                parallel system that’s being added over time.
              </p>
              <p>
                In other words the Ethereum we use today will eventually embody
                all the features that we’re aiming towards in{" "}
                <Link to="#">the Eth2 vision</Link>.
              </p>
              <p>
                To learn more, check out <Link to="#">the Eth2 upgrades</Link>.
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview="It’s not accurate to think of Eth2 as a separate blockchain."
              title="Is Eth2 a separate blockchain?"
            >
              <p>
                Think of Eth2 as a series of upgrades being added to improve the
                Ethereum we use today. These upgrades include the creation of a
                new chain called the beacon chain and up to 64 chains known as
                shards.{" "}
              </p>
              <p>
                These are separate to the Ethereum mainnet we use today but
                won’t replace it. Instead mainnet will transition into this
                parallel system that’s being added over time.
              </p>
              <p>
                In other words the Ethereum we use today will eventually embody
                all the features that we’re aiming towards in{" "}
                <Link to="/en/eth2/vision/">the Eth2 vision</Link>.
              </p>
              <p>
                To learn more, check out{" "}
                <Link to="/en/eth2/beacon-chain/">the Eth2 upgrades</Link>.
              </p>
            </ExpandableCard>
          </LeftColumn>
          <RightColumn>
            <ExpandableCard
              contentPreview="It’s not accurate to think of Eth2 as a separate blockchain."
              title="Is Eth2 a separate blockchain?"
            >
              <p>
                Think of Eth2 as a series of upgrades being added to improve the
                Ethereum we use today. These upgrades include the creation of a
                new chain called the beacon chain and up to 64 chains known as
                shards.{" "}
              </p>
              <p>
                These are separate to the Ethereum mainnet we use today but
                won’t replace it. Instead mainnet will transition into this
                parallel system that’s being added over time.
              </p>
              <p>
                In other words the Ethereum we use today will eventually embody
                all the features that we’re aiming towards in{" "}
                <Link to="/en/eth2/vision/">the Eth2 vision</Link>.
              </p>
              <p>
                To learn more, check out{" "}
                <Link to="/en/eth2/beacon-chain/">the Eth2 upgrades</Link>.
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview="It’s not accurate to think of Eth2 as a separate blockchain."
              title="Is Eth2 a separate blockchain?"
            >
              <p>
                Think of Eth2 as a series of upgrades being added to improve the
                Ethereum we use today. These upgrades include the creation of a
                new chain called the beacon chain and up to 64 chains known as
                shards.{" "}
              </p>
              <p>
                These are separate to the Ethereum mainnet we use today but
                won’t replace it. Instead mainnet will transition into this
                parallel system that’s being added over time.
              </p>
              <p>
                In other words the Ethereum we use today will eventually embody
                all the features that we’re aiming towards in{" "}
                <Link to="#">the Eth2 vision</Link>.
              </p>
              <p>
                To learn more, check out <Link to="#">the Eth2 upgrades</Link>.
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview="It’s not accurate to think of Eth2 as a separate blockchain."
              title="Is Eth2 a separate blockchain?"
            >
              <p>
                Think of Eth2 as a series of upgrades being added to improve the
                Ethereum we use today. These upgrades include the creation of a
                new chain called the beacon chain and up to 64 chains known as
                shards.{" "}
              </p>
              <p>
                These are separate to the Ethereum mainnet we use today but
                won’t replace it. Instead mainnet will transition into this
                parallel system that’s being added over time.
              </p>
              <p>
                In other words the Ethereum we use today will eventually embody
                all the features that we’re aiming towards in{" "}
                <Link to="#">the Eth2 vision</Link>.
              </p>
              <p>
                To learn more, check out <Link to="#">the Eth2 upgrades</Link>.
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview="It’s not accurate to think of Eth2 as a separate blockchain."
              title="Is Eth2 a separate blockchain?"
            >
              <p>
                Think of Eth2 as a series of upgrades being added to improve the
                Ethereum we use today. These upgrades include the creation of a
                new chain called the beacon chain and up to 64 chains known as
                shards.{" "}
              </p>
              <p>
                These are separate to the Ethereum mainnet we use today but
                won’t replace it. Instead mainnet will transition into this
                parallel system that’s being added over time.
              </p>
              <p>
                In other words the Ethereum we use today will eventually embody
                all the features that we’re aiming towards in{" "}
                <Link to="#">the Eth2 vision</Link>.
              </p>
              <p>
                To learn more, check out <Link to="#">the Eth2 upgrades</Link>.
              </p>
            </ExpandableCard>
          </RightColumn>
        </Faq>
      </Content>
      <Divider />
      <Content>
        <TwoColumnContent>
          <Column>
            <H2>Stay up to date</H2>
            <Eth2Articles />
          </Column>
          <Column>
            <H2>Not sure what to do about Eth2?</H2>
            <p>
              Check to see if you need to do anything to get ready for Eth2.{" "}
            </p>
            <p>
              <em>HINT: you probably don’t need to do anything.</em>
            </p>
            <ButtonLink to="#">Check</ButtonLink>
          </Column>
        </TwoColumnContent>
      </Content>
    </Page>
  )
}

export default Eth2IndexPage

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
    doge: file(relativePath: { eq: "eth2/eth2_doge.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
