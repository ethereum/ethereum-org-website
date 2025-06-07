"use client"

import { Image } from "@/components/Image"
import ParallaxImage from "@/components/Image/ParallaxImage"
import Morpher from "@/components/Morpher"

import { useTranslation } from "@/hooks/useTranslation"
import TenYearBackgroundImage from "@/public/images/10-year-anniversary/10-year-background.png"
import TenYearGraphicImage from "@/public/images/10-year-anniversary/10-year-graphic.png"

const TenYearHero = () => {
  const { t } = useTranslation("page-10-year-anniversary")

  const WORDS = [
    t("page-10-year-censorship-resistance"),
    t("page-10-year-uptime"),
    t("page-10-year-decentralization"),
    t("page-10-year-community-building"),
    t("page-10-year-developer-growth"),
    t("page-10-year-global-collaboration"),
    t("page-10-year-cypherpunk-values"),
    t("page-10-year-hackathons"),
    t("page-10-year-permissionless-finance"),
    t("page-10-year-credible-neutrality"),
    t("page-10-year-infinite-garden"),
    t("page-10-year-client-diversity"),
  ]

  return (
    <div>
      <div className="relative mb-16">
        <Image
          src={TenYearBackgroundImage}
          alt="" // decorative element
          className="max-h-[350px] object-cover"
        />
        <ParallaxImage
          src={TenYearGraphicImage}
          alt={t("page-10-year-anniversary-meta-title")}
          className="absolute left-0 top-0 max-h-[350px] object-contain transition-transform duration-200 ease-out"
        />
      </div>
      <p className="text-center text-3xl">
        {t("page-10-year-celebrating")}{" "}
        <span className="relative max-md:block md:w-fit">
          <span
            className="select-none opacity-0 max-md:hidden"
            data-label="space-holder"
          >
            {WORDS[0]}
          </span>
          <span className="text-3xl font-bold text-accent-b md:absolute md:start-0 md:text-nowrap">
            <Morpher words={WORDS} charSet="abcdfgijklnopqsvwxyz" />
          </span>
        </span>
      </p>
    </div>
  )
}
export default TenYearHero
