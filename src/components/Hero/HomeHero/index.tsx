import NextImage from "next/image"
import { useTranslation } from "next-i18next"

import type { ClassNameProp, CommonHeroProps } from "@/lib/types"

import Morpher from "@/components/Morpher"

import { cn } from "@/lib/utils/cn"

export type HomeHeroProps = Pick<CommonHeroProps, "heroImg"> & ClassNameProp

const HomeHero = ({ heroImg, className }: HomeHeroProps) => {
  const { t } = useTranslation("page-index")
  return (
    <div className={className}>
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
      <div
        className={cn(
          "flex flex-col items-center space-y-4 border-t-[3px] border-primary-low-contrast px-4 py-8 text-center lg:space-y-7",
          "bg-gradient-to-b from-purple-500/10 from-0% to-purple-500/0 to-25% dark:from-purple-500/30"
        )}
      >
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
