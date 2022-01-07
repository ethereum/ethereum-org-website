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
import FeedbackCard from "../components/FeedbackCard"
import Icon from "../components/Icon"
import NakedButton from "../components/NakedButton"

// Utils
import { translateMessageId } from "../utils/translations"

// Styles
const GappedPage = styled(Page)`
  gap: 5rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    gap: 3rem;
  }
  * {
    scroll-margin-top: 5.5rem;
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
  width: 100%;
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
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0rem;
    margin-right: 0rem;
  }
`

const SplitContent = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    width: 100%;
    flex-direction: column-reverse;
  }
`

const Column = styled.div`
  flex: 1;
`

const ResponsiveButtonLink = styled(ButtonLink)`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: fit-content;
  &:hover {
    svg {
      fill: ${({ theme }) => theme.colors.buttonColor};
      transform: scale(1.15);
      transition: 0.1s;
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
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
  & > div {
    height: fit-content;
    &:hover {
      transition: 0.1s;
      transform: scale(1.01);
      img {
        transition: 0.1s;
        transform: scale(1.1);
      }
    }
  }
`

const Width80 = styled.div`
  line-height: 2;
  box-sizing: border-box;
  flex: 4;
  ul {
    list-style: none;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
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
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    width: 100%;
  }
`

const Width60 = styled.div`
  flex: 3;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    width: 100%;
  }
`

const Width40 = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-self: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    width: 100%;
  }
`

const Collapse = styled(motion.div)``

const Flex = styled.div`
  display: flex;
  gap: 2rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
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
  &:hover {
    transition: transform 0.1s;
    transform: scale(1.02);
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
  gap: 1rem;
  margin-top: 2rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
    flex-direction: column;
  }
`

const DappNodeButtonLink = styled(ResponsiveButtonLink)`
  background-color: #30bcb2;
  span {
    color: ${({ theme }) => theme.colors.white};
  }
  &:hover {
    background-color: #3ec3c6;
    box-shadow: 4px 4px 0px 0px #3ec3c677;
  }
`

const AvadoButtonLink = styled(ResponsiveButtonLink)`
  background-color: #4a9b40;
  span {
    color: ${({ theme }) => theme.colors.white};
  }
  &:hover {
    background-color: #5baa4a;
    box-shadow: 4px 4px 0px 0px #5baa4a77;
  }
`

const StyledEmoji = styled(Emoji)`
  margin-right: 1rem;
`

const ScrollLink = styled(NakedButton)`
  color: ${({ theme }) => theme.colors.primary};
  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const ScrollButtonSecondary = styled.button`
  text-decoration: none;
  display: inline-block;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25em;
  text-align: center;

  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.text};
  background-color: transparent;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.colors.cardBoxShadow};
  }
  &:active {
    background-color: ${({ theme }) =>
      theme.colors.secondaryButtonBackgroundActive};
  }
`

const DiscordIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.buttonColor};
`

const StakingCalloutContainer = styled(SplitContent)`
  background: linear-gradient(
    262.78deg,
    rgba(152, 186, 249, 0.25) 0%,
    rgba(207, 177, 251, 0.25) 53.12%,
    rgba(151, 252, 246, 0.25) 100%
  );
  width: 100%;
  padding: 2rem;
  gap: 5rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex-direction: column;
    gap: 3rem;
  }
`

const Leslie = styled(GatsbyImage)`
  transform: scaleX(-1) scale(1.15) translateX(2rem);
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    transform: scaleX(-1) translateY(-3rem);
  }
`

