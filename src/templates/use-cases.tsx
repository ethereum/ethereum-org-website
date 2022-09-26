import React from "react"
import { useIntl } from "react-intl"
import { graphql, PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "@emotion/styled"
import { GatsbyImage } from "gatsby-plugin-image"

import ButtonLink from "../components/ButtonLink"
import ButtonDropdown, {
  List as ButtonDropdownList,
} from "../components/ButtonDropdown"
import BannerNotification from "../components/BannerNotification"
import Card from "../components/Card"
import ExpandableCard from "../components/ExpandableCard"
import DocLink from "../components/DocLink"
import Icon from "../components/Icon"
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
import Roadmap from "../components/Roadmap"
import UpgradeTableOfContents, {
  Item as ItemTableOfContents,
} from "../components/UpgradeTableOfContents"
import TableOfContents from "../components/TableOfContents"
import Translation from "../components/Translation"
import SectionNav from "../components/SectionNav"
import {
  Divider,
  Paragraph,
  Header1,
  Header4,
  ListItem,
} from "../components/SharedStyledComponents"
import Emoji from "../components/OldEmoji"
import YouTube from "../components/YouTube"
import FeedbackCard from "../components/FeedbackCard"

import { isLangRightToLeft } from "../utils/translations"
import { getSummaryPoints } from "../utils/getSummaryPoints"
import { Lang } from "../utils/languages"
import { getImage } from "../utils/image"
import { Context } from "../types"

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
  flex: 0 1 400px;
  margin-right: 4rem;
  margin-left: 2rem;
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
    font-size: 2.5rem;
    display: none;
  }
`

const H2 = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-top: 4rem;
`

const H3 = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
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
  li: ListItem,
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
  Divider,
  SectionNav,
  Pill,
  Emoji,
  UpgradeStatus,
  DocLink,
  ExpandableCard,
  YouTube,
}

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-top: 1rem;
`

const SummaryPoint = styled.li`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text300};
  margin-bottom: 0rem;
  line-height: auto;
`

const SummaryBox = styled.div``

const StyledButtonDropdown = styled(ButtonDropdown)`
  margin-bottom: 2rem;
  display: flex;
  justify-content: flex-end;
  text-align: center;
  @media (min-width: ${(props) => props.theme.breakpoints.s}) {
    align-self: flex-end;
  }
`

const StyledEmoji = styled(Emoji)`
  margin-right: 1rem;
  flex-shrink: 0;
`

const MobileButtonDropdown = styled(StyledButtonDropdown)`
  margin-bottom: 0rem;
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const Container = styled.div`
  position: relative;
`

const HeroContainer = styled.div`
  background: ${(props) => props.theme.colors.cardGradient};
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-end;
  max-height: 608px;
  min-height: 608px;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    max-height: 100%;
  }
`

const Image = styled(GatsbyImage)<{ useCase: string }>`
  flex: 1 1 100%;
  background-size: cover;
  background-repeat: no-repeat;
  right: 0;
  bottom: 0;
  background-size: cover;
  max-width: ${({ useCase }) =>
    useCase === `dao` ? `572px` : useCase === `defi` ? `80%` : `640px`};
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    width: 100%;
    height: 100%;
    max-height: 340px;
    max-width: ${({ useCase }) =>
      useCase === "defi" ? "100%" : "min(405px, 98%)"};
    overflow: initial;
    align-self: center;
    margin: 0;
  }
`

const MoreContent = styled(Link)`
  width: 100%;
  background: ${(props) => props.theme.colors.ednBackground};
  padding: 1rem;
  display: flex;
  justify-content: center;
  &:hover {
    background: ${(props) => props.theme.colors.background};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const MobileTableOfContents = styled(TableOfContents)`
  position: relative;
  z-index: 2;
`

const StyledBannerNotification = styled(BannerNotification)`
  display: flex;
  justify-content: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    display: none;
  }
`

const TitleCard = styled.div`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
  padding: 2rem;
  display: flex;
  position: absolute;
  left: 6rem;
  top: 6rem;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 2px;
  z-index: 10;
  max-width: 640px;
  margin-top: 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    max-width: 100%;
    position: relative;
    left: 0rem;
    top: 0rem;
    background: ${(props) => props.theme.colors.ednBackground};
    box-shadow: none;
    margin-top: 0;
  }
`

const UseCasePage = ({
  data: { siteData, pageData: mdx },
  pageContext,
}: PageProps<Queries.UseCasePageQuery, Context>) => {
  const intl = useIntl()
  if (!siteData || !mdx?.frontmatter)
    throw new Error(
      "UseCases page template query does not return expected values"
    )
  if (!mdx?.frontmatter?.title)
    throw new Error("Required `title` property missing for use-cases template")

  const isRightToLeft = isLangRightToLeft(mdx.frontmatter.lang as Lang)
  const tocItems = mdx.tableOfContents?.items
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
    text: "template-usecase-dropdown",
    ariaLabel: "template-usecase-dropdown-aria",
    items: [
      {
        text: "template-usecase-dropdown-defi",
        to: "/defi/",
      },
      {
        text: "template-usecase-dropdown-nft",
        to: "/nft/",
      },
      {
        text: "template-usecase-dropdown-dao",
        to: "/dao/",
      },
      {
        text: "template-usecase-dropdown-social-networks",
        to: "/social-networks/",
      },
      {
        text: "template-usecase-dropdown-identity",
        to: "/decentralized-identity/",
      },
    ],
  }

  return (
    <Container>
      <StyledBannerNotification shouldShow>
        <StyledEmoji text=":pencil:" />
        <div>
          <Translation id="template-usecase-banner" />{" "}
          <Link to={absoluteEditPath}>
            <Translation id="template-usecase-edit-link" />
          </Link>
        </div>
      </StyledBannerNotification>
      <HeroContainer>
        <TitleCard>
          <Emoji size={4} text={mdx.frontmatter.emoji!} />
          <Title>{mdx.frontmatter.title}</Title>
          <SummaryBox>
            <ul>
              {summaryPoints.map((point, idx) => (
                <SummaryPoint key={idx}>{point}</SummaryPoint>
              ))}
            </ul>
          </SummaryBox>
          <MobileTableOfContents
            items={tocItems}
            maxDepth={mdx.frontmatter.sidebarDepth!}
            isMobile={true}
          />
        </TitleCard>
        <Image
          useCase={useCase}
          image={getImage(mdx.frontmatter.image)!}
          alt={mdx.frontmatter.alt || ""}
        />
      </HeroContainer>
      <MoreContent to="#content">
        <Icon name="chevronDown" />
      </MoreContent>
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

export const useCasePageQuery = graphql`
  query UseCasePage($relativePath: String) {
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
