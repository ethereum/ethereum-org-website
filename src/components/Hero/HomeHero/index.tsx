import { useTranslation } from "next-i18next"

import type { ClassNameProp, CommonHeroProps } from "@/lib/types"

import { TwImage } from "@/components/Image"
import Morpher from "@/components/Morpher"

export type HomeHeroProps = Pick<CommonHeroProps, "heroImg"> & ClassNameProp

const HomeHero = ({ heroImg, className }: HomeHeroProps) => {
  const { t } = useTranslation("page-index")

  return (
    <div className={className}>
      <div className="h-[240px] md:h-[380px] lg:h-[480px]">
        <TwImage
          src={heroImg}
          alt={t("page-index:page-index-hero-image-alt")}
          // TODO: adjust value when the old theme breakpoints are removed (src/theme.ts)
          sizes="(max-width: 1504px) 100vw, 1504px"
          className="h-full w-full object-cover"
          priority
        />
      </div>
      <div className="flex flex-col items-center border-t-[3px] border-primary-low-contrast px-4 py-10 text-center">
        <Morpher />
        <div className="flex flex-col items-center gap-y-5 lg:max-w-2xl">
          <h1 className="font-black">{t("page-index:page-index-title")}</h1>
          <p className="max-w-96 text-md text-body-medium lg:text-lg">
            {t("page-index:page-index-description")}
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomeHero
