import React from "react"
import { graphql, PageProps } from "gatsby"
import { useIntl } from "react-intl"
import { getImage } from "gatsby-plugin-image"
import styled from "styled-components"

import ButtonDropdown, {
  List as ButtonDropdownList,
} from "../../components/ButtonDropdown"
import ButtonLink from "../../components/ButtonLink"
import Card from "../../components/Card"
import Link from "../../components/Link"
import PageHero from "../../components/PageHero"
import PageMetadata from "../../components/PageMetadata"
import Translation from "../../components/Translation"
import {
  Content,
  Page as PageContainer,
  Divider,
} from "../../components/SharedStyledComponents"
import FeedbackCard from "../../components/FeedbackCard"
import ExpandableCard from "../../components/ExpandableCard"
import StakingStatsBox from "../../components/Staking/StakingStatsBox"
import StakingHierarchy from "../../components/Staking/StakingHierarchy"
import StakingHomeTableOfContents from "../../components/Staking/StakingHomeTableOfContents"
import StakingCommunityCallout from "../../components/Staking/StakingCommunityCallout"

import { translateMessageId, TranslationKey } from "../../utils/translations"
import type { Context } from "../../types"

const HeroStatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.layer2Gradient};
  padding-bottom: 2rem;
`

const Page = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto 4rem;

  padding-top: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const InfoTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  text-align: right;
  margin-top: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    text-align: left;
    font-size: 2.5rem
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

const InfoColumn = styled.aside`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 6.25rem; /* account for navbar */
  height: calc(100vh - 80px);
  flex: 0 1 330px;
  margin: 0 2rem;
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

const MobileButtonDropdown = styled(StyledButtonDropdown)`
  margin-bottom: 0rem;
  display: none;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: block;
  }
`

// Apply styles for classes within markdown here
const ContentContainer = styled.article`
  flex: 1 1 ${(props) => props.theme.breakpoints.l};
  position: relative;
  padding: 2rem;
  padding-top: 0rem;
  gap: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    padding: 0rem;
  }
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
  h2:first-of-type,
  & > div:first-child {
    margin-top: 0;
    padding-top: 0;
  }
`

const ComparisonGrid = styled.div`
  display: grid;
  grid-column-gap: 3rem;
  grid-auto-rows: minmax(64px, auto);
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    "solo-title saas-title pool-title"
    "solo-rewards saas-rewards pool-rewards"
    "solo-risks saas-risks pool-risks"
    "solo-reqs saas-reqs pool-reqs"
    "solo-cta saas-cta pool-cta";

  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "solo-title"
      "solo-rewards"
      "solo-risks"
      "solo-reqs"
      "solo-cta"
      "saas-title"
      "saas-rewards"
      "saas-risks"
      "saas-reqs"
      "saas-cta"
      "pool-title"
      "pool-rewards"
      "pool-risks"
      "pool-reqs"
      "pool-cta";
  }

  h4 {
    color: #787878;
  }
`

const ColorH3 = styled.h3<{ color: string }>`
  grid-area: ${({ color }) => {
    switch (color) {
      case "stakingGold":
        return "solo-title"
      case "stakingGreen":
        return "saas-title"
      case "stakingBlue":
        return "pool-title"
      default:
        return ""
    }
  }};
  color: ${({ theme, color }) => theme.colors[color]};
`

const StyledButtonLink = styled(ButtonLink)`
  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
    width: 100%;
  }
`

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: 1fr;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    grid-template-columns: 1fr;
  }
`

const StyledCard = styled(Card)`
  justify-content: flex-start;
  h3 {
    font-weight: 700;
    margin: 0 0 1rem;
  }
