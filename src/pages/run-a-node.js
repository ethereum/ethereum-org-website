// Libraries
import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"
import { motion } from "framer-motion"

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
import Emoji from "../components/Emoji"
import Link from "../components/Link"
import ButtonLink from "../components/ButtonLink"
import DocLink from "../components/DocLink"

// Utils
import { translateMessageId } from "../utils/translations"

// Styles
const GappedPage = styled(Page)`
  gap: 5rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    gap: 2rem;
  }
  scroll-behavior: smooth;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    scroll-margin-top: ${({ theme }) => theme.variables.navHeight};
  }
`

const GappedContent = styled(Content)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    padding: 0;
  }
`

const HeroContainer = styled.div`
  background: ${({ theme }) => theme.colors.runNodeGradient};
`

const Hero = styled(PageHero)`
  padding-bottom: 2rem;
`

const TwoColumnContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 2rem;
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
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
  }
`

const Highlight = styled(Content)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background: ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
  border: 1px solid #dadada;
  box-sizing: border-box;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  isolation: isolate;

  &:nth-of-type(even) {
    flex-direction: row-reverse;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    &:nth-of-type(even) {
      flex-direction: column-reverse;
    }
    flex-direction: column-reverse;
  }
`

const WhyHighlight = styled(Highlight)`
  padding: 2rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    padding: 1rem;
  }
  p {
    margin-top: 0;
  }
`

const SoftwareHighlight = styled(Highlight)`
  padding: 2rem 6rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    padding: 2rem;
  }
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: inherit;
    filter: blur(1rem);
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
  line-height: 2;
  box-sizing: border-box;
  flex: 4;
  ul {
    list-style: none;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
  }
`

const Width20 = styled.div`
  flex: 1;
  display: flex;
  inset: auto;
  justify-content: center;
  align-items: center;
  place-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
  }
`

const Width60 = styled.div`
  flex: 3;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
  }
`

const Width40 = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  /* align-self: center; */
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
    /* align-self: center; */
  }
`

const Collapse = styled(motion.div)``

const Flex = styled.div`
  display: flex;
  gap: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const MarginFlex = styled(Flex)`
  margin: 3rem 0;
`

const Container = styled.div`
  background: ${({ theme }) => theme.colors.grayBackground};
  border: 1px solid #d1d1d1;
  box-sizing: border-box;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.text};
  padding: 0 2rem;
`

const BuildBox = styled(Container)`
  background: ${({ theme }) => theme.colors.preBackground};
  flex: 1;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const BuildFlex = styled(Flex)`
  padding-bottom: 2rem;
`

