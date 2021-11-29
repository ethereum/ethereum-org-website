// Libraries
import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"

// Assets
import dappnode from "../assets/run-a-node/dappnode.svg"
import phonetap from "../assets/run-a-node/phonetap.svg"
import terminal from "../assets/run-a-node/terminal.svg"

// Components
import PageHero from "../components/PageHero"
import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"
import { Content, Divider, Page } from "../components/SharedStyledComponents"

// Utils
import { translateMessageId } from "../utils/translations"

// Styles
const TwoColumnContent = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-right: 2rem;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0rem;
    margin-right: 0rem;
  }
`

const SplitContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
  }
`

const Highlight = styled(Content)`
  background: #f9e4d5;
  border: 1px solid #dadada;
  box-sizing: border-box;
  border-radius: 4px;
  color: black;
`

const InfoContent = styled(Content)`
  display: grid;
  grid-template-columns: repeat(3, auto);
`

const InfoCard = styled.div`
  background: #f5f5f5;
  border: 1px solid #d1d1d1;
  box-sizing: border-box;
  border-radius: 5px;
  color: black;
  width: 416px;
  height: 520px;
  margin-bottom: 20px;
  padding: 0 36pt;
`

const RunANodePage = ({ data }) => {
  const intl = useIntl()

  const heroContent = {
    title: translateMessageId("page-run-a-node-title", intl),
    header: translateMessageId("page-run-a-node-hero-header", intl),
    subtitle: translateMessageId("page-run-a-node-hero-subtitle", intl),
    image: data.doge.childImageSharp.fluid,
    alt: translateMessageId("page-run-a-node-hero-alt", intl),
    buttons: [
      {
        content: translateMessageId(
          "page-run-a-node-button-why-run-a-node",
          intl
        ),
        path: "#why-run-a-node",
      },
      {
        content: translateMessageId("page-run-a-node-button-get-started", intl),
        path: "#get-started",
      },
    ],
  }

  const whyRunANodeCards = [
    {
      image: "",
      title: translateMessageId("page-run-a-node-decentralized-title", intl),
      body: [
        translateMessageId("page-run-a-node-decentralized-1", intl),
        translateMessageId("page-run-a-node-decentralized-2", intl),
      ],
    },
    {
      image: "",
      title: translateMessageId("page-run-a-node-sovereignty-title", intl),
      body: [
        translateMessageId("page-run-a-node-sovereignty-1", intl),
        translateMessageId("page-run-a-node-sovereignty-2", intl),
        translateMessageId("page-run-a-node-sovereignty-3", intl),
      ],
    },
    {
      image: "",
      title: translateMessageId(
        "page-run-a-node-security-and-privacy-title",
        intl
      ),
      body: [
        translateMessageId("page-run-a-node-security-and-privacy-1", intl),
      ],
    },
    {
      image: "",
      title: translateMessageId(
        "page-run-a-node-censorship-resistance-title",
        intl
      ),
      body: [
        translateMessageId("page-run-a-node-censorship-resistance-1", intl),
      ],
    },
    {
      image: "",
      title: translateMessageId(
        "page-run-a-node-voice-your-choice-title",
        intl
      ),
      body: [translateMessageId("page-run-a-node-voice-your-choice-1", intl)],
    },
    {
      image: "",
      title: translateMessageId("page-run-a-node-participate-title", intl),
      body: [translateMessageId("page-run-a-node-participate-1", intl)],
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-run-a-node-title", intl)}
        description={translateMessageId(
          "page-run-a-node-meta-description",
          intl
        )}
      />

      <PageHero content={heroContent} />

      <Content>
        <TwoColumnContent>
          <SplitContent>
            <h2>
              <Translation id="page-run-a-node-what-does-it-mean-title" />
            </h2>
            <p>
              <Translation id="page-run-a-node-what-does-it-mean-1" />
            </p>
            <p>
              <Translation id="page-run-a-node-what-does-it-mean-2" />
            </p>
            <p>
              <Translation id="page-run-a-node-what-does-it-mean-3" />
            </p>
          </SplitContent>
          <SplitContent>
            <Img fluid={data.hackathon.childImageSharp.fluid} />
          </SplitContent>
        </TwoColumnContent>
      </Content>

      <Highlight>
        <h2>
          <Translation id="page-run-a-node-highlight-title" />
        </h2>
        <p>
          <Translation id="page-run-a-node-highlight-body" />
        </p>
        <p>
          <b>
            <Translation id="page-run-a-node-highlight-bold" />
          </b>
        </p>
        <Img fluid={data.impact.childImageSharp.fluid} />
      </Highlight>

      <Content>
        <h2>
          <Translation id="page-run-a-node-why-run-a-node-title" />
        </h2>
        <InfoContent>
          {whyRunANodeCards.map((card, idx) => {
            return (
              <InfoCard key={idx}>
                <h3>{card.title}</h3>
                {card.body.map((item, idx) => {
                  return <p key={idx}>{item}</p>
                })}
              </InfoCard>
            )
          })}
        </InfoContent>
      </Content>

      <Divider />

      <Content>
        <h2>
          <Translation id="page-run-a-node-getting-started-hardware-title" />
        </h2>
        <p>
          <Translation id="page-run-a-node-getting-started-hardware-1" />
        </p>

        <div>
          <h3>
            <Translation id="page-run-a-node-build-your-own-title" />
          </h3>
          <p>
            <Translation id="page-run-a-node-build-your-own-minimum-specs" />
          </p>
          <ul>
            <li>
              <Translation id="page-run-a-node-build-your-own-8gb" />
            </li>
            <li>
              <Translation id="page-run-a-node-build-your-own-ssd" />{" "}
              <i>
                <Translation id="page-run-a-node-build-your-own-ssd-note" />
              </i>
            </li>
          </ul>
          <br />
          <p>
            <Translation id="page-run-a-node-build-your-own-recommended" />
          </p>
          <ul>
            <li>
              <Translation id="page-run-a-node-build-your-own-nuc" />
            </li>
            <li>
              <Translation id="page-run-a-node-build-your-own-connection" />
            </li>
            <li>
              <Translation id="page-run-a-node-build-your-own-peripherals" />
            </li>
          </ul>
          <p>
            <Translation id="page-run-a-node-build-your-own-raspberry-pi" />
          </p>
        </div>

        <div>
          <h3>
            <Translation id="page-run-a-node-buy-fully-loaded-title" />
          </h3>
          <p>
            <Translation id="page-run-a-node-buy-fully-loaded-1" />
          </p>
          <p>
            <Translation id="page-run-a-node-buy-fully-loaded-note" />
          </p>
        </div>
      </Content>

      <Content>
        <h2>
          <Translation id="page-run-a-node-getting-started-software-title" />
        </h2>

        <div>
          <p>
            <Translation id="page-run-a-node-getting-started-software-section-1-1" />
          </p>
          <p>
            <Translation id="page-run-a-node-getting-started-software-section-1-2" />
          </p>
          <img src={terminal} />
        </div>

        <div>
          <img src={phonetap} />
          <p>
            <Translation id="page-run-a-node-getting-started-software-section-2-1" />
          </p>
        </div>

        <div>
          <p>
            <Translation id="page-run-a-node-getting-started-software-section-3-1" />
          </p>
          <img src={dappnode} />
        </div>
      </Content>

      <Content>
        <h2>
          <Translation id="page-run-a-node-choose-your-adventure" />
        </h2>

        <div>
          <h3>
            <Translation id="page-run-a-node-plug-and-play-title" />
          </h3>
          <p>
            <Translation id="page-run-a-node-plug-and-play-1" />
          </p>
          <button>
            <Translation id="page-run-a-node-shop-dappnode" />
          </button>
          <button>
            <Translation id="page-run-a-node-shop-avado" />
          </button>
        </div>

        <div>
          <h3>
            <Translation id="page-run-a-node-install-manually-title" />
          </h3>
          <p>
            <Translation id="page-run-a-node-install-manually-1" />
          </p>
          <button>
            <Translation id="page-run-a-node-dappnode-setup" />
          </button>
        </div>
      </Content>
    </Page>
  )
}

export default RunANodePage

export const query = graphql`
  query {
    doge: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        fluid(maxWidth: 624) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    hackathon: file(relativePath: { eq: "hackathon_transparent.png" }) {
      childImageSharp {
        fluid(maxWidth: 624) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    impact: file(relativePath: { eq: "impact_transparent.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
          ...GatsbyImageSharpFluidLimitPresentationSize
        }
      }
    }
  }
`
