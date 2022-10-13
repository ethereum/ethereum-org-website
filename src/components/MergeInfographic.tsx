// Library imports
import React from "react"
import { Box, chakra, Icon, VStack } from "@chakra-ui/react"
import { useIntl } from "react-intl"
// Component imports
import Translation from "./Translation"
// Utility imports
import { translateMessageId, TranslationKey } from "../utils/translations"
// SVG imports
import InfographicBg from "../assets/upgrades/merge-infographic-bg.svg"

const Background = chakra(InfographicBg)

export type StringGetter = (key: TranslationKey) => string

export interface SvgProps {
  getString: StringGetter
}

const SvgText: React.FC<SvgProps> = ({ getString }) => {
  const [sm, lg] = ["7px", "8px"]
  return (
    <Icon
      position="absolute"
      zIndex={1}
      width="100%"
      height="100%"
      viewBox="0 0 250 110"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
    >
      <text x="2%" y="35%" fontSize={lg} textAnchor="start" fill="currentColor">
        ⛏ {getString("docs-nav-proof-of-work")}
      </text>
      <text
        x="47%"
        y="35%"
        fontSize={lg}
        textAnchor="start"
        fill="currentColor"
      >
        🌱 {getString("docs-nav-proof-of-stake")}
      </text>
      <text
        x="11%"
        y="70%"
        fontSize={sm}
        textAnchor="start"
        fill="currentColor"
      >
        🚀 {getString("beacon-chain")}
      </text>
      <text
        x="43%"
        y="12.5%"
        fontSize={sm}
        textAnchor="start"
        fill="currentColor"
      >
        🐼 {getString("page-upgrades-get-involved-ethresearch-2")}
      </text>
      <text
        x="63%"
        y="95%"
        fontSize={sm}
        textAnchor="start"
        fill="currentColor"
      >
        🌳 {getString("page-upgrades-get-involved-ethresearch-1")}
      </text>
    </Icon>
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
    <VStack
      className={className}
      role="img"
      aria-label={translateMessageId(
        "page-upgrades-merge-infographic-alt-text",
        intl
      )}
      position="relative"
      width="100%"
      sx={{
        isolation: "isolate",
        aspectRatio: `${25 / 11}`,
      }}
    >
      <Box
        position="absolute"
        top="44%"
        left="2%"
        width="81%"
        height="18%"
        margin={0}
        padding={0}
        zIndex={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        lineHeight="1em"
        textAlign="center"
        maxHeight="2em"
        color="background"
        fontSize={{
          base: "0.625em",
          sm: "0.875em",
          md: "1.125em",
          lg: "1.375em",
        }}
        aria-hidden="true"
      >
        <Translation id="page-upgrades-merge-infographic-el" />
      </Box>
      <SvgText getString={getString} />
      <Background
        aria-hidden="true"
        position="absolute"
        width="100%"
        height="100%"
        zIndex={0}
      />
    </VStack>
  )
}

export default MergeInfographic
