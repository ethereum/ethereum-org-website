// Libraries
import React, { HTMLAttributes, ReactNode, useEffect, useState } from "react"
import { graphql, PageProps } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"
import {
  Badge,
  Box,
  BoxProps,
  Center,
  Divider,
  DividerProps,
  Flex,
  GridItem,
  Heading,
  HeadingProps,
  Icon,
  ListItem,
  SimpleGrid,
  Text,
  UnorderedList,
  useBreakpointValue,
} from "@chakra-ui/react"

// Data
import layer2Data from "../data/layer-2/layer-2.json"

// Components
import ButtonLink from "../components/ButtonLink"
import Card from "../components/Card"
import ExpandableCard from "../components/ExpandableCard"
import FeedbackCard from "../components/FeedbackCard"
import InfoBanner from "../components/InfoBanner"
import Layer2Onboard from "../components/Layer2/Layer2Onboard"
import Layer2ProductCard from "../components/Layer2ProductCard"
import Link from "../components/Link"
import OrderedList from "../components/OrderedList"
import PageHero from "../components/PageHero"
import PageMetadata from "../components/PageMetadata"
import ProductList from "../components/ProductList"
import QuizWidget from "../components/Quiz/QuizWidget"
import Tooltip from "../components/Tooltip"
import Translation from "../components/Translation"

// Utils
import { getData } from "../utils/cache"
import { getLocaleForNumberFormat, TranslationKey } from "../utils/translations"
import { Lang } from "../utils/languages"
import { getImage } from "../utils/image"

// Constants
import { GATSBY_FUNCTIONS_PATH } from "../constants"
import { MdInfoOutline } from "react-icons/md"
import { merge } from "lodash"

type ChildOnlyType = {
  children: ReactNode
}

const SectionHeading = (props: HeadingProps) => {
  const headingSpecificProps = {
    fontSize: { base: "2xl", md: "2rem" },
    fontWeight: 600,
    lineHeight: 1.4,
  }

  if (props.as === "h3") {
    headingSpecificProps.fontSize = { base: "xl", md: "2xl" }
  }

  const mergeProps = merge(headingSpecificProps, props)

  return <Heading {...mergeProps} />
}

interface ContentBoxProps extends BoxProps {
  isLightGrayBg?: boolean
}
const ContentBox: React.FC<ContentBoxProps> = ({ isLightGrayBg, ...rest }) => (
  <Box
    px={8}
    py={12}
    width="full"
    {...(isLightGrayBg && { background: "layer2ContentSecondary" })}
    {...rest}
  />
)

const StyledInfoIcon = () => (
  <Icon
    as={MdInfoOutline}
    color="text"
    mr={2}
    opacity={0.8}
    boxSize="full"
    _hover={{ color: "primary" }}
    _active={{ color: "primary" }}
    _focus={{ color: "primary" }}
  />
)

const TwoColumnContent = (props: ChildOnlyType) => (
  <Flex
    justifyContent="space-between"
    gap={16}
    flexDirection={{ base: "column", lg: "row" }}
    alignItems={{ base: "flex-start", lg: "normal" }}
    {...props}
  />
)

const StatDivider = () => {
  const responsiveOrientation = useBreakpointValue<DividerProps["orientation"]>(
    { base: "horizontal", md: "vertical" }
  )
  return (
    <Divider
      orientation={responsiveOrientation}
      borderColor="homeDivider"
      my={{ base: 8, md: 0 }}
    />
  )
}

const StatBox = (props: ChildOnlyType) => (
  <Center
    flexDirection="column"
    flex={{ base: "100%", md: "33%" }}
    textAlign="center"
    px={5}
    {...props}
  />
)

const StatPrimary = (props: { content: string }) => (
  <Text
    color="primary"
    fontFamily="monospace"
    fontWeight="bold"
    fontSize="2rem"
  >
    {props.content}
  </Text>
)

const StatSpan = (props: ChildOnlyType) => (
  <Flex justifyContent="center" gap={2} {...props} />
)

const StatDescription = (props: ChildOnlyType) => (
  <Text opacity={0.8} m={0} {...props} />
)

const Layer2CardGrid = (props: ChildOnlyType) => (
  <SimpleGrid
    templateColumns="repeat(auto-fill, minmax(min(100%, 280px), 1fr))"
    gap={8}
    {...props}
  />
)

