import { getImageProps, type StaticImageData } from "next/image"
import { getLocale, getTranslations } from "next-intl/server"

import type { ClassNameProp } from "@/lib/types"

import LanguageMorpher from "@/components/Homepage/LanguageMorpher"

import { cn } from "@/lib/utils/cn"
import { breakpointAsNumber } from "@/lib/utils/screen"

import heroBase from "@/public/images/home/hero.png"
import hero2xl from "@/public/images/home/hero-2xl.png"

type HomeHeroProps = ClassNameProp & {
  image?: StaticImageData
  image2xl?: StaticImageData
  alt?: string
}

const HomeHero = async ({
  className,
  image,
  image2xl,
  alt: altProp,
}: HomeHeroProps) => {
  const locale = getLocale()
  const t = await getTranslations({ locale, namespace: "page-index" })

  const baseImage = image ?? heroBase
  const xlImage = image2xl ?? image ?? hero2xl
  const alt = altProp ?? t("page-index-hero-image-alt")

  const common = {
    alt,
    sizes: `(max-width: ${breakpointAsNumber["2xl"]}px) 100vw, ${breakpointAsNumber["2xl"]}px`,
    priority: true,
  }

  const {
    props: { srcSet: srcSet2xl },
  } = getImageProps({ ...common, ...xlImage, quality: 20 })

  const {
    props: { srcSet: srcSetMd },
  } = getImageProps({ ...common, ...baseImage, quality: 10 })

  const {
    props: { srcSet: srcSetBase, ...rest },
  } = getImageProps({ ...common, ...baseImage, quality: 5 })

  return (
    <div className={cn("w-full", className)}>
      <div className="h-[240px] overflow-hidden md:h-[380px] lg:h-[480px]">
        <picture>
          <source
            media={`(min-width: ${breakpointAsNumber["2xl"]}px)`}
            srcSet={srcSet2xl}
          />
          <source
            media={`(min-width: ${breakpointAsNumber["md"]}px) and (max-width: ${breakpointAsNumber["2xl"] - 1}px)`}
            srcSet={srcSetMd}
          />
          <source
            media={`(max-width: ${breakpointAsNumber["md"] - 1}px)`}
            srcSet={srcSetBase}
          />
          <img {...rest} alt={alt} className="h-full w-full object-cover" />
        </picture>
      </div>
      <div className="flex flex-col items-center border-t-[3px] border-primary-low-contrast px-4 py-10 text-center">
        <LanguageMorpher />
        <div className="flex flex-col items-center gap-y-5 lg:max-w-2xl">
          <h1 className="font-black">{t("page-index-title")}</h1>
          <p className="max-w-96 text-md text-body-medium lg:text-lg">
            {t("page-index-description")}
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomeHero
