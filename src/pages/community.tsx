import React, { ReactNode } from "react"
import {
  Box,
  Flex,
  Heading,
  HeadingProps,
  Image,
  SimpleGrid,
  Text,
  useTheme,
} from "@chakra-ui/react"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, PageProps } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import ActionCard from "../components/ActionCard"
import Callout from "../components/Callout"
import Card from "../components/Card"
import ButtonLink, {
  IProps as IButtonLinkProps,
} from "../components/ButtonLink"
import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"
import PageHero from "../components/PageHero"
import FeedbackCard from "../components/FeedbackCard"
import WritersCohortBanner from "../components/Banners/Implementations/WritersCohortBanner"

import { getImage } from "../utils/image"

import type { ChildOnlyProp, Context } from "../types"

const CardContainer = ({ children }: ChildOnlyProp) => {
  return (
    <Flex wrap="wrap" mx={-4}>
      {children}
    </Flex>
  )
}

const Content = ({ children }: ChildOnlyProp) => {
  return (
    <Box py={4} px={8} w="full">
      {children}
    </Box>
  )
}

const Divider = () => {
  return <Box my={16} w="10%" h={1} bgColor="homeDivider" />
}

const Page = ({ children }: ChildOnlyProp) => {
  return (
    <Flex direction="column" alignItems="center" w="full" mx="auto">
      {children}
    </Flex>
  )
}

const ButtonRow = ({ children }: ChildOnlyProp) => {
  return (
    <Flex alignItems="flex-start" direction={{ base: "column", md: "row" }}>
      {children}
    </Flex>
  )
}

const StyledButtonLink = ({ children, ...props }: IButtonLinkProps) => {
  return (
    <ButtonLink
      mt={{ base: 4, md: 0 }}
      ml={{ base: 0, md: 2 }}
      display="flex"
      alignItems="center"
      {...props}
    >
      {children}
    </ButtonLink>
  )
}

const RowReverse = ({ children }: ChildOnlyProp) => {
  return (
    <Flex
      direction={{ base: "column-reverse", lg: "row-reverse" }}
      alignItems={{ base: "center", lg: "normal" }}
    >
      {children}
    </Flex>
  )
}

const ImageContainer = ({ children }: ChildOnlyProp) => {
  return (
    <Flex h="full" w={{ base: "75%", lg: "full" }}>
      {children}
    </Flex>
  )
}

const Subtitle = ({ children }: ChildOnlyProp) => {
  return (
    <Text mb={8} fontSize={{ base: "md", sm: "xl" }} lineHeight={1.4}>
      {children}
    </Text>
  )
}

const FeatureContent = ({ children }: ChildOnlyProp) => {
  return (
    <Flex
      direction="column"
      boxSize="full"
      justifyContent="center"
      p={{ base: 8, lg: 24 }}
    >
      {children}
    </Flex>
  )
}

const H2 = ({ children, ...props }: HeadingProps) => {
  return (
    <Heading fontSize={{ base: "2xl", md: "2rem" }} mt={0} {...props}>
      {children}
    </Heading>
  )
}

interface ICard {
  image: any
  title: string
  description: string
  alt: string
  to: string
}

interface IGetInvolvedCard {
  emoji: string
  title: string
  description: string
}