interface L2DataResponseItem {
  daily: {
    data: Array<[string, number, number]>
  }
}
interface L2DataResponse {
  layers2s: L2DataResponseItem
  combined: L2DataResponseItem
  bridges: L2DataResponseItem
}

interface FeeDataResponse {
  data: Array<{
    id: string
    results: { feeTransferEth: number }
    errors?: { [key: string]: string }
  }>
}

const Layer2Page = ({ data }: PageProps<Queries.Layer2PageQuery>) => {
  const { t } = useTranslation()
  const { language } = useI18next()
  const [tvl, setTVL] = useState("loading...")
  const [percentChangeL2, setL2PercentChange] = useState("loading...")
  const [averageFee, setAverageFee] = useState("loading...")

  useEffect(() => {
    const localeForStatsBoxNumbers = getLocaleForNumberFormat(language as Lang)

    const fetchL2Beat = async (): Promise<void> => {
      try {
        const l2BeatData = await getData<L2DataResponse>(
          `${GATSBY_FUNCTIONS_PATH}/l2beat`
        )

        const dailyData = l2BeatData.layers2s.daily.data

        // formatted TVL from L2beat API formatted
        const TVL = new Intl.NumberFormat(localeForStatsBoxNumbers, {
          style: "currency",
          currency: "USD",
          notation: "compact",
          minimumSignificantDigits: 2,
          maximumSignificantDigits: 3,
        }).format(dailyData[dailyData.length - 1][1])

        setTVL(`${TVL}`)
        // Calculate percent change ((new value - old value) / old value) *100)
        const percentage =
          ((dailyData[dailyData.length - 1][1] -
            dailyData[dailyData.length - 31][1]) /
            dailyData[dailyData.length - 31][1]) *
          100
        setL2PercentChange(
          percentage > 0
            ? `+${percentage.toFixed(2)}%`
            : `${percentage.toFixed(2)}%`
        )
      } catch (error) {
        console.error(error)
        setTVL("Error, please refresh.")
        setL2PercentChange("Error, please refresh.")
      }
    }
    fetchL2Beat()

    const fetchCryptoStats = async (): Promise<void> => {
      try {
        // Average eth transfer fee from L2's supported by cryptostats API
        const feeDataResponse = await getData<FeeDataResponse>(
          "https://api.cryptostats.community/api/v1/l2-fees/feeTransferEth?metadata=false"
        )

        // filtering out L2's we arent listing
        const feeData = feeDataResponse.data.filter(
          (l2) => l2.id !== "hermez" && !l2.errors
        )

        const feeAverage =
          feeData.reduce(
            (acc, curr) => (acc += curr.results.feeTransferEth),
            0
          ) / feeData.length

        const intlFeeAverage = new Intl.NumberFormat(localeForStatsBoxNumbers, {
          style: "currency",
          currency: "USD",
          notation: "compact",
          minimumSignificantDigits: 2,
          maximumSignificantDigits: 3,
        }).format(feeAverage)
        setAverageFee(`${intlFeeAverage}`)
      } catch (error) {
        setAverageFee("Error, please refresh.")
        console.error(error)
      }
    }
    fetchCryptoStats()
  }, [language])

  const heroContent = {
    title: t("layer-2-hero-title"),
    header: t("layer-2-hero-header"),
    subtitle: t("layer-2-hero-subtitle"),
    image: getImage(data.heroImage)!,
    alt: t("layer-2-hero-alt-text"),
    buttons: [
      {
        content: t("layer-2-hero-button-1"),
        toId: "what-is-layer-2",
        matomo: {
          eventCategory: "layer 2 hero buttons",
          eventAction: "click",
          eventName: "what is layer 2",
        },
      },
      {
        content: t("layer-2-hero-button-2"),
        toId: "use-layer-2",
        variant: "outline",
        matomo: {
          eventCategory: "layer 2 hero buttons",
          eventAction: "click",
          eventName: "use layer 2",
        },
      },
      {
        content: t("layer-2-hero-button-3"),
        toId: "how-to-get-onto-layer-2",
        variant: "outline",
        matomo: {
          eventCategory: "layer 2 hero buttons",
          eventAction: "click",
          eventName: "move to layer 2",
        },
      },
    ],
  }

  const layer2Cards = [
    {
      emoji: ":money_with_wings:",
      title: t("layer-2-lower-fees-title"),
      description: t("layer-2-lower-fees-description"),
    },
    {
      emoji: ":closed_lock_with_key:",
      title: t("layer-2-maintain-security-title"),
      description: t("layer-2-maintain-security-description"),
    },
    {
      emoji: ":hammer_and_wrench:",
      title: t("layer-2-expand-use-cases-title"),
      description: t("layer-2-expand-use-cases-description"),
    },
  ]

  const rollupCards = [
    {
      image: getImage(data.optimisticRollup),
      title: t("layer-2-optimistic-rollups-title"),
      description: t("layer-2-optimistic-rollups-description"),
      childSentence: t("layer-2-optimistic-rollups-childSentance"),
      childLink: "/developers/docs/scaling/optimistic-rollups/",
    },
    {
      image: getImage(data.zkRollup),
      title: t("layer-2-zk-rollups-title"),
      description: t("layer-2-zk-rollups-description"),
      childSentence: t("layer-2-zk-rollups-childSentance"),
      childLink: "/developers/docs/scaling/zk-rollups/",
    },
  ]

  const toolsData = {
    information: [
      {
        title: "L2BEAT",
        description: t("layer-2-tools-l2beat-description"),
        link: "https://l2beat.com",
        image: getImage(data.l2beat),
        alt: "L2BEAT",
      },
      {
        title: "L2 Fees",
        description: t("layer-2-tools-l2fees-description"),
        link: "https://l2fees.info",
        image: getImage(data.doge),
        alt: "L2 Fees",
      },
      {
        title: "Chainlist",
        description: t("layer-2-tools-chainlist-description"),
        link: "https://chainlist.org",
        image: getImage(data.doge),
        alt: "Chainlist",
      },
    ],
    walletManagers: [
      {
        title: "Zapper",
        description: t("layer-2-tools-zapper-description"),
        link: "https://zapper.fi/",
        image: getImage(data.zapper),
        alt: "Zapper",
      },
      {
        title: "Zerion",
        description: t("layer-2-tools-zerion-description"),
        link: "https://zerion.io",
        image: getImage(data.zerion),
        alt: "Zerion",
      },
      {
        title: "DeBank",
        description: t("layer-2-tools-debank-description"),
        link: "https://debank.com",
        image: getImage(data.debank),
        alt: "DeBank",
      },
    ],
  }

  const layer2DataCombined = [...layer2Data.optimistic, ...layer2Data.zk]

  type ToolTipContentMetric = {
    apiUrl: string
    apiProvider: string
  }
  const tooltipContent = (metric: ToolTipContentMetric): JSX.Element => (
    <div>
      <Translation id="data-provided-by" />{" "}
      <Link to={metric.apiUrl}>{metric.apiProvider}</Link>
    </div>
  )

  const statBoxGroupData: Array<{
    content: string
    descriptionId: TranslationKey
    tooltipContent: ToolTipContentMetric
  }> = [
    {
      content: tvl,
      descriptionId: "layer-2-statsbox-1",
      tooltipContent: {
        apiUrl: "https://l2beat.com/",
        apiProvider: "L2BEAT",
      },
    },
    {
      content: averageFee,
      descriptionId: "layer-2-statsbox-2",
      tooltipContent: {
        apiUrl: "https://cryptostats.community/",
        apiProvider: "CryptoStats",
      },
    },
    {
      content: percentChangeL2,
      descriptionId: "layer-2-statsbox-3",
      tooltipContent: {
        apiUrl: "https://l2beat.com/",
        apiProvider: "L2BEAT",
      },
    },
  ]

  return (
    <Flex flexDirection="column" alignItems="center">
      <PageMetadata
        title={"Layer 2"}
        description={"Introduction page to layer 2"}
      />

      {/* Hero Section */}
      <Box background="layer2Gradient" width="full">
        <Box pb={8}>
          <PageHero content={heroContent} isReverse />
        </Box>

        <ContentBox>
          <Center
            flexDirection={{ base: "column", md: "row" }}
            mb={16}
            // To allow the content divider to expand vertically above the breakpoint
            height={{ md: "100px" }}
          >
            {statBoxGroupData.map((box, idx) => (
              <>
                <StatBox>
                  <StatPrimary content={box.content} />
                  <StatSpan>
                    <StatDescription>
                      <Translation id={box.descriptionId} />
                    </StatDescription>
                    <Tooltip content={tooltipContent(box.tooltipContent)}>
                      <StyledInfoIcon />
                    </Tooltip>
                  </StatSpan>
                </StatBox>
                {idx < statBoxGroupData.length - 1 ? <StatDivider /> : null}
              </>
            ))}
          </Center>
        </ContentBox>
      </Box>
      {/* What is Layer 2 Section */}
      <ContentBox id="what-is-layer-2">
        <TwoColumnContent>
          <Box flex="50%">
            <SectionHeading>
              <Translation id="layer-2-what-is-layer-2-title" />
            </SectionHeading>
            <Text>
              <Translation id="layer-2-what-is-layer-2-1" />
            </Text>
            <Text>
              <Translation id="layer-2-what-is-layer-2-2" />
            </Text>
          </Box>
          <Box flex="50%">
            <GatsbyImage
              image={getImage(data.whatIsEthereum)!}
              alt=""
              style={{ maxHeight: "400px" }}
              objectFit="contain"
            />
          </Box>
        </TwoColumnContent>
      </ContentBox>
      {/* What is Layer 1 Section */}
      <ContentBox isLightGrayBg>
        <SectionHeading>
          <Translation id="layer-2-what-is-layer-1-title" />
        </SectionHeading>
        <TwoColumnContent>
          <Box flex="50%">
            <Text>
              <Translation id="layer-2-what-is-layer-1-1" />
            </Text>
            <Text>
              <Translation id="layer-2-what-is-layer-1-2" />
            </Text>
          </Box>
          <Box flex="50%">
            <Text>
              <Translation id="layer-2-what-is-layer-1-list-title" />
            </Text>
            <OrderedList
              listData={[
                <Text>
                  <Translation id="layer-2-what-is-layer-1-list-1" />
                </Text>,
                <Text>
                  <Translation id="layer-2-what-is-layer-1-list-2" />
                </Text>,
                <Text>
                  <Translation id="layer-2-what-is-layer-1-list-3" />
                </Text>,
                <Text>
                  <Translation id="layer-2-what-is-layer-1-list-4" />
                </Text>,
              ]}
            />
            <Text>
              <Translation id="layer-2-what-is-layer-1-list-link-1" />{" "}
              <Link to="/what-is-ethereum/">
                <Translation id="layer-2-what-is-layer-1-list-link-2" />
              </Link>
            </Text>
          </Box>
        </TwoColumnContent>
      </ContentBox>
      {/* Why Layer 2 Section */}
      <ContentBox>
        <TwoColumnContent>
          <Center flex="50%">
            <GatsbyImage
              image={getImage(data.dao)!}
              alt=""
              style={{ width: "100%" }}
              objectFit="contain"
            />
          </Center>
          <Box flex="50%">
            <SectionHeading>
              <Translation id="layer-2-why-do-we-need-layer-2-title" />
            </SectionHeading>
            <Text>
              <Translation id="layer-2-why-do-we-need-layer-2-1" />
            </Text>
            <Text>
              <Translation id="layer-2-why-do-we-need-layer-2-2" />
            </Text>

            <SectionHeading as="h3">
              <Translation id="layer-2-why-do-we-need-layer-2-scalability" />
            </SectionHeading>
            <Text>
              <Translation id="layer-2-why-do-we-need-layer-2-scalability-1" />
            </Text>
            <Text>
              <Translation id="layer-2-why-do-we-need-layer-2-scalability-2" />
            </Text>
            <Link to="/roadmap/vision/">
              <Translation id="layer-2-why-do-we-need-layer-2-scalability-3" />
            </Link>
          </Box>
        </TwoColumnContent>
        <SectionHeading as="h3">
          <Translation id="layer-2-benefits-of-layer-2-title" />
        </SectionHeading>
        <SimpleGrid
          columnGap={8}
          rowGap={4}
          templateColumns="repeat(auto-fill, minmax(340px, 1fr))"
        >
          {layer2Cards.map(({ emoji, title, description }, idx) => (
            <GridItem
              as={Card}
              description={description}
              title={title}
              emoji={emoji}
              key={idx}
              _hover={{
                transition: "0.1s",
                transform: "scale(1.01)",
                img: {
                  transition: "0.1s",
                  transform: "scale(1.1)",
                },
              }}
            />
          ))}
        </SimpleGrid>
      </ContentBox>
      {/* How does Layer 2 Work Section */}
      <ContentBox>
        <TwoColumnContent>
          <Box flex="50%">
            <SectionHeading>
              <Translation id="layer-2-how-does-layer-2-work-title" />
            </SectionHeading>
            <Text>
              <Translation id="layer-2-how-does-layer-2-work-1" />
            </Text>
            <Text>
              <Translation id="layer-2-how-does-layer-2-work-2" />
            </Text>
            <SectionHeading as="h3">
              <Translation id="layer-2-rollups-title" />
            </SectionHeading>
            <Text>
              <Translation id="layer-2-rollups-1" />
            </Text>
            <Text>
              <Translation id="layer-2-rollups-2" />
            </Text>
          </Box>
          <Center flex="50%">
            <GatsbyImage
              image={getImage(data.rollup)!}
              alt=""
              style={{ width: "100%" }}
              objectFit="contain"
            />
          </Center>
        </TwoColumnContent>
        <TwoColumnContent>
          {rollupCards.map(
            ({ image, title, description, childSentence, childLink }) => (
              <Flex
                key={title}
                background="ednBackground"
                borderRadius="sm"
                border="1px"
                borderColor="lightBorder"
                p={6}
                flex={{ base: "100%", md: "50%" }}
                flexDirection="column"
                justifyContent="space-between"
              >
                <GatsbyImage
                  image={image!}
                  alt=""
                  objectPosition="0"
                  objectFit="contain"
                />
                <SectionHeading as="h3">{title}</SectionHeading>
                <Text>{description}</Text>
                <Text>
                  <Link to={childLink}>{childSentence}</Link>
                </Text>
              </Flex>
            )
          )}
        </TwoColumnContent>
      </ContentBox>
      {/* DYOR Section */}
      <ContentBox>
        <InfoBanner isWarning>
          <SectionHeading>
            <Translation id="layer-2-dyor-title" />
          </SectionHeading>
          <Text>
            <Translation id="layer-2-dyor-1" />
          </Text>
          <Text>
            <Translation id="layer-2-dyor-2" />
          </Text>
          <Text>
            <ButtonLink to="https://l2beat.com/scaling/risk">
              <Translation id="layer-2-dyor-3" />
            </ButtonLink>
          </Text>
        </InfoBanner>
      </ContentBox>
      {/* Use Layer 2 Section */}
      <ContentBox id="use-layer-2">
        <SectionHeading>
          <Translation id="layer-2-use-layer-2-title" />
        </SectionHeading>
        <Text>
          <Translation id="layer-2-use-layer-2-1" />
        </Text>
        <Text>
          <Translation id="layer-2-contract-accounts" />
        </Text>
        <SectionHeading as="h3">
          <Translation id="layer-2-use-layer-2-generalized-title" />
        </SectionHeading>
        <Text>
          <Translation id="layer-2-use-layer-2-generalized-1" />
        </Text>
        <Layer2CardGrid>
          {layer2DataCombined
            .filter((l2) => !l2.purpose.indexOf("universal"))
            .map((l2, idx) => {
              return (
                <Layer2ProductCard
                  key={idx}
                  background={l2.background}
                  image={getImage(data[l2.imageKey])!}
                  description={t(l2.descriptionKey as TranslationKey)}
                  url={l2.website}
                  note={t(l2.noteKey as TranslationKey)}
                  name={l2.name}
                  bridge={l2.bridge}
                  ecosystemPortal={l2.ecosystemPortal}
                  tokenLists={l2.tokenLists}
                >
                  {l2.purpose.map((purpose, index) => (
                    <Badge key={index} me={2}>
                      {purpose}
                    </Badge>
                  ))}
                </Layer2ProductCard>
              )
            })}
        </Layer2CardGrid>
      </ContentBox>
      {/* Layer 2 App Specific Section */}
      <ContentBox id="use-layer-2">
        <SectionHeading as="h3">
          <Translation id="layer-2-use-layer-2-application-specific-title" />
        </SectionHeading>
        <Text>
          <Translation id="layer-2-use-layer-2-application-specific-1" />
        </Text>
        <Layer2CardGrid>
          {layer2DataCombined
            .filter((l2) => l2.purpose.indexOf("universal"))
            .map((l2, idx) => {
              return (
                <Layer2ProductCard
                  key={idx}
                  background={l2.background}
                  image={getImage(data[l2.imageKey])!}
                  description={t(l2.descriptionKey as TranslationKey)}
                  url={l2.website}
                  note={t(l2.noteKey as TranslationKey)}
                  name={l2.name}
                  bridge={l2.bridge}
                  ecosystemPortal={l2.ecosystemPortal}
                  tokenLists={l2.tokenLists}
                >
                  {l2.purpose.map((purpose, index) => (
                    <Badge key={index} me={2}>
                      {purpose}
                    </Badge>
                  ))}
                </Layer2ProductCard>
              )
            })}
        </Layer2CardGrid>
      </ContentBox>
      {/* Layer 2 Sidechain Section */}
      <ContentBox>
        <SectionHeading>
          <Translation id="layer-2-sidechains-title" />
        </SectionHeading>
        <TwoColumnContent>
          <Box flex="50%">
            <Text>
              <Translation id="layer-2-sidechains-1" />
            </Text>
            <Text>
              <Translation id="layer-2-sidechains-2" />
            </Text>
            <UnorderedList>
              <ListItem>
                <Link to="/developers/docs/scaling/sidechains/">
                  <Translation id="layer-2-more-on-sidechains" />
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/developers/docs/scaling/validium/">
                  <Translation id="layer-2-more-on-validiums" />
                </Link>
              </ListItem>
            </UnorderedList>
          </Box>
          <Box flex="50%">
            <Text>
              <Translation id="layer-2-sidechains-4" />
            </Text>
            <Text>
              <Translation id="layer-2-sidechains-5" />
            </Text>
          </Box>
        </TwoColumnContent>
      </ContentBox>
      {/* Layer 2 Onboard Section */}
      <ContentBox id="how-to-get-onto-layer-2">
        <Layer2Onboard
          layer2DataCombined={layer2DataCombined}
          ethIcon={getImage(data.ethHome)!}
          ethIconAlt={t("ethereum-logo")}
        />
      </ContentBox>
      {/* Layer 2 Tools Section */}
      <ContentBox>
        <SectionHeading>
          <Translation id="layer-2-tools-title" />
        </SectionHeading>
        <TwoColumnContent>
          <Box flex="50%">
            <ProductList
              category="Information"
              content={toolsData.information}
            />
          </Box>
          <Box flex="50%">
            <ProductList
              category="Wallet managers"
              content={toolsData.walletManagers}
            />
          </Box>
        </TwoColumnContent>
      </ContentBox>
      {/* Layer 2 FAQ Section */}
      <ContentBox>
        <SectionHeading>
          <Translation id="layer-2-faq-title" />
        </SectionHeading>
        <ExpandableCard title={`${t("layer-2-faq-question-1-title")}`}>
          <Text>
            <Translation id="layer-2-faq-question-1-description-1" />
          </Text>
        </ExpandableCard>
        <ExpandableCard title={`${t("layer-2-faq-question-2-title")}`}>
          <Text>
            <Translation id="layer-2-faq-question-2-description-1" />
          </Text>
          <Text>
            <Translation id="layer-2-faq-question-2-description-2" />
          </Text>
          <Text>
            <Translation id="layer-2-faq-question-2-description-3" />
          </Text>
          <Text>
            <Link to="/developers/docs/scaling/optimistic-rollups/">
              <Translation id="layer-2-more-info-on-optimistic-rollups" />
            </Link>
          </Text>
          <Text>
            <Link to="/developers/docs/scaling/zk-rollups/">
              <Translation id="layer-2-more-info-on-zk-rollups" />
            </Link>
          </Text>
        </ExpandableCard>
        <ExpandableCard title={`${t("layer-2-faq-question-4-title")}`}>
          <Text>
            <Translation id="layer-2-faq-question-4-description-1" />
          </Text>
          <Text>
            <Translation id="layer-2-faq-question-4-description-2" />
          </Text>
          <Text>
            <Translation id="layer-2-faq-question-4-description-3" />
          </Text>
          <Text>
            <Link to="/bridges/">
              <Translation id="layer-2-more-on-bridges" />
            </Link>
          </Text>
        </ExpandableCard>
        <ExpandableCard title={`${t("layer-2-faq-question-5-title")}`}>
          <Text>
            <Translation id="layer-2-faq-question-5-description-1" />{" "}
            <Link to="/contributing/adding-layer-2s/">
              <Translation id="layer-2-faq-question-5-view-listing-policy" />
            </Link>
          </Text>
          <Text>
            <Translation id="layer-2-faq-question-5-description-2" />
          </Text>
        </ExpandableCard>
      </ContentBox>
      {/* Layer 2 Further Reading Section */}
      <ContentBox>
        <SectionHeading>
          <Translation id="layer-2-further-reading-title" />
        </SectionHeading>
        <UnorderedList ms="1.45rem" mb="1.45rem">
          <ListItem>
            <Link to="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">
              <Translation id="a-rollup-centric-ethereum-roadmap" />
            </Link>{" "}
            <i>- Vitalik Buterin </i>
          </ListItem>
          <ListItem>
            <Link to="https://vitalik.ca/general/2021/01/05/rollup.html">
              <Translation id="an-incomplete-guide-to-rollups" />
            </Link>{" "}
            <i>- Vitalik Buterin</i>
          </ListItem>
          <ListItem>
            <Link to="https://www.youtube.com/watch?v=DyNbmgkyxJI">
              <Translation id="polygon-sidechain-vs-ethereum-rollups" />
            </Link>{" "}
            <i>- Lex Clips</i>
          </ListItem>
          <ListItem>
            <Link to="https://www.youtube.com/watch?v=7pWxCklcNsU">
              <Translation id="rollups-the-ultimate-ethereum-scaling-strategy" />
            </Link>{" "}
            <i>- Finematics</i>
          </ListItem>
          <ListItem>
            <Link to="https://barnabe.substack.com/p/understanding-rollup-economics-from?s=r">
              <Translation id="understanding-rollup-economics-from-first-principals" />
            </Link>{" "}
            <i>- Barnabé Monnot</i>
          </ListItem>
        </UnorderedList>
      </ContentBox>
      {/* Layer 2 Quiz Section */}
      <ContentBox>
        <QuizWidget quizKey="layer-2" />
      </ContentBox>
      {/* Layer 2 Feedback Section */}
      <ContentBox>
        <FeedbackCard />
      </ContentBox>
    </Flex>
  )
}

