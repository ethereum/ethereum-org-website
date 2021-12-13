// Libraries
import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"

// Assets
import dappnode from "../assets/run-a-node/dappnode.svg"
import phonetap from "../assets/run-a-node/phonetap.svg"
import terminal from "../assets/run-a-node/terminal.svg"
import decentralizationGlyph from "../assets/run-a-node/decentralization-glyph.svg"
import sovereigntyGlyph from "../assets/run-a-node/sovereignty-glyph.svg"
import privacyGlyph from "../assets/run-a-node/privacy-glyph.svg"
import megaphoneGlyph from "../assets/run-a-node/megaphone-glyph.svg"
import voteGlyph from "../assets/run-a-node/vote-glyph.svg"
import earthGlyph from "../assets/run-a-node/earth-glyph.svg"
import plugAndPlayGlyph from "../assets/run-a-node/plug-and-play-glyph.svg"
import downloadGlyph from "../assets/run-a-node/download-glyph.svg"

// Components
import PageHero from "../components/PageHero"
import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"
import {
  Content,
  Divider,
  Page,
  CardGrid,
} from "../components/SharedStyledComponents"
import ExpandableCard from "../components/ExpandableCard"

// Utils
import { translateMessageId } from "../utils/translations"

// Styles
const GappedContent = styled(Content)`
  gap: 2rem;
`

const Hero = styled(PageHero)`
  background: linear-gradient(
      0deg,
      rgba(153, 157, 244, 0.1) 0%,
      rgba(153, 157, 244, 0) 100%
    ),
    linear-gradient(
      270.72deg,
      #fdf0ff 0.62%,
      rgba(236, 195, 195, 0.557292) 32.61%,
      rgba(207, 189, 230, 0.296875) 49.67%,
      rgba(196, 196, 196, 0) 72.88%
    );
`

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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background: ${(props) => props.backgroundColor};
  border: 1px solid #dadada;
  box-sizing: border-box;
  border-radius: 4px;
  color: black;
  &:nth-child(odd) {
    flex-direction: row-reverse;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
  }
`

const InfoGrid = styled(CardGrid)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
  gap: 1rem 2rem;
  div {
    height: fit-content;
  }
`

const Width80 = styled.div`
  flex: 4;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    width: 100%;
  }
`

const Width20 = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    width: 100%;
  }
`

const Flex = styled.div`
  display: flex;
`

const Container = styled.div`
  background: #f5f5f5;
  border: 1px solid #d1d1d1;
  box-sizing: border-box;
  border-radius: 5px;
  color: black;
  padding: 0 36pt;
