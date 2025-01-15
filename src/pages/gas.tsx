import { ComponentPropsWithRef } from "react"
import { GetStaticProps } from "next/types"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
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
  Td,
  Th,
  Thead,
  Tr,
  UnorderedList,
} from "@chakra-ui/react"

import { BasePageProps, Lang } from "@/lib/types"

import { ButtonLink } from "@/components/Buttons"
import Callout from "@/components/Callout"
import Card from "@/components/Card"
import Emoji from "@/components/Emoji"
import ExpandableCard from "@/components/ExpandableCard"
import FeedbackCard from "@/components/FeedbackCard"
import GhostCard from "@/components/GhostCard"
import HorizontalCard from "@/components/HorizontalCard"
import { Image } from "@/components/Image"
import InfoBanner from "@/components/InfoBanner"
import InlineLink from "@/components/Link"
import MainArticle from "@/components/MainArticle"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import PageHero from "@/components/PageHero"
import PageMetadata from "@/components/PageMetadata"
import Pill from "@/components/Pill"
import Translation from "@/components/Translation"
import { Divider } from "@/components/ui/divider"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

// Static assets
import dogeComputerImg from "@/public/images/doge-computer.png"
import ethImg from "@/public/images/eth.png"
import infrastructureTransparentImg from "@/public/images/infrastructure_transparent.png"
import walletImg from "@/public/images/wallet.png"
import whatIsEthereumImg from "@/public/images/what-is-ethereum.png"

const Content = (props: BoxProps) => <Box px={8} w="full" {...props} />

