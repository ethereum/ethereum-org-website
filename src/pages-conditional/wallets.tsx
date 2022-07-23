import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useIntl } from "react-intl"
import { graphql, PageProps } from "gatsby"
import { shuffle } from "lodash"

import PageHero from "../components/PageHero"
import Translation from "../components/Translation"
import Callout from "../components/Callout"
import Card from "../components/Card"
import Link from "../components/Link"
import ButtonLink from "../components/ButtonLink"
import PageMetadata from "../components/PageMetadata"
import HorizontalCard from "../components/HorizontalCard"
import CardList from "../components/CardList"
import {
  CardContainer,
  Content,
  Divider,
  GrayContainer,
  Page,
  StyledCard,
  TwoColumnContent,
} from "../components/SharedStyledComponents"

import { translateMessageId } from "../utils/translations"
import { Context } from "../types"
import FeedbackCard from "../components/FeedbackCard"

const StyledTwoColumnContent = styled(TwoColumnContent)`
  margin-bottom: -2rem;
  margin-top: 2rem;
`

const LeftColumn = styled.div`
  flex: 0 1 50%;
  margin-right: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    max-width: 100%;
    margin-right: 0;
    margin-top: 0;
  }
`

const RightColumn = styled.div`
  flex: 0 1 50%;
  margin-left: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 3rem;
    max-width: 100%;
    margin-left: 0;
  }
`

const StyledRightColumn = styled(RightColumn)`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 0rem;
  }
`

const StyledGrayContainer = styled(GrayContainer)`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 1rem;
  }
`

const SubtitleTwo = styled.div`
  font-size: 1.25rem;
  line-height: 140%;
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.colors.text300};
`

const SubtitleThree = styled.div`
  font-size: 1.25rem;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1.5rem;
  text-align: center;
`

const FindWallet = styled(GatsbyImage)`
  margin-top: 2rem;
  max-width: 800px;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
`

const Intro = styled(Content)`
  padding-bottom: 0;
  h2 {
    margin-bottom: 0;
  }
`

const IntroTwoColumnContent = styled(TwoColumnContent)`
  margin-bottom: 0;
  padding-bottom: 0;
`

const GradientContainer = styled(GrayContainer)`
  background: linear-gradient(
    49.21deg,
    rgba(127, 127, 213, 0.2) 19.87%,
    rgba(134, 168, 231, 0.2) 58.46%,
    rgba(145, 234, 228, 0.2) 97.05%
  );
  margin: 3rem 0rem;
  width: 100%;
`

const ContainerCard = styled(Card)`
  height: 100%;
  justify-content: flex-start;
`

const CodeBox = styled.div`
  background: #000000;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
`

const Code = styled.p`
  font-family: monospace;
  color: #ffffff;
  margin-bottom: 0rem;
`

const ChecklistItem = styled(HorizontalCard)`
  border: 0px;
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
`

const WalletType = styled(HorizontalCard)`
  min-width: 100%;
  margin: 0.5rem 0rem;
  border-radius: 0px;
  align-items: center;
`

const StyledCallout = styled(Callout)`
  flex: 1 1 424px;
  min-height: 100%;
`

const CentralColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`

const CalloutCardContainer = styled(CardContainer)`
  margin-top: 4rem;
`

const H2 = styled.h2`
  /* margin: 0; */
