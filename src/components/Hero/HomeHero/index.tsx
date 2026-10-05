import { Suspense } from "react"
import dynamic from "next/dynamic"
import { getImageProps, type StaticImageData } from "next/image"
import { getLocale, getTranslations } from "next-intl/server"

import type { ClassNameProp } from "@/lib/types"

import { ChevronNext } from "@/components/Chevron"
import HomeSearchCTA from "@/components/Homepage/HomeSearchCTA"
import LanguageMorpher from "@/components/Homepage/LanguageMorpher"
import { Button } from "@/components/ui/buttons/Button"

const PersonaModalCTA = dynamic(
  () => import("@/components/Homepage/PersonaModalCTA")
)

import { cn } from "@/lib/utils/cn"
import { breakpointAsNumber } from "@/lib/utils/screen"

import { DEFAULT_LOCALE } from "@/lib/constants"

import heroBase from "@/public/images/home/hero.png"
import hero2xl from "@/public/images/home/hero-2xl.png"

type HomeHeroProps = ClassNameProp & {
  image?: StaticImageData
  image2xl?: StaticImageData
  alt?: string
  eventCategory?: string
}

const HomeHero = async ({
  className,
  image,
  image2xl,
  alt: altProp,
  eventCategory = "Homepage",
}: HomeHeroProps) => {
  const t = await getTranslations("page-index")
  const tCommon = await getTranslations("common")
  // Asking is offered on the default locale only; elsewhere the button searches.
  const canAsk = (await getLocale()) === DEFAULT_LOCALE
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

  // Remove blurWidth/blurHeight from rest to avoid React DOM warnings
  // (Next.js getImageProps includes them but they're not valid HTML attributes)
  delete (rest as Record<string, unknown>).blurWidth
  delete (rest as Record<string, unknown>).blurHeight

  return (
    <section className={cn("w-full", className)}>
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
          <img
            {...rest}
            alt={alt}
            fetchPriority="high"
            loading="eager"
            className="h-full w-full object-cover"
          />
        </picture>
      </div>

      <div className="flex flex-col items-center px-4 py-12 text-center lg:py-16">
        <div className="flex w-full flex-col items-center gap-4">
          <LanguageMorpher />

          <div className="flex flex-col items-center gap-8">
            <h1 className="max-w-[893px] text-5xl leading-[1.1] font-black text-balance md:text-6xl lg:text-7xl lg:leading-[0.9]">
              {t("page-index-hero-title")}
            </h1>

            <p className="max-w-[741px] text-lg leading-relaxed tracking-[0.07px] text-body-medium md:text-2xl md:leading-[1.625]">
              {t("page-index-hero-subtitle")}
            </p>

            <div className="flex flex-col items-center gap-4 max-sm:w-full sm:flex-row">
              <Suspense
                fallback={
                  <Button variant="solid" size="lg" className="gap-2 pe-6!">
                    {t("page-index-hero-cta")}
                    <ChevronNext className="size-5" />
                  </Button>
                }
              >
                <PersonaModalCTA eventCategory={eventCategory} />
              </Suspense>

              <HomeSearchCTA
                ask={canAsk}
                label={canAsk ? tCommon("docsearch-ask-ai") : tCommon("search")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHero
