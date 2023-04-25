import React from "react"
import {
  Center,
  Heading,
  Box,
  Flex,
  BoxProps,
  Text,
  Img,
} from "@chakra-ui/react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { graphql, PageProps } from "gatsby"

import PageHero from "../components/PageHero"
import Translation from "../components/Translation"
import Callout from "../components/Callout"
import ButtonLink from "../components/ButtonLink"
import PageMetadata from "../components/PageMetadata"
import HorizontalCard, {
  IProps as HorizontalCardProps,
} from "../components/HorizontalCard"
import CardList from "../components/CardList"
import { StyledCard } from "../components/SharedStyledComponents"
import FeedbackCard from "../components/FeedbackCard"
import QuizWidget from "../components/Quiz/QuizWidget"

import { getImage, getSrc } from "../utils/image"
import type { ChildOnlyProp, Context } from "../types"

const GrayContainer = (props: BoxProps) => (
  <Box
    width="full"
    py={16}
    px={0}
    mt={{ base: 4, lg: 8 }}
    background="grayBackground"
    boxShadow="inset 0px 1px 0px var(--eth-colors-tableItemBoxShadow)"
    {...props}
  />
)

const Content = (props: BoxProps) => <Box py={4} px={8} w="full" {...props} />

const TwoColumnContent = (props: BoxProps) => (
  <Content
    display="flex"
    justifyContent="space-between"
    p={8}
    mb={12}
    flexDirection={{ base: "column", lg: "row" }}
    {...props}
  />
)

const Intro = (props: ChildOnlyProp) => (
  <Content pb={0} sx={{ h2: { mb: 0 } }} {...props} />
)

const LeftColumn = (props: BoxProps) => (
  <Box flex="0 1 50%" mr={{ base: 0, lg: 8 }} maxW="full" {...props} />
)

const RightColumn = (props: BoxProps) => (
  <Box flex="0 1 50%" ml={{ lg: 8 }} maxW="full" {...props} />
)

const ChecklistItem = (props: HorizontalCardProps) => (
  <HorizontalCard
    border={0}
    display="flex"
    alignItems="flex-start"
    mb={4}
    {...props}
  />
)

const H2 = (props: ChildOnlyProp) => (
  <Heading fontSize={{ base: "2xl", md: "2rem" }} lineHeight={1.4} {...props} />
)

const CalloutCardContainer = (props: ChildOnlyProp) => (
  <CardContainer mt={16} {...props} />
)
const CardContainer = (props: BoxProps) => (
  <Box
    display={"flex"}
    flexWrap={"wrap"}
    marginLeft={-4}
    marginRight={-4}
    {...props}
  />
)

const Divider = (props: BoxProps) => (
  <Box my={16} w="10%" h="0.25rem" bgColor="homeDivider" {...props} />
)

