import React from "react"
import { useIntl } from "gatsby-plugin-intl"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import {
  getLangContentVersion,
  translateMessageId,
} from "../utils/translations"
import Morpher from "../components/Morpher"
import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"
import Link from "../components/Link"
import ButtonLink from "../components/ButtonLink"
import { Divider } from "../components/SharedStyledComponents"

const Hero = styled(Img)`
  width: 100%;
  min-height: 380px;
  max-height: 500px;
  background-size: cover;
  background: no-repeat 50px;
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin: 0 auto;
`

const Content = styled.div`
  width: 100%;
  padding: 1rem 2rem;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
`

const OldHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 896px;
  margin: 0 auto;
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
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
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-right: 0;
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

const OldSectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 5rem;
  max-width: ${(props) => (props.contentVersion > 1.0 ? `986px ` : `768px`)};
  margin: 0 auto;
`

const OldSection = styled.div`
  padding-right: 1rem;
  padding-left: 2rem;
  flex: 1 1 29%;
  display: inline-block;
  line-height: 1.5em;
  min-width: 260px;
  margin-bottom: 1rem;
`

const OldLink = styled(Link)`
  color: ${(props) => props.theme.colors.text};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`

const OldTitle = styled.h3`
  color: ${(props) => props.theme.colors.primary};
  &:before {
    color: ${(props) => props.theme.colors.primary};
    padding-right: 0.5em;
    margin-left: -0.5em;
    content: "→";
  }
`

const H3 = styled.h3`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    display: none;
  }
`

const OldH3 = styled.h3`
  margin-top: 2.5rem;
