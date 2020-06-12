import React from "react"
import styled from "styled-components"
import { useIntl, FormattedMessage } from "gatsby-plugin-intl"

import SEO from "../components/SEO"
import Button from "../components/Button"
import Link from "../components/Link"

import studioGif from "../images/ethereum-studio.gif"

// TODO use breakpoints from Theme.js
const MarketingPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
  @media screen and (min-width: 414px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  @media screen and (min-width: 768px) {
    padding-left: 4rem;
    padding-right: 4rem;
  }
  @media screen and (min-width: 1024px) {
    padding-left: 6rem;
    padding-right: 6rem;
  }
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 896px;
`

// TODO inherit from `l2`?
const H1 = styled.h1`
  color: ${(props) => props.theme.colors.black};
  font-size: min(max(1.75rem, 4vw), 2rem);
  margin: 4.5rem 0 1.5rem;
`

// TODO inherit from `l4`?
// TODO fix text width / wrap
const Subtitle = styled.p`
  color: #4c4c4c;
  font-size: 1.25rem;
  max-width: 55ch;
  max-width: 55ch;
  line-height: 1.4;
  font-weight: 400;
`

const Gif = styled.img`
  margin-top: 4rem;
`

// .tc-text100
// l5
const Caption = styled.p`
  text-align: center;
  color: #7f7f7f;
  line-height: 1.6;
  font-weight: 400;
`

const H2 = styled.h2`
  margin-top: 8rem;
  margin-bottom: 4rem;
  max-width: 35ch;
  color: ${(props) => props.theme.colors.black};
  line-height: 1.4;
  font-weight: 400;
  font-size: 1.5rem;
`

const TemplateSection = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-bottom: 8rem;
  text-align: center;
`

const LearnSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8rem;
  text-align: center;
`

const ResourceTitle = styled.h2`
  min-width: 100%;
`

const Card = styled.div`
  margin: 4rem 1rem 0;
  flex: 1;
  min-width: 260px;
  max-width: 240px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

// TODO style
const TemplateCard = ({ template }) => (
  <Card>
    {/* TODO twemoji support */}
    {/* <span class="l1 ma-0" v-html="inlineMd(template.icon)" /> */}
    <div>
      <h3>
        <FormattedMessage id={template.title} />
      </h3>
      <p>
        <FormattedMessage id={template.description} />
      </p>
    </div>
    <div>
      {/* TODO use Link component */}
      <a target="_blank" rel="noopener noreferrer" href={template.link.url}>
        <FormattedMessage id={template.link.text} />
      </a>
    </div>
  </Card>
)

const StyledResourceCard = styled.div`
  margin: 4rem 2rem 0;
  flex: 0 1 25%;
  min-width: 200px;
  max-width: 400px;
`

// TODO use gatby-image
const ResourceCard = ({ resource }) => (
  <StyledResourceCard>
    <h3>{resource.title}</h3>
    <div>
      <a href={resource.to} target="_blank" rel="noopener noreferrer">
        {/* <img
              :src="$withBase(resource.img.src)"
              :alt="resource.img.alt || resource.title"
            /> */}
        {resource.title}
      </a>
    </div>
    <p>
      {/* tc-text200 */}
      <FormattedMessage id={resource.description} />
    </p>
  </StyledResourceCard>
)

const templates = [
  {
    title: "page-build-hello-world-title",
    description: "page-build-hello-world-description",
    link: {
      url: "https://studio.ethereum.org/1",
      text: "page-build-hello-world-link-text",
    },
    icon: ":wave:",
  },
  {
    title: "page-build-coin-contract-title",
    description: "page-build-coin-contract-description",
    link: {
      url: "https://studio.ethereum.org/2",
      text: "page-build-coin-contract-link-text",
    },
    icon: ":key:",
  },
  {
    title: "page-build-crypto-pizza-title",
    description: "page-build-crypto-pizza-description",
    link: {
      url: "https://studio.ethereum.org/3",
      text: "page-build-crypto-pizza-link-text",
    },
    icon: ":pizza:",
  },
]

// TODO light & dark images
const resources = [
  {
    title: "CryptoZombies",
    description: "page-build-cryptozombies-description",
    to: "https://cryptozombies.io/",
    img: {
      src: "/ecosystem/crypto-zombie.png",
      alt: "CryptoZombies",
    },
  },
  {
    title: "Ethernauts",
    description: "page-build-ethernauts-description",
    to: "https://ethernaut.openzeppelin.com/",
    img: {
      src: "/ecosystem/oz.png",
      alt: "Open Zeppelin Ethernaut",
    },
  },
  {
    title: "Remix",
    description: "page-build-remix-description",
    to: "https://remix.ethereum.org",
    img: {
      src: "/ecosystem/remix.png",
      alt: "Remix",
    },
  },
  {
    title: "ChainShot",
    description: "page-build-chainshot-description",
    to: "https://www.chainshot.com",
    img: {
      src: "/ecosystem/chainshot.png",
      alt: "ChainShot",
    },
  },
  {
    title: "ConsenSys Academy",
    description: "page-build-consensys-academy-description",
    to: "https://consensys.net/academy/bootcamp/",
    img: {
      src: "/ecosystem/consensys.png",
      alt: "ConsenSys Academy",
    },
  },
]

const BuildPage = () => {
  const intl = useIntl()

  return (
    <MarketingPage>
      <SEO
        title={intl.formatMessage({ id: "page-build-meta-title" })}
        description={intl.formatMessage({ id: "page-build-meta-description" })}
      />
      <Header>
        <H1>
          <FormattedMessage id="page-build-title" />
        </H1>
        <Subtitle>
          <FormattedMessage id="page-build-subtitle" />
        </Subtitle>
        <Button to="https://studio.ethereum.org">
          <FormattedMessage id="page-build-try-button" />
        </Button>
        <Gif src={studioGif} />
        <Caption>
          <FormattedMessage id="page-build-powered-by" />{" "}
          <Link to="https://superblocks.com">Superblocks</Link>
        </Caption>
        <H2>
          <FormattedMessage id="page-build-h2" />
        </H2>
      </Header>
      <TemplateSection>
        {templates.map((template) => {
          return <TemplateCard template={template} />
        })}
      </TemplateSection>
      <TemplateSection>
        <ResourceTitle>
          <FormattedMessage id="page-build-more-learning-title" />
        </ResourceTitle>
        {resources.map((resource) => {
          return <ResourceCard resource={resource} />
        })}
      </TemplateSection>
      <LearnSection>
        <h2>
          <FormattedMessage id="page-build-learn-more-cta" />
        </h2>
        <Subtitle>
          <FormattedMessage id="page-build-learn-more-description" />
        </Subtitle>
        <Button isSecondary={true} to="/learn/">
          <FormattedMessage id="page-build-try-button" />
        </Button>
      </LearnSection>
      <p>
        <FormattedMessage id="page-build-collaboration" />
      </p>
    </MarketingPage>
  )
}

export default BuildPage
