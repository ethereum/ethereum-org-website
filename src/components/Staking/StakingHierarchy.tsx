import React from "react"
import { useTranslation } from "next-i18next"
import { IconBase } from "react-icons"
import {
  Box,
  calc,
  Center,
  cssVar,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  useToken,
  VStack,
} from "@chakra-ui/react"

import { ChildOnlyProp } from "@/lib/types"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { ButtonLink } from "../Buttons"
import {
  StakingGlyphCentralizedIcon,
  StakingGlyphCloudIcon,
  StakingGlyphCPUIcon,
  StakingGlyphEtherCircleIcon,
  StakingGlyphTokenWalletIcon,
} from "../icons/staking"
import Translation from "../Translation"

type SectionGridProps = ChildOnlyProp & {
  number: number
}

const $colorVar = cssVar("color")
const $nextColorVar = cssVar("next-color")
const $fillColorVar = cssVar("fill-color")

const SectionGrid = ({ number, children }: SectionGridProps) => {
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

const StyledEtherSvg = ({ className = "size-full" }: { className: string }) => {
  return (
    <Center gridArea="ether" zIndex={2} maxW={20} width="full" mx="auto">
      <StakingGlyphEtherCircleIcon className={className} />
    </Center>
  )
}

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
        borderInlineStart: "4px",
        borderColor: "orange",
        position: "absolute",
        insetInlineStart: calc.subtract("50%", "2px"),
        top: "50px",
        zIndex: 1,
      }}
    />
  )
}

