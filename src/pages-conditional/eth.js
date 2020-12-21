import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { useIntl } from "gatsby-plugin-intl"
import { graphql } from "gatsby"

import { translateMessageId } from "../utils/translations"
import Translation from "../components/Translation"
import ActionCard from "../components/ActionCard"
import ButtonLink from "../components/ButtonLink"
import CalloutBanner from "../components/CalloutBanner"
import CardList from "../components/CardList"
import EthPriceCard from "../components/EthPriceCard"
import EthVideo from "../components/EthVideo"
import InfoBanner from "../components/InfoBanner"
import Link from "../components/Link"
import HorizontalCard from "../components/HorizontalCard"
import PageMetadata from "../components/PageMetadata"
import ProductPageHeader from "../components/ProductPageHeader"
import {
  CardContainer,
  Content,
  Divider,
  GrayContainer,
  Intro,
  LeftColumn,
  RightColumn,
  TwoColumnContent,
  Page,
  StyledCard,
} from "../components/SharedStyledComponents"

const StyledCardContainer = styled(CardContainer)`
  margin-bottom: 2rem;
`

const TokenCard = styled(HorizontalCard)`
  min-width: 100%;
  margin: 0.5rem 0rem;
  border-radius: 0px;
`

const TextDivider = styled.div`
  margin-bottom: 2rem;
  margin-top: 2rem;
  width: 10%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.searchResultBackground};
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    align-self: flex-start;
  }
`

const CentralColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 960px;
  margin: 4rem auto;
`

const CentralActionCard = styled(ActionCard)`
  flex: none;
  margin: 2rem 0;
  .action-card-image-wrapper {
    padding: 1rem;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.s}) {
    display: flex;

    .action-card-image-wrapper {
      min-width: 260px;
    }
    .action-card-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 1rem;

      p {
        margin-bottom: 0;
      }
    }
  }
`

const StyledCalloutBanner = styled(CalloutBanner)`
  margin: 5rem 0;
