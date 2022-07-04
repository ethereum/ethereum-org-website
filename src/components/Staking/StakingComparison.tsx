import React, { useContext } from "react"
import styled, { ThemeContext } from "styled-components"

import Link from "../Link"
import Translation from "../Translation"

import { EventOptions, trackCustomEvent } from "../../utils/matomo"
import { TranslationKey } from "../../utils/translations"

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

interface DataType {
  title: TranslationKey
  linkText: TranslationKey
  to: string
  matomo: EventOptions
  color: any
  glyph: any
}

type StakingTypePage = "solo" | "saas" | "pools"

export interface IProps {
  page: StakingTypePage
  className?: string
}

const StakingComparison: React.FC<IProps> = ({ page, className }) => {
  const themeContext = useContext(ThemeContext)
  const { stakingGold, stakingGreen, stakingBlue } = themeContext.colors

  const solo: DataType = {
    title: "page-staking-dropdown-solo",
    linkText: "page-staking-learn-more-solo",
    to: "/staking/solo/",
    matomo: {
      eventCategory: `StakingComparison`,
      eventAction: `Clicked`,
      eventName: "clicked solo staking",
    },
    color: stakingGold,
    glyph: <StyledSoloGlyph />,
  }
  const saas: DataType = {
    title: "page-staking-saas-with-abbrev",
    linkText: "page-staking-learn-more-saas",
    to: "/staking/saas/",
    matomo: {
      eventCategory: `StakingComparison`,
      eventAction: `Clicked`,
      eventName: "clicked staking as a service",
    },
    color: stakingGreen,
    glyph: <StyledSaasGlyph />,
  }
  const pools: DataType = {
    title: "page-staking-dropdown-pools",
    linkText: "page-staking-learn-more-pools",
    to: "/staking/pools/",
    matomo: {
      eventCategory: `StakingComparison`,
      eventAction: `Clicked`,
      eventName: "clicked pooled staking",
    },
    color: stakingBlue,
    glyph: <StyledPoolGlyph />,
  }
  const data: {
    [key in StakingTypePage]: (DataType & {
      content: TranslationKey
    })[]
  } = {
    solo: [
      {
        ...saas,
        content: "page-staking-comparison-solo-saas",
      },
      {
        ...pools,
        content: "page-staking-comparison-solo-pools",
      },
    ],
    saas: [
      {
        ...solo,
        content: "page-staking-comparison-saas-solo",
      },
      {
        ...pools,
        content: "page-staking-comparison-saas-pools",
      },
    ],
    pools: [
      {
        ...solo,
        content: "page-staking-comparison-pools-solo",
      },
      {
        ...saas,
        content: "page-staking-comparison-pools-saas",
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
              <h3 style={{ color }}>
                <Translation id={title} />
              </h3>
              <p>
                <Translation id={content} />
              </p>
              <Link
                onClick={() => {
                  trackCustomEvent(matomo)
                }}
                to={to}
              >
                <Translation id={linkText} />
              </Link>
            </div>
          </Flex>
        )
      )}
    </GradientContainer>
  )
}

export default StakingComparison