`

const RunANodePage = ({ data }) => {
  const intl = useIntl()

  const heroContent = {
    title: translateMessageId("page-run-a-node-title", intl),
    header: translateMessageId("page-run-a-node-hero-header", intl),
    subtitle: translateMessageId("page-run-a-node-hero-subtitle", intl),
    image: getImage(data.ethereumInside),
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
      image: sovereigntyGlyph,
      title: <Translation id="page-run-a-node-sovereignty-title" />,
      preview: <Translation id="page-run-a-node-sovereignty-preview" />,
      body: [
        <Translation id="page-run-a-node-sovereignty-1" />,
        <Translation id="page-run-a-node-sovereignty-2" />,
      ],
    },
    {
      image: privacyGlyph,
      title: <Translation id="page-run-a-node-privacy-title" />,
      preview: <Translation id="page-run-a-node-privacy-preview" />,
      body: [
        <Translation id="page-run-a-node-privacy-1" />,
        <Translation id="page-run-a-node-privacy-2" />,
        <Translation id="page-run-a-node-privacy-3" />,
      ],
    },
    {
      image: megaphoneGlyph,
      title: <Translation id="page-run-a-node-censorship-resistance-title" />,
      preview: (
        <Translation id="page-run-a-node-censorship-resistance-preview" />
      ),
      body: [
        <Translation id="page-run-a-node-censorship-resistance-1" />,
        <Translation id="page-run-a-node-censorship-resistance-2" />,
      ],
    },
    {
      image: decentralizationGlyph,
      title: <Translation id="page-run-a-node-decentralized-title" />,
      preview: <Translation id="page-run-a-node-decentralized-preview" />,
      body: [
        <Translation id="page-run-a-node-decentralized-1" />,
        <Translation id="page-run-a-node-decentralized-2" />,
      ],
    },
    {
      image: voteGlyph,
      title: <Translation id="page-run-a-node-voice-your-choice-title" />,
      preview: <Translation id="page-run-a-node-voice-your-choice-preview" />,
      body: [
        <Translation id="page-run-a-node-voice-your-choice-1" />,
        <Translation id="page-run-a-node-voice-your-choice-2" />,
      ],
    },
    {
      image: earthGlyph,
      title: <Translation id="page-run-a-node-participate-title" />,
      preview: <Translation id="page-run-a-node-participate-preview" />,
      body: [
        <Translation id="page-run-a-node-participate-1" />,
        <Translation id="page-run-a-node-participate-2" />,
      ],
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

      <Hero content={heroContent} />

      <GappedContent>
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
            <GatsbyImage image={getImage(data.hackathon)} />
          </SplitContent>
        </TwoColumnContent>
      </GappedContent>

      <GappedContent>
        <Highlight backgroundColor={"#f9e4d5"}>
          <Width80>
            <h2>
              <Translation id="page-run-a-node-highlight-title" />
            </h2>
            <p>
              <Translation id="page-run-a-node-highlight-body" />
            </p>
            <p>
              <strong>
                <Translation id="page-run-a-node-highlight-bold" />
              </strong>
            </p>
          </Width80>
          <Width20>
            <GatsbyImage image={getImage(data.impact)} />
          </Width20>
        </Highlight>
      </GappedContent>

      <GappedContent>
        <h2>
          <Translation id="page-run-a-node-why-run-a-node-title" />
        </h2>
        <InfoGrid>
          {whyRunANodeCards.map(({ image, title, preview, body }, idx) => (
            <ExpandableCard
              contentPreview={preview}
              title={title}
              svg={image}
              key={idx}
            >
              {body.map((item, idx) => (
                <p key={idx}>{item}</p>
              ))}
            </ExpandableCard>
          ))}
        </InfoGrid>
      </GappedContent>

      <Divider />

      <GappedContent>
        <h2>
          <Translation id="page-run-a-node-getting-started-hardware-title" />
        </h2>
        <p>
          <Translation id="page-run-a-node-getting-started-hardware-1" />
        </p>

        <Flex>
          <Container>
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
          </Container>

          <Container>
            <h3>
              <Translation id="page-run-a-node-buy-fully-loaded-title" />
            </h3>
            <p>
              <Translation id="page-run-a-node-buy-fully-loaded-1" />
            </p>
            <p>
              <Translation id="page-run-a-node-buy-fully-loaded-note" />
            </p>
          </Container>
        </Flex>
      </GappedContent>

      <GappedContent>
        <h2>
          <Translation id="page-run-a-node-getting-started-software-title" />
        </h2>

        <Highlight backgroundColor={"#D7FBFE"}>
          <Width80>
            <p>
              <Translation id="page-run-a-node-getting-started-software-section-1-1" />
            </p>
            <p>
              <Translation id="page-run-a-node-getting-started-software-section-1-2" />
            </p>
          </Width80>
          <Width20>
            <img src={terminal} />
          </Width20>
        </Highlight>

        <Highlight backgroundColor={"#f9e4d5"}>
          <Width80>
            <p>
              <Translation id="page-run-a-node-getting-started-software-section-2-1" />
            </p>
          </Width80>
          <Width20>
            <img src={phonetap} />
          </Width20>
        </Highlight>

        <Highlight backgroundColor={"#FAE6F8"}>
          <Width80>
            <p>
              <Translation id="page-run-a-node-getting-started-software-section-3-1" />
            </p>
          </Width80>
          <Width20>
            <img src={dappnode} />
          </Width20>
        </Highlight>
      </GappedContent>

      <GappedContent>
        <h2>
          <Translation id="page-run-a-node-choose-your-adventure" />
        </h2>

        <Flex>
          <Container>
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
          </Container>

          <Container>
            <h3>
              <Translation id="page-run-a-node-install-manually-title" />
            </h3>
            <p>
              <Translation id="page-run-a-node-install-manually-1" />
            </p>
            <button>
              <Translation id="page-run-a-node-dappnode-setup" />
            </button>
          </Container>
        </Flex>
      </GappedContent>
    </Page>
  )
}

export default RunANodePage

export const query = graphql`
  query {
    ethereumInside: file(
      relativePath: { eq: "run-a-node/ethereum_inside.png" }
    ) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    hackathon: file(relativePath: { eq: "hackathon_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    impact: file(relativePath: { eq: "impact_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 300
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    community: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
