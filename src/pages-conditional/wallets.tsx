import React from "react"
import { Center } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { GatsbyImage } from "gatsby-plugin-image"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { graphql, PageProps } from "gatsby"

import PageHero from "../components/PageHero"
import Translation from "../components/Translation"
import Callout from "../components/Callout"
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
import FeedbackCard from "../components/FeedbackCard"
import QuizWidget from "../components/Quiz/QuizWidget"

import { getImage, getSrc } from "../utils/image"
import { Context } from "../types"

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
    emoji: ":globe_with_meridians:",
    description: <Translation id="page-wallets-web-browser-extension" />,
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
    link: "https://www.coinbase.com/learn/crypto-basics/how-to-secure-crypto",
  },
  {
    title: <Translation id="page-wallets-how-to-store" />,
    description: "ConsenSys",
    link: "https://media.consensys.net/how-to-store-digital-assets-on-ethereum-a2bfdcf66bd0",
  },
]

const guides = [
  {
    title: (
      <Translation id="additional-reading-how-to-register-an-ethereum-account" />
    ),
    link: "/guides/how-to-register-an-ethereum-account/",
  },
  {
    title: <Translation id="additional-reading-how-to-use-a-wallet" />,
    link: "/guides/how-to-use-a-wallet/",
  },
]

const WalletsPage = ({
  data,
}: PageProps<Queries.WalletsPageQuery, Context>) => {
  const { t } = useTranslation()

  const heroContent = {
    title: t("page-wallets-title"),
    header: t("page-wallets-slogan"),
    subtitle: t("page-wallets-subtitle"),
    image: getImage(data.hero)!,
    alt: t("page-wallets-alt"),
    buttons: [
      {
        to: "/wallets/find-wallet/",
        content: t("page-wallets-find-wallet-link"),
      },
    ],
  }

  return (
    <Page>
      <PageMetadata
        title={t("page-wallets-meta-title")}
        description={t("page-wallets-meta-description")}
        image={getSrc(data.ogImage)}
      />
      <PageHero content={heroContent} isReverse />
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
            </p>
            <CardList content={guides} />
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
          <p>
            <Translation id="page-wallets-types-desc" />
          </p>
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
          <CentralColumn>
            <H2>
              <Translation id="page-wallets-features-title" />
            </H2>
            <SubtitleThree>
              <Translation id="page-wallets-features-desc" />
            </SubtitleThree>
            <ButtonLink to="/wallets/find-wallet/">
              <Translation id="page-wallets-find-wallet-btn" />
            </ButtonLink>
            <FindWallet image={getImage(data.findWallet)!} alt="" />
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
              title={t("page-wallets-take-responsibility")}
              description={t("page-wallets-take-responsibility-desc")}
            />
            <ChecklistItem
              key="1"
              emoji=":white_check_mark:"
              title={t("page-wallets-seed-phrase")}
              description={t("page-wallets-seed-phrase-desc")}
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
              title={t("page-wallets-bookmarking")}
              description={t("page-wallets-bookmarking-desc")}
            />
            <ChecklistItem
              key="3"
              emoji=":white_check_mark:"
              title={t("page-wallets-triple-check")}
              description={t("page-wallets-triple-check-desc")}
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
            alt={t("page-wallets-get-some-alt")}
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
            alt={t("page-wallets-try-dapps-alt")}
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
        <Center w="100%">
          <QuizWidget quizKey="wallets" />
        </Center>
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
  query WalletsPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-wallets", "learn-quizzes", "common"] }
      }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    hero: file(relativePath: { eq: "wallets/find-wallet-hero.png" }) {
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
  }
`
