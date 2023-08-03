import React from "react"
import { graphql, PageProps } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { GatsbyImage } from "gatsby-plugin-image"
import { MDXProvider } from "@mdx-js/react"
import {
  Box,
  chakra,
  Flex,
  ListItem,
  Show,
  SimpleGrid,
  Text,
  UnorderedList,
  useToken,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"

import Button from "../components/Button"
import ButtonLink from "../components/ButtonLink"
import Card from "../components/Card"
import ImageCard from "../components/ImageCard"
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
import Pill from "../components/Pill"
import RandomAppList from "../components/RandomAppList"
import UpgradeTableOfContents from "../components/UpgradeTableOfContents"
import TableOfContents, {
  Item as ItemTableOfContents,
} from "../components/TableOfContents"
import FeedbackCard from "../components/FeedbackCard"
import SectionNav from "../components/SectionNav"
import Emoji from "../components/Emoji"
import YouTube from "../components/YouTube"
import Breadcrumbs from "../components/Breadcrumbs"
import RoadmapActionCard from "../components/Roadmap/RoadmapActionCard"
import RoadmapImageContent from "../components/Roadmap/RoadmapImageContent"
import QuizWidget from "../components/Quiz/QuizWidget"
import {
  Page,
  InfoColumn,
  ContentContainer,
  InfoTitle,
  MobileButton,
  H1,
  H2,
  H3,
  Pre,
  StyledButtonDropdown,
  MobileButtonDropdown,
  Title,
  Divider,
  Paragraph,
} from "./use-cases"

import { isLangRightToLeft, TranslationKey } from "../utils/translations"
import { Lang } from "../utils/languages"
import { getImage } from "../utils/image"

import type { ChildOnlyProp, Context } from "../types"
import type { List as ButtonDropdownList } from "../components/ButtonDropdown"

const CardGrid = (props: ChildOnlyProp) => (
  <SimpleGrid
    columns={{ base: 1, md: 2 }}
    spacing={8}
    sx={{ h3: { mt: 0 } }}
    {...props}
  />
)

const HeroContainer = (props: ChildOnlyProp) => (
  <Flex
    flexDirection={{ base: "column", lg: "row" }}
    align="center"
    bg="layer2Gradient"
    py={12}
    px={{ base: 0, lg: 8 }}
    mb={{ base: 8, lg: 0 }}
    maxH={{ base: "100%", lg: "none" }}
    {...props}
  />
)

const HeroImage = chakra(GatsbyImage, {
  baseStyle: {
    alignSelf: {
      base: "center",
      lg: "normal",
    },
    bgRepeat: "no-repeat",
    flex: "1 1 100%",
    right: 0,
    bottom: 0,
    width: "full",
    height: "full",
    overflow: "initial",
    maxW: {
      base: "538px",
      lg: "full",
    },
  },
})

const TitleCard = (props: ChildOnlyProp) => (
  <Flex w="full" p={8} direction="column" justify="flex-start" {...props} />
)

// Note: you must pass components to MDXProvider in order to render them in markdown files
// https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#mdxprovider
const components = {
  a: Link,
  h1: H1,
  h2: H2,
  h3: H3,
  p: Paragraph,
  pre: Pre,
  table: MarkdownTable,
  li: ListItem,
  ul: UnorderedList,
  MeetupList,
  RandomAppList,
  Logo,
  ButtonLink,
  Contributors,
  InfoBanner,
  Card,
  CardGrid,
  ImageCard,
  Divider,
  SectionNav,
  Pill,
  Emoji,
  UpgradeStatus,
  DocLink,
  ExpandableCard,
  YouTube,
  RoadmapActionCard,
  RoadmapImageContent,
  QuizWidget,
}

const RoadmapPage = ({
  data: { pageData: mdx },
  location,
}: PageProps<Queries.RoadmapPageQuery, Context>) => {
  // TODO: Replace with direct token implementation after UI migration is completed
  const lgBp = useToken("breakpoints", "lg")

  if (!mdx?.frontmatter)
    throw new Error(
      "Staking page template query does not return expected values"
    )
  if (!mdx?.frontmatter?.title)
    throw new Error("Required `title` property missing for staking template")

  const isRightToLeft = isLangRightToLeft(mdx.frontmatter.lang as Lang)
  const tocItems = mdx.tableOfContents?.items as Array<ItemTableOfContents>

  const dropdownLinks: ButtonDropdownList = {
    text: "Roadmap Options" as TranslationKey,
    ariaLabel: "Roadmap options dropdown menu",
    items: [
      {
        text: "Roadmap home" as TranslationKey,
        to: "/roadmap/",
        matomo: {
          eventCategory: `Roadmap dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap home",
        },
      },
      {
        text: "Better security" as TranslationKey,
        to: "/roadmap/security",
        matomo: {
          eventCategory: `Roadmap security dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap security",
        },
      },
      {
        text: "Scaling" as TranslationKey,
        to: "/roadmap/scaling",
        matomo: {
          eventCategory: `Roadmap scaling dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap scaling home",
        },
      },
      {
        text: "Better user experience" as TranslationKey,
        to: "/roadmap/user-experience/",
        matomo: {
          eventCategory: `Roadmap user experience dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap user experience home",
        },
      },
      {
        text: "Future-proofing" as TranslationKey,
        to: "/roadmap/future-proofing",
        matomo: {
          eventCategory: `Roadmap future-proofing dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap future-proofing home",
        },
      },
    ],
  }

  return (
    <Box position="relative" overflowX="hidden">
      <HeroContainer>
        <Flex w="100%" flexDirection={{ base: "column", md: "row" }}>
          <TitleCard>
            <Breadcrumbs slug={location.pathname} />
            <Title>{mdx.frontmatter.title}</Title>
            <Text>{mdx.frontmatter.description}</Text>
            {mdx?.frontmatter?.buttons && (
              // FIXME: remove the `ul` override once removed the corresponding
              // global styles in `src/@chakra-ui/gatsby-plugin/styles.ts`
              <Wrap spacing={2} marginBottom={4} sx={{ ul: { m: 0 } }}>
                {mdx.frontmatter.buttons.map((button, idx) => {
                  if (button?.to) {
                    return (
                      <WrapItem>
                        <ButtonLink
                          key={idx}
                          variant={button?.variant}
                          to={button?.to}
                        >
                          {button.label}
                        </ButtonLink>
                      </WrapItem>
                    )
                  }
                  return (
                    <WrapItem>
                      <Button
                        key={idx}
                        variant={button?.variant}
                        toId={button?.toId}
                      >
                        {button?.label}
                      </Button>
                    </WrapItem>
                  )
                })}
              </Wrap>
            )}
            <TableOfContents
              position="relative"
              zIndex="2"
              items={tocItems}
              isMobile
            />
          </TitleCard>
          <HeroImage
            image={getImage(mdx.frontmatter.image)!}
            alt={mdx.frontmatter.alt || ""}
            objectFit="contain"
          />
        </Flex>
      </HeroContainer>
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

export const roadmapPageQuery = graphql`
  query RoadmapPage($languagesToFetch: [String!]!, $relativePath: String) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["common", "learn-quizzes"] }
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
    pageData: mdx(fields: { relativePath: { eq: $relativePath } }) {
      fields {
        slug
      }
      frontmatter {
        title
        description
        lang
        sidebarDepth
        summaryPoints
        alt
        buttons {
          label
          to
          toId
          variant
        }
        image {
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
      body
      tableOfContents
    }
  }
`

export default RoadmapPage