const Header = ({ children }: ChildOnlyProp) => (
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

const HeadingEl = ({ children }: ChildOnlyProp) => (
  <Heading
    color={$colorVar.reference}
    fontSize="2rem"
    fontWeight={600}
    lineHeight={1.4}
    textAlign={{ base: "center", md: "initial" }}
  >
    {children}
  </Heading>
)

const Pills = ({ children }: ChildOnlyProp) => (
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
          insetInlineStart: 0,
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

type GlyphProps = { glyphIcon: typeof IconBase }
const Glyph = ({ glyphIcon }: GlyphProps) => (
  <Center gridArea={{ base: "content", md: "glyph" }}>
    <Icon
      as={glyphIcon}
      boxSize={{ base: "50%", md: "50px" }}
      color={$colorVar.reference}
      opacity={{ base: 0.1, md: "initial" }}
    />
  </Center>
)

const Content = ({ children }: ChildOnlyProp) => (
  <Flex
    flexDirection="column"
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
    gap={4}
  >
    {children}
  </Flex>
)

const StakingHierarchy = () => {
  const { t } = useTranslation("page-staking")
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
      borderInlineStart={{ base: "4px", md: "none" }}
      borderInlineEnd={0}
      sx={{
        borderImage: `linear-gradient(to bottom, ${stakingGold} 5%, ${stakingGreen} 30%, ${stakingBlue} 55%, ${stakingRed} 80%) 1 100%`,
      }}
    >
      <SectionGrid number={1}>
        <StyledEtherSvg className="size-[100%] text-staking-gold" />
        <Line />
        <Header>
          <HeadingEl>{t("page-staking-hierarchy-solo-h2")}</HeadingEl>
          <Pills>
            <Text>
              <em>{t("page-staking-hierarchy-solo-pill-1")}</em>
            </Text>
            <Text>{t("page-staking-hierarchy-solo-pill-2")}</Text>
            <Text>{t("page-staking-hierarchy-solo-pill-3")}</Text>
            <Text>{t("page-staking-hierarchy-solo-pill-4")}</Text>
          </Pills>
        </Header>
        <Glyph glyphIcon={StakingGlyphCPUIcon} />
        <Content>
          <Text>
            <Translation id="page-staking:page-staking-hierarchy-solo-p1" />
          </Text>
          <Text>{t("page-staking-hierarchy-solo-p2")}</Text>
          <Text>{t("page-staking-hierarchy-solo-p3")}</Text>
          <Box>
            <ButtonLink
              href="/staking/solo/"
              onClick={() => {
                trackCustomEvent({
                  eventCategory: `StakingHierarchy`,
                  eventAction: `Clicked`,
                  eventName: "clicked solo staking",
                })
              }}
              width={{ base: "100%", md: "auto" }}
            >
              {t("page-staking-more-on-solo")}
            </ButtonLink>
          </Box>
        </Content>
      </SectionGrid>
      <SectionGrid number={2}>
        <StyledEtherSvg className="size-[90%] text-staking-green" />
        <Line />
        <Header>
          <HeadingEl>{t("page-staking-dropdown-saas")}</HeadingEl>
          <Pills>
            <Text>{t("page-staking-hierarchy-saas-pill-1")}</Text>
            <Text>{t("page-staking-hierarchy-saas-pill-2")}</Text>
            <Text>{t("page-staking-hierarchy-saas-pill-3")}</Text>
          </Pills>
        </Header>
        <Glyph glyphIcon={StakingGlyphCloudIcon} />
        <Content>
          <Text>{t("page-staking-hierarchy-saas-p1")}</Text>
          <Text>{t("page-staking-hierarchy-saas-p2")}</Text>
          <Text>{t("page-staking-hierarchy-saas-p3")}</Text>
          <Box>
            <ButtonLink
              href="/staking/saas/"
              onClick={() => {
                trackCustomEvent({
                  eventCategory: `StakingHierarchy`,
                  eventAction: `Clicked`,
                  eventName: "clicked staking as a service",
                })
              }}
              width={{ base: "100%", md: "auto" }}
            >
              {t("page-staking-more-on-saas")}
            </ButtonLink>
          </Box>
        </Content>
      </SectionGrid>
      <SectionGrid number={3}>
        <StyledEtherSvg className="size-[80%] text-staking-blue" />
        <Line />
        <Header>
          <HeadingEl>{t("page-staking-dropdown-pools")}</HeadingEl>
          <Pills>
            <Text>{t("page-staking-hierarchy-pools-pill-1")}</Text>
            <Text>{t("page-staking-hierarchy-pools-pill-2")}</Text>
            <Text>{t("page-staking-hierarchy-pools-pill-3")}</Text>
            <Text>
              <em>{t("page-staking-hierarchy-pools-pill-4")}</em>
            </Text>
          </Pills>
        </Header>
        <Glyph glyphIcon={StakingGlyphTokenWalletIcon} />
        <Content>
          <Text>
            <Translation id="page-staking:page-staking-hierarchy-pools-p1" />
          </Text>
          <Text>
            <Translation id="page-staking:page-staking-hierarchy-pools-p2" />
          </Text>
          <Text>
            <Translation id="page-staking:page-staking-hierarchy-pools-p3" />
          </Text>
          <Text>
            <Translation id="page-staking:page-staking-hierarchy-pools-p4" />
          </Text>
          <Box>
            <ButtonLink
              href="/staking/pools/"
              onClick={() => {
                trackCustomEvent({
                  eventCategory: `StakingHierarchy`,
                  eventAction: `Clicked`,
                  eventName: "clicked pooled staking",
                })
              }}
              width={{ base: "100%", md: "auto" }}
            >
              {t("page-staking-more-on-pools")}
            </ButtonLink>
          </Box>
        </Content>
      </SectionGrid>
      <SectionGrid number={4}>
        <StyledEtherSvg className="size-[70%] text-staking-red" />
        <Line />
        <Header>
          <HeadingEl>{t("page-staking-hierarchy-cex-h2")}</HeadingEl>
          <Pills>
            <Text>
              <em>{t("page-staking-hierarchy-cex-pill-1")}</em>
            </Text>
            <Text>{t("page-staking-hierarchy-cex-pill-2")}</Text>
          </Pills>
        </Header>
        <Glyph glyphIcon={StakingGlyphCentralizedIcon} />
        <Content>
          <Text>{t("page-staking-hierarchy-cex-p1")}</Text>
          <Text>{t("page-staking-hierarchy-cex-p2")}</Text>
          <Text>
            <Translation id="page-staking:page-staking-hierarchy-cex-p3" />
          </Text>
        </Content>
      </SectionGrid>
    </VStack>
  )
}

export default StakingHierarchy
