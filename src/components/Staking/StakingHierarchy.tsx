// Libraries
import React from "react"
import styled from "@emotion/styled"

// Components
import ButtonLink from "../ButtonLink"
import Translation from "../Translation"

// Assets
import EtherSvg from "../../assets/staking/staking-glyph-ether-circle.svg"
import SoloGlyph from "../../assets/staking/staking-glyph-cpu.svg"
import SaasGlyph from "../../assets/staking/staking-glyph-cloud.svg"
import PoolGlyph from "../../assets/staking/staking-glyph-token-wallet.svg"
import CexGlyph from "../../assets/staking/staking-glyph-centralized.svg"

// Utils
import { trackCustomEvent } from "../../utils/matomo"

const Container = styled.div`
  border-radius: 0.5rem;
  background: linear-gradient(
    180deg,
    rgba(237, 194, 84, 0.1) 13.39%,
    rgba(75, 231, 156, 0.1) 44.21%,
    rgba(231, 202, 200, 0.1) 82.88%
  );
  padding: 2rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    display: flex;
    flex-direction: column;
    --gold: ${({ theme }) => theme.colors.stakingGold};
    --green: ${({ theme }) => theme.colors.stakingGreen};
    --blue: ${({ theme }) => theme.colors.stakingBlue};
    --red: ${({ theme }) => theme.colors.stakingRed};
    border-image: linear-gradient(
        to bottom,
        var(--gold) 5%,
        var(--green) 30%,
        var(--blue) 55%,
        var(--red) 80%
      )
      1 100%;
    border-left: solid 4px;
    border-right: 0;
    border-radius: 0;
    gap: 4rem;
    a {
      width: 100%;
    }
  }
`

const Section = styled.div<{
  number: number
}>`
  --color: ${({ number, theme }) => {
    switch (number) {
      case 1:
        return theme.colors.stakingGold
      case 2:
        return theme.colors.stakingGreen
      case 3:
        return theme.colors.stakingBlue
      case 4:
        return theme.colors.stakingRed
      default:
        return "#000000"
    }
  }};
  --next-color: ${({ number, theme }) => {
    switch (number) {
      case 1:
        return theme.colors.stakingGreen
      case 2:
        return theme.colors.stakingBlue
      case 3:
        return theme.colors.stakingRed
      case 4:
        return "#00000000"
      default:
        return "#000000"
    }
  }};
  --fill-color: ${({ number, theme }) => {
    switch (number) {
      case 1:
        return theme.colors.stakingGoldFill
      case 2:
        return theme.colors.stakingGreenFill
      case 3:
        return theme.colors.stakingBlueFill
      case 4:
        return theme.colors.stakingRedFill
      default:
        return "#000000"
    }
  }};
  display: grid;
  position: relative;
  gap: 0 2rem;
  grid-template-columns: 5rem 1fr 5rem;
  grid-template-areas:
    "ether header glyph"
    "decorator content content";
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    gap: 1rem;
    grid-template-columns: 1fr;
    grid-template-areas:
      "ether"
      "header"
      "content";
    svg {
      height: 5rem;
      aspect-ratio: 1;
    }
  }
  h2 {
    color: var(--color);
  }

  path {
    fill: var(--color);
  }

  #transparentBackground {
    fill: var(--fill-color);
  }

  .subtext {
    p {
      color: var(--color);
      margin: 0;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--color);
        opacity: 0.125;
        border-radius: 0.125rem;
      }
    }
  }

  aside::after {
    border-image: linear-gradient(to bottom, var(--color), var(--next-color)) 1
      100%;
    --scale: ${({ number }) => 1.05 + number / 70};
    --translate: ${({ number }) => number}px;
    transform: scale(var(--scale)) translateY(var(--translate));
  }
`

const Header = styled.div`
  grid-area: header;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  h2 {
    margin: 0;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    align-items: center;
    h2 {
      text-align: center;
    }
  }
`

const Pills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  p {
    padding: 0.125rem 0.375rem;
    white-space: nowrap;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    justify-content: center;
  }
`

const Content = styled.div`
  grid-area: content;
  margin: 1rem 0 3rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    margin: 0;
  }

  .gold {
    color: ${({ theme }) => theme.colors.stakingGold};
    font-weight: 600;
  }
`

const FlexCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Glyph = styled(FlexCentered)`
  grid-area: glyph;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    grid-area: content;
    svg {
      width: 50%;
      height: 50%;
      opacity: 0.1;
    }
  }
`

const Ether = styled(FlexCentered)`
  grid-area: ether;
  z-index: 2;
  max-width: 5rem;
  margin: 0 auto;
`

const StyledEtherSvg = styled(EtherSvg)<{
  size: string
}>`
  --size: ${({ size }) => size};
  width: var(--size);
  height: var(--size);
`

const Line = styled.aside`
  grid-column: 1;
  grid-row: 1/3;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 28px;
  position: relative;
  &::after {
    content: "";
    height: calc(100% - 50px);
    border-left: solid 4px orange;
    position: absolute;
    left: calc(50% - 2px);
    top: 50px;
    z-index: 1;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    display: none;
  }