`

// TODO refactor so all content versions display the same info
const HomePage = ({ data }) => {
  const intl = useIntl()
  const contentVersion = getLangContentVersion(intl.locale)

  // contentVersion 1.0 & 1.1
  const oldSections = [
    {
      title: "page-index-section-individuals-title",
      shouldDisplay: contentVersion > 1.0,
      items: [
        {
          to: "/what-is-ethereum/",
          text: "page-index-section-individuals-item-one",
        },
        {
          to: "/dapps/",
          text: "page-index-section-individuals-item-two",
        },
        {
          to: "/learn/",
          text: "page-index-section-individuals-item-three",
        },
      ],
    },
    {
      title: "page-index-section-beginners-title",
      shouldDisplay: contentVersion < 1.1,
      items: [
        {
          to: "/what-is-ethereum/",
          text: "page-index-section-beginners-item-one",
        },
        {
          to: "/what-is-ethereum/",
          text: "page-index-section-beginners-item-two",
        },
        {
          to: "/what-is-ethereum/",
          text: "page-index-section-beginners-item-three",
        },
      ],
    },
    {
      title: "page-index-section-use-title",
      shouldDisplay: contentVersion < 1.1,
      items: [
        {
          to: "/use/#1-use-an-application-built-on-ethereum",
          text: "page-index-section-use-item-one",
        },
        {
          to: "/use/#2-what-is-eth-and-how-do-i-get-it",
          text: "page-index-section-use-item-two",
        },
        {
          to: "/use/#3-what-is-a-wallet-and-which-one-should-i-use",
          text: "page-index-section-use-item-three",
        },
      ],
    },
    {
      title: "page-index-section-learn-title",
      shouldDisplay: contentVersion < 1.1,
      items: [
        {
          to: "/learn/#ethereum-basics",
          text: "page-index-section-learn-item-one",
        },
        {
          to: "/learn/#how-ethereum-works",
          text: "page-index-section-learn-item-two",
        },
        {
          to: "/learn/#eth-2-0",
          text: "page-index-section-learn-item-three",
        },
      ],
    },
    {
      title: "page-index-section-developers-title",
      shouldDisplay: true,
      items: [
        {
          to: contentVersion > 1.0 ? "/build/" : "/developers/#getting-started",
          text: "page-index-section-developers-item-one",
        },
        {
          to: "/developers/#smart-contract-languages",
          text: "page-index-section-developers-item-two",
        },
        {
          to: "/developers/#developer-tools",
          text: "page-index-section-developers-item-three",
        },
      ],
    },
    {
      title: "page-index-section-enterprise-title",
      shouldDisplay: contentVersion > 1.0,
      items: [
        {
          to: "/enterprise/#why-enterprise-ethereum",
          text: "page-index-section-enterprise-item-one",
          useRouter: true,
        },
        {
          to: "/enterprise/#enterprise-features",
          text: "page-index-section-enterprise-item-two",
          useRouter: true,
        },
        {
          to: "/enterprise/#enterprise-developer-community",
          text: "page-index-section-enterprise-item-three",
          useRouter: true,
        },
      ],
    },
  ]

  // lastest contentVersion
  const newSections = [
    {
      img: {
        src: data.individuals,
        alt: "page-index-sections-individuals-image-alt",
      },
      title: "page-index-sections-individuals-title",
      desc: "page-index-sections-individuals-desc",
      link: {
        text: "page-index-sections-individuals-link-text",
        to: "/what-is-ethereum/",
      },
    },
    {
      img: {
        src: data.developers,
        alt: "page-index-sections-developers-image-alt",
      },
      title: "page-index-sections-developers-title",
      desc: "page-index-sections-developers-desc",
      link: {
        text: "page-index-sections-developers-link-text",
        to: "/en/developers/",
      },
    },
    {
      img: {
        src: data.enterprise,
        alt: "page-index-sections-enterprise-image-alt",
      },
      title: "page-index-sections-enterprise-title",
      desc: "page-index-sections-enterprise-desc",
      link: {
        text: "page-index-sections-enterprise-link-text",
        to: "/enterprise/",
      },
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-index-meta-title", intl)}
        description={translateMessageId("page-index-meta-description", intl)}
      />
      <Hero
        fluid={data.hero.childImageSharp.fluid}
        alt={translateMessageId("page-index-hero-image-alt", intl)}
        loading="eager"
      />
      <Content>
        {contentVersion > 1.1 && (
          <>
            <Header>
              <Title>
                <H1>
                  <Translation id="page-index-title" />
                </H1>
                <H3>
                  <Morpher />
                </H3>
              </Title>
              <Description>
                <Translation id="page-index-subtitle" />
              </Description>
            </Header>
            <Divider />
          </>
        )}
        {contentVersion <= 1.1 && (
          <OldHeader>
            <OldH3>
              <Morpher />
            </OldH3>
            <H1>
              <Translation id="page-index-title" />
            </H1>
            <Description>
              <Translation id="page-index-subtitle" />
            </Description>
            <div>
              <ButtonLink to="/what-is-ethereum/">
                <Translation id="learn-more" />
              </ButtonLink>
            </div>
          </OldHeader>
        )}

        {contentVersion > 1.1 && (
          <SectionContainer>
            {newSections.map((section, idx) => {
              return (
                <Section key={idx}>
                  <Img
                    fixed={section.img.src.childImageSharp.fixed}
                    alt={translateMessageId(section.img.alt, intl)}
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
        {contentVersion <= 1.1 && (
          <OldSectionContainer contentVersion={contentVersion}>
            {oldSections
              .filter((section) => section.shouldDisplay)
              .map((section, idx) => {
                return (
                  <OldSection key={idx}>
                    <OldTitle>
                      <Translation id={section.title} />
                    </OldTitle>
                    <ul>
                      {section.items.map((item, idx) => {
                        return (
                          <li key={idx}>
                            <OldLink to={item.to}>
                              <Translation id={item.text} />
                            </OldLink>
                          </li>
                        )
                      })}
                    </ul>
                  </OldSection>
                )
              })}
          </OldSectionContainer>
        )}
      </Content>
    </Page>
  )
}

export default HomePage

export const personaImage = graphql`
  fragment personaImage on File {
    childImageSharp {
      fixed(height: 200) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "home/hero.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    individuals: file(relativePath: { eq: "doge-computer.png" }) {
      ...personaImage
    }
    developers: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      ...personaImage
    }
    enterprise: file(relativePath: { eq: "enterprise-eth.png" }) {
      ...personaImage
    }
  }
`