const Page = (props: BoxProps) => (
  <Flex direction="column" align="center" width="full" m="0 auto" {...props} />
)

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
        matomo: {
          eventCategory: "wallet hero buttons",
          eventAction: "click",
          eventName: "find wallet",
        },
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
      <GrayContainer>
        <Intro>
          <H2>
            <Translation id="page-wallets-whats-a-wallet" />
          </H2>
        </Intro>
        <TwoColumnContent mb={0}>
          <Box
            flexGrow="0"
            flexShrink="1"
            flexBasis="50%"
            mr={{ base: 0, lg: 8 }}
            mt={{ lg: 0 }}
            maxWidth={{ lg: "100%" }}
          >
            <Text>
              <Translation id="page-wallets-description" />
            </Text>
            <Text>
              <Translation id="page-wallets-desc-2" />{" "}
            </Text>
            <CardList content={guides} mb={{ base: 6, lg: 0 }} />
          </Box>
          <RightColumn>
            <Text>
              <Translation id="page-wallets-desc-3" />
            </Text>
            <Text>
              <Translation id="page-wallets-desc-4" />
            </Text>
          </RightColumn>
        </TwoColumnContent>
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
      </GrayContainer>
      <TwoColumnContent marginBottom={-8} marginTop={8}>
        <LeftColumn>
          <H2>
            <Translation id="page-wallets-accounts-addresses" />
          </H2>
          <Text>
            <Translation id="page-wallets-accounts-addresses-desc" />
          </Text>
          <ul>
            <li>
              <Text>
                <Translation id="page-wallets-ethereum-account" />
              </Text>
            </li>
            <li>
              <Text>
                <Translation id="page-wallets-accounts-ethereum-addresses" />
              </Text>
            </li>
            <li>
              <Text>
                <Translation id="page-wallets-ethereum-wallet" />
              </Text>
            </li>
          </ul>
          <Text>
            <Translation id="page-wallets-most-wallets" />
          </Text>
        </LeftColumn>
        <RightColumn mt={{ base: 12, lg: 0 }}>
          <H2>
            <Translation id="page-wallets-types" />
          </H2>
          <Text>
            <Translation id="page-wallets-types-desc" />
          </Text>
          <Box>
            {types.map((type, idx) => (
              <HorizontalCard
                minWidth="100%"
                marginTop={2}
                marginBottom={2}
                marginLeft={0}
                marginRight={0}
                key={idx}
                emoji={type.emoji}
                description={type.description}
                emojiSize={2.5}
              />
            ))}
          </Box>
        </RightColumn>
      </TwoColumnContent>
      <GrayContainer
        my={12}
        bgGradient="linear-gradient(49.21deg, rgba(127, 127, 213, 0.2) 19.87%,
    rgba(134, 168, 231, 0.2) 58.46%,
    rgba(145, 234, 228, 0.2) 97.05%)"
      >
        <Content>
          <Flex flexDirection="column" alignItems="center" mb="8">
            <H2>
              <Translation id="page-wallets-features-title" />
            </H2>
            <Box
              fontSize="xl"
              lineHeight={1.4}
              color="text"
              textAlign="center"
              mb={6}
            >
              <Translation id="page-wallets-features-desc" />
            </Box>
            <ButtonLink to="/wallets/find-wallet/">
              <Translation id="page-wallets-find-wallet-btn" />
            </ButtonLink>
            <Img
              as={GatsbyImage}
              image={getImage(data.findWallet)!}
              alt=""
              mt={8}
              maxW="800px"
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
              w="full"
            />
          </Flex>
        </Content>
      </GrayContainer>
      <TwoColumnContent>
        <LeftColumn>
          <H2>
            <Translation id="page-wallets-stay-safe" />
          </H2>
          <Box fontSize="xl" lineHeight={1.4} mb={6} color="text300">
            <Translation id="page-wallets-stay-safe-desc" />
          </Box>
          <Box>
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
              <Text>
                <Translation id="page-wallets-seed-phrase-example" />
              </Text>
              <Box bg="black" p={2} mb={4} borderRadius="base">
                <Text fontFamily="monospace" fontSize="sm" color="white" mb={0}>
                  <Translation id="page-wallets-seed-phrase-snippet" />
                </Text>
              </Box>
              <Text>
                <Translation id="page-wallets-seed-phrase-write-down" />
              </Text>
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
          </Box>
        </LeftColumn>
        <RightColumn mt={{ base: 12, lg: 0 }}>
          <H2>
            <Translation id="page-wallets-tips" />
          </H2>
          <Box fontSize="xl" lineHeight={1.4} color="text300" mb={6}>
            <Translation id="page-wallets-tips-community" />
          </Box>
          <CardList content={articles} />
        </RightColumn>
      </TwoColumnContent>
      <Content>
        <Divider />
        <H2>
          <Translation id="page-wallets-explore" />
        </H2>
        <CalloutCardContainer>
          <Callout
            flex="1 1 424px"
            minH="full"
            image={getImage(data.eth)}
            titleKey="page-wallets-get-some"
            alt={t("page-wallets-get-some-alt")}
            descriptionKey="page-wallets-get-some-desc"
          >
            <Box>
              <ButtonLink to="/get-eth/">
                <Translation id="page-wallets-get-some-btn" />
              </ButtonLink>
            </Box>
          </Callout>
          <Callout
            flex="1 1 424px"
            minH="full"
            image={getImage(data.dapps)}
            titleKey="page-wallets-try-dapps"
            alt={t("page-wallets-try-dapps-alt")}
            descriptionKey="page-wallets-try-dapps-desc"
          >
            <Box>
              <ButtonLink to="/dapps/">
                <Translation id="page-wallets-more-on-dapps-btn" />
              </ButtonLink>
            </Box>
          </Callout>
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
