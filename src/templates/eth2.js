import React from "react"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"

import ButtonLink from "../components/ButtonLink"
import ButtonDropdown from "../components/ButtonDropdown"
import Breadcrumbs from "../components/Breadcrumbs"
import Card from "../components/Card"
import Contributors from "../components/Contributors"
import Eth2Articles from "../components/Eth2Articles"
import Eth2Clients from "../components/Eth2Clients"
import InfoBanner from "../components/InfoBanner"
import UpgradeStatus from "../components/UpgradeStatus"
import Link from "../components/Link"
import MarkdownTable from "../components/MarkdownTable"
import Eth2BeaconChainActions from "../components/Eth2BeaconChainActions"
import Eth2ShardChainsList from "../components/Eth2ShardChainsList"
import Eth2DockingList from "../components/Eth2DockingList"
import Logo from "../components/Logo"
import MeetupList from "../components/MeetupList"
import PageMetadata from "../components/PageMetadata"
import Pill from "../components/Pill"
import RandomAppList from "../components/RandomAppList"
import Roadmap from "../components/Roadmap"
import Eth2TableOfContents from "../components/Eth2TableOfContents"
import Translation from "../components/Translation"
import TranslationsInProgress from "../components/TranslationsInProgress"
import Warning from "../components/Warning"
import SectionNav from "../components/SectionNav"
import { getLocaleTimestamp } from "../utils/time"
import { isLangRightToLeft } from "../utils/translations"
import {
  Divider,
  Paragraph,
  Header1,
  Header4,
  H5,
} from "../components/SharedStyledComponents"
import Emoji from "../components/Emoji"

const Page = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto 4rem;
  padding: 2rem;

  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 4rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
  }
`

// Apply styles for classes within markdown here
const ContentContainer = styled.article`
  flex: 1 1 ${(props) => props.theme.breakpoints.m};

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
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${(props) => props.theme.colors.border};
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

const H1 = styled.h1`
  font-size: 48px;
  font-weight: 700;
  text-align: right;
  margin-top: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    text-align: left;
    font-size: 40px;
  }
`

const H2 = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-top: 4rem;
  a {
    display: none;
  }

  /* Anchor tag styles */
  a {
    position: relative;
    display: none;
    margin-left: -1.5em;
    padding-right: 0.5rem;
    font-size: 1rem;
    vertical-align: middle;
    &:hover {
      display: initial;
      fill: ${(props) => props.theme.colors.primary};
    }
  }

  &:hover {
    a {
      display: initial;
      fill: ${(props) => props.theme.colors.primary};
    }
  }
`

const H3 = styled.h3`
  font-size: 24px;
  font-weight: 700;
  a {
    display: none;
  }

  /* Anchor tag styles */
  a {
    position: relative;
    display: none;
    margin-left: -1.5em;
    padding-right: 0.5rem;
    font-size: 1rem;
    vertical-align: middle;
    &:hover {
      display: initial;
      fill: ${(props) => props.theme.colors.primary};
    }
  }

  &:hover {
    a {
      display: initial;
      fill: ${(props) => props.theme.colors.primary};
    }
  }
`

// Passing components to MDXProvider allows use across all .md/.mdx files
// https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#mdxprovider
const components = {
  a: Link,
  h1: Header1,
  h2: H2,
  h3: H3,
  h4: Header4,
  h5: H5,
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
  Warning,
  Eth2Articles,
  Eth2Clients,
  Card,
  Divider,
  SectionNav,
  Pill,
  TranslationsInProgress,
  Emoji,
  UpgradeStatus,
  Eth2BeaconChainActions,
  Eth2ShardChainsList,
  Eth2DockingList,
}

const InfoColumn = styled.aside`
  position: sticky;
  top: 6.25rem; /* account for navbar */
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  flex: 0 1 400px;
  margin-right: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    position: inherit;
    margin-right: 0rem;
    flex-direction: column-reverse;
    margin-top: 2rem;
  }
