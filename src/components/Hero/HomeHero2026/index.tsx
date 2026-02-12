import { Fragment } from "react"
import { getImageProps, type StaticImageData } from "next/image"

import type { ClassNameProp } from "@/lib/types"

import LanguageMorpher from "@/components/Homepage/LanguageMorpher"
import PersonaModalCTA from "@/components/Homepage/PersonaModalCTA"
import BuildAppsIcon from "@/components/icons/build-apps.svg"
import EthTokenIcon from "@/components/icons/eth-token.svg"
import TryAppsIcon from "@/components/icons/phone-homescreen.svg"
import WhitepaperIcon from "@/components/icons/whitepaper.svg"
import SvgButtonLink, {
  type SvgButtonLinkProps,
} from "@/components/ui/buttons/SvgButtonLink"

import { cn } from "@/lib/utils/cn"
import { breakpointAsNumber } from "@/lib/utils/screen"

import heroBase from "@/public/images/home/hero.png"
import hero2xl from "@/public/images/home/hero-2xl.png"

export type CTAVariant = "modal" | "direct-buttons"

type HomeHero2026Props = ClassNameProp & {
  image?: StaticImageData
  image2xl?: StaticImageData
  alt?: string
  ctaVariant?: CTAVariant
  eventCategory?: string
}

const directButtonCTAs = [
  {
    label: "Learn Ethereum",
    description: "Understand Ethereum and how it works",
    href: "/what-is-ethereum/",
    Svg: WhitepaperIcon,
    className: "text-primary hover:text-primary-hover",
    eventName: "learn_ethereum",
  },
  {
    label: "Get ETH",
    description: "Ethereum's native currency",
    href: "/get-eth/",
    Svg: EthTokenIcon,
    className: "text-accent-a hover:text-accent-a-hover",
    eventName: "get_eth",
  },
  {
    label: "Try Apps",
    description: "Explore Ethereum applications",
    href: "/apps/",
    Svg: TryAppsIcon,
    className: "text-accent-c hover:text-accent-c-hover",
    eventName: "try_apps",
  },
  {
    label: "Start Building",
    description: "Build on Ethereum",
    href: "/developers/",
    Svg: BuildAppsIcon,
    className: "text-accent-b hover:text-accent-b-hover",
    eventName: "start_building",
  },
]

const HomeHero2026 = ({
  className,
  image,
  image2xl,
  alt: altProp,
  ctaVariant = "modal",
  eventCategory = "Homepage",
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

            {ctaVariant === "modal" ? (
              <PersonaModalCTA eventCategory={eventCategory} />
            ) : (
              <div className="-mb-8 grid w-full grid-cols-2 gap-x-4 gap-y-8 border-b py-20 md:grid-cols-4 md:gap-x-10 lg:-mb-12">
                {directButtonCTAs.map(
                  ({
                    label,
                    description,
                    href,
                    className: ctaClass,
                    Svg,
                    eventName,
                  }) => {
                    const Link = (
                      props: Omit<
                        SvgButtonLinkProps,
                        "Svg" | "href" | "label" | "children"
                      >
                    ) => (
                      <SvgButtonLink
                        Svg={Svg}
                        href={href}
                        label={label}
                        customEventOptions={{
                          eventCategory,
                          eventAction: "cta_click",
                          eventName,
                        }}
                        {...props}
                      >
                        <p className="text-body">{description}</p>
                      </SvgButtonLink>
                    )
                    return (
                      <Fragment key={label}>
                        <Link
                          className={cn("xl:hidden", ctaClass)}
                          variant="col"
                        />
                        <Link
                          className={cn("hidden xl:block", ctaClass)}
                          variant="row"
                        />
                      </Fragment>
                    )
                  }
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHero2026
