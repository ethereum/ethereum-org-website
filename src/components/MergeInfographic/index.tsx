import type { SVGTextElementAttributes } from "react"

import Translation from "@/components/Translation"

import { cn } from "@/lib/utils/cn"

import { createIconBase } from "../icons/icon-base"
import { HStack } from "../ui/flex"

import { Background } from "./Background"

import { useTranslation } from "@/hooks/useTranslation"

const Text = ({
  className,
  ...rest
}: SVGTextElementAttributes<SVGTextElement>) => (
  <text
    className={cn("fill-current [text-anchor:start]", className)}
    {...rest}
  />
)

const SvgTextInternal = () => {
  const { t } = useTranslation(["page-upgrades-index"])
  const [sm, lg] = ["text-[7px]", "text-[8px]"]

  return (
    <>
      <Text className={lg} x="2%" y="35%">
        ⛏ {t("page-upgrades-index:docs-nav-proof-of-work")}
      </Text>
      <Text className={lg} x="47%" y="35%">
        🌱 {t("page-upgrades-index:docs-nav-proof-of-stake")}
      </Text>
      <Text className={sm} x="11%" y="70%">
        🚀 {t("common:beacon-chain")}
      </Text>
      <Text className={sm} x="43%" y="12.5%">
        🐼 {t("page-upgrades-index:page-upgrades-get-involved-ethresearch-2")}
      </Text>
      <Text className={sm} x="63%" y="95%">
        🌳 {t("page-upgrades-index:page-upgrades-get-involved-ethresearch-1")}
      </Text>
    </>
  )
}

const SvgText = createIconBase({
  displayName: "SvgText",
  viewBox: "0 0 250 110",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
  "aria-hidden": true,
  className: "absolute size-full z-[1]",
  children: <SvgTextInternal />,
})

const MergeInfographic = () => {
  const { t } = useTranslation()

  return (
    <div
      className="relative isolate aspect-[25/11] w-full"
      role="img"
      aria-label={t("page-upgrades:page-upgrades-merge-infographic-alt-text")}
    >
      <div>
        <HStack
          className="absolute left-[2%] top-[40%] z-[2] h-[18%] max-h-[2em] w-[81%] justify-center text-center text-[0.625em] leading-[1em] text-background sm:text-[0.875em] md:text-[1.125em] lg:text-[1.375em]"
          aria-hidden="true"
        >
          <Translation id="page-upgrades:page-upgrades-merge-infographic-el" />
        </HStack>
        <SvgText />
        <Background className="absolute z-0 size-full" aria-hidden="true" />
      </div>
    </div>
  )
}

export default MergeInfographic