`

const cards = [
  {
    emoji: ":dollar:",
    title: <Translation id="page-wallets-manage-funds" />,
    description: <Translation id="page-wallets-manage-funds-desc" />,
  },
  {
    emoji: ":frame_with_picture:",
    title: <Translation id="page-wallets-your-ethereum-account" />,
    description: <Translation id="page-wallets-your-ethereum-account-desc" />,
  },
  {
    emoji: ":bust_in_silhouette:",
    title: <Translation id="page-wallets-your-login" />,
    description: <Translation id="page-wallets-your-login-desc" />,
  },
]

const types = [
  {
    emoji: ":cd:",
    description: <Translation id="page-wallets-cd" />,
  },
  {
    emoji: ":mobile_phone:",
    description: <Translation id="page-wallets-mobile" />,
  },
  {
    emoji: ":globe_with_meridians:",
    description: <Translation id="page-wallets-web-browser" />,
  },
  {
    emoji: ":desktop_computer:",
    description: <Translation id="page-wallets-desktop" />,
  },
]

const articles = [
  {
    title: <Translation id="page-wallets-protecting-yourself" />,
    description: "MyCrypto",
    link: "https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds",
  },
  {
    title: <Translation id="page-wallets-keys-to-safety" />,
    description: <Translation id="page-wallets-blog" />,
    link: "https://blog.coinbase.com/the-keys-to-keeping-your-crypto-safe-96d497cce6cf",
  },
  {
    title: <Translation id="page-wallets-how-to-store" />,
    description: "ConsenSys",
    link: "https://media.consensys.net/how-to-store-digital-assets-on-ethereum-a2bfdcf66bd0",
  },
]

type Wallet = {
  title: string
  description: string
  link: string
  image: string
  alt: string
} & Partial<Queries.WalletsCsv>

const WalletsPage = ({
  data,
}: PageProps<Queries.WalletsPageQuery, Context>) => {
  const intl = useIntl()
  const [wallets, setWallets] = useState<Array<Wallet>>([])

  useEffect(() => {
    const nodes = data.allWallets.nodes

    // Add fields for CardList
    const cardWallets: Array<Wallet> = nodes.map((node) => {
      return {
        ...node,
        image: getImage(node.image),
        // @ts-ignore
        alt: translateMessageId(`page-find-wallet-${node.id}-logo-alt`, intl),
        title: node.name!,
        description: translateMessageId(
          // @ts-ignore
          `page-find-wallet-description-${node.id}`,
          intl
        ),
        link: node.url!,
      }
    })

    const randomWallets = shuffle(cardWallets)

    setWallets(randomWallets)
  }, [data, intl])

  const cryptoCurious = wallets
    .filter(
      (wallet) =>
        (wallet.has_card_deposits === "TRUE" ||
          wallet.has_explore_dapps === "TRUE") &&
        wallet.has_hardware !== "TRUE"
    )
    .slice(0, 4)

  const cryptoConverted = wallets
    .filter(
      (wallet) =>
        wallet.has_hardware === "TRUE" ||
        wallet.has_high_volume_purchases === "TRUE" ||
        wallet.has_limits_protection === "TRUE"
    )
    .slice(0, 4)

  const heroContent = {
    title: translateMessageId("page-wallets-title", intl),
    header: translateMessageId("page-wallets-slogan", intl),
    subtitle: translateMessageId("page-wallets-subtitle", intl),
    image: getImage(data.hero),
    alt: translateMessageId("page-wallets-alt", intl),
    buttons: [
      {
        to: "/wallets/find-wallet/",
        content: translateMessageId("page-wallets-find-wallet-link", intl),
      },
    ],
  }

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-wallets-meta-title", intl)}
        description={translateMessageId("page-wallets-meta-description", intl)}
        image={getImage(data.ogImage)?.images.fallback.src}
      />
      <PageHero content={heroContent} />
      <StyledGrayContainer>
        <Intro>
          <H2>
            <Translation id="page-wallets-whats-a-wallet" />
          </H2>
        </Intro>
        <IntroTwoColumnContent>
          <LeftColumn>
            <p>
              <Translation id="page-wallets-description" />
            </p>
            <p>
              <Translation id="page-wallets-desc-2" />{" "}
              <Link to="/eth/">
                <Translation id="page-wallets-desc-2-link" />{" "}
              </Link>
            </p>
          </LeftColumn>
          <StyledRightColumn>
            <p>
              <Translation id="page-wallets-desc-3" />
            </p>
            <p>
              <Translation id="page-wallets-desc-4" />
            </p>
          </StyledRightColumn>
        </IntroTwoColumnContent>
        <Content>
          <CardContainer>
            {cards.map((card, idx) => (
              <StyledCard
                key={idx}
                emoji={card.emoji}
                title={card.title}
                description={card.description}
              />
            ))}
          </CardContainer>
        </Content>
      </StyledGrayContainer>
      <StyledTwoColumnContent>
        <LeftColumn>
          <H2>
            <Translation id="page-wallets-accounts-addresses" />
          </H2>
          <p>
            <Translation id="page-wallets-accounts-addresses-desc" />
          </p>
          <ul>
            <li>
              <p>
                <Translation id="page-wallets-ethereum-account" />
              </p>
            </li>
            <li>
              <p>
                <Translation id="page-wallets-accounts-ethereum-addresses" />
              </p>
            </li>
            <li>
              <p>
                <Translation id="page-wallets-ethereum-wallet" />
              </p>
            </li>
          </ul>
          <p>
            <Translation id="page-wallets-most-wallets" />
          </p>
        </LeftColumn>
        <RightColumn>
          <H2>
            <Translation id="page-wallets-types" />
          </H2>
          <div>
            {types.map((type, idx) => (
              <WalletType
                key={idx}
                emoji={type.emoji}
                description={type.description}
                emojiSize={2.5}
              />
            ))}
          </div>
        </RightColumn>
      </StyledTwoColumnContent>
      <GradientContainer>
        <Content>
          <H2>
            <Translation id="page-wallets-get-wallet" />
          </H2>
          <p>
            <Translation id="page-wallets-get-wallet-desc" />
          </p>
          <p>
            <em>
              <Translation id="page-wallets-get-wallet-desc-2" />
            </em>
          </p>
        </Content>
        <TwoColumnContent>
          <LeftColumn>
            <ContainerCard
              emoji=":thinking_face:"
              title={translateMessageId("page-wallets-curious", intl)}
              description={translateMessageId(
                "page-wallets-curious-desc",
                intl
              )}
            >
              <CardList content={cryptoCurious} />
            </ContainerCard>
          </LeftColumn>
          <RightColumn>
            <ContainerCard
              emoji=":whale:"
              title={translateMessageId("page-wallets-converted", intl)}
              description={translateMessageId(
                "page-wallets-converted-desc",
                intl
              )}
            >
              <CardList content={cryptoConverted} />
            </ContainerCard>
          </RightColumn>
        </TwoColumnContent>
        <Content>
          <CentralColumn>
            <Divider />
            <H2>
              <Translation id="page-wallets-features-title" />
            </H2>
            <SubtitleThree>
              <Translation id="page-wallets-features-desc" />
            </SubtitleThree>
            <ButtonLink to="/wallets/find-wallet/">
              <Translation id="page-wallets-find-wallet-btn" />
            </ButtonLink>
            <FindWallet image={getImage(data.findWallet)} alt="" />
          </CentralColumn>
        </Content>
      </GradientContainer>
      <TwoColumnContent>
        <LeftColumn>
          <H2>
            <Translation id="page-wallets-stay-safe" />
          </H2>
          <SubtitleTwo>
            <Translation id="page-wallets-stay-safe-desc" />
          </SubtitleTwo>
          <div>
            <ChecklistItem
              key="0"
              emoji=":white_check_mark:"
              title={translateMessageId(
                "page-wallets-take-responsibility",
                intl
              )}
              description={translateMessageId(
                "page-wallets-take-responsibility-desc",
                intl
              )}
            />
            <ChecklistItem
              key="1"
              emoji=":white_check_mark:"
              title={translateMessageId("page-wallets-seed-phrase", intl)}
              description={translateMessageId(
                "page-wallets-seed-phrase-desc",
                intl
              )}
            >
              <p>
                <Translation id="page-wallets-seed-phrase-example" />
              </p>
              <CodeBox>
                <Code>
                  <Translation id="page-wallets-seed-phrase-snippet" />
                </Code>
              </CodeBox>
              <p>
                <Translation id="page-wallets-seed-phrase-write-down" />
              </p>
            </ChecklistItem>
            <ChecklistItem
              key="2"
              emoji=":white_check_mark:"
              title={translateMessageId("page-wallets-bookmarking", intl)}
              description={translateMessageId(
                "page-wallets-bookmarking-desc",
                intl
              )}
            />
            <ChecklistItem
              key="3"
              emoji=":white_check_mark:"
              title={translateMessageId("page-wallets-triple-check", intl)}
              description={translateMessageId(
                "page-wallets-triple-check-desc",
                intl
              )}
            />
          </div>
        </LeftColumn>
        <RightColumn>
          <H2>
            <Translation id="page-wallets-tips" />
          </H2>
          <SubtitleTwo>
            <Translation id="page-wallets-tips-community" />
          </SubtitleTwo>
          <CardList content={articles} />
        </RightColumn>
      </TwoColumnContent>
      <Content>
        <Divider />
        <H2>
          <Translation id="page-wallets-explore" />
        </H2>
        <CalloutCardContainer>
          <StyledCallout
            image={getImage(data.eth)}
            titleKey="page-wallets-get-some"
            alt={translateMessageId("page-wallets-get-some-alt", intl)}
            descriptionKey="page-wallets-get-some-desc"
          >
            <div>
              <ButtonLink to="/get-eth/">
                <Translation id="page-wallets-get-some-btn" />
              </ButtonLink>
            </div>
          </StyledCallout>
          <StyledCallout
            image={getImage(data.dapps)}
            titleKey="page-wallets-try-dapps"
            alt={translateMessageId("page-wallets-try-dapps-alt", intl)}
            descriptionKey="page-wallets-try-dapps-desc"
          >
            <div>
              <ButtonLink to="/dapps/">
                <Translation id="page-wallets-more-on-dapps-btn" />
              </ButtonLink>
            </div>
          </StyledCallout>
        </CalloutCardContainer>
      </Content>
      <Content>
        <FeedbackCard />
      </Content>
    </Page>
  )
}

export default WalletsPage

export const calloutImage = graphql`
  fragment calloutImage on File {
    childImageSharp {
      gatsbyImageData(
        height: 200
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

export const listImage = graphql`
  fragment listImage on File {
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
  query WalletsPage {
    hero: file(relativePath: { eq: "wallet.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    findWallet: file(relativePath: { eq: "wallets/find-wallet.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 800
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    ogImage: file(relativePath: { eq: "wallet-cropped.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 738
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    eth: file(relativePath: { eq: "eth-logo.png" }) {
      ...calloutImage
    }
    dapps: file(relativePath: { eq: "doge-computer.png" }) {
      ...calloutImage
    }
    allWallets: allWalletsCsv {
      nodes {
        id
        name
        url
        brand_color
        has_mobile
        has_desktop
        has_web
        has_hardware
        has_card_deposits
        has_explore_dapps
        has_defi_integrations
        has_bank_withdrawals
        has_limits_protection
        has_high_volume_purchases
        has_dex_integrations
        has_multisig
        image {
          ...listImage
        }
      }
    }
    timestamp: walletsCsv {
      parent {
        ... on File {
          id
          name
          fields {
            gitLogLatestDate
          }
        }
      }
    }
  }
`
