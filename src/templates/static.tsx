import React from "react"
import { graphql, PageProps } from "gatsby"
import { useIntl } from "react-intl"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "@emotion/styled"

import ButtonLink from "../components/ButtonLink"
import Breadcrumbs from "../components/Breadcrumbs"
import Card from "../components/Card"
import Callout from "../components/Callout"
import Contributors from "../components/Contributors"
import FeedbackCard from "../components/FeedbackCard"
import InfoBanner from "../components/InfoBanner"
import Link from "../components/Link"
import MarkdownTable from "../components/MarkdownTable"
import Logo from "../components/Logo"
import MeetupList from "../components/MeetupList"
import PageMetadata from "../components/PageMetadata"
import Pill from "../components/Pill"
import RandomAppList from "../components/RandomAppList"
import ExpandableCard from "../components/ExpandableCard"
import Roadmap from "../components/Roadmap"
import TableOfContents, {
  Item as ItemTableOfContents,
} from "../components/TableOfContents"
import Translation from "../components/Translation"
import SectionNav from "../components/SectionNav"
import DocLink from "../components/DocLink"
import GhostCard from "../components/GhostCard"
import MatomoOptOut from "../components/MatomoOptOut"
import {
  Divider,
  Paragraph,
  Header1,
  Header2,
  Header3,
  Header4,
  ListItem,
  CardContainer,
} from "../components/SharedStyledComponents"
import Emoji from "../components/OldEmoji"
import UpcomingEventsList from "../components/UpcomingEventsList"
import Icon from "../components/Icon"
import SocialListItem from "../components/SocialListItem"
import YouTube from "../components/YouTube"
import TranslationChartImage from "../components/TranslationChartImage"
import PostMergeBanner from "../components/Banners/PostMergeBanner"
import EnergyConsumptionChart from "../components/EnergyConsumptionChart"

import { getLocaleTimestamp } from "../utils/time"
import { isLangRightToLeft, TranslationKey } from "../utils/translations"
import { Lang } from "../utils/languages"
import { Context } from "../types"

const Container = styled.div`
  width: 100%;
`

const Page = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto 4rem;
  padding: 2rem;

  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 4rem;
  }
`

// Apply styles for classes within markdown here
const ContentContainer = styled.article`
  max-width: ${(props) => props.theme.breakpoints.m};
  width: 100%;

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

const LastUpdated = styled.p`
  color: ${(props) => props.theme.colors.text200};
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

const MobileTableOfContents = styled(TableOfContents)`
  position: relative;
  z-index: 2;
`

const HR = styled.hr`
  width: 100%;
  margin: 2rem 0rem;
  margin-bottom: 1rem;
  display: inline-block;
  position: inherit;
  background: ${(props) => props.theme.colors.border};
`

// Note: you must pass components to MDXProvider in order to render them in markdown files
// https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#mdxprovider
const components = {
  a: Link,
  h1: Header1,
  h2: Header2,
  h3: Header3,
  h4: Header4,
  p: Paragraph,
  li: ListItem,
  pre: Pre,
  hr: HR,
  table: MarkdownTable,
  MeetupList,
  RandomAppList,
  Roadmap,
  Link,
  Logo,
  ButtonLink,
  Contributors,
  InfoBanner,
  FeedbackCard,
  Card,
  Divider,
  SectionNav,
  Pill,
  Emoji,
  DocLink,
  ExpandableCard,
  CardContainer,
  GhostCard,
  UpcomingEventsList,
  Icon,
  SocialListItem,
  MatomoOptOut,
  Callout,
  YouTube,
  TranslationChartImage,
  EnergyConsumptionChart,
}

const StaticPage = ({
  data: { siteData, pageData: mdx },
  pageContext: { relativePath },
}: PageProps<Queries.StaticPageQuery, Context>) => {
  const intl = useIntl()

  if (!siteData || !mdx?.frontmatter || !mdx.parent)
    throw new Error(
      "Static page template query does not return expected values"
    )
  if (!mdx?.frontmatter?.title)
    throw new Error("Required `title` property missing for static template")
  if (!relativePath)
    throw new Error("Required `relativePath` is missing on pageContext")

  const isRightToLeft = isLangRightToLeft(mdx.frontmatter.lang as Lang)

  const showPostMergeBanner = !!mdx.frontmatter.postMergeBannerTranslation
  const postMergeBannerTranslationString = mdx.frontmatter
    .postMergeBannerTranslation as TranslationKey | null

  // FIXME: remove this any, currently not sure how to fix the ts error
  const parent: any = mdx.parent
  const lastUpdatedDate = parent.fields
    ? parent.fields.gitLogLatestDate
    : parent.mtime

  const tocItems = mdx.tableOfContents?.items as Array<ItemTableOfContents>
  const { editContentUrl } = siteData.siteMetadata || {}
  const absoluteEditPath = `${editContentUrl}${relativePath}`

  const slug = mdx.fields?.slug || ""

  return (
    <Container>
      {showPostMergeBanner && (
        <PostMergeBanner
          translationString={postMergeBannerTranslationString!}
        />
      )}
      <Page dir={isRightToLeft ? "rtl" : "ltr"}>
        <PageMetadata
          title={mdx.frontmatter.title}
          description={mdx.frontmatter.description}
        />
        <ContentContainer>
          <Breadcrumbs slug={slug} />
          <LastUpdated
            dir={isLangRightToLeft(intl.locale as Lang) ? "rtl" : "ltr"}
          >
            <Translation id="page-last-updated" />:{" "}
            {getLocaleTimestamp(intl.locale as Lang, lastUpdatedDate)}
          </LastUpdated>
          <MobileTableOfContents
            editPath={absoluteEditPath}
            items={tocItems}
            isMobile={true}
            maxDepth={mdx.frontmatter.sidebarDepth!}
            hideEditButton={!!mdx.frontmatter.hideEditButton}
          />
          <MDXProvider components={components}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
          <FeedbackCard isArticle />
        </ContentContainer>
        {tocItems && (
          <TableOfContents
            editPath={absoluteEditPath}
            items={tocItems}
            maxDepth={mdx.frontmatter.sidebarDepth!}
            hideEditButton={!!mdx.frontmatter.hideEditButton}
          />
        )}
      </Page>
    </Container>
  )
}

export const staticPageQuery = graphql`
  query StaticPage($relativePath: String) {
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
        sidebarDepth
        isOutdated
        postMergeBannerTranslation
        hideEditButton
      }
      body
      tableOfContents
      parent {
        ... on File {
          mtime
          fields {
            gitLogLatestDate
          }
        }
      }
    }
  }
`

export default StaticPage