`
export interface IProps {}

const StakingHierarchy: React.FC<IProps> = () => {
  return (
    <Container>
      <Section number={1}>
        <Ether>
          <StyledEtherSvg size="100%" />
        </Ether>
        <Line />
        <Header>
          <h2>
            <Translation id="page-staking-hierarchy-solo-h2" />
          </h2>

          <Pills className="subtext">
            <p>
              <em>
                <Translation id="page-staking-hierarchy-solo-pill-1" />
              </em>
            </p>
            <p>
              <Translation id="page-staking-hierarchy-solo-pill-2" />
            </p>
            <p>
              <Translation id="page-staking-hierarchy-solo-pill-3" />
            </p>
            <p>
              <Translation id="page-staking-hierarchy-solo-pill-4" />
            </p>
          </Pills>
        </Header>
        <Glyph>
          <SoloGlyph />
        </Glyph>
        <Content>
          <p>
            <Translation id="page-staking-hierarchy-solo-p1" />
          </p>
          <p>
            <Translation id="page-staking-hierarchy-solo-p2" />
          </p>
          <ButtonLink
            to="/staking/solo/"
            onClick={() => {
              trackCustomEvent({
                eventCategory: `StakingHierarchy`,
                eventAction: `Clicked`,
                eventName: "clicked solo staking",
              })
            }}
          >
            <Translation id="page-staking-more-on-solo" />
          </ButtonLink>
        </Content>
      </Section>
      <Section number={2}>
        <Ether>
          <StyledEtherSvg size="90%" />
        </Ether>
        <Line />
        <Header>
          <h2>
            <Translation id="page-staking-dropdown-saas" />
          </h2>
          <Pills className="subtext">
            <p>
              <Translation id="page-staking-hierarchy-saas-pill-1"></Translation>
            </p>
            <p>
              <Translation id="page-staking-hierarchy-saas-pill-2"></Translation>
            </p>
            <p>
              <Translation id="page-staking-hierarchy-saas-pill-3"></Translation>
            </p>
          </Pills>
        </Header>
        <Glyph>
          <SaasGlyph />
        </Glyph>
        <Content>
          <p>
            <Translation id="page-staking-hierarchy-saas-p1" />
          </p>
          <p>
            <Translation id="page-staking-hierarchy-saas-p2" />
          </p>
          <p>
            <Translation id="page-staking-hierarchy-saas-p3" />
          </p>
          <ButtonLink
            onClick={() => {
              trackCustomEvent({
                eventCategory: `StakingHierarchy`,
                eventAction: `Clicked`,
                eventName: "clicked staking as a service",
              })
            }}
            to="/staking/saas/"
          >
            <Translation id="page-staking-more-on-saas" />
          </ButtonLink>
        </Content>
      </Section>
      <Section number={3}>
        <Ether>
          <StyledEtherSvg size="80%" />
        </Ether>
        <Line />
        <Header>
          <h2>
            <Translation id="page-staking-dropdown-pools" />
          </h2>
          <Pills className="subtext">
            <p>
              <Translation id="page-staking-hierarchy-pools-pill-1" />
            </p>
            <p>
              <Translation id="page-staking-hierarchy-pools-pill-2" />
            </p>
            <p>
              <Translation id="page-staking-hierarchy-pools-pill-3" />
            </p>
            <p>
              <em>
                <Translation id="page-staking-hierarchy-pools-pill-4" />
              </em>
            </p>
          </Pills>
        </Header>
        <Glyph>
          <PoolGlyph />
        </Glyph>
        <Content>
          <p>
            <Translation id="page-staking-hierarchy-pools-p1" />
          </p>
          <p>
            <Translation id="page-staking-hierarchy-pools-p2" />
          </p>
          <p>
            <Translation id="page-staking-hierarchy-pools-p3" />
          </p>
          <p>
            <Translation id="page-staking-hierarchy-pools-p4" />
          </p>
          <ButtonLink
            onClick={() => {
              trackCustomEvent({
                eventCategory: `StakingHierarchy`,
                eventAction: `Clicked`,
                eventName: "clicked pooled staking",
              })
            }}
            to="/staking/pools/"
          >
            <Translation id="page-staking-more-on-pools" />
          </ButtonLink>
        </Content>
      </Section>
      <Section number={4}>
        <Ether>
          <StyledEtherSvg size="70%" />
        </Ether>
        <Line />
        <Header>
          <h2>
            <Translation id="page-staking-hierarchy-cex-h2" />
          </h2>
          <Pills className="subtext">
            <p>
              <em>
                <Translation id="page-staking-hierarchy-cex-pill-1" />
              </em>
            </p>
            <p>
              <Translation id="page-staking-hierarchy-cex-pill-2" />
            </p>
          </Pills>
        </Header>
        <Glyph>
          <CexGlyph />
        </Glyph>
        <Content>
          <p>
            <Translation id="page-staking-hierarchy-cex-p1" />
          </p>
          <p>
            <Translation id="page-staking-hierarchy-cex-p2" />
          </p>
          <p>
            <Translation id="page-staking-hierarchy-cex-p3" />
          </p>
        </Content>
      </Section>
    </Container>
  )
}

export default StakingHierarchy
