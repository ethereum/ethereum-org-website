// Libraries
import React, { ReactNode } from "react"
import {
  Box,
  calc,
  Center,
  cssVar,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  useToken,
  VStack,
} from "@chakra-ui/react"

// Components
import ButtonLink from "../ButtonLink"
import Translation from "../Translation"

// SVG icons
import {
  StakingGlyphCentralizedIcon,
  StakingGlyphCloudIcon,
  StakingGlyphCPUIcon,
  StakingGlyphEtherCircleIcon,
  StakingGlyphTokenWalletIcon,
} from "../icons/staking"

// Utils
import { trackCustomEvent } from "../../utils/matomo"

type ChildOnlyType = {
  children: ReactNode
}

const $colorVar = cssVar("color")
const $nextColorVar = cssVar("next-color")
const $fillColorVar = cssVar("fill-color")

const SectionGrid: React.FC<{ number: number; children: ReactNode }> = ({
  number,
  children,
}) => {
  const colorValue = () => {
    switch (number) {
      case 1:
        return "colors.stakingGold"
      case 2:
        return "colors.stakingGreen"
      case 3:
        return "colors.stakingBlue"
      case 4:
        return "colors.stakingRed"
      default:
        return "#000000"
    }
  }

  const nextColorValue = () => {
    switch (number) {
      case 1:
        return "colors.stakingGreen"
      case 2:
        return "colors.stakingBlue"
      case 3:
        return "colors.stakingRed"
      case 4:
        return "#00000000"
      default:
        return "#000000"
    }
  }

  const fillColorValue = () => {
    switch (number) {
      case 1:
        return "colors.stakingGoldFill"
      case 2:
        return "colors.stakingGreenFill"
      case 3:
        return "colors.stakingBlueFill"
      case 4:
        return "colors.stakingRedFill"
      default:
        return "#000000"
    }
  }

  const asideScaleVal = 1.05 + number / 70
  const asideTranslateVal = number + "px"

  return (
    <SimpleGrid
      gap={{ base: 4, md: "0 2rem" }}
      templateColumns={{ base: "1fr", md: "5rem 1fr 5rem" }}
      templateAreas={{
        base: `
          "ether"
          "header"
          "content"
        `,
        md: `
          "ether header glyph"
          "decorator content content"
        `,
      }}
      position="relative"
      sx={{
        [$colorVar.variable]: colorValue(),
        [$nextColorVar.variable]: nextColorValue(),
        [$fillColorVar.variable]: fillColorValue(),
        aside: {
          _after: {
            transform: `scale(${asideScaleVal}) translateY(${asideTranslateVal})`,
          },
        },
      }}
    >
      {children}
    </SimpleGrid>
  )
}

const StyledEtherSvg: React.FC<{ size: string }> = ({ size }) => (
  <Center gridArea="ether" zIndex={2} maxW={20} width="full" mx="auto">
    <StakingGlyphEtherCircleIcon
      boxSize={size}
      color={$colorVar.reference}
      sx={{
        "#transparentBackground": {
          fill: $fillColorVar.reference,
        },
      }}
    />
  </Center>
)

const Line = () => {
  // TODO: Remove after completion of the Chakra migration
  const medBp = useToken("breakpoints", "md")

  return (
    <Box
      as="aside"
      gridColumn={1}
      gridRow="1 / 3"
      position="relative"
      hideBelow={medBp}
      _after={{
        content: `""`,
        height: calc.subtract("100%", "50px"),
        borderImage: `linear-gradient(to bottom, ${$colorVar.reference}, ${$nextColorVar.reference}) 1 100%`,
        borderLeft: "4px",
        borderColor: "orange",
        position: "absolute",
        left: calc.subtract("50%", "2px"),
        top: "50px",
        zIndex: 1,
      }}
    />
  )
}

const Header = ({ children }: ChildOnlyType) => (
  <Flex
    gridArea="header"
    flexDirection="column"
    justify="center"
    alignItems={{ base: "center", md: "initial" }}
    gap={2}
  >
    {children}
  </Flex>
)

const HeadingEl = ({ children }: ChildOnlyType) => (
  <Heading
    m={0}
    color={$colorVar.reference}
    fontSize="2rem"
    fontWeight={600}
    lineHeight={1.4}
    textAlign={{ base: "center", md: "initial" }}
  >
    {children}
  </Heading>
)

