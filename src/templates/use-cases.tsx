import React from "react"
import { graphql, PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { GatsbyImage } from "gatsby-plugin-image"
import {
  Badge,
  Box,
  BoxProps,
  calc,
  chakra,
  Flex,
  FlexProps,
  Heading,
  HeadingProps,
  Icon,
  ListItem as ChakraListItem,
  Show,
  Text,
  UnorderedList,
  useToken,
} from "@chakra-ui/react"
import { MdExpandMore } from "react-icons/md"
import { useTranslation } from "gatsby-plugin-react-i18next"

import ButtonLink from "../components/ButtonLink"
import ButtonDropdown, {
  List as ButtonDropdownList,
} from "../components/ButtonDropdown"
import BannerNotification from "../components/BannerNotification"
import Card from "../components/Card"
import ExpandableCard from "../components/ExpandableCard"
import DocLink from "../components/DocLink"
import Contributors from "../components/Contributors"
import InfoBanner from "../components/InfoBanner"
import UpgradeStatus from "../components/UpgradeStatus"
import Link from "../components/Link"
import MarkdownTable from "../components/MarkdownTable"
import Logo from "../components/Logo"
import MeetupList from "../components/MeetupList"
import PageMetadata from "../components/PageMetadata"
import RandomAppList from "../components/RandomAppList"
import UpgradeTableOfContents from "../components/UpgradeTableOfContents"
import TableOfContents, {
  type Item as ItemTableOfContents,
} from "../components/TableOfContents"
import Translation from "../components/Translation"
import SectionNav from "../components/SectionNav"
import Emoji from "../components/Emoji"
import YouTube from "../components/YouTube"
import FeedbackCard from "../components/FeedbackCard"
import QuizWidget from "../components/Quiz/QuizWidget"

import { isLangRightToLeft } from "../utils/translations"
import { getSummaryPoints } from "../utils/getSummaryPoints"
import { Lang } from "../utils/languages"
import { getImage } from "../utils/image"
import { ChildOnlyProp, Context } from "../types"

const commonHeadingProps: HeadingProps = {
  fontWeight: 700,
  lineHeight: 1.4,
}

const H1 = (props: HeadingProps) => (
  <Heading as="h1" {...commonHeadingProps} fontSize="2.5rem" {...props} />
)

const H2 = (props: HeadingProps) => (
  <Heading {...commonHeadingProps} fontSize="2rem" mt={16} {...props} />
)

const H3 = (props: HeadingProps) => (
  <Heading as="h3" {...commonHeadingProps} fontSize="2xl" {...props} />
)

const H4 = (props: HeadingProps) => (
  <Heading
    as="h4"
    {...commonHeadingProps}
    fontSize="xl"
    fontWeight={600}
    {...props}
  />
)

const Divider = () => <Box my={16} w="10%" h={1} bgColor="homeDivider" />

const Pre = (props: ChildOnlyProp) => (
  <chakra.pre
    bg="preBackground"
    border="1px"
    borderColor="preBorder"
    borderRadius="base"
    maxW="full"
    overflowX="scroll"
    p={4}
    whiteSpace="pre-wrap"
    {...props}
  />
)

const Paragraph = (props: ChildOnlyProp) => (
  <Text color="text300" mt={8} mb={4} {...props} />
)

// Note: you must pass components to MDXProvider in order to render them in markdown files
// https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#mdxprovider
const components = {
  a: Link,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: Paragraph,
  li: chakra.li,
  pre: Pre,
  table: MarkdownTable,
  MeetupList,
  RandomAppList,
  Logo,
  ButtonLink,
  Contributors,
  InfoBanner,
  Card,
  Divider,
  SectionNav,
  Badge,
  Emoji,
  UpgradeStatus,
  DocLink,
  ExpandableCard,
  YouTube,
  QuizWidget,
}

const HeroContainer = (props: ChildOnlyProp) => (
  <Flex
    bg="cardGradient"
    boxShadow="inset 0px -1px 0px rgba(0, 0, 0, 0.1)"
    flexDirection={{ base: "column-reverse", lg: "row" }}
    justifyContent="flex-end"
    minHeight="608px"
    maxHeight={{ base: "full", lg: "608px" }}
    width="full"
    {...props}
  />
)

const TitleCard = (props: ChildOnlyProp) => {
  const boxShadow = useToken("colors", "cardBoxShadow")

  return (
    <Flex
      bg={{ base: "ednBackground", lg: "background.base" }}
      border="1px"
      borderColor="border"
      borderRadius="base"
      boxShadow={{ lg: boxShadow }}
      flexDirection="column"
      maxWidth={{ base: "full", lg: "container.sm" }}
      mt={{ base: 0, lg: 12 }}
      zIndex="docked"
      p={8}
      position={{ base: "relative", lg: "absolute" }}
      top={{ lg: 24 }}
      left={{ lg: 24 }}
      {...props}
    />
  )
}

const Title = (props: ChildOnlyProp) => <H1 mt={4} {...props} />

const HeroImage = chakra(GatsbyImage, {
  baseStyle: {
    alignSelf: {
      base: "center",
      lg: "normal",
    },
    backgroundSize: "cover",
    flex: "1 1 100%",
    right: 0,
    bottom: 0,
    width: "full",
    overflow: "initial",
    maxH: {
      base: "340px",
      lg: "full",
    },
  },
})

export const Page = (props: FlexProps) => (
  <Flex
    flexDirection={{ base: "column", lg: "row" }}
    justifyContent="space-between"
    mx="auto"
    mb={16}
    pt={{ lg: 16 }}
    width="full"
    sx={{ "h2:first-of-type": { mt: { lg: 0 } } }}
    {...props}
  />
)

export const InfoColumn = (props: ChildOnlyProp) => (
  <Flex
    flexDirection="column"
    flex="0 1 400px"
    ml={8}
    mr={16}
    position="sticky"
    top="6.25rem"
    height={calc("100vh").subtract("80px").toString()}
    {...props}
  />
)

export const InfoTitle = (props: ChildOnlyProp) => (
  <H2
    fontSize={{ base: "2.5rem", lg: "5xl" }}
    textAlign={{ base: "left", lg: "right" }}
    mt={0}
    {...props}
  />
)

type ButtonDropdownProps = Parameters<typeof ButtonDropdown>[0]

export const StyledButtonDropdown = (
  props: FlexProps & ButtonDropdownProps
) => (
  <Flex
    as={ButtonDropdown}
    alignSelf={{ sm: "flex-end" }}
    justifyContent="flex-end"
    mb={8}
    textAlign="center"
    {...props}
  />
)

export const MobileButtonDropdown = (props: ButtonDropdownProps) => (
  <StyledButtonDropdown mb={0} {...props} />
)

export const ContentContainer = (props: Pick<BoxProps, "id" | "children">) => {
  const lgBp = useToken("breakpoints", "lg")

  return (
    <Box
      as="article"
      flex={`1 1 ${lgBp}`}
      position="relative"
      px={8}
      pb={8}
      {...props}
      sx={{
        ".featured": {
          pl: 4,
          ml: -4,
          borderLeft: "1px dotted",
          borderColor: "primary.base",
        },
        ".citation p": {
          color: "text200",
        },
      }}
    />
  )
}

export const MobileButton = (props: ChildOnlyProp) => {
  const borderColor = useToken("colors", "border")
  return (
    <Box
      bg="background.base"
      boxShadow={`0 -1px 0 ${borderColor}`}
      position="sticky"
      bottom={0}
      zIndex={99}
      p={8}
      width="full"
      {...props}
    />
  )
}

const UseCasePage = ({
  data: { siteData, pageData: mdx },
  pageContext,
}: PageProps<Queries.UseCasePageQuery, Context>) => {
  const { t } = useTranslation()
  // TODO: Replace with direct token implementation after UI migration is completed
  const lgBp = useToken("breakpoints", "lg")

  if (!siteData || !mdx?.frontmatter)
    throw new Error(
      "UseCases page template query does not return expected values"
    )
  if (!mdx?.frontmatter?.title)
    throw new Error("Required `title` property missing for use-cases template")

  const isRightToLeft = isLangRightToLeft(mdx.frontmatter.lang as Lang)
  const tocItems = mdx.tableOfContents?.items as ItemTableOfContents[]
  const summaryPoints = getSummaryPoints(mdx.frontmatter)

  const { editContentUrl } = siteData.siteMetadata || {}
  const { relativePath } = pageContext
  const absoluteEditPath = `${editContentUrl}${relativePath}`

  let useCase = "defi"
  if (pageContext.slug.includes("dao")) {
    useCase = "dao"
  }
  if (pageContext.slug.includes("nft")) {
    useCase = "nft"
  }
  // Use the same styling as DeFi page for hero image
  if (pageContext.slug.includes("social")) {
    useCase = "defi"
  }
  // Use the same styling as DAOs page for hero image
  if (pageContext.slug.includes("identity")) {
    useCase = "dao"
  }

  const dropdownLinks: ButtonDropdownList = {
    text: t("template-usecase-dropdown"),
    ariaLabel: t("template-usecase-dropdown-aria"),
    items: [
      {
        text: t("template-usecase-dropdown-defi"),
        to: "/defi/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "defi",
        },
      },
      {
        text: t("template-usecase-dropdown-nft"),
        to: "/nft/",
        matomo: {
          eventCategory: "use cases menuy",
          eventAction: "click",
          eventName: "nft",
        },
      },
      {
        text: t("template-usecase-dropdown-dao"),
        to: "/dao/",
        matomo: {
          eventCategory: "use cases menuy",
          eventAction: "click",
          eventName: "dao",
        },
      },
      {
        text: t("template-usecase-dropdown-social-networks"),
        to: "/social-networks/",
        matomo: {
          eventCategory: "use cases menuy",
          eventAction: "click",
          eventName: "social-networks",
        },
      },
      {
        text: t("template-usecase-dropdown-identity"),
        to: "/decentralized-identity/",
        matomo: {
          eventCategory: "use cases menuy",
          eventAction: "click",
          eventName: "decentralized-identity",
        },
      },
    ],
  }

  return (
    <Box position="relative" width="full">
      <Show above={lgBp}>
        <BannerNotification shouldShow>
          <Emoji text=":pencil:" fontSize="2xl" mr={4} flexShrink={0} />
          <div>
            <Translation id="template-usecase-banner" />{" "}
            <Link to={absoluteEditPath}>
              <Translation id="template-usecase-edit-link" />
            </Link>
          </div>
        </BannerNotification>
      </Show>
      <HeroContainer>
        <TitleCard>
          <Emoji fontSize="4rem" text={mdx.frontmatter.emoji!} />
          <Title>{mdx.frontmatter.title}</Title>
          <Box>
            <UnorderedList ms="1.45rem">
              {summaryPoints.map((point, idx) => (
                <ChakraListItem key={idx} color="text300" mb={0}>
                  {point}
                </ChakraListItem>
              ))}
            </UnorderedList>
            <TableOfContents
              items={tocItems}
              maxDepth={mdx.frontmatter.sidebarDepth!}
              isMobile
            />
          </Box>
        </TitleCard>
        <HeroImage
          image={getImage(mdx.frontmatter.image)!}
          alt={mdx.frontmatter.alt || ""}
          maxW={{
            base: useCase === "defi" ? "full" : "min(405px, 98%)",
            lg:
              (useCase === "dao" && "572px") ||
              (useCase === "defi" && "80%") ||
              "640px",
          }}
        />
      </HeroContainer>
      <Show above={lgBp}>
        <Flex
          as={Link}
          to="#content"
          bg="ednBackground"
          justifyContent="center"
          p={4}
          width="full"
          _hover={{
            bg: "background.base",
          }}
        >
          <Icon as={MdExpandMore} fontSize="2xl" color="secondary" />
        </Flex>
      </Show>
      <Page dir={isRightToLeft ? "rtl" : "ltr"}>
        <PageMetadata
          title={mdx.frontmatter.title}
          description={mdx.frontmatter.description}
        />
        <Show above={lgBp}>
          <InfoColumn>
            <StyledButtonDropdown list={dropdownLinks} />
            <InfoTitle>{mdx.frontmatter.title}</InfoTitle>

            {tocItems && (
              <UpgradeTableOfContents
                items={tocItems}
                maxDepth={mdx.frontmatter.sidebarDepth!}
              />
            )}
          </InfoColumn>
        </Show>
        <ContentContainer id="content">
          <MDXProvider components={components}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
          <FeedbackCard />
        </ContentContainer>
        <Show below={lgBp}>
          <MobileButton>
            <MobileButtonDropdown list={dropdownLinks} />
          </MobileButton>
        </Show>
      </Page>
    </Box>
  )
}

export const useCasePageQuery = graphql`
  query UseCasePage($languagesToFetch: [String!]!, $relativePath: String) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["template-usecase", "learn-quizzes", "common"] }
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
    siteData: site {
      siteMetadata {
        editContentUrl
      }
    }
    pageData: mdx(fields: { relativePath: { eq: $relativePath } }) {
      fields {
        slug
      }
      frontmatter {
        title
        description
        lang
        emoji
        sidebarDepth
        summaryPoint1
        summaryPoint2
        summaryPoint3
        alt
        image {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              quality: 100
            )
          }
        }
        isOutdated
      }
      body
      tableOfContents
    }
  }
`

export default UseCasePage