const FullyLoaded = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  line-height: 200%;
  padding-bottom: 2rem;
  p {
    font-size: 125%;
  }
  code {
    font-weight: 600;
    line-height: 125%;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    a {
      width: fit-content;
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }
`

const AdventureContainer = styled(Container)`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  &:hover {
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

const SvgTitle = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`

const DappNodeButtonLink = styled(ButtonLink)`
  background-color: #30bcb2;
  &:hover {
    background-color: #3ec3c6;
  }
`

const AvadoButtonLink = styled(ButtonLink)`
  background-color: #4a9b40;
  &:hover {
    background-color: #5baa4a;
  }
`

const StyledEmoji = styled(Emoji)`
  margin-right: 1rem;
`

const RunANodePage = ({ data }) => {
  const intl = useIntl()

  const heroContent = {
    title: <Translation id="page-run-a-node-title" />,
    header: <Translation id="page-run-a-node-hero-header" />,
    subtitle: <Translation id="page-run-a-node-hero-subtitle" />,
    image: getImage(data.ethereumInside),
    alt: <Translation id="page-run-a-node-hero-alt" />,
    buttons: [
      {
        content: <Translation id="page-run-a-node-button-why-run-a-node" />,
        path: "#why-run-a-node",
      },
      {
        content: <Translation id="page-run-a-node-button-get-started" />,
        path: "#get-started",
      },
    ],
  }

  const whyRunANodeCards = [
    {
      image: privacyGlyph,
      title: "page-run-a-node-privacy-title",
      preview: "page-run-a-node-privacy-preview",
      body: [
        "page-run-a-node-privacy-1",
        "page-run-a-node-privacy-2",
        "page-run-a-node-privacy-3",
      ],
    },
    {
      image: megaphoneGlyph,
      title: "page-run-a-node-censorship-resistance-title",
      preview: "page-run-a-node-censorship-resistance-preview",
      body: [
        "page-run-a-node-censorship-resistance-1",
        "page-run-a-node-censorship-resistance-2",
      ],
    },
    {
      image: earthGlyph,
      title: "page-run-a-node-participate-title",
      preview: "page-run-a-node-participate-preview",
      body: ["page-run-a-node-participate-1", "page-run-a-node-participate-2"],
    },
    {
      image: decentralizationGlyph,
      title: "page-run-a-node-decentralized-title",
      preview: "page-run-a-node-decentralized-preview",
      body: [
        "page-run-a-node-decentralized-1",
        "page-run-a-node-decentralized-2",
      ],
    },
    {
      image: voteGlyph,
      title: "page-run-a-node-voice-your-choice-title",
      preview: "page-run-a-node-voice-your-choice-preview",
      body: [
        "page-run-a-node-voice-your-choice-1",
        "page-run-a-node-voice-your-choice-2",
      ],
    },
    {
      image: sovereigntyGlyph,
      title: "page-run-a-node-sovereignty-title",
      preview: "page-run-a-node-sovereignty-preview",
      body: ["page-run-a-node-sovereignty-1", "page-run-a-node-sovereignty-2"],
    },
  ]

  return (
    <GappedPage>
      <PageMetadata
        title={translateMessageId("page-run-a-node-title", intl)}
        description={translateMessageId(
          "page-run-a-node-meta-description",
          intl
        )}
      />
      <HeroContainer>
        <Hero content={heroContent} isReverse />
      </HeroContainer>

      <Content>
        <TwoColumnContent>
          <Width60>
            <h2>
              <Translation id="page-run-a-node-what-title" />
            </h2>
            <h3>
              <Translation id="page-run-a-node-what-1-subtitle" />
            </h3>
            <p>
              <Translation id="page-run-a-node-what-1-text" />
            </p>
            <h3>
              <Translation id="page-run-a-node-what-2-subtitle" />
            </h3>
            <p>
              <Translation id="page-run-a-node-what-2-text" />
            </p>
            <h3>
              <Translation id="page-run-a-node-what-3-subtitle" />
            </h3>
            <p>
              <Translation id="page-run-a-node-what-3-text" />
            </p>
          </Width60>
          <Width40>
            <GatsbyImage image={getImage(data.hackathon)} />
          </Width40>
        </TwoColumnContent>
      </Content>

      <Content>
        <WhyHighlight backgroundColor="homeBoxOrange">
          <Width80>
            <h2>
              <Translation id="page-run-a-node-who-title" />
            </h2>
            <h3>
              <Translation id="page-run-a-node-who-preview" />
            </h3>
            <Collapse>
              <ul>
                <li>
                  <Translation id="page-run-a-node-who-copy-1" />
                </li>
                <li>
                  <Translation id="page-run-a-node-who-copy-2" />
                </li>
                <li>
                  <Translation id="page-run-a-node-who-copy-3" />
                </li>
              </ul>
              <h3>
                <Translation id="page-run-a-node-who-copy-bold" />
              </h3>
            </Collapse>
          </Width80>
          <Width20>
            <GatsbyImage image={getImage(data.impact)} />
          </Width20>
        </WhyHighlight>
      </Content>

      <Content>
        <h2>
          <Translation id="page-run-a-node-why-title" />
        </h2>
        <InfoGrid>
          {whyRunANodeCards.map(({ image, title, preview, body }, idx) => (
            <ExpandableCard
              contentPreview={<Translation id={preview} />}
              title={<Translation id={title} />}
              svg={image}
              key={idx}
            >
              {body.map((item, idx) => (
                <p key={idx}>{<Translation id={item} />}</p>
              ))}
            </ExpandableCard>
          ))}
        </InfoGrid>
      </Content>

      <Divider />

      <Content>
        <h2>
          <Translation id="page-run-a-node-getting-started-hardware-title" />
        </h2>
        <p>
          <Translation id="page-run-a-node-getting-started-hardware-1" />
        </p>
        <p>
          <Translation id="page-run-a-node-getting-started-hardware-2" />
        </p>
        <MarginFlex>
          <Container>
            <h3>
              <StyledEmoji text=":building_construction:" size={2} />
              <Translation id="page-run-a-node-build-your-own-title" />
            </h3>
            <BuildFlex>
              <BuildBox>
                <h4>
                  <Translation id="page-run-a-node-build-your-own-minimum-specs" />
                </h4>
                <ul>
                  <li>
                    4 - 8 GB RAM
                    <p>
                      <Link to="#plan-on-staking">See note on staking</Link>
                    </p>
                    <p>
                      <Link to="#rasp-pi">See note on Raspberry Pis</Link>
                    </p>
                  </li>
                  <li>
                    2 TB SSD
                    <p>
                      <small>
                        Though you can still technically get away with 1 TB, the
                        blockchain continues to grow over time and this will
                        soon no longer be enough.
                      </small>
                    </p>
                    <p>
                      <small>
                        <em>SSD necessary for required write speeds.</em>
                      </small>
                    </p>
                  </li>
                </ul>
              </BuildBox>
              <BuildBox>
                <h4>Recommended:</h4>
                <ul>
                  <li>
                    Intel NUC, 7th gen or higher
                    <p>
                      <small>x86 processor</small>
                    </p>
                  </li>
                  <li>
                    Wired internet connection
                    <p>
                      <small>
                        Not required, but provides easier setup and most
                        consistent connection
                      </small>
                    </p>
                  </li>
                  <li>
                    Display screen and keyboard
                    <p>
                      <small>
                        Unless you're using DAppNode, or ssh/headless setup
                      </small>
                    </p>
                  </li>
                </ul>
              </BuildBox>
            </BuildFlex>
          </Container>

          <FullyLoaded>
            <div>
              <h3>
                <StyledEmoji text=":shopping_cart:" size={2} />
                <Translation id="page-run-a-node-buy-fully-loaded-title" />
              </h3>
              <p>
                <Translation id="page-run-a-node-buy-fully-loaded-1" />
              </p>
              <ul>
                <li>No building.</li>
                <li>App-like setup.</li>
                <li>
                  <code>
                    <Translation id="page-run-a-node-buy-fully-loaded-note" />
                  </code>
                </li>
              </ul>
            </div>
            <ButtonLink to="#choose-your-adventure">Shop</ButtonLink>
          </FullyLoaded>
        </MarginFlex>
        <h3 id="plan-on-staking">
          <StyledEmoji text=":cut_of_meat:" size={2} />
          Plan on staking?
        </h3>
        <p>
          To maximize the efficiency of your validator, a minimum of 16GB RAM is
          recommended, but 32GB is better, with a CPU benchmark score of 6667+
          on <Link to="https://cpubenchmark.net">cpubenchmark.net</Link>. It is
          also recommended that stakers have access to unlimited high-speed
          internet bandwidth, though this is not an absolute requirement.
        </p>
        <h3 id="rasp-pi">
          <StyledEmoji text=":pie:" size={2} />A note on Rapsberry Pis (ARM
          processor)
        </h3>
        <p>
          Raspberry Pis are lightweight and affordable computers, but they have
          limitations that may impact the performance of your node. Though not
          currently recommended for staking, these can be an excellent and
          inexpensive option for running a node for personal use, with as little
          as 4 - 8 GB of RAM.
        </p>
        <ul>
          <li>
            If you plan on running DAppNode, please see instructions for{" "}
            <Link to="https://docs.dappnode.io/get-started/installation/arm-hardware/installation">
              DAppNode on ARM
            </Link>
            .
          </li>
          <li>
            To learn how to set up a node via the command line on a Raspberry
            Pi, check out{" "}
            <Link to="https://ethereum-on-arm-documentation.readthedocs.io/en/latest">
              Ethereum on Arm documentation
            </Link>
            , or following along with{" "}
            <Link to="/developers/tutorials/run-node-raspberry-pi/">
              this tutorial
            </Link>
            .
          </li>
        </ul>
      </Content>

      <Content>
        <h2>
          <Translation id="page-run-a-node-getting-started-software-title" />
        </h2>
        <GappedContent>
          <SoftwareHighlight backgroundColor="homeBoxTurquoise">
            <Width80>
              <p>
                <Translation id="page-run-a-node-getting-started-software-section-1" />
              </p>
              <p>
                <code>
                  <StyledEmoji text=":warning:" size={1} />
                  <Translation id="page-run-a-node-getting-started-software-section-1-alert" />
                </code>
              </p>
              <DocLink to="/developers/docs/nodes-and-clients/run-a-node/#spinning-up-node">
                <Translation id="page-run-a-node-getting-started-software-section-1-link" />
              </DocLink>
            </Width80>
            <Width20>
              <img src={terminal} alt="Terminal glyph" />
            </Width20>
          </SoftwareHighlight>

          <SoftwareHighlight backgroundColor="homeBoxOrange">
            <Width80>
              <p>
                <Translation id="page-run-a-node-getting-started-software-section-2" />
              </p>
            </Width80>
            <Width20>
              <img src={phonetap} alt="Phone tap glyph" />
            </Width20>
          </SoftwareHighlight>

          <SoftwareHighlight backgroundColor="homeBoxPurple">
            <Width80>
              <p>
                <Translation id="page-run-a-node-getting-started-software-section-3" />
              </p>
            </Width80>
            <Width20>
              <img src={dappnode} alt="DAppNode glyph" />
            </Width20>
          </SoftwareHighlight>
        </GappedContent>
      </Content>

      <Content id="choose-your-adventure">
        <h2>
          <Translation id="page-run-a-node-choose-your-adventure" />
        </h2>

        <Flex>
          <AdventureContainer>
            <SvgTitle>
              <img src={plugAndPlayGlyph} alt="Plug-n-play glyph" />
              <h3>
                <Translation id="page-run-a-node-plug-and-play-title" />
              </h3>
            </SvgTitle>
            <p>
              <Translation id="page-run-a-node-plug-and-play-1" />
            </p>
            <ButtonContainer>
              <DappNodeButtonLink to="https://shop.dappnode.io/">
                <Translation id="page-run-a-node-shop-dappnode" />
              </DappNodeButtonLink>
              <AvadoButtonLink to="https://ava.do/">
                <Translation id="page-run-a-node-shop-avado" />
              </AvadoButtonLink>
            </ButtonContainer>
          </AdventureContainer>

          <AdventureContainer>
            <div>
              <SvgTitle>
                <img src={downloadGlyph} alt="Install manually glyph" />
                <h3>
                  <Translation id="page-run-a-node-install-manually-title" />
                </h3>
              </SvgTitle>
              <p>
                <Translation id="page-run-a-node-install-manually-1" />
              </p>
            </div>
            <ButtonContainer>
              <DappNodeButtonLink to="https://docs.dappnode.io">
                <Translation id="page-run-a-node-dappnode-setup" />
              </DappNodeButtonLink>
            </ButtonContainer>
          </AdventureContainer>
        </Flex>
      </Content>
    </GappedPage>
  )
}

export default RunANodePage

export const query = graphql`
  query {
    ethereumInside: file(
      relativePath: { eq: "run-a-node/ethereum-inside.png" }
    ) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    hackathon: file(relativePath: { eq: "hackathon_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
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
