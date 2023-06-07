import React, { ReactNode } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, PageProps } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import {
  Box,
  chakra,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  TextProps,
  useColorModeValue,
} from "@chakra-ui/react"

import Card, { IProps as ICardProps } from "../../components/Card"
import Callout from "../../components/Callout"
import Link from "../../components/Link"
import Translation from "../../components/Translation"
import ButtonLink from "../../components/ButtonLink"
import PageMetadata from "../../components/PageMetadata"
import FeedbackCard from "../../components/FeedbackCard"

import { getImage } from "../../utils/image"

import type { ChildOnlyProp, Context } from "../../types"

const Page = (props: ChildOnlyProp) => (
  <Flex
    flexDirection="column"
    alignItems="center"
    w="full"
    my={0}
    mx="auto"
    {...props}
  />
)

const HeroContainer = (props: ChildOnlyProp) => (
  <Flex
    justifyContent="space-between"
    flexDirection={{ base: "column-reverse", md: "row" }}
    mt={8}
    mb={16}
    bg="cardGradient"
    {...props}
  />
)

const HeroCopyContainer = (props: ChildOnlyProp) => (
  <Box
    flex={{ base: "0 1 400px", md: "0 1 500px" }}
    w={{ base: "100%", md: "auto" }}
    maxWidth={{ base: "100%", md: "500px" }}
    maxHeight={{ base: "280px", md: "340px" }}
    {...props}
  />
)

const HeroCopy = (props: ChildOnlyProp) => (
  <Box
    p={8}
    m={{ base: 0, sm: 8 }}
    mt={{ base: -2, md: 8 }}
    bg="background.base"
    borderRadius="4px"
    border="1px solid border"
    {...props}
  />
)

const H1 = (props: ChildOnlyProp) => (
  <Heading
    as="h1"
    fontSize="2rem"
    fontWeight="medium"
    fontFamily="monospace"
    fontStyle="normal"
    textTransform="uppercase"
    lineHeight="110%"
    bg="ednBackground"
    p={2}
    mt={0}
    {...props}
  />
)

const GrayContainer = (props: ChildOnlyProp) => (
  <Box
    w="full"
    py={16}
    px={0}
    mt={8}
    bg="grayBackground"
    boxShadow="inset 0px 1px 0px var(--eth-colors-tableItemBoxShadow)"
    {...props}
  />
)

const Content = (props: ChildOnlyProp) => (
  <Box py={4} px={8} w="full" {...props} />
)

const Subtitle = (props: TextProps) => (
  <Text fontSize="xl" lineHeight="140%" color="text200" {...props} />
)

const MonoSubtitle = (props: ChildOnlyProp) => <Box as="h2" mb={0} {...props} />

const Hero = (props: ChildOnlyProp) => (
  <Box
    flex="1 1 50%"
    maxW="800px"
    bgSize="cover"
    bgRepeat="no-repeat"
    mt={{ base: 0, md: 12 }}
    ml={{ base: 0, md: 8 }}
    alignSelf={{ base: "center", md: "" }}
    {...props}
  />
)

const StyledCardContainer = (props: ChildOnlyProp) => (
  <SimpleGrid columns={[1, 1, 2, 4]} mx={-4} mt={8} mb={12} {...props} />
)

const TwoColumnContent = (props: ChildOnlyProp) => (
  <Flex
    justifyContent="space-between"
    alignItems={{ base: "flex-start", lg: "center" }}
    flexDirection={{ base: "column", lg: "row" }}
    w="100%"
    {...props}
  />
)

const ThreeColumnContent = (props: ChildOnlyProp) => (
  <Flex
    py={0}
    px={8}
    w="full"
    justifyContent="space-between"
    alignItems={{ base: "flex-start", lg: "flex-start" }}
    flexDirection={{ base: "column", lg: "row" }}
    {...props}
  />
)

