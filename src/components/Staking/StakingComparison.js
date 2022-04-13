import React, { useContext } from "react"
import styled, { ThemeContext } from "styled-components"
import { useIntl } from "gatsby-plugin-intl"

import Link from "../Link"
import Translation from "../Translation"

import { translateMessageId } from "../../utils/translations"
import { trackCustomEvent } from "../../utils/matomo"

import SoloGlyph from "../../assets/staking/staking-glyph-cpu.svg"
import SaasGlyph from "../../assets/staking/staking-glyph-cloud.svg"
import PoolGlyph from "../../assets/staking/staking-glyph-token-wallet.svg"

const GradientContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: linear-gradient(
    83.46deg,
    rgba(127, 127, 213, 0.2) 7.03%,
    rgba(138, 168, 231, 0.2) 52.42%,
    rgba(145, 234, 228, 0.2) 98.77%
  );
  padding: 2rem;
  margin-top: 4rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    padding: 2rem 1.5rem;
  }

  h3 {
    margin: 0 0 0.5rem;
  }
`

const Flex = styled.div`
  display: flex;
  gap: 1.5rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const Glyph = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 3rem;
  max-height: 3rem;
`

const StyledSoloGlyph = styled(SoloGlyph)`
  path {
    fill: ${({ theme }) => theme.colors.stakingGold};
  }
`
const StyledSaasGlyph = styled(SaasGlyph)`
  path {
    fill: ${({ theme }) => theme.colors.stakingGreen};
  }
`
const StyledPoolGlyph = styled(PoolGlyph)`
  path {
    fill: ${({ theme }) => theme.colors.stakingBlue};
  }
`

const StakingComparison = ({ page, className }) => {
  const intl = useIntl()
  const themeContext = useContext(ThemeContext)
  const { stakingGold, stakingGreen, stakingBlue } = themeContext.colors

  const solo = {
    title: "Solo staking",
    linkText: "Learn more about solo staking",
    to: "/staking/solo/",
    matomo: {
      eventCategory: `StakingComparison`,
      eventAction: `Clicked`,
      eventName: "clicked solo staking",
    },
    color: stakingGold,
    glyph: <StyledSoloGlyph />,
  }
  const saas = {
    title: "Staking as a service (SaaS)",
    linkText: "Learn more about staking as a service",
    to: "/staking/saas/",
    matomo: {
      eventCategory: `StakingComparison`,
      eventAction: `Clicked`,
      eventName: "clicked staking as a service",
    },
    color: stakingGreen,
    glyph: <StyledSaasGlyph />,
  }
  const pools = {
    title: "Pooled staking",
    linkText: "Learn more about pooled staking",
    to: "/staking/pools/",
    matomo: {
      eventCategory: `StakingComparison`,
      eventAction: `Clicked`,
      eventName: "clicked pooled staking",
    },
    color: stakingBlue,
    glyph: <StyledPoolGlyph />,
  }
  const data = {
    solo: [
      {
        ...saas,
        content:
          "With SaaS providers you're still required to deposit 32 ETH, but don't have to run hardware. You typically maintain access to your validator keys, but also need to share your signing keys so the operator can act on behalf of your validator. This introduces a layer of trust not present when running your own hardware, and unlike solo staking at home, SaaS does not help as much with geographic distribution of nodes. If you're uncomfortable operating hardware but still looking to stake 32 ETH, using a SaaS provider may be a good option for you.",
      },
      {
        ...pools,
        content:
          "Solo staking is significantly more involved than staking with a pooling service, but offer full access to ETH rewards, and full control over the setup and security of your validator. Pooled staking has a significantly lower barrier to entry. Users can stake small amounts of ETH, are not required to generate validator keys, and have no hardware requirements beyond a standard internet connection. Liquidity tokens enable the ability to exit from staking before this is enabled at the protocol level. If you're interested in these features, pooled staking may be a good fit.",
      },
    ],
    saas: [
      {
        ...solo,
        content:
          "Similarities include having your own validator keys without having to pool funds, but with SaaS you must trust a third-party, who may potentially act maliciously or become a target of attack or regulation themselves. If these trust assumptions or centralization risks concern you, the gold standard of self-sovereign staking is solo staking.",
      },
      {
        ...pools,
        content:
          "These are similar in that you're generally relying on someone else to run the validator client, but unlike SaaS, pooled staking allows you to participate with smaller amounts of ETH. If you're looking to stake with less than 32 ETH, consider checking these out.",
      },
    ],
    pools: [
      {
        ...solo,
        content:
          "Pooled staking has a significantly lower barrier to entry when compared to solo staking, but comes with additional risk by delegating all node operations to a third-party, and with a fee. Solo staking gives full sovereignty and control over the choices that go into choosing a staking setup. Stakers never have to hand over their keys, and they earn full rewards without any middlemen taking a cut.",
      },
      {
        ...saas,
        content:
          "These are similar in that stakers do not run the validator software themselves, but unlike pooling options, SaaS requires a full 32 ETH deposit to activate a validator. Rewards accumulate to the staker, and usually involve a monthly fee or other stake to use the service. If you'd prefer your own validator keys and are looking to stake at least 32 ETH, using a SaaS provider may be a good option for you.",
      },
    ],
  }
  const selectedData = data[page]

  return (
    <GradientContainer className={className}>
      <h2>Comparison with other options</h2>
      {selectedData.map(
        ({ title, linkText, to, color, content, glyph, matomo }, idx) => (
          <Flex key={idx}>
            {!!glyph && <Glyph>{glyph}</Glyph>}
            <div>
              <h3 style={{ color }}>{title}</h3>
              <p>{content}</p>
              <Link
                onClick={() => {
                  trackCustomEvent(matomo)
                }}
                to={to}
              >
                {linkText}
              </Link>
            </div>
          </Flex>
        )
      )}
    </GradientContainer>
  )
}

export default StakingComparison