const Pills = ({ children }: ChildOnlyType) => (
  <Flex
    flexWrap="wrap"
    gap={1}
    justify={{ base: "center", md: "initial" }}
    sx={{
      p: {
        color: $colorVar.reference,
        m: 0,
        position: "relative",
        py: 0.5,
        px: 1.5,
        whiteSpace: "nowrap",
        _after: {
          content: `""`,
          position: "absolute",
          top: 0,
          left: 0,
          boxSize: "100%",
          background: $colorVar.reference,
          opacity: 0.125,
          borderRadius: "sm",
        },
      },
    }}
  >
    {children}
  </Flex>
)

const Glyph = ({ glyphIcon }: { glyphIcon: typeof Icon }) => {
  const Icon = glyphIcon
  return (
    <Center gridArea={{ base: "content", md: "glyph" }}>
      <Icon
        boxSize={{ base: "50%", md: "50px" }}
        color={$colorVar.reference}
        opacity={{ base: 0.1, md: "initial" }}
      />
    </Center>
  )
}

const Content = ({ children }: ChildOnlyType) => (
  <Box
    gridArea="content"
    mt={{ md: 4 }}
    mb={{ md: 12 }}
    sx={{
      // For use in markdown files
      ".gold": {
        color: "stakingGold",
        fontWeight: 600,
      },
    }}
  >
    {children}
  </Box>
)

export interface IProps {}

const StakingHierarchy: React.FC<IProps> = () => {
  const [stakingGold, stakingGreen, stakingBlue, stakingRed] = useToken(
    "colors",
    ["stakingGold", "stakingGreen", "stakingBlue", "stakingRed"]
  )

  return (
    <VStack
      bgGradient="linear(rgba(237, 194, 84, 0.1) 13.39%, rgba(75, 231, 156, 0.1) 44.21%, rgba(231, 202, 200, 0.1) 82.88%)"
      borderRadius={{ base: 0, md: "lg" }}
      spacing={{ base: 16, md: 0 }}
      p={8}
      borderLeft={{ base: "4px", md: "none" }}
      borderRight={0}
      sx={{
        borderImage: `linear-gradient(to bottom, ${stakingGold} 5%, ${stakingGreen} 30%, ${stakingBlue} 55%, ${stakingRed} 80%) 1 100%`,
      }}
    >
      <SectionGrid number={1}>
        <StyledEtherSvg size="100%" />
        <Line />
        <Header>
          <HeadingEl>
            <Translation id="page-staking-hierarchy-solo-h2" />
          </HeadingEl>
          <Pills>
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
        <Glyph glyphIcon={StakingGlyphCPUIcon} />
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
            width={{ base: "100%", md: "auto" }}
          >
            <Translation id="page-staking-more-on-solo" />
          </ButtonLink>
        </Content>
      </SectionGrid>
      <SectionGrid number={2}>
        <StyledEtherSvg size="90%" />
        <Line />
        <Header>
          <HeadingEl>
            <Translation id="page-staking-dropdown-saas" />
          </HeadingEl>
          <Pills>
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
        <Glyph glyphIcon={StakingGlyphCloudIcon} />
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
            to="/staking/saas/"
            onClick={() => {
              trackCustomEvent({
                eventCategory: `StakingHierarchy`,
                eventAction: `Clicked`,
                eventName: "clicked staking as a service",
              })
            }}
            width={{ base: "100%", md: "auto" }}
          >
            <Translation id="page-staking-more-on-saas" />
          </ButtonLink>
        </Content>
      </SectionGrid>
      <SectionGrid number={3}>
        <StyledEtherSvg size="80%" />
        <Line />
        <Header>
          <HeadingEl>
            <Translation id="page-staking-dropdown-pools" />
          </HeadingEl>
          <Pills>
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
        <Glyph glyphIcon={StakingGlyphTokenWalletIcon} />
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
            to="/staking/pools/"
            onClick={() => {
              trackCustomEvent({
                eventCategory: `StakingHierarchy`,
                eventAction: `Clicked`,
                eventName: "clicked pooled staking",
              })
            }}
            width={{ base: "100%", md: "auto" }}
          >
            <Translation id="page-staking-more-on-pools" />
          </ButtonLink>
        </Content>
      </SectionGrid>
      <SectionGrid number={4}>
        <StyledEtherSvg size="70%" />
        <Line />
        <Header>
          <HeadingEl>
            <Translation id="page-staking-hierarchy-cex-h2" />
          </HeadingEl>
          <Pills>
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
        <Glyph glyphIcon={StakingGlyphCentralizedIcon} />
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
      </SectionGrid>
    </VStack>
  )
}

export default StakingHierarchy
