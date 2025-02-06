import React from "react"
import { useTranslation } from "next-i18next"
import { IconBase } from "react-icons"
import { cssVar, Icon, SimpleGrid, Text, useToken } from "@chakra-ui/react"

import { ChildOnlyProp } from "@/lib/types"

import { Center, Flex, VStack } from "@/components/ui/flex"

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
    <Center
      style={{ gridArea: "ether" }}
      className="z-2 mx-auto w-full max-w-20"
    >
      <StakingGlyphEtherCircleIcon className={className} />
    </Center>
  )
}

const Line = () => {
  // TODO: Remove after completion of the Chakra migration
  const medBp = useToken("breakpoints", "md")

  return (
    <aside
      className={`realtive after:h-[calc.subtract("100%", "50px")] after:start-[calc.subtract("50%", "2px")] after:content-["] after:z-1 after:border-orange col-span-1 row-span-2 hidden after:absolute after:top-[50px] after:border-s-4 md:block`}

      /* 
        This value needs to be updated.
      _after={{
        borderImage: `linear-gradient(to bottom, ${$colorVar.reference}, ${$nextColorVar.reference}) 1 100%`,
      }} */
    />
  )
}

const Header = ({ children }: ChildOnlyProp) => (
  <Flex
    className="flex-col justify-center gap-2 sm:items-center md:items-start"
    style={{ gridArea: "header" }}
  >
    {children}
  </Flex>
)

const HeadingEl = ({ children }: ChildOnlyProp) => (
  <h1
    className="text-($colorVar.reference) text-center text-[2rem] font-semibold leading-[1.4] md:text-start"
    /* This value needs to be updated across the file.
     color={$colorVar.reference} */
  >
    {children}
  </h1>
)
// Todo: The removed sx prop will be added by creating a separate function for Text like we have HeadingEl. This will also help to migrate the Text component.
const Pills = ({ children }: ChildOnlyProp) => (
  <Flex className="flex-wrap gap-1 sm:justify-center md:justify-start">
    {children}
  </Flex>
)

const TextEl = ({ children }: ChildOnlyProp) => (
  <p
    className={`after:content-["] relative m-0 whitespace-nowrap px-1.5 py-0.5 text-[colorVar.reference] after:absolute after:start-0 after:top-0 after:box-content after:rounded after:bg-[var(colorVar.reference)] after:opacity-[.125]`}
  >
    {children}
  </p>
)

type GlyphProps = { glyphIcon: typeof IconBase }
const Glyph = ({ glyphIcon }: GlyphProps) => (
  <Center
    //Need to set the base styles we've had previously ie. gridArea="base:content"
    style={{
      gridArea: "glyph",
    }}
  >
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
    className="flex-col gap-4 md:mb-12 md:mt-4"
    style={{
      gridArea: "content",
    }}
    /* sx={{
      // For use in markdown files
      ".gold": {
        color: "stakingGold",
        fontWeight: 600,
      },
    }} */
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
    <VStack className="border-gradient-to-b border-gradient-gold-green-blue-red space-y-16 rounded-none border-l-4 border-r-0 bg-gradient-to-b from-[rgba(237,194,84,0.1)] via-[rgba(75,231,156,0.1)] to-[rgba(231,202,200,0.1)] p-8 md:space-y-0 md:rounded-lg md:border-l-0">
      <SectionGrid number={1}>
        <StyledEtherSvg className="size-[100%] text-staking-gold" />
        <Line />
        <Header>
          <HeadingEl>{t("page-staking-hierarchy-solo-h2")}</HeadingEl>
          <Pills>
            <Text
              className={`after:content-["] relative m-0 whitespace-nowrap px-1.5 py-0.5 text-[$colorVar.reference] after:absolute after:start-0 after:top-0 after:box-content after:rounded after:bg-[$colorVar.reference] after:opacity-[.125]`}
            >
              <em>{t("page-staking-hierarchy-solo-pill-1")}</em>
            </Text>
            <Text
              className={`after:content-["] relative m-0 whitespace-nowrap px-1.5 py-0.5 text-[$colorVar.reference] after:absolute after:start-0 after:top-0 after:box-content after:rounded after:bg-[$colorVar.reference] after:opacity-[.125]`}
            >
              {t("page-staking-hierarchy-solo-pill-2")}
            </Text>
            <Text
              className={`after:content-["] relative m-0 whitespace-nowrap px-1.5 py-0.5 text-[$colorVar.reference] after:absolute after:start-0 after:top-0 after:box-content after:rounded after:bg-[$colorVar.reference] after:opacity-[.125]`}
            >
              {t("page-staking-hierarchy-solo-pill-3")}
            </Text>
            <Text
              className={`after:content-["] relative m-0 whitespace-nowrap px-1.5 py-0.5 text-[$colorVar.reference] after:absolute after:start-0 after:top-0 after:box-content after:rounded after:bg-[$colorVar.reference] after:opacity-[.125]`}
            >
              {t("page-staking-hierarchy-solo-pill-4")}
            </Text>
          </Pills>
        </Header>
        <Glyph glyphIcon={StakingGlyphCPUIcon} />
        <Content>
          <Text>
            <Translation id="page-staking:page-staking-hierarchy-solo-p1" />
          </Text>
          <Text>{t("page-staking-hierarchy-solo-p2")}</Text>
          <Text>{t("page-staking-hierarchy-solo-p3")}</Text>
          <div>
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
          </div>
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
          <div>
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
          </div>
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
          <div>
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
          </div>
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
