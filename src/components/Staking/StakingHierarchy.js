// Libraries
import React from "react"
import styled from "styled-components"

// Components
import ButtonLink from "../ButtonLink"
import Link from "../Link"

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

const Section = styled.div`
  --color: ${({ number, theme }) => {
    switch (number) {
      case "1":
        return theme.colors.stakingGold
      case "2":
        return theme.colors.stakingGreen
      case "3":
        return theme.colors.stakingBlue
      case "4":
        return theme.colors.stakingRed
      default:
        return "#000000"
    }
  }};
  --next-color: ${({ number, theme }) => {
    switch (number) {
      case "1":
        return theme.colors.stakingGreen
      case "2":
        return theme.colors.stakingBlue
      case "3":
        return theme.colors.stakingRed
      case "4":
        return "#00000000"
      default:
        return "#000000"
    }
  }};
  --fill-color: ${({ number, theme }) => {
    switch (number) {
      case "1":
        return theme.colors.stakingGoldFill
      case "2":
        return theme.colors.stakingGreenFill
      case "3":
        return theme.colors.stakingBlueFill
      case "4":
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

const StyledEtherSvg = styled(EtherSvg)`
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

const Gold = styled.span`
  color: ${({ theme }) => theme.colors.stakingGold};
  font-weight: 600;
`

const StakingHierarchy = () => {
  return (
    <Container>
      <Section number="1">
        <Ether>
          <StyledEtherSvg size="100%" />
        </Ether>
        <Line />
        <Header>
          <h2>Solo home staking</h2>
          <Pills className="subtext">
            <p>
              <em>Most impactful</em>
            </p>
            <p>Full control</p>
            <p>Full rewards</p>
            <p>Trustless</p>
          </Pills>
        </Header>
        <Glyph>
          <SoloGlyph />
        </Glyph>
        <Content>
          <p>
            Solo staking on Ethereum is the <Gold>gold standard</Gold> for
            staking. It provides full participation rewards, improves the
            decentralization of the network, and never requires trusting anyone
            else with your funds.
          </p>
          <p>
            Those considering solo staking should have at least 32 ETH and a
            dedicated computer connected to the internet ~24/7. Some technical
            know-how is helpful, but easy-to-use tools now exist to help
            simplify this process.
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
            More on solo staking
          </ButtonLink>
        </Content>
      </Section>
      <Section number="2">
        <Ether>
          <StyledEtherSvg size="90%" />
        </Ether>
        <Line />
        <Header>
          <h2>Staking as a service</h2>
          <Pills className="subtext">
            <p>Your 32 ETH</p>
            <p>Your validator keys</p>
            <p>Entrusted node operation</p>
          </Pills>
        </Header>
        <Glyph>
          <SaasGlyph />
        </Glyph>
        <Content>
          <p>
            If you don't want or don't feel comfortable dealing with hardware
            but still want to stake your 32 ETH, staking-as-a-service options
            allow you to delegate the hard part while you earn native block
            rewards.
          </p>
          <p>
            These options usually walk you through creating a set of validator
            credentials, uploading your signing keys to them, and depositing
            your 32 ETH. This allows the service to validate on your behalf.
          </p>
          <p>
            This method of staking requires a certain level of trust in the
            provider. To limit counter-party risk, the keys to withdrawal your
            ETH are usually kept in your possession.
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
            More on staking as a service
          </ButtonLink>
        </Content>
      </Section>
      <Section number="3">
        <Ether>
          <StyledEtherSvg size="80%" />
        </Ether>
        <Line />
        <Header>
          <h2>Pooled staking</h2>
          <Pills className="subtext">
            <p>Stake any amount</p>
            <p>Earn rewards</p>
            <p>Keep it simple</p>
            <p>
              <em>Popular</em>
            </p>
          </Pills>
        </Header>
        <Glyph>
          <PoolGlyph />
        </Glyph>
        <Content>
          <p>
            Several pooling solutions now exist to assist users who do not have
            or feel comfortable staking 32 ETH.
          </p>
          <p>
            Many of these options include what is known as "liquid staking"
            which involves an ERC-20 liquidity token that represents your staked
            ETH.
          </p>
          <p>
            Liquid staking enables easy and anytime exiting and makes staking as
            simple as a token swap. This option also allows users to hold
            custody of their assets in their own Ethereum wallet.
          </p>
          <p>
            Pooled staking is not native to the Ethereum network. Third parties
            are building these solutions, and they carry their own risks.
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
            More on pooled staking
          </ButtonLink>
        </Content>
      </Section>
      <Section number="4">
        <Ether>
          <StyledEtherSvg size="70%" />
        </Ether>
        <Line />
        <Header>
          <h2>Centralized exchanges</h2>
          <Pills className="subtext">
            <p>
              <em>Least impactful</em>
            </p>
            <p>Highest trust assumptions</p>
          </Pills>
        </Header>
        <Glyph>
          <CexGlyph />
        </Glyph>
        <Content>
          <p>
            Many centralized exchanges provide staking services if you are not
            yet comfortable holding ETH in your own wallet. They can be a
            fallback to allow you to earn some yield on your ETH holdings with
            minimal oversight or effort.
          </p>
          <p>
            The trade-off here is that centralized providers consolidate large
            pools of ETH to run large numbers of validators. This can be
            dangerous for the network and its users as it creates a large
            centralized target and point of failure, making the network more
            vulnerable to attack or bugs.
          </p>
          <p>
            If you don't feel comfortable holding your own keys, that's okay.
            These options are here for you. In the meantime, consider checking
            out our <Link to="/wallets/">wallets page</Link>, where you can get
            started learning how to take true ownership over your funds. When
            you're ready, come back and level up your staking game by trying one
            of the self-custody pooled staking services offered.
          </p>
        </Content>
      </Section>
    </Container>
  )
}

export default StakingHierarchy
