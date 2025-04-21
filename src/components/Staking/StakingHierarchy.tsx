import React, { HTMLAttributes } from "react"
import { IconBase } from "react-icons"

import { ChildOnlyProp } from "@/lib/types"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import {
  StakingGlyphCentralizedIcon,
  StakingGlyphCloudIcon,
  StakingGlyphCPUIcon,
  StakingGlyphEtherCircleIcon,
  StakingGlyphTokenWalletIcon,
} from "../icons/staking"
import Translation from "../Translation"
import { ButtonLink } from "../ui/buttons/Button"
import { Center, Flex, VStack } from "../ui/flex"

import { useTranslation } from "@/hooks/useTranslation"

type SectionGridProps = ChildOnlyProp

const SectionGrid = ({ children }: SectionGridProps) => {
  return (
    <div className="staking-grid-stacked md:staking-grid relative grid grid-cols-1 gap-4 md:grid-cols-[5rem_1fr_5rem] md:gap-x-8 md:gap-y-0">
      {children}
    </div>
  )
}

const StyledEtherSvg = ({ className = "size-full" }: { className: string }) => {
  return (
    <Center className="area-ether z-[2] mx-auto w-full max-w-20">
      <StakingGlyphEtherCircleIcon className={className} />
    </Center>
  )
}

const Line = () => {
  return <aside className="grid-col-1 grid-row-3 relative hidden md:block" />
}

const Header = ({ children, className }: HTMLAttributes<HTMLDivElement>) => (
  <Flex
    className={cn(
      "area-header flex-col items-center justify-center gap-2 md:items-start",
      className
    )}
  >
    {children}
  </Flex>
)

const HeadingEl = ({
  children,
  className,
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-center md:text-start", className)}>{children}</h2>
)

const Pills = ({ children, className }: HTMLAttributes<HTMLDivElement>) => (
  <Flex
    className={cn("flex-wrap justify-center gap-1 md:justify-start", className)}
  >
    {children}
  </Flex>
)

const Pill = ({
  children,
  className,
}: HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn(
      "relative m-0 whitespace-nowrap rounded-sm px-1 py-[0.125rem]",
      className
    )}
  >
    {children}
  </p>
)

type GlyphProps = { glyphIcon: typeof IconBase; className?: string }
const Glyph = ({ glyphIcon: GlyphIcon, className }: GlyphProps) => (
  <Center className="area-content md:area-glyph">
    <GlyphIcon
      className={cn(
        "size-[50%] opacity-10 md:size-[50px] md:opacity-100",
        className
      )}
    />
  </Center>
)

const Content = ({ children }: ChildOnlyProp) => (
  <Flex className="area-content flex-col gap-4 md:mb-12 md:mt-4">
    {children}
  </Flex>
)

const StakingHierarchy = () => {
  const { t } = useTranslation("page-staking")

  return (
    <VStack className="gap-16 bg-gradient-staking p-8 md:gap-0 md:rounded-lg">
      <SectionGrid>
        <StyledEtherSvg className="size-[100%] text-staking-gold" />
        <Line />
        <Header className="text-staking-gold">
          <HeadingEl>{t("page-staking-hierarchy-solo-h2")}</HeadingEl>
          <Pills className="*:bg-staking-gold/10">
            <Pill>
              <em>{t("page-staking-hierarchy-solo-pill-1")}</em>
            </Pill>
            <Pill>{t("page-staking-hierarchy-solo-pill-2")}</Pill>
            <Pill>{t("page-staking-hierarchy-solo-pill-3")}</Pill>
            <Pill>{t("page-staking-hierarchy-solo-pill-4")}</Pill>
          </Pills>
        </Header>
        <Glyph glyphIcon={StakingGlyphCPUIcon} className="text-staking-gold" />
        <Content>
          <p>
            <Translation id="page-staking:page-staking-hierarchy-solo-p1" />
          </p>
          <p>{t("page-staking-hierarchy-solo-p2")}</p>
          <p>{t("page-staking-hierarchy-solo-p3")}</p>
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
              className="max-md:w-full"
            >
              {t("page-staking-more-on-solo")}
            </ButtonLink>
          </div>
        </Content>
      </SectionGrid>
      <SectionGrid>
        <StyledEtherSvg className="size-[90%] text-staking-green" />
        <Line />
        <Header className="text-staking-green">
          <HeadingEl>{t("page-staking-dropdown-saas")}</HeadingEl>
          <Pills className="*:bg-staking-green/10">
            <Pill>{t("page-staking-hierarchy-saas-pill-1")}</Pill>
            <Pill>{t("page-staking-hierarchy-saas-pill-2")}</Pill>
            <Pill>{t("page-staking-hierarchy-saas-pill-3")}</Pill>
          </Pills>
        </Header>
        <Glyph
          glyphIcon={StakingGlyphCloudIcon}
          className="text-staking-green"
        />
        <Content>
          <p>{t("page-staking-hierarchy-saas-p1")}</p>
          <p>{t("page-staking-hierarchy-saas-p2")}</p>
          <p>{t("page-staking-hierarchy-saas-p3")}</p>
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
              className="max-md:w-full"
            >
              {t("page-staking-more-on-saas")}
            </ButtonLink>
          </div>
        </Content>
      </SectionGrid>
      <SectionGrid>
        <StyledEtherSvg className="size-[80%] text-staking-blue" />
        <Line />
        <Header className="text-staking-blue">
          <HeadingEl>{t("page-staking-dropdown-pools")}</HeadingEl>
          <Pills className="*:bg-staking-blue/10">
            <Pill>{t("page-staking-hierarchy-pools-pill-1")}</Pill>
            <Pill>{t("page-staking-hierarchy-pools-pill-2")}</Pill>
            <Pill>{t("page-staking-hierarchy-pools-pill-3")}</Pill>
            <Pill>
              <em>{t("page-staking-hierarchy-pools-pill-4")}</em>
            </Pill>
          </Pills>
        </Header>
        <Glyph
          glyphIcon={StakingGlyphTokenWalletIcon}
          className="text-staking-blue"
        />
        <Content>
          <p>
            <Translation id="page-staking:page-staking-hierarchy-pools-p1" />
          </p>
          <p>
            <Translation id="page-staking:page-staking-hierarchy-pools-p2" />
          </p>
          <p>
            <Translation id="page-staking:page-staking-hierarchy-pools-p3" />
          </p>
          <p>
            <Translation id="page-staking:page-staking-hierarchy-pools-p4" />
          </p>
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
              className="max-md:w-full"
            >
              {t("page-staking-more-on-pools")}
            </ButtonLink>
          </div>
        </Content>
      </SectionGrid>
      <SectionGrid>
        <StyledEtherSvg className="size-[70%] text-staking-red" />
        <Line />
        <Header className="text-staking-red">
          <HeadingEl>{t("page-staking-hierarchy-cex-h2")}</HeadingEl>
          <Pills className="*:bg-staking-red/10">
            <Pill>
              <em>{t("page-staking-hierarchy-cex-pill-1")}</em>
            </Pill>
            <Pill>{t("page-staking-hierarchy-cex-pill-2")}</Pill>
          </Pills>
        </Header>
        <Glyph
          glyphIcon={StakingGlyphCentralizedIcon}
          className="text-staking-red"
        />
        <Content>
          <p>{t("page-staking-hierarchy-cex-p1")}</p>
          <p>{t("page-staking-hierarchy-cex-p2")}</p>
          <p>
            <Translation id="page-staking:page-staking-hierarchy-cex-p3" />
          </p>
        </Content>
      </SectionGrid>
    </VStack>
  )
}

export default StakingHierarchy