const Page = (props: FlexProps) => (
  <Flex
    as={MainArticle}
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
    className="min-w-[280px] max-w-full flex-[1_0_30%] p-6 md:max-w-[46%]"
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

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage("/gas")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const GasPage = () => {
  const { t } = useTranslation("page-gas")

  const benefits = [
    {
      emoji: "🪪",
      description: (
        <Translation id="page-gas:page-gas-benefits-1-description" />
      ),
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
    image: infrastructureTransparentImg,
    alt: "Hero header image",
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
      <div className="w-full bg-gradient-to-r from-accent-a/10 to-accent-c/10 dark:from-accent-a/20 dark:to-accent-c-hover/20">
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
      </div>
      <Content mb={{ base: 16, lg: 32 }} mt={16}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align={{ base: "center", lg: "flex-start" }}
          w="full"
        >
          <Box flex="60%" w="full" me={{ base: "auto", lg: 2 }}>
            <InfoBanner mb={8} title={t("page-gas-summary-title")}>
              <UnorderedList>
                <ListItem>{t("page-gas-summary-item-1")}</ListItem>
                <ListItem>{t("page-gas-summary-item-2")}</ListItem>
                <ListItem>{t("page-gas-summary-item-3")}</ListItem>
              </UnorderedList>
            </InfoBanner>
            <H2 id="what-is-gas" mt={0}>
              {t("page-gas-what-are-gas-fees-header")}
            </H2>
            <Text>{t("page-gas-what-are-gas-fees-text-1")}</Text>
            <Text>
              <Translation id="page-gas:page-gas-what-are-gas-fees-text-2" />
            </Text>
          </Box>

          <Box
            flex="50%"
            display={["none", "none", "none", "flex"]}
            justifyContent="center"
            style={{ maxHeight: "450px" }}
          >
            <Image src={walletImg} alt="A robot" objectFit="contain" />
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
            <H2 mt={0}>{t("page-gas-how-do-i-pay-less-gas-header")}</H2>
            <Text>{t("page-gas-how-do-i-pay-less-gas-text")}</Text>
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
                <ButtonLink w="fit-content" href="/layer-2/">
                  {t("page-gas-try-layer-2")}
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
            ms={{ base: "auto", lg: 0 }}
            me={{ base: "auto", lg: 16 }}
            flex="60%"
          >
            <H3 mt={0}>{t("page-gas-what-causes-high-gas-fees-header")}</H3>
            <Text>{t("page-gas-what-causes-high-gas-fees-text-1")}</Text>
            <Text>
              <Translation id="page-gas:page-gas-what-causes-high-gas-fees-text-2" />
            </Text>
            <Text>{t("page-gas-what-causes-high-gas-fees-text-3")}</Text>
            <Text>
              {t("page-gas-want-to-dive-deeper")}{" "}
              <InlineLink href="/developers/docs/gas/">
                {t("page-gas-check-out-the-developer-docs")}
              </InlineLink>
            </Text>
          </Box>
          <GhostCard className="mt-16 max-w-[640px] self-center md:w-2/5 lg:mt-2">
            <Emoji text=":cat:" className="text-5xl" />
            <H3>{t("page-gas-attack-of-the-cryptokitties-header")}</H3>
            <Text>{t("page-gas-attack-of-the-cryptokitties-text")}</Text>
          </GhostCard>
        </Flex>
      </Content>
      <Content mb={{ base: 16, lg: 32 }}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="flex-start"
          width="full"
          me={{ base: 0, lg: 8 }}
        >
          <Box w="full" me={{ base: "auto", lg: "8" }}>
            <Box>
              <H2 mt={0}>{t("page-gas-why-do-we-need-gas-header")}</H2>
              <Text>{t("page-gas-why-do-we-need-gas-text")}</Text>
            </Box>
            {benefits.map((benefit, index) => (
              <Box key={index} minWidth="full" my={2}>
                <HorizontalCard
                  key={benefit.emoji}
                  emoji={benefit.emoji}
                  description={benefit.description}
                />
              </Box>
            ))}
          </Box>
          <Box w="full">
            <Image
              src={ethImg}
              alt=""
              width={600}
              style={{ objectFit: "contain" }}
            />
          </Box>
        </Flex>
      </Content>
      <Content mb={{ base: 16, lg: 32 }}>
        <Flex direction={{ base: "column", lg: "row" }} align="flex-start">
          <Box w="full" me={{ base: "auto", lg: 8 }}>
            <Flex alignItems="flex-start">
              <H2 mt={0}>{t("page-gas-how-is-gas-calculated-header")}</H2>

              <Pill mt={1.5} ms={4} background="warning">
                {t("page-gas-advanced")}
              </Pill>
            </Flex>
            <Text>{t("page-gas-how-is-gas-calculated-text-1")}</Text>
            <UnorderedList ms={6} spacing={3}>
              <ListItem>
                <Translation id="page-gas:page-gas-how-is-gas-calculated-item-1" />
              </ListItem>
              <ListItem>
                <Translation id="page-gas:page-gas-how-is-gas-calculated-item-2" />
              </ListItem>
              <ListItem>
                <Translation id="page-gas:page-gas-how-is-gas-calculated-item-3" />
                <UnorderedList ms={6} spacing={3} styleType="none">
                  <ListItem color="body.medium" fontSize="sm">
                    <Translation id="page-gas:page-gas-how-is-gas-calculated-list-item-1" />
                  </ListItem>
                </UnorderedList>
              </ListItem>
            </UnorderedList>
            <Text>
              <Translation id="page-gas:page-gas-how-is-gas-calculated-text-2" />
            </Text>
          </Box>
          <Table maxW={"100%"} minW={"auto"}>
            <TableCaption fontSize="sm">
              <Translation id="page-gas:page-gas-table-figure" />
            </TableCaption>
            <Thead>
              <Tr>
                <Th>{t("page-gas-table-header-1")}</Th>
                <Th>{t("page-gas-table-header-2")}</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{t("page-gas-table-item-1-transaction-type")}</Td>
                <Td>21,000</Td>
              </Tr>
              <Tr>
                <Td>{t("page-gas-table-item-2-transaction-type")}</Td>
                <Td>65,000</Td>
              </Tr>
              <Tr>
                <Td>{t("page-gas-table-item-3-transaction-type")}</Td>
                <Td>84,904</Td>
              </Tr>
              <Tr>
                <Td>{t("page-gas-table-item-4-transaction-type")}</Td>
                <Td>184,523</Td>
              </Tr>
            </Tbody>
          </Table>
        </Flex>
      </Content>
      <Content>
        <H2 mt="0">{t("page-gas-faq-header")}</H2>
        {/* MaxWidth will be enforced by FAQ component once implemented */}
        <Box maxWidth="832px">
          <ExpandableCard title={t("page-gas-faq-question-1-q")}>
            <Text>
              <Translation id="page-gas:page-gas-faq-question-1-a-1" />
            </Text>
            <Text>
              <Translation id="page-gas:page-gas-faq-question-1-a-2" />
            </Text>
          </ExpandableCard>
          <ExpandableCard title={t("page-gas-faq-question-2-q")}>
            <Text>
              <Translation id="page-gas:page-gas-faq-question-2-a-1" />
            </Text>
            <Link href="/eth/">
              <Translation id="page-gas:page-gas-faq-question-2-a-2" />
            </Link>
          </ExpandableCard>
          <ExpandableCard title={t("page-gas-faq-question-3-q")}>
            <Text>
              <Translation id="page-gas:page-gas-faq-question-3-a-1" />
            </Text>
            <Text>{t("page-gas-faq-question-3-a-2")}</Text>
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
            image={whatIsEthereumImg}
            titleKey={t("page-gas-how-do-i-pay-less-gas-card-3-title")}
            alt=""
            descriptionKey={t(
              "page-gas-how-do-i-pay-less-gas-card-3-description"
            )}
          >
            <Box>
              <ButtonLink href="/layer-2/">
                {t("page-gas-use-layer-2")}
              </ButtonLink>
            </Box>
          </Box>
          <Box
            as={Callout}
            flex="1 1 416px"
            minH="full"
            image={dogeComputerImg}
            titleKey={t("page-community:page-community-explore-dapps-title")}
            alt={t("page-community:page-community-explore-dapps-alt")}
            descriptionKey={t(
              "page-community:page-community-explore-dapps-description"
            )}
          >
            <Box>
              <ButtonLink href="/dapps/">
                {t("page-community:page-community-explore-dapps")}
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
