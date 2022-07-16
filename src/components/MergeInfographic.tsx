// Library imports
import React from "react"
import styled from "styled-components"
import { useIntl } from "react-intl"
// Component imports
import Translation from "./Translation"
// Utility imports
import { translateMessageId, TranslationKey } from "../utils/translations"
// SVG imports
import InfographicBg from "../assets/upgrades/merge-infographic-bg.svg"

const Container = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 25 / 11;
  isolation: isolate;
`

const ExecutionLayer = styled.div`
  position: absolute;
  top: 40%;
  left: 2%;
  width: 81%;
  height: 18%;
  margin: 0;
  padding: 0;
  z-index: 2;

  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;

  line-height: 1em;
  max-height: 2em;
  color: ${({ theme }) => theme.colors.background};

  font-size: 1.375em;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    font-size: 1.125em;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    font-size: 0.875em;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
    font-size: 0.625em;
  }
`

const Background = styled(InfographicBg)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
`

const StyledSvg = styled.svg`
  position: absolute;
  z-index: 1;
`

const Text = styled.text`
  text-anchor: start;
  fill: currentColor;
`

export type StringGetter = (key: TranslationKey) => string

export interface SvgProps {
  getString: StringGetter
}

const SvgText: React.FC<SvgProps> = ({ getString }) => {
  const [sm, lg] = ["7px", "8px"]
  return (
    <StyledSvg
      width="100%"
      height="100%"
      viewBox="0 0 250 110"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
    >
      <Text x="2%" y="35%" fontSize={lg}>
        ⛏ {getString("docs-nav-proof-of-work")}
      </Text>
      <Text x="47%" y="35%" fontSize={lg}>
        🌱 {getString("docs-nav-proof-of-stake")}
      </Text>
      <Text x="11%" y="70%" fontSize={sm}>
        🚀 {getString("beacon-chain")}
      </Text>
      <Text x="43%" y="12.5%" fontSize={sm}>
        🐼 {getString("page-upgrades-get-involved-ethresearch-2")}
      </Text>
      <Text x="63%" y="95%" fontSize={sm}>
        🌳 {getString("page-upgrades-get-involved-ethresearch-1")}
      </Text>
    </StyledSvg>
  )
}

export interface IProps {
  className?: string
}

const MergeInfographic: React.FC<IProps> = ({ className }) => {
  const intl = useIntl()
  const getString: StringGetter = (id: TranslationKey) =>
    translateMessageId(id, intl)

  return (
    <Container
      className={className}
      role="img"
      aria-label={translateMessageId(
        "page-upgrades-merge-infographic-alt-text",
        intl
      )}
    >
      <ExecutionLayer aria-hidden="true">
        <Translation id="page-upgrades-merge-infographic-el" />
      </ExecutionLayer>
      <SvgText getString={getString} />
      <Background aria-hidden="true" />
    </Container>
  )
}

export default MergeInfographic