const Column = (props: ChildOnlyProp) => (
  <Box flex="1 1 33%" mb={6} mr={8} w="full" {...props} />
)
const RightColumn = (props: ChildOnlyProp) => (
  <Box flex="1 1 33%" mb={6} mr={0} w="full" {...props} />
)
const IntroColumn = (props: ChildOnlyProp) => (
  <Box
    flex="1 1 33%"
    mb={6}
    mt={{ base: 0, lg: 32 }}
    mr={{ base: 0, sm: 8 }}
    w="full"
    {...props}
  />
)

const StyledCard = (props: ICardProps) => {
  const tableBoxShadow = useColorModeValue("tableBox.light", "tableBox.dark")

  return (
    <Card
      boxShadow={tableBoxShadow}
      m={4}
      p={6}
      {...props}
      _hover={{
        borderRadius: "4px",
        boxShadow: "0px 8px 17px rgba(0, 0, 0, 0.15)",
        background: "tableBackgroundHover",
        transition: "transform 0.1s",
        transform: "scale(1.02)",
      }}
    />
  )
}

const StyledCallout = chakra(Callout, {
  baseStyle: {
    flex: { base: "auto", md: "1 1 416px" },
  },
})

interface IDevelopersPath {
  emoji: string
  title: ReactNode
  description: ReactNode
  url: string
  button: ReactNode
}

const paths: Array<IDevelopersPath> = [
  {
    emoji: ":woman_student:",
    title: <Translation id="page-developers-learn" />,
    description: <Translation id="page-developers-learn-desc" />,
    url: "/developers/docs/",
    button: <Translation id="page-developers-read-docs" />,
  },
  {
    emoji: ":woman_teacher:",
    title: <Translation id="page-developers-learn-tutorials" />,
    description: <Translation id="page-developers-learn-tutorials-desc" />,
    url: "/developers/tutorials/",
    button: <Translation id="page-developers-learn-tutorials-cta" />,
  },
  {
    emoji: ":woman_scientist:",
    title: <Translation id="page-developers-start" />,
    description: <Translation id="page-developers-start-desc" />,
    url: "/developers/learning-tools/",
    button: <Translation id="page-developers-play-code" />,
  },
  {
    emoji: ":construction_worker:",
    title: <Translation id="page-developers-set-up" />,
    description: <Translation id="page-developers-setup-desc" />,
    url: "/developers/local-environment/",
    button: <Translation id="page-developers-choose-stack" />,
  },
]

