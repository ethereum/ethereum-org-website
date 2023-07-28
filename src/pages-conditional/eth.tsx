import React, { ComponentProps } from "react"
import {
  Box,
  Center,
  Flex,
  FlexProps,
  Heading,
  HeadingProps,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { graphql, PageProps } from "gatsby"

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
import FeedbackCard from "../components/FeedbackCard"
import QuizWidget from "../components/Quiz/QuizWidget"
import Card from "../components/Card"

import { getImage, getSrc } from "../utils/image"
import type { ChildOnlyProp, Context } from "../types"

const Page = (props: ChildOnlyProp) => (
  <Flex
    direction="column"
    align="center"
    w="full"
    my={0}
    mx="auto"
    {...props}
  />
)

const Content = (props: ChildOnlyProp) => (
  <Box w="full" px={8} py={4} {...props} />
)

const Divider = () => (
  <Box my={16} mx={0} w="10%" h={1} backgroundColor="homeDivider" />
)

const GrayContainer = (props: ChildOnlyProp) => (
  <Box
    width="full"
    py={16}
    mt={8}
    background="grayBackground"
    boxShadow="inset 0px 1px 0px var(--eth-colors-tableItemBoxShadow)"
    {...props}
  />
)

const Intro = (props: ChildOnlyProp) => (
  <Box maxW="608px" mb={{ base: 12, sm: 16 }} {...props} />
)

const StyledCard = (props: ComponentProps<typeof Card>) => (
  <Card
    m={4}
    p={6}
    flex="1 0 30%"
    minW="280px"
    maxW={{ base: "full", md: "46%", lg: "31%" }}
    {...props}
  />
)

const Slogan = (props: ChildOnlyProp) => (
  <Text
    textStyle="normal"
    fontWeight="normal"
    fontSize="2rem"
    lineHeight={1.4}
    {...props}
  />
)

const Title = (props: ChildOnlyProp) => (
  <Heading
    as="h1"
    fontSize="sm"
    lineHeight={1.4}
    letterSpacing="0.04em"
    fontWeight="500"
    mb={4}
    mt={0}
    textTransform="uppercase"
    color="textTableOfContents"
    {...props}
  />
)

const Subtitle = (props: ChildOnlyProp) => (
  <Text fontSize="xl" lineHeight={1.4} color="text200" {...props} />
)

export const TwoColumnContent = (props: FlexProps) => (
  <Flex
    w="full"
    direction={{ base: "column", lg: "row" }}
    justify="space-between"
    p={8}
    mb={12}
    {...props}
  />
)

export const LeftColumn = (props: ChildOnlyProp) => (
  <Box
    flex="0 0 50%"
    maxW={{ base: "full", lg: "75%" }}
    me={{ lg: 16 }}
    {...props}
  />
)

export const RightColumn = (props: ChildOnlyProp) => (
  <Flex
    flex="0 1 50%"
    direction="column"
    justify="center"
    maxW={{ base: "full", lg: "75%" }}
    mt={{ base: 12, lg: 0 }}
    {...props}
  />
)

const SubtitleTwo = (props: ChildOnlyProp) => (
  <Text fontSize="xl" lineHeight={1.4} color="text300" mb={8} {...props} />
)

const HeroContainer = (props: ChildOnlyProp) => (
  <Flex
    align="center"
    justify="space-between"
    direction={{ base: "column-reverse", md: "row" }}
    {...props}
  />
)

const Hero = (props: ChildOnlyProp) => (
  <Box
    flex="1 1 100%"
    maxW="800px"
    bgSize="cover"
    bgRepeat="no-repeat"
    ms={{ base: 0, md: 8 }}
    {...props}
  />
)

const Header = (props: ChildOnlyProp) => (
  <Box
    as="header"
    flex="1 1 50%"
    minW="300px"
    mt={{ base: 6, md: 32 }}
    {...props}
  />
)

const H2 = (prop: HeadingProps) => (
  <Heading
    fontSize={{ base: "2xl", md: "2rem" }}
    lineHeight={1.4}
    mt={0}
    {...prop}
  />
)

const H3 = (props: HeadingProps) => (
  <Heading
    as="h3"
    fontSize={{ base: "xl", m: "2xl" }}
    lineHeight={1.4}
    {...props}
  />
)

const H4 = (props: HeadingProps) => (
  <Heading
    as="h4"
    fontSize={{ base: "md", md: "xl" }}
    fontWeight={600}
    lineHeight={1.4}
    {...props}
  />
)

const CardContainer = (props: FlexProps) => (
  <Flex wrap="wrap" mx={-4} {...props} />
)

const TokenCard = (props: ComponentProps<typeof HorizontalCard>) => (
  <HorizontalCard minW="full" my={2} mx={0} borderRadius={0} {...props} />
)

const TextDivider = () => (
  <Box
    w="10%"
    h="1px"
    bg="searchResultBackground"
    my={8}
    alignSelf={{ lg: "flex-start" }}
  />
)

const CentralColumn = (props: ChildOnlyProp) => (
  <Flex
    direction="column"
    align="center"
    maxW="960px"
    my={16}
    mx="auto"
    {...props}
  />
)

const CentralActionCard = (props: ComponentProps<typeof ActionCard>) => (
  <ActionCard
    display={{ base: "block", sm: "flex" }}
    flex="none"
    my={8}
    mx={0}
    sx={{
      ".action-card-image-wrapper": {
        p: 4,
        minW: { sm: "260px" },
      },
      ".action-card-content": {
        display: { sm: "flex" },
        justifyContent: { sm: "center" },
        flexDirection: { sm: "column" },
        ml: { sm: 4 },
      },
      p: {
        mb: { sm: 0 },
      },
    }}
    {...props}
  />
)

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

const tokenLinks = [
  {
    link: "/stablecoins/",
    caption: "",
    title: <Translation id="page-eth-tokens-stablecoins" />,
    description: <Translation id="page-eth-tokens-stablecoins-description" />,
  },
  {
    link: "/defi/",
    caption: "",
    title: <Translation id="page-eth-tokens-defi" />,
    description: <Translation id="page-eth-tokens-defi-description" />,
  },
  {
    link: "/nft/",
    caption: "",
    title: <Translation id="page-eth-tokens-nft" />,
    description: <Translation id="page-eth-tokens-nft-description" />,
  },
  {
    link: "/dao/",
    caption: "",
    title: <Translation id="page-eth-tokens-dao" />,
    description: <Translation id="page-eth-tokens-dao-description" />,
  },
]

const cardListContent = [
  {
    link: "https://medium.com/ethhub/why-ether-is-valuable-2b4e39e01eb3",
    title: <Translation id="page-eth-value" />,
    description: "Anthony Sassano",
    caption: <Translation id="page-eth-last-updated" />,
  },
  {
    link: "https://support.mycrypto.com/how-to/getting-started/how-to-buy-ether-with-usd",
    title: <Translation id="page-eth-how-to-buy" />,
    description: "MyCrypto",
    caption: <Translation id="page-eth-how-to-buy-caption" />,
  },
]

const EthPage = (props: PageProps<Queries.EthPageQuery, Context>) => {
  const { t } = useTranslation()
  const data = props.data
  return (
    <Page>
      <PageMetadata
        title={t("page-eth-whats-eth-meta-title")}
        description={t("page-eth-whats-eth-meta-desc")}
        image={getSrc(data.ogImage)}
      />
      <Content>
        <HeroContainer>
          <Header>
            <Title>
              <Translation id="page-eth-whats-eth" />
            </Title>
            <Slogan>
              <Translation id="page-eth-currency-for-future" />
            </Slogan>
            <Subtitle>
              <Translation id="page-eth-is-money" />
            </Subtitle>
            <SubtitleTwo>
              <Translation id="page-eth-currency-for-apps" />
            </SubtitleTwo>
            <EthPriceCard isLeftAlign={false} mb={8} />
            <ButtonLink to="/get-eth/">
              <Translation id="page-eth-button-buy-eth" />
            </ButtonLink>
          </Header>
          <Hero>
            <GatsbyImage
              image={getImage(data.eth)!}
              alt={t("page-eth-whats-eth-hero-alt")}
              loading="eager"
            />
          </Hero>
        </HeroContainer>
      </Content>
      <GrayContainer>
        <Content>
          <Intro>
            <Text>
              <Translation id="page-eth-description" />{" "}
            </Text>
          </Intro>
          <CardContainer mb={8}>
            {benefits.map((benefits, idx) => (
              <StyledCard
                key={idx}
                emoji={benefits.emoji}
                title={benefits.title}
                description={benefits.description}
              />
            ))}
          </CardContainer>
          <InfoBanner emoji=":wave:" shouldCenter>
            <Text as="b">
              <Translation id="page-eth-buy-some" />
            </Text>{" "}
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
          <H2>
            <Translation id="page-eth-whats-unique" />
          </H2>
          <Text>
            <Translation id="page-eth-whats-unique-desc" />
          </Text>
          <EthVideo />
          <Box>
            <H4>
              <Translation id="page-eth-fuels" />
            </H4>
            <Text>
              <Translation id="page-eth-fuels-desc" />
            </Text>
            <Text>
              <Translation id="page-eth-fuels-desc-2" />
            </Text>
            <Text>
              <Translation id="page-eth-fuels-desc-3" />{" "}
              <Text as="strong">
                <Translation id="page-eth-powers-ethereum" />
              </Text>
              <Translation id="page-eth-period" />
            </Text>
            <Text>
              <Translation id="page-eth-fuels-staking" />{" "}
              <Link to="/staking/">
                <Translation id="page-eth-fuels-more-staking" />
              </Link>
            </Text>
          </Box>
          <CentralActionCard
            to="/what-is-ethereum/"
            title={t("page-eth-whats-ethereum")}
            description={t("page-eth-whats-ethereum-desc")}
            image={getImage(data.ethereum)!}
          />
          <TextDivider />
          <Box>
            <H4>
              <Translation id="page-eth-underpins" />
            </H4>
            <Text>
              <Translation id="page-eth-underpins-desc" />
            </Text>
            <Text>
              <Translation id="page-eth-underpins-desc-2" />
            </Text>
            <CentralActionCard
              to="/defi/"
              title={t("page-eth-whats-defi")}
              description={t("page-eth-whats-defi-description")}
              image={getImage(data.defi)!}
            />
          </Box>
          <TextDivider />
          <Box>
            <H4>
              <Translation id="page-eth-uses" />
            </H4>
            <Text>
              <Translation id="page-eth-uses-desc" />
            </Text>
            <Text>
              <Translation id="page-eth-uses-desc-2" />{" "}
            </Text>
            <UnorderedList>
              <ListItem>
                <Link to="https://sablier.com">
                  <Translation id="page-eth-stream-link" />
                </Link>{" "}
                – <Translation id="page-eth-uses-desc-3" />
              </ListItem>
              <ListItem>
                <Link to="/get-eth/#dex">
                  <Translation id="page-eth-trade-link-2" />
                </Link>{" "}
                – <Translation id="page-eth-uses-desc-4" />
              </ListItem>
              <ListItem>
                <Link to="https://app.compound.finance/">
                  <Translation id="page-eth-earn-interest-link" />
                </Link>{" "}
                – <Translation id="page-eth-uses-desc-5" />
              </ListItem>
              <ListItem>
                <Link to="/stablecoins/">
                  <Translation id="page-eth-stablecoins-link" />
                </Link>{" "}
                – <Translation id="page-eth-uses-desc-6" />
              </ListItem>
            </UnorderedList>
          </Box>
          <Divider />
        </CentralColumn>
        <CalloutBanner
          my={20}
          mx={0}
          titleKey={"page-eth-where-to-buy"}
          descriptionKey={"page-eth-where-to-buy-desc"}
          image={getImage(data.ethCat)!}
          alt={t("page-eth-cat-img-alt")}
          maxImageWidth={300}
        >
          <Box>
            <ButtonLink to="/get-eth/">
              <Translation id="page-eth-get-eth-btn" />
            </ButtonLink>
          </Box>
        </CalloutBanner>
      </Content>

      <TwoColumnContent>
        <LeftColumn>
          <H3>
            <Translation id="page-eth-has-value" />
          </H3>
          <Text>
            <Translation id="page-eth-has-value-desc" />
          </Text>
          <Text>
            <Translation id="page-eth-has-value-desc-2" />
          </Text>
          <Text>
            <Translation id="page-eth-has-value-desc-3" />
          </Text>
          <Text>
            <Translation id="page-eth-has-value-desc-4" />
          </Text>
          <Text>
            <Translation id="page-eth-has-value-desc-5" />
          </Text>
        </LeftColumn>
        <RightColumn>
          <CardList content={cardListContent} />
        </RightColumn>
      </TwoColumnContent>
      <TwoColumnContent id="tokens" align="flex-start">
        <LeftColumn>
          <H3>
            <Translation id="page-eth-not-only-crypto" />
          </H3>
          <Text>
            <Translation id="page-eth-not-only-crypto-desc" />{" "}
          </Text>
          <Text>
            <Translation id="page-eth-not-only-crypto-desc-2" />
          </Text>
          <H4 fontWeight="normal">
            <Translation id="page-eth-more-on-tokens" />
          </H4>
          <CardList content={tokenLinks} />
        </LeftColumn>
        <RightColumn>
          <H3>
            <Translation id="page-eth-popular-tokens" />
          </H3>
          {tokens.map((token, idx) => (
            <TokenCard
              key={idx}
              emoji={token.emoji}
              title={token.title}
              description={token.description}
              emojiSize={5}
            />
          ))}
        </RightColumn>
      </TwoColumnContent>
      <Content>
        <Center w="100%">
          <QuizWidget quizKey="what-is-ether" />
        </Center>
      </Content>
      <Content>
        <FeedbackCard />
      </Content>
    </Page>
  )
}

export default EthPage

export const query = graphql`
  query EthPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-eth", "learn-quizzes", "common"] }
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
    eth: file(relativePath: { eq: "eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 800
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    ogImage: file(relativePath: { eq: "eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 1200
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    ethereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 220
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    defi: file(relativePath: { eq: "finance_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 220
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    ethCat: file(relativePath: { eq: "eth-gif-cat.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 600
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