`

const AnnouncementCard = styled.div`
  background: ${(props) => props.theme.colors.warning};
  padding: 1.5rem;
  border-radius: 4px;
  color: ${(props) => props.theme.colors.black300};
`

const Label = styled.h2`
  text-transform: uppercase;
  font-size: 14px;
  margin-bottom: 1.5rem;
  font-weight: 400;
`

const SummaryPoint = styled.li`
  font-size: 20px;
  color: ${(props) => props.theme.colors.text300};
  margin-bottom: 0rem;
  line-height: 140%;
`

const SummaryBox = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 1.5rem;
  padding-bottom: 0rem;
  border-radius: 4px;
`

const DesktopBreadcrumbs = styled(Breadcrumbs)`
  margin-top: 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    display: none;
  }
`
const MobileBreadcrumbs = styled(Breadcrumbs)`
  margin-top: 0.5rem;
  @media (min-width: ${(props) => props.theme.breakpoints.m}) {
    display: none;
  }
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

const dropdownLinks = {
  text: "page-eth2-upgrades-guide",
  ariaLabel: "page-eth2-upgrades-aria-label",
  items: [
    {
      text: "page-eth2-upgrades-beacon-chain",
      to: "/eth2/beacon-chain/",
    },
    {
      text: "page-eth2-upgrades-shard-chains",
      to: "/eth2/shard-chains/",
    },
    {
      text: "page-eth2-upgrades-docking",
      to: "/eth2/docking/",
    },
  ],
}

const Eth2Page = ({ data: { mdx } }) => {
  const intl = useIntl()
  const isRightToLeft = isLangRightToLeft(intl.locale)
  const tocItems = mdx.tableOfContents.items

  // TODO some `gitLogLatestDate` are `null` - why?
  const lastUpdatedDate = mdx.parent.fields
    ? mdx.parent.fields.gitLogLatestDate
    : mdx.parent.mtime

  return (
    <Page dir={isRightToLeft ? "rtl" : "ltr"}>
      <PageMetadata
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
      />
      <InfoColumn>
        <div>
          <StyledButtonDropdown list={dropdownLinks} />
          <MobileBreadcrumbs slug={mdx.fields.slug} startDepth={1} />
          <H1>{mdx.frontmatter.title}</H1>
        </div>
        {mdx.frontmatter.sidebar && tocItems && (
          <Eth2TableOfContents
            items={tocItems}
            maxDepth={mdx.frontmatter.sidebarDepth}
          />
        )}
        <AnnouncementCard>
          <Emoji text=":cheering_megaphone:" size={5} />
          <h2>An Eth2 service announcement</h2>
          <p>
            You do not need to do anything with any ETH you’re already holding.
            Beware of scammers asking you to send ETH to exchange it.{" "}
          </p>
        </AnnouncementCard>
      </InfoColumn>
      <ContentContainer>
        <DesktopBreadcrumbs slug={mdx.fields.slug} startDepth={1} />
        <SummaryBox>
          <Label>Summary</Label>
          <ul>
            <SummaryPoint>{mdx.frontmatter.summary1}</SummaryPoint>
            <SummaryPoint>{mdx.frontmatter.summary2}</SummaryPoint>
            <SummaryPoint>{mdx.frontmatter.summary3}</SummaryPoint>
          </ul>
        </SummaryBox>
        <MDXProvider components={components}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MDXProvider>
        <LastUpdated>
          <Translation id="page-last-updated" />:{" "}
          {getLocaleTimestamp(intl.locale, lastUpdatedDate)}
        </LastUpdated>
      </ContentContainer>
    </Page>
  )
}

export const eth2PageQuery = graphql`
  query Eth2PageQuery($slug: String) {
    mdx(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        description
        sidebar
        sidebarDepth
        summary1
        summary2
        summary3
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

export default Eth2Page
