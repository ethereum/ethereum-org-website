import React from "react"
import styled from "styled-components"
import ButtonLink from "./ButtonLink"
import Link from "./Link"

const Container = styled.div`
  border-radius: 0.5rem;
  background: linear-gradient(
    180deg,
    rgba(237, 194, 84, 0.1) 13.39%,
    rgba(75, 231, 156, 0.1) 44.21%,
    rgba(231, 202, 200, 0.1) 82.88%
  );
  padding: 1rem 2rem;
`

const Section = styled.div`
  --color: ${({ color }) => color};
  h2 {
    color: var(--color);
    display: flex;

    margin: 2rem 0 0.25rem;
  }
  .subtext {
    color: var(--color);
    background: ${({ color }) => color}20;
  }
`

const StakingHierarchy = () => {
  return (
    <Container>
      <Section color="#F2BB2F">
        <h2>Solo home staking</h2>
        <p className="subtext">
          <em>Most impactful</em>, full control, keep all the rewards, trustless
        </p>
        <p>
          Solo staking on the Ethereum Beacon Chain is the{" "}
          <span style={{ color: "#F2BB2F" }}>gold standard</span> for staking.
          It is trustless, provides full participation rewards, and improves the
          decentralization of the network.
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
      </Section>
      <Section color="#49DE96">
        <h2>Staking as a service</h2>
        <p className="subtext">
          Your 32 ETH, your validator keys, entrusted node operation
        </p>
        <p>
          Running your own hardware is always recommended if possible for the
          strength and health of the network, but we recognize this isn't always
          reasonable for all users.
        </p>
        <p>
          If you don't want or don't feel comfortable dealing with hardware, but
          still want to stake your 32 ETH, staking-as-a-service options allow
          you to delegate the hard part, while you earn native block rewards.
        </p>
        <p>
          These options usually walk you through creating a set of validator
          credentials, uploading your signing keys to them, and depositing your
          32 ETH. This allows the service to validate on your behalf.
        </p>
        <p>
          This method of staking requires a certain level of trust in the
          provider. To limit counter-party risk, the keys to withdrawal your ETH
          are usually kept in your possession.
        </p>
        <ButtonLink to="/staking/saas">More on staking as a service</ButtonLink>
      </Section>
      <Section color="#A9D3F2">
        <h2>Pooled staking</h2>
        <p className="subtext">
          Stake what you can, earn rewards, keep it simple (Popular)
        </p>
        <p>
          Several pooling solutions now exist to assist users who do not have or
          feel comfortable staking 32 ETH.
        </p>
        <p>
          Many of these options include what is known as "liquid staking" which
          involves an ERC-20 liquidity token that represents your staked ETH.
        </p>
        <p>
          This can enable easy and any-time exiting, and makes staking as simple
          as a token swap. These options also allow/require users to hold
          custody of their assets in their own Ethereum wallet.
        </p>
        <p>
          Pooled staking is not native to the Ethereum network, and thus have
          been built out by third parties, and carry their own risk.
        </p>
        <ButtonLink to="/staking/pools">More on pooled staking</ButtonLink>
      </Section>
      <Section color="#D6BBB9">
        <h2>Centralized exchanges & staking providers</h2>
        <p className="subtext">
          <em>Least impactful</em>, highest trust assumptions
        </p>
        <p>
          Ethereum users are encouraged to stake by the best means possible for
          the health and decentralization of the network, which tends to involve
          individuals taking control instead of centralized agencies.
        </p>
        <p>
          If you are not yet comfortable holding ETH in your own wallet, options
          such as centralized exchanges and other custodial providers provide
          staking-as-a-service and can be a fallback to allow you to earn some
          yield on your ETH holdings, with minimal oversight or effort.
        </p>
        <p>
          The trade-off here is that centralized providers consolidate large
          pools of ETH to run large numbers of validators. This can be dangerous
          for the network as it creates a large centralized target and point of
          failure, making the network more vulnerable to attack or bugs.
        </p>
        <p>
          Users should stake by the best means possible,{" "}
          <em>within their means</em>. If you don't feel comfortable holding
          your own keys, that's okay. These options are here for you.
        </p>
        <p>
          In the meantime, consider checking out our{" "}
          <Link to="/wallets">wallets page</Link>, where you can get started
          learning how to take true ownership over your funds. When you’re
          ready, come back and level up your staking game by trying one of the
          self-custody pooled staking services offered.
        </p>
      </Section>
    </Container>
  )
}

export default StakingHierarchy
