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
import Icon from "../components/Icon"
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
} from "../components/SharedStyledComponents"
import Emoji from "../components/Emoji"

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 0 auto 4rem;
  padding: 0rem 16rem;

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 0rem 8rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    padding: 0rem 2rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    padding: 0rem 0rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.xs}) {
    padding: 0rem;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.colors.background};
  box-shadow: 0 -1px 0px ${(props) => props.theme.colors.border};
  width: 100%;
  bottom: 0;
  position: sticky;
  padding: 2rem;
  z-index: 99;
  margin-bottom: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    justify-content: flex-end;
  }
`

// Apply styles for classes within markdown here
const ContentContainer = styled.article`
  flex: 1 1 ${(props) => props.theme.breakpoints.l};
  position: relative;
  padding: 2rem;
  padding-top: 0rem;
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
  font-size: 40px;
  font-weight: 700;
  margin-top: 0rem;
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
  justify-content: center;
  height: 100%;
  width: 100%;
  margin-bottom: 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    max-height: 100%;
  }
`

const Image = styled(Img)`
  flex: 1 0 100%;
  height: 420px;
  width: 420px;
  background-size: cover;
  background-repeat: no-repeat;
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

const StyledLink = styled(Link)`
  margin: 0;
  margin-right: 1.5rem;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0.04em;
  font-weight: normal;
  z-index: 1;
  text-decoration: none;
  color: ${(props) => props.theme.colors.textTableOfContents};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
  &.active {
    color: ${(props) => props.theme.colors.primary};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-top: 1rem;
    margin-right: 0rem;
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

const StyledEmoji = styled(Emoji)`
  margin-right: 1rem;
`

const KeyInfo = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
    justify-content: space-between;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column-reverse;
  }
`

const KeyItem = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: center;
  text-transform: uppercase;
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

const JobPage = ({ data, data: { mdx } }) => {
  const intl = useIntl()
  const isRightToLeft = isLangRightToLeft(intl.locale)

  return (
    <Container>
      <HeroContainer>
        <Image fluid={data.hero.childImageSharp.fluid} />
      </HeroContainer>
      <Page dir={isRightToLeft ? "rtl" : "ltr"}>
        <PageMetadata
          title={mdx.frontmatter.title}
          description={mdx.frontmatter.description}
        />
        <ContentContainer id="content">
          <MDXProvider components={components}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
        </ContentContainer>
      </Page>
      <MobileButton>
        <KeyInfo>
          <KeyItem>
            <StyledEmoji text=":computer:" />
            {mdx.frontmatter.position}
          </KeyItem>
          <KeyItem>
            <StyledEmoji text=":page_with_curl:" />
            {mdx.frontmatter.type}
          </KeyItem>
          <KeyItem>
            <StyledEmoji text=":globe_showing_americas:" />
            {mdx.frontmatter.location}
          </KeyItem>
          <KeyItem>
            <StyledEmoji text=":money_bag:" />
            {mdx.frontmatter.compensation}
          </KeyItem>
        </KeyInfo>
        <ButtonRow>
          <StyledLink to="/about/#open-jobs"> Back to jobs</StyledLink>
          <ButtonLink to={mdx.frontmatter.link}>Apply for job</ButtonLink>
        </ButtonRow>
      </MobileButton>
    </Container>
  )
}

export const JobPageQuery = graphql`
  query JobPageQuery($relativePath: String) {
    mdx(fields: { relativePath: { eq: $relativePath } }) {
      fields {
        slug
      }
      frontmatter {
        title
        description
        sidebar
        sidebarDepth
        position
        location
        compensation
        type
        link
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
    hero: file(relativePath: { eq: "hackathon_transparent.png" }) {
      childImageSharp {
        fluid(maxHeight: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default JobPage
