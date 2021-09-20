import React from "react"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"
import ButtonLink from "../components/ButtonLink"
import Breadcrumbs from "../components/Breadcrumbs"
import Card from "../components/Card"
import Contributors from "../components/Contributors"
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
import TableOfContents from "../components/TableOfContents"
import Translation from "../components/Translation"
import TranslationsInProgress from "../components/TranslationsInProgress"
import SectionNav from "../components/SectionNav"
import DocLink from "../components/DocLink"
import GhostCard from "../components/GhostCard"
import { getLocaleTimestamp } from "../utils/time"
import { isLangRightToLeft } from "../utils/translations"
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
import Emoji from "../components/Emoji"
import UpcomingEventsList from "../components/UpcomingEventsList"

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
  Logo,
  ButtonLink,
  Contributors,
  InfoBanner,
  Card,
  Divider,
  SectionNav,
  Pill,
  TranslationsInProgress,
  Emoji,
  DocLink,
  ExpandableCard,
  CardContainer,
  GhostCard,
  UpcomingEventsList,
}

const StaticPage = ({ data: { siteData, mdx }, pageContext }) => {
  const intl = useIntl()
  const isRightToLeft = isLangRightToLeft(intl.locale)

  const lastUpdatedDate = mdx.parent.fields
    ? mdx.parent.fields.gitLogLatestDate
    : mdx.parent.mtime

  const tocItems = mdx.tableOfContents.items
  const { editContentUrl } = siteData.siteMetadata
  const { relativePath } = pageContext
  const absoluteEditPath = `${editContentUrl}${relativePath}`

  return (
    <Page dir={isRightToLeft ? "rtl" : "ltr"}>
      <PageMetadata
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
      />
      <ContentContainer>
        <Breadcrumbs slug={mdx.fields.slug} />
        <LastUpdated>
          <Translation id="page-last-updated" />:{" "}
          {getLocaleTimestamp(intl.locale, lastUpdatedDate)}
        </LastUpdated>
        <MobileTableOfContents
          editPath={absoluteEditPath}
          items={tocItems}
          isMobile={true}
          maxDepth={mdx.frontmatter.sidebarDepth}
        />
        <MDXProvider components={components}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MDXProvider>
      </ContentContainer>
      {mdx.frontmatter.sidebar && tocItems && (
        <TableOfContents
          editPath={absoluteEditPath}
          items={tocItems}
          maxDepth={mdx.frontmatter.sidebarDepth}
        />
      )}
    </Page>
  )
}

export const staticPageQuery = graphql`
  query StaticPageQuery($relativePath: String) {
    siteData: site {
      siteMetadata {
        editContentUrl
      }
    }
    mdx: mdx(fields: { relativePath: { eq: $relativePath } }) {
      fields {
        slug
      }
      frontmatter {
        title
        description
        sidebar
        sidebarDepth
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
