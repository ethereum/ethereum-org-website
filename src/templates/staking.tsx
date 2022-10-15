import React from "react"
import { graphql, PageProps } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { GatsbyImage } from "gatsby-plugin-image"
import { MDXProvider } from "@mdx-js/react"
import styled from "@emotion/styled"

import ButtonLink from "../components/ButtonLink"
import ButtonDropdown, {
  List as ButtonDropdownList,
} from "../components/ButtonDropdown"
import Card from "../components/Card"
import ExpandableCard from "../components/ExpandableCard"
import DocLink from "../components/DocLink"
import Contributors from "../components/Contributors"
import SharedInfoBanner from "../components/InfoBanner"
import UpgradeStatus from "../components/UpgradeStatus"
import Link from "../components/Link"
import MarkdownTable from "../components/MarkdownTable"
import Logo from "../components/Logo"
import MeetupList from "../components/MeetupList"
import PageMetadata from "../components/PageMetadata"
import Pill from "../components/Pill"
import RandomAppList from "../components/RandomAppList"
import Roadmap from "../components/Roadmap"
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
  Header4,
  InfoGrid,
} from "../components/SharedStyledComponents"
import Emoji from "../components/OldEmoji"
import YouTube from "../components/YouTube"
import Breadcrumbs from "../components/Breadcrumbs"
import StakingLaunchpadWidget from "../components/Staking/StakingLaunchpadWidget"
import StakingProductsCardGrid from "../components/Staking/StakingProductsCardGrid"
import StakingComparison from "../components/Staking/StakingComparison"
import StakingHowSoloWorks from "../components/Staking/StakingHowSoloWorks"
import StakingConsiderations from "../components/Staking/StakingConsiderations"
import StakingCommunityCallout from "../components/Staking/StakingCommunityCallout"
import StakingGuides from "../components/Staking/StakingGuides"

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

  @media (min-width: ${({ theme }) => theme.breakpoints.l}) {
    h2:first-of-type {
      margin-top: 0;
    }
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
  grid-template-columns: repeat(3, 1fr);

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
`

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  --height: 500px;
  max-height: var(--height);
  min-height: var(--height);
  background: ${({ theme }) => theme.colors.layer2Gradient};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    max-height: 100%;
    padding-left: 0;
    padding-right: 0;
  }
`

const Image = styled(GatsbyImage)`
  flex: 1 1 100%;
  background-repeat: no-repeat;
  right: 0;
  bottom: 0;
  max-width: 400px;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    width: 100%;
    height: 100%;
    max-height: 340px;
    max-width: min(400px, 98%);
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

const InfoBanner = styled(SharedInfoBanner)`
  margin: 2rem 0;
`

// Note: you must pass components to MDXProvider in order to render them in markdown files
// https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#mdxprovider
const components = {
  a: Link,
  h1: Header1,
  h2: H2,
  h3: H3,
  h4: Header4,
  p: Paragraph,
  pre: Pre,
  table: MarkdownTable,
  MeetupList,
  RandomAppList,
  Roadmap,
  Logo,
  ButtonLink,
  Contributors,
  InfoBanner,
  Card,
  CardGrid,
  InfoGrid,
  Divider,
  SectionNav,
  Pill,
  Emoji,
  UpgradeStatus,
  DocLink,
  ExpandableCard,
  YouTube,
  StakingLaunchpadWidget,
  StakingProductsCardGrid,
  StakingComparison,
  StakingHowSoloWorks,
  StakingConsiderations,
  StakingGuides,
}

const StakingPage = ({
  data: { pageData: mdx },
  location,
}: PageProps<Queries.StakingPageQuery, Context>) => {
  if (!mdx?.frontmatter)
    throw new Error(
      "Staking page template query does not return expected values"
    )
  if (!mdx?.frontmatter?.title)
    throw new Error("Required `title` property missing for staking template")

  const isRightToLeft = isLangRightToLeft(mdx.frontmatter.lang as Lang)
  const tocItems = mdx.tableOfContents?.items as Array<ItemTableOfContents>
  const { summaryPoints } = mdx.frontmatter

  const dropdownLinks: ButtonDropdownList = {
    text: "Staking Options" as TranslationKey,
    ariaLabel: "Staking options dropdown menu",
    items: [
      {
        text: "Staking home" as TranslationKey,
        to: "/staking/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked staking home",
        },
      },
      {
        text: "Solo staking" as TranslationKey,
        to: "/staking/solo/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked solo staking",
        },
      },
      {
        text: "Staking as a service" as TranslationKey,
        to: "/staking/saas/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked staking as a service",
        },
      },
      {
        text: "Pooled staking" as TranslationKey,
        to: "/staking/pools/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked pooled staking",
        },
      },
    ],
  }

  return (
    <Container>
      <HeroContainer>
        <TitleCard>
          <Breadcrumbs slug={location.pathname} />
          <Title>{mdx.frontmatter.title}</Title>
          <ul>
            {(summaryPoints || []).map((point, idx) => (
              <SummaryPoint key={idx}>{point}</SummaryPoint>
            ))}
          </ul>
          <MobileTableOfContents
            items={tocItems}
            maxDepth={mdx.frontmatter.sidebarDepth!}
            isMobile={true}
          />
        </TitleCard>
        <Image
          image={getImage(mdx.frontmatter.image)!}
          alt={mdx.frontmatter.alt || ""}
          objectFit="contain"
        />
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
          <StakingCommunityCallout />
          <FeedbackCard />
        </ContentContainer>
        <MobileButton>
          <MobileButtonDropdown list={dropdownLinks} />
        </MobileButton>
      </Page>
    </Container>
  )
}

export const stakingPageQuery = graphql`
  query StakingPage($relativePath: String) {
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
        summaryPoints
        alt
        image {
          childImageSharp {
            gatsbyImageData(
              width: 500
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

export default StakingPage
