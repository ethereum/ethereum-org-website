import type { CommonHeroProps } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import { Image } from "@/components/Image"

import { breakpointAsNumber, screens } from "@/lib/utils/screen"

import { CallToAction } from "../CallToAction"

export type ContentHeroProps = Omit<
  CommonHeroProps,
  "header" | "blurDataURL"
> & {
  blurDataURL?: CommonHeroProps["blurDataURL"]
}

const ContentHero = (props: ContentHeroProps) => {
  const { breadcrumbs, heroImg, buttons, title, description, blurDataURL } =
    props
  if (blurDataURL) heroImg.blurDataURL = blurDataURL

  return (
    <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 items-center border-b pb-16 lg:grid-cols-2">
      <div className="flex h-[300px] items-center justify-center md:h-[400px] lg:col-start-2 lg:h-full">
        <Image
          className="my-auto h-full max-h-[479px] w-full flex-auto object-contain md:flex-none"
          src={heroImg}
          alt=""
          priority
          sizes={`(max-width: ${screens.lg}) 100vw, ${breakpointAsNumber["2xl"] / 2}px`}
        />
      </div>
      <div className="flex h-full flex-col gap-9 p-8 lg:col-start-1 lg:row-start-1 lg:px-11 lg:py-16">
        <Breadcrumbs {...breadcrumbs} />
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-black lg:text-7xl">{title}</h1>
          {typeof description === "string" ? (
            <p className="text-lg">{description}</p>
          ) : (
            description
          )}
          {buttons && (
            <div className="flex flex-col gap-4 md:flex-row">
              {buttons.map((button, idx) => {
                if (!button) return
                return <CallToAction key={idx} index={idx} {...button} />
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContentHero
