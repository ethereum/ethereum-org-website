import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Callout from "../../components/Callout"
import Card from "../../components/Card"
import WalletTable from "../../components/WalletTable"
import Button from "../../components/Button"
import Breadcrumbs from "../../components/Breadcrumbs"

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin: 5rem auto 0;
`

const Content = styled.div`
  padding: 1rem 2rem;
  width: 100%;
  margin-top: 3rem;
`
const HeroContent = styled(Content)`
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    padding: 1rem 2rem 2rem;
  }
`

const Slogan = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 140%;
`

const Title = styled.h1`
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.textSidebar};
`

const Subtitle = styled.div`
  font-size: 20px;
  line-height: 140%;
  text-align: center;
  color: ${(props) => props.theme.colors.text200};
`

const SubtitleTwo = styled.div`
  font-size: 20px;
  line-height: 140%;
  margin-bottom: 4rem;
  color: ${(props) => props.theme.colors.text300};
`

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -1rem;
  margin-right: -1rem;
  margin-bottom: 3rem;
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

const GradientContainer = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.cardGradient};
  padding: 3rem 2rem;
  border-top: 1px solid ${(props) => props.theme.colors.white700};
  border-bottom: 1px solid ${(props) => props.theme.colors.white700};
`

const FindWalletPage = ({ data }) => {
  const cards = [
    {
      emoji: ":fuel_pump:",
      title: "No transaction fees",
      description:
        "Your wallet will pay some of your transaction fees for you.",
    },
    {
      emoji: ":compass:",
      title: "Explore dapps",
      description:
        "These wallets are designed to help you connect to Ethereum dapps. ",
    },
    {
      emoji: ":credit_card:",
      title: "Buy ETH with a card",
      description:
        "Buy ETH directly from your wallet with a bank card. Geographical restrictions may apply.",
    },
    {
      emoji: ":money_with_wings:",
      title: "Access to financial tools",
      description: "Borrow, lend and earn interest directly from your wallet.",
    },
    {
      emoji: ":credit_card:",
      title: "Withdraw to card",
      description:
        "You can cash out your ETH straight to your card without going through an exchange.",
    },
    {
      emoji: ":shield:",
      title: "Limits protection",
      description:
        "Safeguard your assets by setting limits that prevent your account being drained.",
    },
    {
      emoji: ":whale:",
      title: "High-volume purchases",
      description:
        "If you want to hold a lot of ETH, choose a wallet that lets you buy more than $2000 ETH at a time.",
    },
    {
      emoji: ":repeat:",
      title: "Decentralized token swaps",
      description:
        "Trade between ETH and other tokens directly from your wallet.",
    },
    {
      emoji: ":busts_in_silhouette:",
      title: "Multi-signature accounts",
      description:
        "For extra security, multi-signature wallets require more than one account to authorise transactions.",
    },
  ]
  const crumbs = [
    {
      link: "/",
      text: "Home",
    },
    {
      link: "/wallets/",
      text: "Wallets",
    },
  ]
  return (
    <Page>
      <HeroContent>
        <Slogan>Find a wallet</Slogan>
        <Subtitle>
          Wallets have lots of optional features which you might like.
        </Subtitle>
        <SubtitleTwo>
          So choose your wallet based on the feature you want.
        </SubtitleTwo>
      </HeroContent>
      <Content>
        <h2>Wallet features</h2>
        <CardContainer>
          {cards.map((card, idx) => {
            return (
              <StyledCard
                key={idx}
                emoji={card.emoji}
                title={card.title}
                description={card.description}
              />
            )
          })}
        </CardContainer>
      </Content>
      <GradientContainer>
        <h2>Choose by feature</h2>
        <WalletTable />
      </GradientContainer>
      <Callout
        image={data.dapps.childImageSharp.fixed}
        alt=""
        title="Use your ETH"
        description="Now that you own some ETH, check out the Ethereum applications (dapps) that are out there. There’s apps for finance, social media, gaming and lots of other categories."
      >
        <Button to="/en/dapps">Check out dapps</Button>
      </Callout>
    </Page>
  )
}

export default FindWalletPage

export const query = graphql`
  query {
    dapps: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        fixed(width: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
