// Third-party libraries
import React, { ComponentPropsWithRef } from "react"
import { graphql, PageProps } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import {
  Box,
  BoxProps,
  Flex,
  FlexProps,
  HeadingProps,
  Link,
  ListItem,
  Table,
  TableCaption,
  Tbody,
  Th,
  Thead,
  Td,
  Tr,
  UnorderedList,
} from "@chakra-ui/react"

// Internal libraries
import { getImage } from "../utils/image"

// Components
import { ButtonLink } from "../components/Buttons"
import Callout from "../components/Callout"
import Card from "../components/Card"
import Emoji from "../components/Emoji"
import ExpandableCard from "../components/ExpandableCard"
import FeedbackCard from "../components/FeedbackCard"
import GhostCard from "../components/GhostCard"
import HorizontalCard from "../components/HorizontalCard"
import InfoBanner from "../components/InfoBanner"
import InlineLink from "../components/Link"
import PageHero from "../components/PageHero"
import PageMetadata from "../components/PageMetadata"
import Pill from "../components/Pill"
import Translation from "../components/Translation"
import Text from "../components/OldText"
import OldHeading from "../components/OldHeading"
import GatsbyImage from "../components/GatsbyImage"

const Content = (props: BoxProps) => <Box px={8} w="full" {...props} />

const Divider = (props: BoxProps) => (
  <Box my={16} w="10%" h={1} bg="homeDivider" {...props} />
)

const Page = (props: FlexProps) => (
  <Flex
    width="full"
    direction="column"
    align="center"
    my={0}
    mx="auto"
    {...props}
  />
)

export const StyledCard = (props: ComponentPropsWithRef<typeof Card>) => (
  <Card
    flex="1 1 30%"
    minW="280px"
    maxW={{ base: "full", lg: "46%" }}
    p={6}
    {...props}
  />
)

const H2 = (props: HeadingProps) => (
  <OldHeading
    fontSize={{ base: "2xl", md: "2rem" }}
    lineHeight={1.4}
    {...props}
  />
)

const H3 = (props: HeadingProps) => (
  <OldHeading
    as="h3"
    fontSize={{ base: "xl", md: "2xl" }}
    lineHeight={1.4}
    {...props}
  />
)