const CommunityPage = ({
  data,
  location,
}: PageProps<Queries.CommunityPageQuery, Context>) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const heroContent = {
    title: t("page-community-hero-title"),
    header: t("page-community-hero-header"),
    subtitle: t("page-community-hero-subtitle"),
    image: getImage(data.enterprise)!,
    alt: t("page-community-hero-alt"),
  }

  const cards: Array<ICard> = [
    {
      image: getImage(data.docking),
      title: t("page-community-card-1-title"),
      description: t("page-community-card-1-description"),
      alt: t("page-index-get-started-wallet-image-alt"),
      to: "/community/online/",
    },
    {
      image: getImage(data.eth),
      title: t("page-community-card-2-title"),
      description: t("page-community-card-2-description"),
      alt: t("page-index-get-started-eth-image-alt"),
      to: "/community/events/",
    },
    {
      image: getImage(data.doge),
      title: t("page-community-card-3-title"),
      description: t("page-community-card-3-description"),
      alt: t("page-index-get-started-dapps-image-alt"),
      to: "/community/get-involved/",
    },
    {
      image: getImage(data.future),
      title: t("page-community-card-4-title"),
      description: t("page-community-card-4-description"),
      alt: t("page-index-get-started-dapps-image-alt"),
      to: "/community/grants/",
    },
  ]

  const whyGetInvolvedCards: Array<IGetInvolvedCard> = [
    {
      emoji: ":mage:",
      title: t("page-community-why-get-involved-card-1-title"),
      description: t("page-community-why-get-involved-card-1-description"),
    },
    {
      emoji: ":dollar:",
      title: t("page-community-why-get-involved-card-2-title"),
      description: t("page-community-why-get-involved-card-2-description"),
    },
    {
      emoji: ":collision:",
      title: t("page-community-why-get-involved-card-3-title"),
      description: t("page-community-why-get-involved-card-3-description"),
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={t("page-community-meta-title")}
        description={t("page-community-meta-description")}
      />
      {/* TODO: REMOVE MAY 11 */}
      <WritersCohortBanner pathname={location.pathname} />
      <PageHero isReverse content={heroContent} />
      <Divider />
      <Flex
        bg="homeBoxTurquoise"
        alignItems="center"
        direction="row-reverse"
        py={{ base: 8, lg: 0 }}
        pl={{ base: 0, lg: 8 }}
        w="full"
        h={{ base: "full", lg: "720px" }}
        mt="-1px"
        borderBottom="1px solid"
        borderColor="text"
      >
        <Content>
          <Flex direction="column" alignItems="center" mb={8}>
            <H2>
              <Translation id="page-community-why-get-involved-title" />
            </H2>
          </Flex>
          <CardContainer>
            {whyGetInvolvedCards.map((card, idx) => (
              <Card
                m={4}
                p={6}
                flex="1 0 30%"
                minW="280px"
                maxW={{ base: "full", md: "46%", lg: "31%" }}
                key={idx}
                emoji={card.emoji}
                title={card.title}
                description={card.description}
              />
            ))}
          </CardContainer>
        </Content>
      </Flex>
      <Box
        w="full"
        pb={16}
        bg="grayBackground"
        boxShadow={`inset 0px 0px 0px ${theme.colors.tableItemBoxShadow}`}
      >
        <Box py={4} px={{ base: 4, lg: 8 }} w="full">
          <Flex
            direction={{ base: "column-reverse", md: "row" }}
            alignItems="center"
            mb={{ base: 0, m: 12 }}
            mt={{ base: 0, m: 4 }}
          >
            <Box p={{ base: 0, sm: 8, lg: 24 }} boxSize="full">
              <H2 id="get-involved">
                <Translation id="page-community-get-involved-title" />
              </H2>
              <Subtitle>
                <Translation id="page-community-get-involved-description" />
              </Subtitle>
            </Box>
            <ImageContainer>
              <Image
                as={GatsbyImage}
                w="full"
                bgSize="cover"
                bg="no-repeat 50px"
                image={getImage(data.developerBlocks)!}
                alt={t("page-community-get-involved-image-alt")}
              />
            </ImageContainer>
          </Flex>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, lg: 0 }}>
            {cards.map((card, idx) => (
              <Box
                as={ActionCard}
                minW={{ base: "min(100%, 240px)", lg: "440px" }}
                m={{ base: 0, lg: 4 }}
                borderRadius="sm"
                border="1px solid"
                borderColor="text"
                bg="background"
                boxShadow={theme.colors.cardBoxShadow}
                key={idx}
                title={card.title}
                description={card.description}
                to={card.to}
                image={card.image}
                alt={card.alt}
              />
            ))}
          </SimpleGrid>
        </Box>
      </Box>
      <Flex
        bg="homeBoxTurquoise"
        alignItems="center"
        direction={{ base: "column-reverse", lg: "row-reverse" }}
        pl={{ base: 0, lg: 8 }}
        py={{ base: 8, lg: 0 }}
        w="full"
        h={{ base: "full", lg: "720px" }}
        mt="-1px"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="text"
      >
        <RowReverse>
          <FeatureContent>
            <H2>
              <Translation id="page-community-open-source" />
            </H2>
            <Subtitle>
              <Translation id="page-community-open-source-description" />
            </Subtitle>
            <ButtonRow>
              <ButtonLink to="/community/get-involved/#ethereum-jobs/">
                <Translation id="page-community-find-a-job" />
              </ButtonLink>
              <StyledButtonLink variant="outline" to="/community/grants/">
                <Translation id="page-community-explore-grants" />
              </StyledButtonLink>
            </ButtonRow>
          </FeatureContent>
          <ImageContainer>
            <Image
              as={GatsbyImage}
              w="full"
              image={getImage(data.ethereum)!}
              alt={t("page-community-open-source-image-alt")}
            />
          </ImageContainer>
        </RowReverse>
      </Flex>
      <Flex
        bg="homeBoxPink"
        alignItems="center"
        direction={{ base: "column-reverse", lg: "row-reverse" }}
        pl={{ base: 0, lg: 8 }}
        py={{ base: 8, lg: 0 }}
        h={{ base: "full", lg: "720px" }}
        w="full"
        mt="-1px"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="text"
      >
        <Flex
          direction={{ base: "column-reverse", lg: "row" }}
          alignItems="center"
        >
          <FeatureContent>
            <Flex direction="column" justifyContent="center">
              <H2>
                <Translation id="page-community-contribute" />
              </H2>
              <Subtitle>
                <Translation id="page-community-contribute-description" />
              </Subtitle>
              <ButtonRow>
                <ButtonLink to="/contributing/">
                  <Translation id="page-community-contribute-button" />
                </ButtonLink>
                <StyledButtonLink
                  variant="outline"
                  to="https://github.com/ethereum/ethereum-org-website/"
                >
                  <Translation id="page-community-contribute-secondary-button" />
                </StyledButtonLink>
              </ButtonRow>
            </Flex>
          </FeatureContent>
          <ImageContainer>
            <Image
              as={GatsbyImage}
              w="full"
              image={getImage(data.finance)!}
              alt={t("page-index-internet-image-alt")}
            />
          </ImageContainer>
        </Flex>
      </Flex>
      <Flex
        bg="homeBoxPurple"
        alignItems="center"
        direction={{ base: "column-reverse", lg: "row" }}
        h={{ base: "full", lg: "720px" }}
        w="full"
        mt="-1px"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="text"
      >
        <RowReverse>
          <FeatureContent>
            <H2>
              <Translation id="page-community-support" />
            </H2>
            <Subtitle>
              <Translation id="page-community-support-description" />
            </Subtitle>
            <Box>
              <ButtonLink to="/community/support/">
                <Translation id="page-community-support-button" />
              </ButtonLink>
            </Box>
          </FeatureContent>
          <ImageContainer>
            <Image
              as={GatsbyImage}
              w="full"
              image={getImage(data.hackathon)!}
              alt={t("page-community-support-alt")}
            />
          </ImageContainer>
        </RowReverse>
      </Flex>
      <Divider />
      <Flex
        direction={{ base: "column", lg: "row" }}
        alignItems={{ base: "felx-start", lg: "center" }}
        w="full"
        py={4}
        px={8}
      >
        <Box flex="0 0 50%" maxW={{ base: "full", md: "75%" }} mb={6}>
          <Heading fontSize={{ base: "2xl", md: "2rem" }}>
            <Translation id="page-community-try-ethereum" />
          </Heading>
        </Box>
      </Flex>
      <Content>
        <CardContainer>
          <Box
            as={Callout}
            flex="1 1 416px"
            minH="full"
            image={getImage(data.eth)}
            titleKey="page-community-get-eth-title"
            alt={t("page-community-get-eth-alt")}
            descriptionKey="page-community-get-eth-description"
          >
            <Box>
              <ButtonLink to="/get-eth/">
                <Translation id="page-community-get-eth" />
              </ButtonLink>
            </Box>
          </Box>
          <Box
            as={Callout}
            flex="1 1 416px"
            minH="full"
            image={getImage(data.doge)}
            titleKey="page-community-explore-dapps-title"
            alt={t("page-community-explore-dapps-alt")}
            descriptionKey="page-community-explore-dapps-description"
          >
            <Box>
              <ButtonLink to="/dapps/">
                <Translation id="page-community-explore-dapps" />
              </ButtonLink>
            </Box>
          </Box>
        </CardContainer>
      </Content>
      <FeedbackCard />
    </Page>
  )
}

export default CommunityPage

export const query = graphql`
  query CommunityPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-community", "common"] }
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
    enterprise: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 800
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    developerBlocks: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    ethereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 1440
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    finance: file(relativePath: { eq: "finance_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 800
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    hackathon: file(relativePath: { eq: "hackathon_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 1440
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    docking: file(relativePath: { eq: "upgrades/core.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    eth: file(relativePath: { eq: "eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    doge: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    future: file(relativePath: { eq: "future_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    enterpriseFixed: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
