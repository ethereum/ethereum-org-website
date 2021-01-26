import React from "react"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"
import Img from "gatsby-image"
import ButtonLink from "../components/ButtonLink"
import ButtonDropdown from "../components/ButtonDropdown"
import Breadcrumbs from "../components/Breadcrumbs"
import Card from "../components/Card"
import Contributors from "../components/Contributors"
import DismissibleCard from "../components/DismissibleCard"
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
  font-size: 48px;
  font-weight: 700;
  text-align: right;
  margin-top: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    text-align: left;
    font-size: 40px;
    display: none;
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

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
`

const SummaryPoint = styled.li`
  font-size: 16px;
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
  max-height: 672px;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    max-height: 100%;
  }
`

const Image = styled(Img)`
  flex: 1 1 100%;
  max-width: 800px;
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

const Eth2Page = ({ data, data: { mdx } }) => {
  const intl = useIntl()
  const isRightToLeft = isLangRightToLeft(intl.locale)
  const tocItems = mdx.tableOfContents.items

  // TODO some `gitLogLatestDate` are `null` - why?
  const lastUpdatedDate = mdx.parent.fields
    ? mdx.parent.fields.gitLogLatestDate
    : mdx.parent.mtime

  return (
    <Container>
      <HeroContainer>
        <TitleCard>
          <DesktopBreadcrumbs slug={mdx.fields.slug} startDepth={1} />
          <MobileBreadcrumbs slug={mdx.fields.slug} startDepth={1} />
          <Title>{mdx.frontmatter.title}</Title>
          <SummaryBox>
            <ul>
              {mdx.frontmatter.summaryPoints.map((point, idx) => (
                <SummaryPoint key={idx}>{point}</SummaryPoint>
              ))}
            </ul>
          </SummaryBox>
          <LastUpdated>
            <Translation id="page-last-updated" />:{" "}
            {getLocaleTimestamp(intl.locale, lastUpdatedDate)}
          </LastUpdated>
        </TitleCard>
        <Image fluid={mdx.frontmatter.image.childImageSharp.fluid} />
      </HeroContainer>
      <Page dir={isRightToLeft ? "rtl" : "ltr"}>
        <PageMetadata
          title={mdx.frontmatter.title}
          description={mdx.frontmatter.description}
        />
        <InfoColumn>
          <div>
            <StyledButtonDropdown list={dropdownLinks} />
            <H1>{mdx.frontmatter.title}</H1>
          </div>
          {mdx.frontmatter.sidebar && tocItems && (
            <Eth2TableOfContents
              items={tocItems}
              maxDepth={mdx.frontmatter.sidebarDepth}
            />
          )}
          <DismissibleCard storageKey="dismissed-eth2-psa">
            <Emoji text=":cheering_megaphone:" size={5} />
            <h2>
              <Translation id="eth2-service-announcement" />
            </h2>
            <p>
              <Translation id="eth2-no-action-needed" />
            </p>
          </DismissibleCard>
        </InfoColumn>
        <ContentContainer>
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

export const eth2PageQuery = graphql`
  query Eth2PageQuery($relativePath: String) {
    mdx(fields: { relativePath: { eq: $relativePath } }) {
      fields {
        slug
      }
      frontmatter {
        title
        description
        sidebar
        sidebarDepth
        summaryPoints
        image {
          childImageSharp {
            fluid(maxHeight: 640) {
              ...GatsbyImageSharpFluid
            }
          }
        }
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
    beaconchain: file(relativePath: { eq: "eth2/core.png" }) {
      childImageSharp {
        fluid(maxHeight: 640) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    shards: file(relativePath: { eq: "eth2/newrings.png" }) {
      childImageSharp {
        fluid(maxWidth: 420) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    thedocking: file(relativePath: { eq: "eth2/docking.png" }) {
      childImageSharp {
        fluid(maxWidth: 420) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default Eth2Page