const DevelopersPage = ({
  data,
}: PageProps<Queries.DevelopersIndexPageQuery, Context>) => {
  const { t } = useTranslation()

  return (
    <Page>
      <PageMetadata
        title={t("page-developer-meta-title")}
        description={t("page-developers-meta-desc")}
      />
      <Content>
        <HeroContainer>
          <HeroCopyContainer>
            <HeroCopy>
              <H1>
                <b>
                  <Translation id="page-developers-title-1" />
                </b>
                <br />
                <Translation id="page-developers-title-2" />
                <br /> <Translation id="page-developers-title-3" />
              </H1>
              <Subtitle>
                <Translation id="page-developers-subtitle" />
              </Subtitle>
            </HeroCopy>
          </HeroCopyContainer>
          <Hero>
            <GatsbyImage
              image={getImage(data.ednHero)!}
              alt={t("alt-eth-blocks")}
              loading="eager"
            ></GatsbyImage>
          </Hero>
        </HeroContainer>
        <MonoSubtitle>
          <Translation id="page-developers-get-started" />
        </MonoSubtitle>
        <StyledCardContainer>
          {paths.map((path, idx) => (
            <StyledCard
              key={idx}
              emoji={path.emoji}
              title={path.title}
              description={path.description}
            >
              <ButtonLink to={path.url}>{path.button}</ButtonLink>
            </StyledCard>
          ))}
        </StyledCardContainer>
        <TwoColumnContent>
          <IntroColumn>
            <h2>
              <Translation id="page-developers-about" />
            </h2>
            <Subtitle mb={6}>
              <Translation id="page-developers-about-desc" />
            </Subtitle>
            <p>
              <Translation id="page-developers-about-desc-2" />
            </p>
            <p>
              <Translation id="page-developers-feedback" />{" "}
              <Link to="https://discord.gg/CetY6Y4">
                <Translation id="page-developers-discord" />
              </Link>
            </p>
          </IntroColumn>
          <StyledCallout
            image={getImage(data.developers)}
            titleKey="page-developers-improve-ethereum"
            descriptionKey="page-developers-improve-ethereum-desc"
            alt={t("alt-eth-blocks")}
          >
            <div>
              <ButtonLink to="https://github.com/ethereum/ethereum-org-website">
                <Translation id="page-developers-contribute" />
              </ButtonLink>
            </div>
          </StyledCallout>
        </TwoColumnContent>
      </Content>
      <GrayContainer>
        <Content>
          <h2>
            <Translation id="page-developers-explore-documentation" />
          </h2>
        </Content>
        {/* TODO use the same source as SideNav for these sections */}
        <ThreeColumnContent>
          <Column>
            <h3>
              <Translation id="page-developers-docs-introductions" />
            </h3>
            <Link to="/developers/docs/intro-to-ethereum/">
              <Translation id="page-developers-intro-eth-link" />
            </Link>
            <p>
              <Translation id="page-developers-into-eth-desc" />
            </p>

            <Link to="/developers/docs/intro-to-ether/">
              <Translation id="page-developers-intro-ether-link" />
            </Link>
            <p>
              <Translation id="page-developers-intro-ether-desc" />
            </p>

            <Link to="/developers/docs/dapps/">
              <Translation id="page-developers-intro-dapps-link" />
            </Link>
            <p>
              <Translation id="page-developers-intro-dapps-desc" />
            </p>

            <Link to="/developers/docs/ethereum-stack/">
              <Translation id="page-developers-intro-stack" />
            </Link>
            <p>
              <Translation id="page-developers-intro-stack-desc" />
            </p>

            <Link to="/developers/docs/web2-vs-web3/">
              <Translation id="page-developers-web3-link" />
            </Link>
            <p>
              <Translation id="page-developers-web3-desc" />
            </p>

            <Link to="/developers/docs/programming-languages/">
              <Translation id="page-developers-languages" />
            </Link>
            <p>
              <Translation id="page-developers-language-desc" />
            </p>
            <Image
              as={GatsbyImage}
              hideBelow="lg"
              image={getImage(data.doge)!}
              alt={t("page-assets-doge")}
              maxW="400px"
              mt={16}
            />
          </Column>
          <Column>
            <h3>
              <Translation id="page-developers-fundamentals" />
            </h3>
            <Link to="/developers/docs/accounts/">
              <Translation id="page-developers-accounts-link" />
            </Link>
            <p>
              <Translation id="page-developers-account-desc" />
            </p>

            <Link to="/developers/docs/transactions/">
              <Translation id="page-developers-transactions-link" />
            </Link>
            <p>
              <Translation id="page-developers-transactions-desc" />
            </p>

            <Link to="/developers/docs/blocks/">
              <Translation id="page-developers-blocks-link" />
            </Link>
            <p>
              <Translation id="page-developers-block-desc" />
            </p>

            <Link to="/developers/docs/evm/">
              <Translation id="page-developers-evm-link" />
            </Link>
            <p>
              <Translation id="page-developers-evm-desc" />
            </p>

            <Link to="/developers/docs/gas/">
              <Translation id="page-developers-gas-link" />
            </Link>
            <p>
              <Translation id="page-developers-gas-desc" />
            </p>

            <Link to="/developers/docs/nodes-and-clients/">
              <Translation id="page-developers-node-clients-link" />
            </Link>
            <p>
              <Translation id="page-developers-node-clients-desc" />
            </p>

            <Link to="/developers/docs/networks/">
              <Translation id="page-developers-networks-link" />
            </Link>
            <p>
              <Translation id="page-developers-networks-desc" />
            </p>

            <Link to="/developers/docs/consensus-mechanisms/pow/mining/">
              <Translation id="page-developers-mining-link" />
            </Link>
            <p>
              <Translation id="page-developers-mining-desc" />
            </p>

            <Link to="/developers/docs/consensus-mechanisms/pow/mining-algorithms/">
              <Translation id="page-developers-mining-algorithms-link" />
            </Link>
            <p>
              <Translation id="page-developers-mining-algorithms-desc" />
            </p>
          </Column>
          <RightColumn>
            <h3>
              <Translation id="page-developers-stack" />
            </h3>
            <Link to="/developers/docs/smart-contracts/">
              <Translation id="page-developers-smart-contracts-link" />
            </Link>
            <p>
              <Translation id="page-developers-smart-contracts-desc" />
            </p>
            <Link to="/developers/docs/frameworks/">
              <Translation id="page-developers-frameworks-link" />
            </Link>
            <p>
              <Translation id="page-developers-frameworks-desc" />
            </p>
            <Link to="/developers/docs/apis/javascript/">
              <Translation id="page-developers-js-libraries-link" />
            </Link>
            <p>
              <Translation id="page-developers-js-libraries-desc" />
            </p>
            <Link to="/developers/docs/apis/backend/">
              <Translation id="page-developers-api-link" />
            </Link>
            <p>
              <Translation id="page-developers-api-desc" />
            </p>
            <Link to="/developers/docs/data-and-analytics/block-explorers/">
              <Translation id="page-developers-block-explorers-link" />
            </Link>
            <p>
              <Translation id="page-developers-block-explorers-desc" />
            </p>
            <Link to="/developers/docs/smart-contracts/security/">
              <Translation id="page-developers-smart-contract-security-link" />
            </Link>
            <p>
              <Translation id="page-developers-smart-contract-security-desc" />
            </p>
            <Link to="/developers/docs/storage/">
              <Translation id="page-developers-storage-link" />
            </Link>
            <p>
              <Translation id="page-developers-storage-desc" />
            </p>
            <Link to="/developers/docs/ides/">
              <Translation id="page-developers-dev-env-link" />
            </Link>
            <p>
              <Translation id="page-developers-dev-env-desc" />
            </p>
            <h3>
              <Translation id="page-developers-advanced" />
            </h3>
            <Link to="/developers/docs/standards/tokens/">
              <Translation id="page-developers-token-standards-link" />
            </Link>
            <p>
              <Translation id="page-developers-token-standards-desc" />
            </p>
            <Link to="/developers/docs/mev/">
              <Translation id="page-developers-mev-link" />
            </Link>
            <p>
              <Translation id="page-developers-mev-desc" />
            </p>
            <Link to="/developers/docs/oracles/">
              <Translation id="page-developers-oracles-link" />
            </Link>
            <p>
              <Translation id="page-developers-oracle-desc" />
            </p>
            <Link to="/developers/docs/scaling/">
              <Translation id="page-developers-scaling-link" />
            </Link>
            <p>
              <Translation id="page-developers-scaling-desc" />
            </p>
            <Link to="/developers/docs/networking-layer/">
              <Translation id="page-developers-networking-layer-link" />
            </Link>
            <p>
              <Translation id="page-developers-networking-layer-desc" />
            </p>
            <Link to="/developers/docs/data-structures-and-encoding/">
              <Translation id="page-developers-data-structures-and-encoding-link" />
            </Link>
            <p>
              <Translation id="page-developers-data-structures-and-encoding-desc" />
            </p>
          </RightColumn>
        </ThreeColumnContent>
      </GrayContainer>
      <FeedbackCard />
    </Page>
  )
}
export default DevelopersPage

export const query = graphql`
  query DevelopersIndexPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-developers-index", "common"] }
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
    ednHero: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 800
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    developers: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        gatsbyImageData(
          height: 200
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    doge: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        gatsbyImageData(
          height: 320
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    ogImage: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 1200
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
