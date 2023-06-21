import React from "react"
import { graphql, PageProps } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { GatsbyImage } from "gatsby-plugin-image"
import { MDXProvider } from "@mdx-js/react"
import styled from "@emotion/styled"
import {
  Flex,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"

import Button from "../components/Button"

import ButtonLink from "../components/ButtonLink"
import ButtonDropdown, {
  List as ButtonDropdownList,
} from "../components/ButtonDropdown"
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
import {
  Divider,
  Paragraph,
  Header1,
  InfoGrid,
} from "../components/SharedStyledComponents"
import Emoji from "../components/OldEmoji"
import YouTube from "../components/YouTube"
import Breadcrumbs from "../components/Breadcrumbs"
import RoadmapActionCard from "../components/Roadmap/RoadmapActionCard"
import RoadmapImageContent from "../components/Roadmap/RoadmapImageContent"

import { isLangRightToLeft, TranslationKey } from "../utils/translations"
import { Context } from "../types"
import { Lang } from "../utils/languages"
import { getImage } from "../utils/image"

const Page = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto 4rem;

  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 4rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const InfoColumn = styled.aside`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 6.25rem; /* account for navbar */
  height: calc(100vh - 80px);
  flex: 0 1 330px;
  margin: 0 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const MobileButton = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    background: ${(props) => props.theme.colors.background};
    box-shadow: 0 -1px 0px ${(props) => props.theme.colors.border};
    width: 100%;
    bottom: 0;
    position: sticky;
    padding: 2rem;
    z-index: 99;
    margin-bottom: 0rem;
  }
`

// Apply styles for classes within markdown here
const ContentContainer = styled.article`
  flex: 1 1 ${(props) => props.theme.breakpoints.l};
  position: relative;
  padding: 2rem;
  padding-top: 0rem;
  p:first-of-type {
    margin-top: 0;
  }

  .featured {
    padding-left: 1rem;
    margin-left: -1rem;
    border-left: 1px dotted ${(props) => props.theme.colors.primary};
  }

  .citation {
    p {
      color: ${(props) => props.theme.colors.text200};
    }
  }
`

const Pre = styled.pre`
  max-width: 100%;
  overflow-x: scroll;
  background-color: ${(props) => props.theme.colors.preBackground};
  border-radius: 0.25rem;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.preBorder};
  white-space: pre-wrap;
`

const InfoTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  text-align: right;
  margin-top: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    text-align: left;
    font-size: 2.5rem
    display: none;
  }
`

const H2 = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-top: 4rem;

  a {
    display: none;
  }

  /* Anchor tag styles */

  a {
    position: relative;
    display: initial;
    opacity: 0;
    margin-left: -1.5em;
    padding-right: 0.5rem;
    font-size: 1rem;
    vertical-align: middle;
    &:hover {
      display: initial;
      fill: ${(props) => props.theme.colors.primary};
      opacity: 1;
    }
  }

  &:hover {
    a {
      display: initial;
      fill: ${(props) => props.theme.colors.primary};
      opacity: 1;
    }
  }
`

const H3 = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;

  a {
    display: none;
  }

  /* Anchor tag styles */

  a {
    position: relative;
    display: initial;
    opacity: 0;
    margin-left: -1.5em;
    padding-right: 0.5rem;
    font-size: 1rem;
    vertical-align: middle;
    &:hover {
      display: initial;
      fill: ${(props) => props.theme.colors.primary};
      opacity: 1;
    }
  }

  &:hover {
    a {
      display: initial;
      fill: ${(props) => props.theme.colors.primary};
      opacity: 1;
    }
  }
`

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 2rem;
  h3 {
    margin-top: 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-template-columns: repeat(1, 1fr);
    margin: auto;
  }
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-top: 1rem;
`

const SummaryPoint = styled.li`
  color: ${(props) => props.theme.colors.text300};
`

const StyledButtonDropdown = styled(ButtonDropdown)`
  margin-bottom: 2rem;
  display: flex;
  justify-content: flex-end;
  text-align: center;
  @media (min-width: ${(props) => props.theme.breakpoints.s}) {
    align-self: flex-end;
  }
`

const MobileButtonDropdown = styled(StyledButtonDropdown)`
  margin-bottom: 0rem;
  display: none;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: block;
  }
`

const Container = styled.div`
  position: relative;
  overflow-x: hidden;
`

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 3rem 2rem;
  background: ${({ theme }) => theme.colors.layer2Gradient};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    max-height: 100%;
    padding-left: 0;
    padding-right: 0;
    margin-bottom: 2em;
  }
`

const Image = styled(GatsbyImage)`
  flex: 1 1 100%;
  background-repeat: no-repeat;
  right: 0;
  bottom: 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    width: 100%;
    height: 100%;
    max-width: 538px;
    overflow: initial;
    align-self: center;
    margin: 0;
  }
`

const MobileTableOfContents = styled(TableOfContents)`
  position: relative;
  z-index: 2;
`

const TitleCard = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`

// Note: you must pass components to MDXProvider in order to render them in markdown files
// https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#mdxprovider
const components = {
  a: Link,
  h1: Header1,
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
  InfoGrid,
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
}

const RoadmapPage = ({
  data: { pageData: mdx },
  location,
}: PageProps<Queries.RoadmapPageQuery, Context>) => {
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
    <Container>
      <HeroContainer>
        <Flex w="100%" flexDirection={{ base: "column", md: "row" }}>
          <TitleCard>
            <Breadcrumbs slug={location.pathname} />
            <Title>{mdx.frontmatter.title}</Title>
            <Text>{mdx.frontmatter.description}</Text>
            {mdx?.frontmatter?.buttons && (
              <Wrap spacing={2} marginBottom={4}>
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
            <MobileTableOfContents items={tocItems} isMobile />
          </TitleCard>
          <Image
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
        <ContentContainer id="content">
          <MDXProvider components={components}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
          <FeedbackCard />
        </ContentContainer>
        <MobileButton>
          <MobileButtonDropdown list={dropdownLinks} />
        </MobileButton>
      </Page>
    </Container>
  )
}

export const roadmapPageQuery = graphql`
  query RoadmapPage($languagesToFetch: [String!]!, $relativePath: String) {
    locales: allLocale(
      filter: { language: { in: $languagesToFetch }, ns: { in: ["common"] } }
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
