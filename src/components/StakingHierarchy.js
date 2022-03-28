import React from "react"
import styled from "styled-components"
import ButtonLink from "./ButtonLink"
import Link from "./Link"
import EtherSvg from "../assets/staking/staking-glyph-ether-circle.svg"
import SoloGlyph from "../assets/staking/staking-glyph-cpu.svg"
import SaasGlyph from "../assets/staking/staking-glyph-cloud.svg"
import PoolGlyph from "../assets/staking/staking-glyph-token-wallet.svg"
import CexGlyph from "../assets/staking/staking-glyph-centralized.svg"

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
    border-image: linear-gradient(
        to bottom,
        #f2bb2f 5%,
        #49de96 30%,
        #a9d3f2 55%,
        #d6bbb9 80%
      )
      1 100%;
    border-left: solid 4px;
    padding-left: 1rem;
    margin: 0 -2rem;
  }
`

const Section = styled.div`
  --color: ${({ color }) => color};
  --next-color: ${({ nextColor }) => nextColor};
  display: grid;
  position: relative;
  gap: 0 2rem;
  grid-template-columns: 5rem 1fr 5rem;
  grid-template-areas:
    "ether header glyph"
    "decorator content content";
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    gap: 0 0.75rem;
    grid-template-columns: 10vw 1fr;
    grid-template-areas:
      "ether header"
      "decorator content";
  }
  h2 {
    color: var(--color);
  }

  path {
    fill: var(--color);
  }

  .subtext {
    color: var(--color);
    background: ${({ color }) => color}20;
    margin: 0;
  }

  aside::after {
    border-image: linear-gradient(to bottom, var(--color), var(--next-color)) 1
      100%;
    --scale: ${({ number }) => 1.05 + number / 90};
    --translate: ${({ number }) => number}px;
    transform: scale(var(--scale)) translateY(var(--translate));
    @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
      border: none;
    }
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
`

const Content = styled.div`
  grid-area: content;
  margin: 1rem 0 3rem;
`

const FlexCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Glyph = styled(FlexCentered)`
  grid-area: glyph;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    display: none;
  }
`

const Ether = styled(FlexCentered)`
  grid-area: ether;
  z-index: 2;
`

const StyledEtherSvg = styled(EtherSvg)`
  --size: ${({ size }) => size};
  width: var(--size);
  height: var(--size);
`

const Line = styled.aside`
  grid-area: decorator;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 28px;
  position: relative;
  &::after {
    content: "";
    height: 100%;
    border-left: solid 4px orange;
    position: absolute;
    left: calc(50% - 2px);
    top: 0;
    z-index: 1;
  }
`

const StakingHierarchy = () => {
  return (
    <Container>
      <Section color="#F2BB2F" nextColor="#49DE96" number="1">
        <Ether>
          <StyledEtherSvg size="100%" />
        </Ether>
        <Line />
        <Header>
          <h2>Solo home staking</h2>
          <p className="subtext">
            <em>Most impactful</em>, full control, keep all the rewards,
            trustless
          </p>
        </Header>
        <Glyph>
          <SoloGlyph />
        </Glyph>
        <Content>
          <p>
            Solo staking on the Ethereum Beacon Chain is the{" "}
            <span style={{ color: "#F2BB2F" }}>gold standard</span> for staking.
            It is trustless, provides full participation rewards, and improves
            the decentralization of the network.
          </p>
          <p>
            Those considering solo staking should have at least 32 ETH, hardware
            connected to the internet ~24/7, and some technical know-how.
          </p>
          <p>
            Over time, tooling has improved to help users get past some of the
            technical hurdles, including options to bypass the command-line
            altogether, if that's not your thing.
          </p>
          <p>
            Check out some solo staking tools, then get started staking on the
            Prater Testnet over on the{" "}
            <Link to="https://prater.launchpad.ethereum.org">
              Staking Launchpad
            </Link>
            .
          </p>
          <ButtonLink to="/staking/solo">More on solo staking</ButtonLink>
        </Content>
      </Section>
      <Section color="#49DE96" nextColor="#A9D3F2" number="2">
        <Ether>
          <StyledEtherSvg size="80%" />
        </Ether>
        <Line />
        <Header>
          <h2>Staking as a service</h2>
          <p className="subtext">
            Your 32 ETH, your validator keys, entrusted node operation
          </p>
        </Header>
        <Glyph>
          <SaasGlyph />
        </Glyph>
        <Content>
          <p>
            Running your own hardware is always recommended if possible for the
            strength and health of the network, but we recognize this isn't
            always reasonable for all users.
          </p>
          <p>
            If you don't want or don't feel comfortable dealing with hardware,
            but still want to stake your 32 ETH, staking-as-a-service options
            allow you to delegate the hard part, while you earn native block
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
          <ButtonLink to="/staking/saas">
            More on staking as a service
          </ButtonLink>
        </Content>
      </Section>
      <Section color="#A9D3F2" nextColor="#D6BBB9" number="3">
        <Ether>
          <StyledEtherSvg size="60%" />
        </Ether>
        <Line />
        <Header>
          <h2>Pooled staking</h2>
          <p className="subtext">
            Stake what you can, earn rewards, keep it simple (Popular)
          </p>
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
            This can enable easy and any-time exiting, and makes staking as
            simple as a token swap. These options also allow/require users to
            hold custody of their assets in their own Ethereum wallet.
          </p>
          <p>
            Pooled staking is not native to the Ethereum network, and thus have
            been built out by third parties, and carry their own risk.
          </p>
          <ButtonLink to="/staking/pools">More on pooled staking</ButtonLink>
        </Content>
      </Section>
      <Section color="#D6BBB9" nextColor="#00000000" number="4">
        <Ether>
          <StyledEtherSvg size="40%" />
        </Ether>
        <Line />
        <Header>
          <h2>Centralized exchanges & staking providers</h2>
          <p className="subtext">
            <em>Least impactful</em>, highest trust assumptions
          </p>
        </Header>
        <Glyph>
          <CexGlyph />
        </Glyph>
        <Content>
          <p>
            Ethereum users are encouraged to stake by the best means possible
            for the health and decentralization of the network, which tends to
            involve individuals taking control instead of centralized agencies.
          </p>
          <p>
            If you are not yet comfortable holding ETH in your own wallet,
            options such as centralized exchanges and other custodial providers
            provide staking services and can be a fallback to allow you to earn
            some yield on your ETH holdings, with minimal oversight or effort.
          </p>
          <p>
            The trade-off here is that centralized providers consolidate large
            pools of ETH to run large numbers of validators. This can be
            dangerous for the network as it creates a large centralized target
            and point of failure, making the network more vulnerable to attack
            or bugs.
          </p>
          <p>
            Users should stake by the best means possible,{" "}
            <em>within their means</em>. If you don't feel comfortable holding
            your own keys, that's okay. These options are here for you.
          </p>
          <p>
            In the meantime, consider checking out our{" "}
            <Link to="/wallets">wallets page</Link>, where you can get started
            learning how to take true ownership over your funds. When you're
            ready, come back and level up your staking game by trying one of the
            self-custody pooled staking services offered.
          </p>
        </Content>
      </Section>
    </Container>
  )
}

export default StakingHierarchy
