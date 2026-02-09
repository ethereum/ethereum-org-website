import { getImageProps, type StaticImageData } from "next/image"

import type { ClassNameProp } from "@/lib/types"

import { ChevronNext } from "@/components/Chevron"
import LanguageMorpher from "@/components/Homepage/LanguageMorpher"
import { ButtonLink } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { breakpointAsNumber } from "@/lib/utils/screen"

import heroBase from "@/public/images/home/hero.png"
import hero2xl from "@/public/images/home/hero-2xl.png"

type HomeHero2026Props = ClassNameProp & {
  image?: StaticImageData
  image2xl?: StaticImageData
  alt?: string
}

const HomeHero2026 = ({
  className,
  image,
  image2xl,
  alt: altProp,
}: HomeHero2026Props) => {
  const baseImage = image ?? heroBase
  const xlImage = image2xl ?? image ?? hero2xl
  const alt = altProp ?? "Ethereum illustration"

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

      <div className="flex flex-col items-center px-4 py-12 text-center lg:py-16">
        <div className="flex w-full flex-col items-center gap-4">
          <LanguageMorpher />

          <div className="flex flex-col items-center gap-8">
            <h1 className="max-w-[893px] text-4xl font-black leading-[1.1] md:text-6xl lg:text-7xl lg:leading-[0.9]">
              The internet that the world can rely on.
            </h1>

            <p className="max-w-[741px] text-lg leading-relaxed tracking-[0.07px] text-body-medium md:text-2xl md:leading-[1.625]">
              Ethereum is the global network where you control your assets, your
              data, and your identity.
            </p>

            <ButtonLink href="/what-is-ethereum/" size="lg">
              Start here <ChevronNext />
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeHero2026