export default Layer2Page

export const query = graphql`
  query Layer2Page($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-layer-2", "learn-quizzes", "common"] }
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
    dao: file(relativePath: { eq: "use-cases/dao-2.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 500
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    doge: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    ethBlocks: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    ethHome: file(relativePath: { eq: "eth-home-icon.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 50
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    financeTransparent: file(relativePath: { eq: "finance_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 300
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    heroImage: file(relativePath: { eq: "layer-2/hero.png" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, quality: 100)
      }
    }
    impact: file(relativePath: { eq: "impact_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 300
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    optimisticRollup: file(
      relativePath: { eq: "layer-2/optimistic_rollup.png" }
    ) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
          width: 122
        )
      }
    }
    rollup: file(relativePath: { eq: "layer-2/rollup-2.png" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, quality: 100)
      }
    }
    zkRollup: file(relativePath: { eq: "layer-2/zk_rollup.png" }) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
          width: 122
        )
      }
    }
    whatIsEthereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    arbitrum: file(relativePath: { eq: "layer-2/arbitrum.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    aztec: file(relativePath: { eq: "layer-2/aztec.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 200
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    boba: file(relativePath: { eq: "layer-2/boba.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    chainlist: file(relativePath: { eq: "layer-2/chainlist.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    debank: file(relativePath: { eq: "layer-2/debank.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }

    l2beat: file(relativePath: { eq: "layer-2/l2beat.jpg" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    loopring: file(relativePath: { eq: "layer-2/loopring.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    metis: file(relativePath: { eq: "layer-2/metis-dark.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    optimism: file(relativePath: { eq: "layer-2/optimism.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    zapper: file(relativePath: { eq: "layer-2/zapper.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    zerion: file(relativePath: { eq: "layer-2/zerion.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    zkspace: file(relativePath: { eq: "layer-2/zkspace.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    zksync: file(relativePath: { eq: "layer-2/zksync.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