const StyledFeedbackCard = styled(FeedbackCard)`
  width: 100%;
  max-width: 700px;
  margin: 0 2rem;
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
        pathId: "why-run-a-node",
      },
      {
        content: <Translation id="page-run-a-node-button-get-started" />,
        pathId: "getting-started",
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

  const scrollToId = (id) => {
    const element = document.getElementById(id)
    if (!element) return
    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }

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

      <Content id="why-run-a-node">
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

      <Content id="getting-started">
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
                    <Translation id="page-run-a-node-build-your-own-min-ram" />
                    <p>
                      <ScrollLink onClick={() => scrollToId("plan-on-staking")}>
                        <Translation id="page-run-a-node-build-your-own-ram-note-1" />
                      </ScrollLink>
                    </p>
                    <p>
                      <ScrollLink onClick={() => scrollToId("rasp-pi")}>
                        <Translation id="page-run-a-node-build-your-own-ram-note-2" />
                      </ScrollLink>
                    </p>
                  </li>
                  <li>
                    <Translation id="page-run-a-node-build-your-own-min-ssd" />
                    <p>
                      <small>
                        <Translation id="page-run-a-node-build-your-own-ssd-note-1" />
                      </small>
                    </p>
                    <p>
                      <small>
                        <em>
                          <Translation id="page-run-a-node-build-your-own-ssd-note-2" />
                        </em>
                      </small>
                    </p>
                  </li>
                </ul>
              </BuildBox>

              <BuildBox>
                <h4>
                  <Translation id="page-run-a-node-build-your-own-recommended" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-run-a-node-build-your-own-nuc" />
                    <p>
                      <small>
                        <Translation id="page-run-a-node-build-your-own-nuc-small" />
                      </small>
                    </p>
                  </li>
                  <li>
                    <Translation id="page-run-a-node-build-your-own-connection" />
                    <p>
                      <small>
                        <Translation id="page-run-a-node-build-your-own-connection-small" />
                      </small>
                    </p>
                  </li>
                  <li>
                    <Translation id="page-run-a-node-build-your-own-peripherals" />
                    <p>
                      <small>
                        <Translation id="page-run-a-node-build-your-own-peripherals-small" />
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
                <Translation id="page-run-a-node-buy-fully-loaded-description" />
              </p>
              <ul>
                <li>
                  <Translation id="page-run-a-node-buy-fully-loaded-note-1" />
                </li>
                <li>
                  <Translation id="page-run-a-node-buy-fully-loaded-note-2" />
                </li>
                <li>
                  <code>
                    <Translation id="page-run-a-node-buy-fully-loaded-note-3" />
                  </code>
                </li>
              </ul>
            </div>
            <ScrollButtonSecondary
              onClick={() => scrollToId("choose-your-adventure")}
            >
              <Translation id="page-run-a-node-shop" />
            </ScrollButtonSecondary>
          </FullyLoaded>
        </MarginFlex>

        <h3 id="plan-on-staking">
          <StyledEmoji text=":cut_of_meat:" size={2} />
          <Translation id="page-run-a-node-staking-plans-title" />
        </h3>
        <p>
          <Translation id="page-run-a-node-staking-plans-description" />
        </p>
        <p>
          <Link to="https://cpubenchmark.net">cpubenchmark.net</Link>
        </p>
        <h3 id="rasp-pi">
          <StyledEmoji text=":pie:" size={2} />
          <Translation id="page-run-a-node-rasp-pi-title" />
        </h3>
        <p>
          <Translation id="page-run-a-node-rasp-pi-description" />
        </p>
        <ul>
          <li>
            <Link to="https://docs.dappnode.io/get-started/installation/arm-hardware/installation">
              <Translation id="page-run-a-node-rasp-pi-note-1-link" />
            </Link>{" "}
            -{" "}
            <i>
              <Translation id="page-run-a-node-rasp-pi-note-1-description" />
            </i>
          </li>
          <li>
            <Link to="https://ethereum-on-arm-documentation.readthedocs.io/en/latest">
              <Translation id="page-run-a-node-rasp-pi-note-2-link" />
            </Link>{" "}
            -{" "}
            <i>
              <Translation id="page-run-a-node-rasp-pi-note-2-description" />
            </i>
          </li>
          <li>
            <Link to="/developers/tutorials/run-node-raspberry-pi">
              <Translation id="page-run-a-node-rasp-pi-note-3-link" />
            </Link>{" "}
            -{" "}
            <i>
              <Translation id="page-run-a-node-rasp-pi-note-3-description" />
            </i>
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
              <Link to="/developers/docs/nodes-and-clients/run-a-node/#spinning-up-node">
                <Translation id="page-run-a-node-getting-started-software-section-1-link" />
              </Link>
            </Width80>
            <Width20>
              <img
                src={terminal}
                alt={translateMessageId(
                  "page-run-a-node-glyph-alt-terminal",
                  intl
                )}
              />
            </Width20>
          </SoftwareHighlight>

          <SoftwareHighlight backgroundColor="homeBoxOrange">
            <Width80>
              <p>
                <Translation id="page-run-a-node-getting-started-software-section-2" />
              </p>
            </Width80>
            <Width20>
              <img
                src={phonetap}
                alt={translateMessageId(
                  "page-run-a-node-glyph-alt-phone",
                  intl
                )}
              />
            </Width20>
          </SoftwareHighlight>

          <SoftwareHighlight backgroundColor="homeBoxPurple">
            <Width80>
              <p>
                <Translation id="page-run-a-node-getting-started-software-section-3" />
              </p>
            </Width80>
            <Width20>
              <img
                src={dappnode}
                alt={translateMessageId(
                  "page-run-a-node-glyph-alt-dappnode",
                  intl
                )}
              />
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
              <img
                src={plugAndPlayGlyph}
                alt={translateMessageId("page-run-a-node-glyph-alt-pnp", intl)}
              />
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
                <img
                  src={downloadGlyph}
                  alt={translateMessageId(
                    "page-run-a-node-glyph-alt-download",
                    intl
                  )}
                />
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

      <Content>
        <SplitContent>
          <Column>
            <h2>
              <Translation id="page-run-a-node-community-title" />
            </h2>
            <p>
              <Translation id="page-run-a-node-community-description" />
            </p>
            <ButtonContainer>
              <ResponsiveButtonLink to="https://discord.gg/c28an8dA5k">
                <DiscordIcon name="discord" />
                <Translation id="page-run-a-node-community-link" />
              </ResponsiveButtonLink>
            </ButtonContainer>
          </Column>
          <Column>
            <GatsbyImage image={getImage(data.community)} />
          </Column>
        </SplitContent>
      </Content>

      <Content>
        <h2>
          <Translation id="page-run-a-node-further-reading-title" />
        </h2>
        <ul>
          <li>
            <Link to="https://github.com/ethereumbook/ethereumbook/blob/develop/03clients.asciidoc#should-i-run-a-full-node">
              <Translation id="page-run-a-node-further-reading-1-link" />
            </Link>{" "}
            -{" "}
            <i>
              <Translation id="page-run-a-node-further-reading-1-author" />
            </i>
          </li>
          <li>
            <Link to="https://ethereum-on-arm-documentation.readthedocs.io/en/latest/">
              <Translation id="page-run-a-node-further-reading-2-link" />
            </Link>
          </li>
          <li>
            <Link to="https://vitalik.ca/general/2021/05/23/scaling.html">
              <Translation id="page-run-a-node-further-reading-3-link" />
            </Link>{" "}
            -{" "}
            <i>
              <Translation id="page-run-a-node-further-reading-3-author" />
            </i>
          </li>
        </ul>
      </Content>

      <Divider />

      <StakingCalloutContainer>
        <Column>
          <Leslie image={getImage(data.leslie)} />
        </Column>
        <Column>
          <h2>
            <Translation id="page-run-a-node-staking-title" />
          </h2>
          <p>
            <Translation id="page-run-a-node-staking-description" />
          </p>
          <ButtonContainer>
            <ResponsiveButtonLink to="/eth2/staking">
              <Translation id="page-run-a-node-staking-link" />
            </ResponsiveButtonLink>
          </ButtonContainer>
        </Column>
      </StakingCalloutContainer>

      <StyledFeedbackCard
        prompt={translateMessageId("page-run-a-node-feedback-prompt", intl)}
      />
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
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    leslie: file(relativePath: { eq: "eth2/eth2_rhino.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