`

const tokens = [
  {
    emoji: ":scales:",
    title: <Translation id="page-eth-stablecoins" />,
    description: <Translation id="page-eth-stablecoins-desc" />,
  },
  {
    emoji: ":ballot_box_with_ballot:",
    title: <Translation id="page-eth-gov-tokens" />,
    description: <Translation id="page-eth-gov-tokens-desc" />,
  },
  {
    emoji: ":pile_of_poo:",
    title: <Translation id="page-eth-shit-coins" />,
    description: <Translation id="page-eth-shit-coins-desc" />,
  },
  {
    emoji: ":frame_with_picture:",
    title: <Translation id="page-eth-collectible-tokens" />,
    description: <Translation id="page-eth-collectible-tokens-desc" />,
  },
]

const benefits = [
  {
    emoji: ":woman_technologist:",
    title: <Translation id="page-eth-yours" />,
    description: <Translation id="page-eth-yours-desc" />,
  },
  {
    emoji: ":shield:",
    title: <Translation id="page-eth-cryptography" />,
    description: <Translation id="page-eth-cryptography-desc" />,
  },
  {
    emoji: ":handshake:",
    title: <Translation id="page-eth-p2p-payments" />,
    description: <Translation id="page-eth-p2p-payments-desc" />,
  },
  {
    emoji: ":money_with_wings:",
    title: <Translation id="page-eth-no-centralized" />,
    description: <Translation id="page-eth-no-centralized-desc" />,
  },
  {
    emoji: ":signal_strength:",
    title: <Translation id="page-eth-open" />,
    description: <Translation id="page-eth-open-desc" />,
  },
  {
    emoji: ":shortcake:",
    title: <Translation id="page-eth-flexible-amounts" />,
    description: <Translation id="page-eth-flexible-amounts-desc" />,
  },
]

const cardListContent = [
  {
    link: "https://docs.ethhub.io/ethereum-basics/monetary-policy/",
    title: <Translation id="page-eth-monetary-policy" />,
    description: "EthHub",
    caption: <Translation id="page-eth-ethhub-caption" />,
  },
  {
    link: "https://medium.com/ethhub/why-ether-is-valuable-2b4e39e01eb3",
    title: <Translation id="page-eth-value" />,
    description: "Anthony Sassano",
    caption: <Translation id="page-eth-last-updated" />,
  },
  {
    link:
      "https://support.mycrypto.com/how-to/getting-started/how-to-buy-ether-with-usd",
    title: <Translation id="page-eth-how-to-buy" />,
    description: "MyCrypto",
    caption: <Translation id="page-eth-how-to-buy-caption" />,
  },
]

const WhatIsEthereumPage = ({ props, data }) => {
  const intl = useIntl()

  const whatIsEtherHeader = [
    {
      title: translateMessageId("page-eth-whats-eth", intl),
      header: translateMessageId("page-eth-currency-for-future", intl),
      subtitle: translateMessageId("page-eth-is-money", intl),
      image: data.eth.childImageSharp.fluid,
      alt: translateMessageId(
        "Illustration of a group of people marvelling at an ether (ETH) glyph in awe",
        intl
      ),
      buttons: [
        {
          content: translateMessageId("page-eth-get-get-btn", intl),
          path: "/get-eth/",
        },
      ],
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-eth-whats-eth-meta-title", intl)}
        description={translateMessageId("page-eth-whats-eth-meta-desc", intl)}
        image={data.ogImage.childImageSharp.fixed.src}
      />
      <ProductPageHeader content={whatIsEtherHeader}>
        <EthPriceCard isLeftAlign />
      </ProductPageHeader>
      <GrayContainer>
        <Content>
          <Intro>
            <p>
              <Translation id="page-eth-description" />{" "}
            </p>
          </Intro>
          <StyledCardContainer>
            {benefits.map((benefits, idx) => {
              return (
                <StyledCard
                  key={idx}
                  emoji={benefits.emoji}
                  title={benefits.title}
                  description={benefits.description}
                />
              )
            })}
          </StyledCardContainer>
          <InfoBanner emoji=":wave:" shouldCenter={true}>
            <b>
              <Translation id="page-eth-buy-some" />
            </b>{" "}
            <Translation id="page-eth-buy-some-desc" />{" "}
            <Link to="/what-is-ethereum/">
              <Translation id="page-eth-more-on-ethereum-link" />
            </Link>
            <Translation id="page-eth-period" />
          </InfoBanner>
        </Content>
      </GrayContainer>
      <Content>
        <CentralColumn>
          <h2>
            <Translation id="page-eth-whats-unique" />
          </h2>
          <p>
            <Translation id="page-eth-whats-unique-desc" />
          </p>
          <EthVideo alt={translateMessageId("page-eth-video-alt", intl)} />
          <div>
            <h4>
              <Translation id="page-eth-fuels" />
            </h4>
            <p>
              <Translation id="page-eth-fuels-desc" />
            </p>
            <p>
              <Translation id="page-eth-fuels-desc-2" />
            </p>
            <p>
              <Translation id="page-eth-fuels-desc-3" />{" "}
              <strong>
                <Translation id="page-eth-powers-ethereum" />
              </strong>
              .{" "}
              <Link to="/developers/docs/consensus-mechanisms/pow/mining/">
                <Translation id="page-eth-mining-link" />
              </Link>
            </p>
            <p>
              <Translation id="page-eth-fuels-staking" />{" "}
              <Link to="/eth2/staking/">
                <Translation id="page-eth-fuels-more-staking" />
              </Link>
            </p>
          </div>
          <CentralActionCard
            to="/what-is-ethereum/"
            title={translateMessageId("page-eth-whats-ethereum", intl)}
            description={translateMessageId(
              "page-eth-whats-ethereum-desc",
              intl
            )}
            image={data.ethereum.childImageSharp.fixed}
          />
          <TextDivider />
          <div>
            <h4>
              <Translation id="page-eth-underpins" />
            </h4>
            <p>
              <Translation id="page-eth-underpins-desc" />
            </p>
            <p>
              <Translation id="page-eth-underpins-desc-2" />
            </p>
          </div>
          <TextDivider />
          <div>
            <h4>
              <Translation id="page-eth-uses" />
            </h4>
            <p>
              <Translation id="page-eth-uses-desc" />
            </p>
            <p>
              <Translation id="page-eth-uses-desc-2" />{" "}
            </p>
            <ul>
              <li>
                <Link to="https://sablier.finance">
                  <Translation id="page-eth-stream-link" />
                </Link>{" "}
                – <Translation id="page-eth-uses-desc-3" />
              </li>
              <li>
                <Link to="/get-eth/#dex">
                  <Translation id="page-eth-trade-link-2" />
                </Link>{" "}
                – <Translation id="page-eth-uses-desc-4" />
              </li>
              <li>
                <Link to="https://app.compound.finance/">
                  <Translation id="page-eth-earn-interest-link" />
                </Link>{" "}
                – <Translation id="page-eth-uses-desc-5" />
              </li>
              <li>
                <Link to="/stablecoins/">
                  <Translation id="page-eth-stablecoins-link" />
                </Link>{" "}
                – <Translation id="page-eth-uses-desc-6" />
              </li>
            </ul>
          </div>
          <Divider />
        </CentralColumn>
        <StyledCalloutBanner
          title={translateMessageId("page-eth-where-to-buy", intl)}
          description={translateMessageId("page-eth-where-to-buy-desc", intl)}
          image={data.ethCat.childImageSharp.fluid}
          alt={translateMessageId("page-eth-cat-img-alt", intl)}
          maxImageWidth={300}
        >
          <div>
            <ButtonLink to="/get-eth/">
              <Translation id="page-eth-get-eth-btn" />
            </ButtonLink>
          </div>
        </StyledCalloutBanner>
      </Content>

      <TwoColumnContent>
        <LeftColumn>
          <h3>
            <Translation id="page-eth-has-value" />
          </h3>
          <p>
            <Translation id="page-eth-has-value-desc" />
          </p>
          <p>
            <Translation id="page-eth-has-value-desc-2" />
          </p>
          <p>
            <Translation id="page-eth-has-value-desc-3" />
          </p>
          <p>
            <Translation id="page-eth-has-value-desc-4" />
          </p>
          <p>
            <Translation id="page-eth-has-value-desc-5" />
          </p>
        </LeftColumn>
        <RightColumn>
          <CardList content={cardListContent} />
        </RightColumn>
      </TwoColumnContent>
      <TwoColumnContent id="tokens">
        <LeftColumn>
          <h3>
            <Translation id="page-eth-not-only-crypto" />
          </h3>
          <p>
            <Translation id="page-eth-not-only-crypto-desc" />{" "}
          </p>
          <p>
            <Translation id="page-eth-not-only-crypto-desc-2" />
          </p>
          <p id="tokens">
            {" "}
            <Translation id="page-eth-not-only-crypto-desc-3" />{" "}
          </p>
          <Link to="https://docs.ethhub.io/guides/a-straightforward-guide-erc20-tokens/">
            <Translation id="page-eth-tokens-link" />
          </Link>
          <br />
          <Link to="https://docs.ethhub.io/built-on-ethereum/erc-token-standards/erc721/#summary">
            <Translation id="page-eth-non-fungible-tokens-link" />
          </Link>
        </LeftColumn>
        <RightColumn>
          <h3>
            <Translation id="page-eth-popular-tokens" />
          </h3>
          {tokens.map((token, idx) => {
            return (
              <TokenCard
                key={idx}
                emoji={token.emoji}
                title={token.title}
                description={token.description}
                size={5}
              />
            )
          })}
        </RightColumn>
      </TwoColumnContent>
    </Page>
  )
}

export default WhatIsEthereumPage

export const query = graphql`
  query {
    banner: file(relativePath: { eq: "home/eth-tokens.png" }) {
      childImageSharp {
        fluid(maxHeight: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    dapps: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        fixed(width: 372) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    eth: file(relativePath: { eq: "eth.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ogImage: file(relativePath: { eq: "eth.png" }) {
      childImageSharp {
        fixed(width: 1200) {
          src
        }
      }
    }
    ethereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        fixed(width: 220) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    ethCat: file(relativePath: { eq: "eth-gif-cat.png" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
