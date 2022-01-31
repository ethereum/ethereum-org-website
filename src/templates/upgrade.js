import React from "react"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import ButtonLink from "../components/ButtonLink"
import ButtonDropdown from "../components/ButtonDropdown"
import Breadcrumbs from "../components/Breadcrumbs"
import Card from "../components/Card"
import Icon from "../components/Icon"
import Contributors from "../components/Contributors"
import DismissibleCard from "../components/DismissibleCard"
import InfoBanner from "../components/InfoBanner"
import UpgradeStatus from "../components/UpgradeStatus"
import Link from "../components/Link"
import MarkdownTable from "../components/MarkdownTable"
import BeaconChainActions from "../components/BeaconChainActions"
import ShardChainsList from "../components/ShardChainsList"
import MergeArticleList from "../components/MergeArticleList"
import Logo from "../components/Logo"
import MeetupList from "../components/MeetupList"
import PageMetadata from "../components/PageMetadata"
import Pill from "../components/Pill"
import RandomAppList from "../components/RandomAppList"
import Roadmap from "../components/Roadmap"
import UpgradeTableOfContents from "../components/UpgradeTableOfContents"
import Translation from "../components/Translation"
import TranslationsInProgress from "../components/TranslationsInProgress"
import SectionNav from "../components/SectionNav"
import { getLocaleTimestamp } from "../utils/time"
import { isLangRightToLeft } from "../utils/translations"
import { getSummaryPoints } from "../utils/getSummaryPoints"
import {
  Divider,
  Paragraph,
  Header1,
  Header4,
} from "../components/SharedStyledComponents"
import Emoji from "../components/Emoji"
import YouTube from "../components/YouTube"

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

const LastUpdated = styled.p`
  color: ${(props) => props.theme.colors.text200};
  font-style: italic;
  padding-top: 1rem;
  margin-bottom: 0rem;
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
  Divider,
  SectionNav,
  Pill,
  TranslationsInProgress,
  Emoji,
  UpgradeStatus,
  BeaconChainActions,
  ShardChainsList,
  MergeArticleList,
  YouTube,
}

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-top: 0rem;
`

const SummaryPoint = styled.li`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text300};
  margin-bottom: 0rem;
  line-height: auto;
`

const SummaryBox = styled.div`
  /* border: 1px solid ${(props) => props.theme.colors.border};
  padding: 1.5rem;
  padding-bottom: 0rem;
  border-radius: 4px; */
`

const DesktopBreadcrumbs = styled(Breadcrumbs)`
  margin-top: 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`
const MobileBreadcrumbs = styled(Breadcrumbs)`
  margin-top: 0.5rem;
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
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

const Image = styled(GatsbyImage)`
  flex: 1 1 100%;
  max-width: 816px;
  background-size: cover;
  background-repeat: no-repeat;
  margin-left: 2rem;
  align-self: flex-end;
  right: 0;
  bottom: 0;
  background-size: cover;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
    height: 100%;
    overflow: initial;
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
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    max-width: 100%;
    position: relative;
    left: 0rem;
    top: 0rem;
    background: ${(props) => props.theme.colors.ednBackground};
    box-shadow: none;
  }
`

const dropdownLinks = {
  text: "page-upgrades-upgrades-guide",
  ariaLabel: "page-upgrades-upgrades-aria-label",
  items: [
    {
      text: "page-upgrades-upgrades-beacon-chain",
      to: "/upgrades/beacon-chain/",
    },
    {
      text: "page-upgrades-upgrades-docking",
      to: "/upgrades/merge/",
    },
    {
      text: "page-upgrades-upgrades-shard-chains",
      to: "/upgrades/shard-chains/",
    },
  ],
}

const UpgradePage = ({ data: { mdx } }) => {
  const intl = useIntl()
  const isRightToLeft = isLangRightToLeft(mdx.frontmatter.lang)
  const tocItems = mdx.tableOfContents.items

  // TODO some `gitLogLatestDate` are `null` - why?
  const lastUpdatedDate = mdx.parent.fields
    ? mdx.parent.fields.gitLogLatestDate
    : mdx.parent.mtime

  const summaryPoints = getSummaryPoints(mdx.frontmatter)

  return (
    <Container>
      <HeroContainer>
        <TitleCard>
          <DesktopBreadcrumbs slug={mdx.fields.slug} startDepth={1} />
          <MobileBreadcrumbs slug={mdx.fields.slug} startDepth={1} />
          <Title>{mdx.frontmatter.title}</Title>
          <SummaryBox>
            <ul>
              {summaryPoints.map((point, idx) => (
                <SummaryPoint key={idx}>{point}</SummaryPoint>
              ))}
            </ul>
          </SummaryBox>
          <LastUpdated>
            <Translation id="page-last-updated" />:{" "}
            {getLocaleTimestamp(intl.locale, lastUpdatedDate)}
          </LastUpdated>
        </TitleCard>
        <Image image={getImage(mdx.frontmatter.image)} />
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
          <H1>{mdx.frontmatter.title}</H1>

          {mdx.frontmatter.sidebar && tocItems && (
            <UpgradeTableOfContents
              items={tocItems}
              maxDepth={mdx.frontmatter.sidebarDepth}
            />
          )}
          <DismissibleCard storageKey="dismissed-eth-upgrade-psa">
            <Emoji text=":cheering_megaphone:" size={5} />
            <h2>
              <Translation id="eth-upgrade-what-happened" />
            </h2>
            <p>
              <Translation id="eth-upgrade-what-happened-description" />{" "}
              <Link to="https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/">
                <Translation id="more-info" />.
              </Link>
            </p>
          </DismissibleCard>
        </InfoColumn>
        <ContentContainer id="content">
          {/* <DesktopBreadcrumbs slug={mdx.fields.slug} startDepth={1} /> */}
          <MDXProvider components={components}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
        </ContentContainer>
        <MobileButton>
          <MobileButtonDropdown list={dropdownLinks} />
        </MobileButton>
      </Page>
    </Container>
  )
}

export const upgradePageQuery = graphql`
  query UpgradePageQuery($relativePath: String) {
    mdx(fields: { relativePath: { eq: $relativePath } }) {
      fields {
        slug
      }
      frontmatter {
        title
        description
        lang
        sidebar
        sidebarDepth
        summaryPoint1
        summaryPoint2
        summaryPoint3
        summaryPoint4
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

export default UpgradePage
