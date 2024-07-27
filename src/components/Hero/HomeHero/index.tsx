import NextImage from "next/image"
import { useTranslation } from "next-i18next"

import type { CommonHeroProps } from "@/lib/types"

import Morpher from "@/components/Morpher"

export type HomeHeroProps = Pick<CommonHeroProps, "heroImg">

const HomeHero = ({ heroImg }: HomeHeroProps) => {
  const { t } = useTranslation("page-index")
  return (
    <div>
      <div className="h-[300px] sm:h-[350px] md:h-[380px] lg:h-[440px]">
        <NextImage
          src={heroImg}
          alt={t("page-index:page-index-hero-image-alt")}
          // TODO: adjust value when the old theme breakpoints are removed (src/theme.ts)
          sizes="(max-width: 1504px) 100vw, 1504px"
          className="h-full w-full object-cover"
          priority
        />
      </div>
      <div className="mx-auto flex max-w-2xl flex-col space-y-4 px-4 py-8 text-center lg:space-y-7">
        <Morpher />
        <div className="flex flex-col items-center space-y-5 lg:max-w-2xl">
          <h1 className="font-black">{t("page-index:page-index-title")}</h1>
          <p
            className="max-w-96 text-body-medium"
            // TODO: Match paragraph color to design
            // TODO: Extract intl
          >
            The leading platform for innovative apps and Ethereum-backed
            blockchain networks
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomeHero
