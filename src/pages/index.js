import React from "react"
import { useIntl } from "gatsby-plugin-intl"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import { getLangContentVersion, getDefaultMessage } from "../utils/translations"
import SEO from "../components/SEO"
import Translation from "../components/Translation"
import Link from "../components/Link"

const Hero = styled(Img)`
  width: 100%;
  min-height: 350px;
  background-size: cover;
  background: no-repeat center 50px;
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: ${(props) => props.theme.breakpoints.xl};
  margin: 0 auto;
`

const Content = styled.div`
  width: 100%;
  padding: 1rem;
  @media (min-width: ${(props) => props.theme.breakpoints.s}) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
`

const H1 = styled.h1`
  line-height: 1.4;
  font-weight: 400;
  font-size: 1.5rem;
  margin: 1.5rem 0;
  max-width: 80%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    max-width: 100%;
  }
`

const Description = styled.p`
  color: ${(props) => props.theme.colors.text200};
  max-width: 55ch;
`

const Divider = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  width: 10%;
  height: 0.25rem;
  background-color: ${(props) => props.theme.colors.homeDivider};
`

const SectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-wrap: wrap;
  }
`

const Section = styled.div`
  flex: 1 1 300px;
  margin-bottom: 2rem;
  margin-right: 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-right: 2rem;
  }

  & > h2 {
    margin-top: 1rem;
    font-size: 1.25rem;
  }

  & > p {
    color: ${(props) => props.theme.colors.text200};
    max-width: 400px;
  }
`

const HomePage = ({ data }) => {
  const intl = useIntl()
  const contentVersion = getLangContentVersion(intl.locale)

  const sections = [
    {
      img: {
        src: data.individuals,
        alt: "page-individuals",
      },
      title: "page-home-sections-individuals-title",
      desc: "page-home-sections-individuals-desc",
      link: {
        text: "page-home-sections-individuals-link-text",
        to: "/what-is-ethereum/",
      },
    },
    {
      img: {
        src: data.developers,
        alt: "page-developers",
      },
      title: "page-home-sections-developers-title",
      desc: "page-home-sections-developers-desc",
      link: {
        text: "page-home-sections-developers-link-text",
        to: "/build/",
      },
    },
    {
      img: {
        src: data.enterprise,
        alt: "page-enterprise",
      },
      title: "page-home-sections-enterprise-title",
      desc: "page-home-sections-enterprise-desc",
      link: {
        text: "page-home-sections-enterprise-link-text",
        to: "/enterprise/",
      },
    },
  ]

  return (
    <Page>
      <SEO
        title={intl.formatMessage({
          id: "page-home-meta-title",
          defaultMessage: getDefaultMessage("page-home-meta-title"),
        })}
        description={intl.formatMessage({
          id: "page-home-meta-description",
          defaultMessage: getDefaultMessage("page-home-meta-description"),
        })}
      />
      <Hero
        fluid={data.hero.childImageSharp.fluid}
        alt="Ethereum.org hero image"
      />
      <Content>
        <Header>
          <H1>
            <Translation id="page-home-title" />
          </H1>
          <Description>
            <Translation id="page-home-subtitle" />
          </Description>
        </Header>
        <Divider />
        {contentVersion > 1.1 && (
          <SectionContainer>
            {sections.map((section, idx) => {
              return (
                <Section key={idx}>
                  <Img
                    fixed={section.img.src.childImageSharp.fixed}
                    alt={intl.formatMessage({
                      id: section.img.alt,
                      defaultMessage: getDefaultMessage(section.img.alt),
                    })}
                  />
                  <h2>
                    <Translation id={section.title} />
                  </h2>
                  <p>
                    <Translation id={section.desc} />
                  </p>
                  <Link to={section.link.to}>
                    <Translation id={section.link.text} />
                  </Link>
                </Section>
              )
            })}
          </SectionContainer>
        )}
      </Content>
    </Page>
  )
}

export default HomePage

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "home/hero.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    individuals: file(relativePath: { eq: "home/cats.png" }) {
      childImageSharp {
        fixed(height: 100, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    developers: file(relativePath: { eq: "home/developers.png" }) {
      childImageSharp {
        fixed(height: 100, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    enterprise: file(relativePath: { eq: "home/enterprise.png" }) {
      childImageSharp {
        fixed(height: 100, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