const GasPage = ({ data }: PageProps<Queries.GasPageQuery>) => {
  const { t } = useTranslation()

  const benefits = [
    {
      emoji: "🪪",
      description: t("page-gas-benefits-1-description"),
    },
    {
      emoji: ":money_with_wings:",
      description: t("page-gas-benefits-2-description"),
    },
    {
      emoji: ":hourglass_flowing_sand:",
      description: t("page-gas-benefits-3-description"),
    },
  ]

  const heroContent = {
    title: t("page-gas-hero-title"),
    header: t("page-gas-hero-header"),
    image: getImage(data.infrastructure)!,
    alt: "",
    buttons: [
      {
        content: t("page-gas-hero-button-1-content"),
        toId: "what-is-gas",
        matomo: {
          eventCategory: "gas hero buttons",
          eventAction: "click",
          eventName: "what is gas",
        },
      },
    ],
  }

  return (
    <Page>
      <PageMetadata
        title={t("page-gas-meta-title")}
        description={t("page-gas-meta-description")}
      />
      <Box background="layer2Gradient" width="full">
        <Box pb={8}>
          <PageHero
            content={{
              subtitle: (
                <>
                  {t("page-gas-hero-subtitle-1")}
                  <br />
                  {t("page-gas-hero-subtitle-2")}
                </>
              ),
              ...heroContent,
            }}
          />
        </Box>
      </Box>
      <Content mb={{ base: 16, lg: 32 }} mt={16}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align={{ base: "center", lg: "flex-start" }}
          w="full"
        >
          <Box flex="60%" w="full" mr={{ base: "auto", lg: 2 }}>
            <InfoBanner mb={8} title={t("page-gas-summary-title")}>
              <UnorderedList>
                <ListItem>
                  <Translation id="page-gas-summary-item-1" />
                </ListItem>
                <ListItem>
                  <Translation id="page-gas-summary-item-2" />
                </ListItem>
                <ListItem>
                  <Translation id="page-gas-summary-item-3" />
                </ListItem>
              </UnorderedList>
            </InfoBanner>
            <H2 id="what-is-gas" mt={0}>
              <Translation id="page-gas-what-are-gas-fees-header" />
            </H2>
            <Text>
              <Translation id="page-gas-what-are-gas-fees-text-1" />
            </Text>
            <Text>
              <Translation id="page-gas-what-are-gas-fees-text-2" />
            </Text>
          </Box>

          <Box
            flex="50%"
            display={["none", "none", "none", "flex"]}
            justifyContent="center"
            style={{ maxHeight: "450px" }}
          >
            <GatsbyImage
              image={getImage(data.robot)!}
              alt=""
              objectFit="contain"
            />
          </Box>
        </Flex>
      </Content>
      <Content mb={{ base: 16, lg: 32 }}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          justify="center"
          width="full"
        >
          <Box w="full">
            <H2 mt={0}>
              <Translation id="page-gas-how-do-i-pay-less-gas-header" />
            </H2>
            <Text>
              <Translation id="page-gas-how-do-i-pay-less-gas-text" />
            </Text>
            <Flex flexWrap="wrap" my={{ base: 4, lg: 0 }} gap={8}>
              <StyledCard
                emoji=":alarm_clock:"
                title={t("page-gas-how-do-i-pay-less-gas-card-1-title")}
                description={t(
                  "page-gas-how-do-i-pay-less-gas-card-1-description"
                )}
              ></StyledCard>
              <StyledCard
                emoji=":robot:"
                title={t("page-gas-how-do-i-pay-less-gas-card-2-title")}
                description={t(
                  "page-gas-how-do-i-pay-less-gas-card-2-description"
                )}
              ></StyledCard>
              <StyledCard
                emoji=":rocket:"
                title={t("page-gas-how-do-i-pay-less-gas-card-3-title")}
                description={t(
                  "page-gas-how-do-i-pay-less-gas-card-3-description"
                )}
              >
                <ButtonLink w="fit-content" to="/layer-2/">
                  <Translation id="page-gas-try-layer-2" />
                </ButtonLink>
              </StyledCard>
            </Flex>
          </Box>
        </Flex>
      </Content>
      <Content mb={{ base: 16, lg: 32 }}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="flex-start"
          width="full"
        >
          <Box
            w="full"
            ml={{ base: "auto", lg: 0 }}
            mr={{ base: "auto", lg: 16 }}
            flex="60%"
          >
            <H3 mt={0}>
              <Translation id="page-gas-what-causes-high-gas-fees-header" />
            </H3>
            <Text>
              <Translation id="page-gas-what-causes-high-gas-fees-text-1" />
            </Text>
            <Text>
              <Translation id="page-gas-what-causes-high-gas-fees-text-2" />
            </Text>
            <Text>
              <Translation id="page-gas-what-causes-high-gas-fees-text-3" />
            </Text>
            <Text>
              <Translation id="page-gas-want-to-dive-deeper" />{" "}
              <InlineLink to="/developers/docs/gas/">
                <Translation id="page-gas-check-out-the-developer-docs" />
              </InlineLink>
            </Text>
          </Box>
          <GhostCard
            flex="40%"
            maxW="640px"
            alignSelf="center"
            mt={{ base: 16, lg: 2 }}
          >
            <Emoji text=":cat:" fontSize="5xl" />
            <H3>
              <Translation id="page-gas-attack-of-the-cryptokitties-header" />
            </H3>
            <Text>
              <Translation id="page-gas-attack-of-the-cryptokitties-text" />
            </Text>
          </GhostCard>
        </Flex>
      </Content>
      <Content mb={{ base: 16, lg: 32 }}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="flex-start"
          width="full"
          mr={{ base: 0, lg: 8 }}
        >
          <Box w="full" mr={{ base: "auto", lg: "8" }}>
            <Box>
              <H2 mt={0}>
                <Translation id="page-gas-why-do-we-need-gas-header" />
              </H2>
              <Text>
                <Translation id="page-gas-why-do-we-need-gas-text" />
              </Text>
            </Box>
            {benefits.map((benefit) => (
              <Box minWidth="full" my={2}>
                <HorizontalCard
                  key={benefit.emoji}
                  emoji={benefit.emoji}
                  description={benefit.description}
                  emojiSize={3}
                  align="center"
                />
              </Box>
            ))}
          </Box>
          <Box w="full">
            <GatsbyImage
              image={getImage(data.eth)!}
              alt=""
              style={{ maxHeight: "400px" }}
              objectFit="contain"
            />
          </Box>
        </Flex>
      </Content>
      <Content mb={{ base: 16, lg: 32 }}>
        <Flex direction={{ base: "column", lg: "row" }} align="flex-start">
          <Box w="full" mr={{ base: "auto", lg: 8 }}>
            <Flex alignItems="flex-start">
              <H2 mt={0}>
                <Translation id="page-gas-how-is-gas-calculated-header" />
              </H2>

              <Pill mt={1.5} ml={4} background="warning">
                <Translation id="page-gas-advanced" />
              </Pill>
            </Flex>
            <Text>
              <Translation id="page-gas-how-is-gas-calculated-text-1" />
            </Text>
            <UnorderedList ml={6} spacing={3}>
              <ListItem>
                <Translation id="page-gas-how-is-gas-calculated-item-1" />
              </ListItem>
              <ListItem>
                <Translation id="page-gas-how-is-gas-calculated-item-2" />
              </ListItem>
              <ListItem>
                <Translation id="page-gas-how-is-gas-calculated-item-3" />
                <UnorderedList ml={6} spacing={3} styleType="none">
                  <ListItem color="body.medium" fontSize="sm">
                    <Translation id="page-gas-how-is-gas-calculated-list-item-1" />
                  </ListItem>
                </UnorderedList>
              </ListItem>
            </UnorderedList>
            <Text>
              <Translation id="page-gas-how-is-gas-calculated-text-2" />
            </Text>
          </Box>
          <Table maxW={"100%"} minW={"auto"}>
            <TableCaption fontSize="sm">
              <Translation id="page-gas-table-figure" />
            </TableCaption>
            <Thead>
              <Tr>
                <Th>
                  <Translation id="page-gas-table-header-1" />
                </Th>
                <Th>
                  <Translation id="page-gas-table-header-2" />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Translation id="page-gas-table-item-1-transaction-type" />
                </Td>
                <Td>21,000</Td>
              </Tr>
              <Tr>
                <Td>
                  <Translation id="page-gas-table-item-2-transaction-type" />
                </Td>
                <Td>65,000</Td>
              </Tr>
              <Tr>
                <Td>
                  <Translation id="page-gas-table-item-3-transaction-type" />
                </Td>
                <Td>84,904</Td>
              </Tr>
              <Tr>
                <Td>
                  <Translation id="page-gas-table-item-4-transaction-type" />
                </Td>
                <Td>184,523</Td>
              </Tr>
            </Tbody>
          </Table>
        </Flex>
      </Content>
      <Content>
        <H2 mt="0">
          <Translation id="page-gas-faq-header" />
        </H2>
        {/* MaxWidth will be enforced by FAQ component once implemented */}
        <Box maxWidth="832px">
          <ExpandableCard title={t("page-gas-faq-question-1-q")}>
            <Text>
              <Translation id="page-gas-faq-question-1-a-1" />
            </Text>
            <Text>
              <Translation id="page-gas-faq-question-1-a-2" />
            </Text>
          </ExpandableCard>
          <ExpandableCard title={t("page-gas-faq-question-2-q")}>
            <Text>
              <Translation id="page-gas-faq-question-2-a-1" />
            </Text>
            <Link href="/eth/">
              <Translation id="page-gas-faq-question-2-a-2" />
            </Link>
          </ExpandableCard>
          <ExpandableCard title={t("page-gas-faq-question-3-q")}>
            <Text>
              <Translation id="page-gas-faq-question-3-a-1" />
            </Text>
            <Text>
              <Translation id="page-gas-faq-question-3-a-2" />
            </Text>
          </ExpandableCard>
        </Box>
      </Content>
      <Divider />
      <Content>
        <Flex wrap="wrap" mx={-4}>
          <Box
            as={Callout}
            flex="1 1 416px"
            minH="full"
            image={getImage(data.whatIsEthereum)}
            titleKey="Use Layer 2"
            alt=""
            descriptionKey="Layer 2 extends Ethereum, reducing costs and increasing accessibility for decentralized applications."
          >
            <Box>
              <ButtonLink to="/layer-2/">
                <Translation id="page-gas-use-layer-2" />
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
        </Flex>
      </Content>
      <Content>
        <FeedbackCard />
      </Content>
    </Page>
  )
}

export default GasPage

export const query = graphql`
  query GasPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-community", "common", "page-gas"] }
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
    doge: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 600
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    infrastructure: file(
      relativePath: { eq: "infrastructure_transparent.png" }
    ) {
      childImageSharp {
        gatsbyImageData(
          width: 600
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    eth: file(relativePath: { eq: "eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 600
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    robot: file(relativePath: { eq: "wallet.png" }) {
      childImageSharp {
        gatsbyImageData(
          height: 450
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    whatIsEthereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
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