`

type BenefitsType = {
  title: TranslationKey
  emoji: string
  description: TranslationKey
  linkText?: TranslationKey
  to?: string
}

const benefits: Array<BenefitsType> = [
  {
    title: "page-staking-benefits-1-title",
    emoji: "💰",
    description: "page-staking-benefits-1-description",
  },
  {
    title: "page-staking-benefits-2-title",
    emoji: ":shield:",
    description: "page-staking-benefits-2-description",
  },
  {
    title: "page-staking-benefits-3-title",
    emoji: "🍃",
    description: "page-staking-benefits-3-description",
    linkText: "page-staking-benefits-3-link",
    to: "/energy-consumption",
  },
]

const StakingPage = ({
  data,
}: PageProps<Queries.StakingPageIndexQuery, Context>) => {
  const intl = useIntl()

  const heroContent = {
    title: translateMessageId("page-staking-hero-title", intl),
    header: translateMessageId("page-staking-hero-header", intl),
    subtitle: translateMessageId("page-staking-hero-subtitle", intl),
    image: getImage(data.rhino),
    alt: translateMessageId("page-staking-image-alt", intl),
    buttons: [],
  }

  const dropdownLinks: ButtonDropdownList = {
    text: "Staking Options" as TranslationKey,
    ariaLabel: "Staking options dropdown menu",
    items: [
      {
        text: "page-staking-dropdown-home",
        to: "/staking/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked staking home",
        },
      },
      {
        text: "page-staking-dropdown-solo",
        to: "/staking/solo/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked solo staking",
        },
      },
      {
        text: "page-staking-dropdown-saas",
        to: "/staking/saas/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked staking as a service",
        },
      },
      {
        text: "page-staking-dropdown-pools",
        to: "/staking/pools/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked pooled staking",
        },
      },
    ],
  }

  // TODO: use translateMessageId() for these strings
  const tocItems = {
    whatIsStaking: {
      id: "what-is-staking",
      title: translateMessageId("page-staking-section-what-title", intl),
    },
    whyStakeYourEth: {
      id: "why-stake-your-eth",
      title: translateMessageId("page-staking-section-why-title", intl),
    },
    howToStakeYourEth: {
      id: "how-to-stake-your-eth",
      title: translateMessageId("page-staking-toc-how-to-stake-your-eth", intl),
    },
    comparisonOfOptions: {
      id: "comparison-of-options",
      title: translateMessageId("page-staking-toc-comparison-of-options", intl),
    },
    joinTheCommunity: {
      id: "join-the-community",
      title: translateMessageId("page-staking-join-community", intl),
    },
    faq: {
      id: "faq",
      title: translateMessageId("page-staking-toc-faq", intl),
    },
    further: {
      id: "further",
      title: translateMessageId("page-staking-toc-further", intl),
    },
  }

  const tocArray = Object.values(tocItems)

  return (
    <PageContainer>
      <PageMetadata
        title={translateMessageId("page-staking-meta-title", intl)}
        description={translateMessageId("page-staking-meta-description", intl)}
      />
      <HeroStatsWrapper>
        <PageHero content={heroContent} />
        <StakingStatsBox />
      </HeroStatsWrapper>
      <Page>
        <InfoColumn>
          <StyledButtonDropdown list={dropdownLinks} />
          <InfoTitle>
            <Translation id="page-staking-dom-info-title" />
          </InfoTitle>
          <StakingHomeTableOfContents items={tocArray} />
        </InfoColumn>
        <ContentContainer id="content">
          <Content>
            <h2 id={tocItems.whatIsStaking.id}>
              {tocItems.whatIsStaking.title}
            </h2>
            <p>
              <Translation id="page-staking-description" />
            </p>
            <p>
              <Link to="/get-eth/">
                <Translation id="page-staking-section-what-link" />
              </Link>
            </p>
          </Content>
          <Content>
            <h2 id={tocItems.whyStakeYourEth.id}>
              {tocItems.whyStakeYourEth.title}
            </h2>
            <CardGrid>
              {benefits.map(
                ({ title, description, emoji, linkText, to }, idx) => (
                  <StyledCard
                    title={translateMessageId(title, intl)}
                    emoji={emoji}
                    key={idx}
                    description={translateMessageId(description, intl)}
                  >
                    {to && linkText && (
                      <Link to={to}>{translateMessageId(linkText, intl)}</Link>
                    )}
                  </StyledCard>
                )
              )}
            </CardGrid>
          </Content>
          <Content>
            <h2 id={tocItems.howToStakeYourEth.id}>
              {tocItems.howToStakeYourEth.title}
            </h2>
            <p>
              <Translation id="page-staking-section-why-p1" />
            </p>
            <p>
              <Translation id="page-staking-section-why-p2" />
            </p>
          </Content>
          <StakingHierarchy />
          <Content>
            <p style={{ marginTop: "1rem" }}>
              <Translation id="page-staking-hierarchy-subtext" />
            </p>
          </Content>
          <Divider />
          <Content>
            <h2 id={tocItems.comparisonOfOptions.id}>
              {tocItems.comparisonOfOptions.title}
            </h2>
            <p>
              <Translation id="page-staking-section-comparison-subtitle" />
            </p>
            <ComparisonGrid>
              <ColorH3 color="stakingGold">
                <Translation id="page-staking-dropdown-solo" />
              </ColorH3>
              <div
                style={{
                  gridArea: "solo-rewards",
                  borderBottom: "1px solid #3335",
                }}
              >
                <h4>
                  <Translation id="page-staking-section-comparison-rewards-title" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-staking-section-comparison-solo-rewards-li1" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-solo-rewards-li2" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-solo-rewards-li3" />
                  </li>
                </ul>
              </div>
              <div
                style={{
                  gridArea: "solo-risks",
                  borderBottom: "1px solid #3335",
                }}
              >
                <h4>
                  <Translation id="page-staking-section-comparison-risks-title" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-staking-section-comparison-solo-risks-li1" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-solo-risks-li2" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-solo-risks-li3" />
                  </li>
                </ul>
              </div>
              <div style={{ gridArea: "solo-reqs" }}>
                <h4>
                  <Translation id="page-staking-section-comparison-requirements-title" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-staking-section-comparison-solo-requirements-li1" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-solo-requirements-li2" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-solo-requirements-li3" />
                  </li>
                </ul>
              </div>
              <div style={{ gridArea: "solo-cta" }}>
                <StyledButtonLink to="/staking/solo/">
                  <Translation id="page-staking-more-on-solo" />
                </StyledButtonLink>
              </div>
              <ColorH3 color="stakingGreen">
                <Translation id="page-staking-dropdown-saas" />
              </ColorH3>
              <div
                style={{
                  gridArea: "saas-rewards",
                  borderBottom: "1px solid #3335",
                }}
              >
                <h4>
                  <Translation id="page-staking-section-comparison-rewards-title" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-staking-section-comparison-saas-rewards-li1" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-saas-rewards-li2" />
                  </li>
                </ul>
              </div>
              <div
                style={{
                  gridArea: "saas-risks",
                  borderBottom: "1px solid #3335",
                }}
              >
                <h4>
                  <Translation id="page-staking-section-comparison-risks-title" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-staking-section-comparison-saas-risks-li1" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-saas-risks-li2" />
                  </li>
                </ul>
              </div>
              <div style={{ gridArea: "saas-reqs" }}>
                <h4>
                  <Translation id="page-staking-section-comparison-requirements-title" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-staking-section-comparison-saas-requirements-li1" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-saas-requirements-li2" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-saas-requirements-li3" />
                  </li>
                </ul>
              </div>
              <div style={{ gridArea: "saas-cta" }}>
                <StyledButtonLink to="/staking/saas">
                  <Translation id="page-staking-more-on-saas" />
                </StyledButtonLink>
              </div>

              <ColorH3 color="stakingBlue">
                <Translation id="page-staking-dropdown-pools" />
              </ColorH3>
              <div
                style={{
                  gridArea: "pool-rewards",
                  borderBottom: "1px solid #3335",
                }}
              >
                <h4>
                  <Translation id="page-staking-section-comparison-rewards-title" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-staking-section-comparison-pools-rewards-li1" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-pools-rewards-li2" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-pools-rewards-li3" />
                  </li>
                </ul>
              </div>
              <div
                style={{
                  gridArea: "pool-risks",
                  borderBottom: "1px solid #3335",
                }}
              >
                <h4>
                  <Translation id="page-staking-section-comparison-risks-title" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-staking-section-comparison-pools-risks-li1" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-pools-risks-li2" />
                  </li>
                </ul>
              </div>
              <div style={{ gridArea: "pool-reqs" }}>
                <h4>
                  <Translation id="page-staking-section-comparison-requirements-title" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-staking-section-comparison-pools-requirements-li1" />
                  </li>
                  <li>
                    <Translation id="page-staking-section-comparison-pools-requirements-li2" />
                  </li>
                </ul>
              </div>
              <div style={{ gridArea: "pool-cta" }}>
                <StyledButtonLink to="/staking/pools/">
                  <Translation id="page-staking-more-on-pools" />
                </StyledButtonLink>
              </div>
            </ComparisonGrid>
          </Content>
          <Divider />
          <StakingCommunityCallout id={tocItems.joinTheCommunity.id} />
          <Content>
            <h2 id={tocItems.faq.id}>{tocItems.faq.title}</h2>
            <ExpandableCard
              title={translateMessageId("page-staking-faq-4-question", intl)}
            >
              <p>
                <Translation id="page-staking-faq-4-answer-p1" />
              </p>
              <p>
                <Translation id="page-staking-faq-4-answer-p2" />
              </p>
              <ButtonLink to="/upgrades/merge/">
                <Translation id="page-upgrades-merge-btn" />
              </ButtonLink>
            </ExpandableCard>
            <ExpandableCard
              title={translateMessageId("page-staking-faq-1-question", intl)}
            >
              <Translation id="page-staking-faq-1-answer" />
            </ExpandableCard>
            <ExpandableCard
              title={translateMessageId("page-staking-faq-2-question", intl)}
            >
              <Translation id="page-staking-faq-2-answer" />
            </ExpandableCard>
            <ExpandableCard
              title={translateMessageId("page-staking-faq-3-question", intl)}
            >
              <p>
                <Translation id="page-staking-faq-3-answer-p1" />
              </p>
              <p>
                <Translation id="page-staking-faq-3-answer-p2" />
              </p>
            </ExpandableCard>
          </Content>
          <Content>
            <h2 id={tocItems.further.id}>{tocItems.further.title}</h2>
            <ul>
              <li>
                <Link to="https://vitalik.ca/general/2020/11/06/pos2020.html">
                  Why Proof of Stake (Nov 2020)
                </Link>{" "}
                <i>- Vitalik Buterin </i>
              </li>
              <li>
                <Link to="https://notes.ethereum.org/9l707paQQEeI-GPzVK02lA?view#">
                  Serenity Design Rationale
                </Link>{" "}
                <i>- Vitalik Buterin </i>
              </li>
              <li>
                <Link to="https://vitalik.ca/general/2017/12/31/pos_faq.html">
                  Proof of Stake FAQ (Dec 2017)
                </Link>{" "}
                <i>- Vitalik Buterin</i>
              </li>
              <li>
                <Link to="https://hackmd.io/@benjaminion/eth2_news">
                  Eth2 News
                </Link>{" "}
                <i>- Ben Edgington</i>
              </li>
              <li>
                <Link to="https://blog.ethereum.org/2022/01/31/finalized-no-33/">
                  Finalized no. 33, the Ethereum consensus-layer (Jan 2022)
                </Link>{" "}
                <i>- Danny Ryan</i>
              </li>
              <li>
                <Link to="https://www.attestant.io/posts/">
                  Attestant Posts
                </Link>
              </li>
              <li>
                <Link to="https://kb.beaconcha.in/">
                  Beaconcha.in Knowledge Base
                </Link>
              </li>
              <li>
                <Link to="https://beaconcha.in/education">
                  Beaconcha.in Community-Contributed Educational Materials
                </Link>
              </li>
              <li>
                <Link to="https://launchpad.ethereum.org/en/faq">
                  Ethereum Staking Launchpad FAQ
                </Link>
              </li>
            </ul>
          </Content>
          <Content>
            <FeedbackCard />
          </Content>
        </ContentContainer>
        <MobileButton>
          <MobileButtonDropdown list={dropdownLinks} />
        </MobileButton>
      </Page>
    </PageContainer>
  )
}

export default StakingPage

export const query = graphql`
  query StakingPageIndex {
    rhino: file(relativePath: { eq: "upgrades/upgrade_rhino.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 500
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
