import { useTranslation } from "next-i18next"
import { IconBase } from "react-icons"

import Translation from "@/components/Translation"

import { Background } from "./Background"

const SvgText = () => {
  const { t } = useTranslation()

  return (
    <IconBase
      viewBox="0 0 250 110"
      className="absolute z-10 h-full w-full"
      aria-hidden="true"
    >
      <text x="2%" y="35%" className="fill-current text-[8px]">
        ⛏ {t("page-upgrades-index:docs-nav-proof-of-work")}
      </text>
      <text x="47%" y="35%" className="fill-current text-[8px]">
        🌱 {t("page-upgrades-index:docs-nav-proof-of-stake")}
      </text>
      <text x="11%" y="70%" className="fill-current text-[7px]">
        🚀 {t("common:beacon-chain")}
      </text>
      <text x="43%" y="12.5%" className="fill-current text-[7px]">
        🐼 {t("page-upgrades-index:page-upgrades-get-involved-ethresearch-2")}
      </text>
      <text x="63%" y="95%" className="fill-current text-[7px]">
        🌳 {t("page-upgrades-index:page-upgrades-get-involved-ethresearch-1")}
      </text>
    </IconBase>
  )
}

const MergeInfographic = () => {
  const { t } = useTranslation()

  return (
    <div
      className="relative isolate aspect-[25/11] w-full"
      role="img"
      aria-label={t(
        "page-upgrades-index:page-upgrades-merge-infographic-alt-text"
      )}
    >
      <div>
        <div
          className="absolute start-[2%] top-[40%] z-[2] flex h-[18%] max-h-[2em] w-[81%] items-center justify-center text-center text-[0.625em] leading-none text-background sm:text-[0.875em] md:text-[1.125em] lg:text-[1.375em]"
          aria-hidden="true"
        >
          <Translation id="page-upgrades:page-upgrades-merge-infographic-el" />
        </div>
        <SvgText />
        <Background aria-hidden="true" className="absolute z-0 h-full w-full" />
      </div>
    </div>
  )
}

export default MergeInfographic
