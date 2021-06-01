import React from "react"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"
import Img from "gatsby-image"
import ButtonLink from "../components/ButtonLink"
import Link from "../components/Link"
import PageMetadata from "../components/PageMetadata"
import { isLangRightToLeft } from "../utils/translations"
import Emoji from "../components/Emoji"
import {
  Paragraph,
  Header1,
  Header4,
} from "../components/SharedStyledComponents"

const Page = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto 4rem;

  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 2rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const InfoColumn = styled.aside`
  display: flex;
  flex-direction: column;
  position: sticky;
  padding-top: 3rem;
  border-right: 1px solid ${(props) => props.theme.colors.border};
  top: 6.25rem; /* account for navbar */
  height: calc(100vh - 80px);
  flex: 0 1 400px;
  margin-right: 4rem;
  margin-left: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
  @media (max-width: 1200px) {
    margin-right: 2rem;
    margin-left: 2rem;
    border: 0;
  }
`

const StyledButtonLink = styled(ButtonLink)`
  width: 100%;
  margin-bottom: 1rem;
`

const InfoColumnRight = styled.aside`
  display: flex;
  flex-direction: column;
  position: sticky;
  padding-top: 3rem;
  top: 6.25rem; /* account for navbar */
  height: calc(100vh - 80px);
  flex: 0 1 400px;
  margin-right: 2rem;
  margin-left: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
  @media (max-width: 1200px) {
    margin-right: 2rem;
    margin-left: 2rem;
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
  padding-top: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    justify-content: flex-end;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const KeyInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`

const KeyInfoMobile = styled(KeyInfo)`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding: 1.5rem 0rem;
  padding-top: 0rem;
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const StyledEmoji = styled(Emoji)`
  margin-right: 1rem;
  flex-shrink: 0;
`

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (max-width: 1200px) {
    padding: 0rem 2rem;
  }
`

const KeyItem = styled.div`
  margin: 0.5rem;
  margin-left: 0rem;
  display: flex;
  align-items: flex-start;
`

const KeyItemTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 1rem;
  margin-top: 0;
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

  @media (max-width: 1200px) {
    padding: 0rem 1rem;
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
  ButtonLink,
  Emoji,
}

const Container = styled.div`
  position: relative;
`

const HeroContainer = styled.div`
  background: ${(props) => props.theme.colors.cardGradient};
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  max-height: 400px;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    max-height: 100%;
  }
`

const Image = styled(Img)`
  flex: 1 1 100%;
  max-width: 640px;
  background-size: cover;
  background-repeat: no-repeat;
  margin-left: 2rem;
  align-self: center;
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
  margin-bottom: 1rem;
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

const JobPage = ({ data: { mdx } }) => {
  const intl = useIntl()
  const isRightToLeft = isLangRightToLeft(intl.locale)

  return (
    <Container>
      <HeroContainer>
        <Image fluid={mdx.frontmatter.image.childImageSharp.fluid} />
      </HeroContainer>
      <Page dir={isRightToLeft ? "rtl" : "ltr"}>
        <PageMetadata
          title={mdx.frontmatter.title}
          description={mdx.frontmatter.description}
          image={mdx.frontmatter.image.childImageSharp.fluid.src}
        />
        <InfoColumn>
          <KeyInfo>
            <KeyItemTitle>Job details</KeyItemTitle>
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
        </InfoColumn>
        <ContentContainer id="content">
          <MDXProvider components={components}>
            <h1>{mdx.frontmatter.title}</h1>
            <KeyInfoMobile>
              <KeyItemTitle>Job details</KeyItemTitle>
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
            </KeyInfoMobile>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
        </ContentContainer>
        <InfoColumnRight>
          <ButtonRow>
            <StyledButtonLink isSecondary to="/about/#open-jobs">
              Back to jobs
            </StyledButtonLink>
            <StyledButtonLink to={mdx.frontmatter.link}>
              Apply for job
            </StyledButtonLink>
          </ButtonRow>
        </InfoColumnRight>
      </Page>
      <MobileButton>
        <ButtonRow>
          <StyledLink to="/about/#open-jobs"> Back to jobs</StyledLink>
          <ButtonLink to={mdx.frontmatter.link}>Apply for job</ButtonLink>
        </ButtonRow>
      </MobileButton>
    </Container>
  )
}

export const JobQuery = graphql`
  query JobQuery($relativePath: String) {
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
        image {
          childImageSharp {
            fluid(maxHeight: 400) {
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
  }
`

export default JobPage
