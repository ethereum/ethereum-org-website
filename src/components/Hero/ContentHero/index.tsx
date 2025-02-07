import type { CommonHeroProps } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import { TwImage } from "@/components/Image"
import { Stack } from "@/components/ui/flex"

import { CallToAction } from "../CallToAction"

export type ContentHeroProps = Omit<CommonHeroProps<string>, "header">

const ContentHero = (props: ContentHeroProps) => {
  const { breadcrumbs, heroImg, buttons, title, description, blurDataURL } =
    props
  return (
    <div className="bg-gradient-main">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center lg:grid-cols-2">
        <div className="h-[300px] md:h-[400px] lg:order-1 lg:h-full">
          <TwImage
            className="box h-full max-h-[451px] w-full flex-auto object-contain md:flex-none"
            src={heroImg}
            alt=""
            priority
            blurDataURL={blurDataURL}
            width={760}
            height={451}
            // TODO: adjust value when the old theme breakpoints are removed (src/theme.ts)
            sizes="(max-width: 992px) 100vw, 760px"
          />
        </div>
        <Stack className="justify-center gap-9 p-8 lg:p-16">
          <Breadcrumbs {...breadcrumbs} />
          <Stack className="gap-6">
            <h1>{title}</h1>
            {typeof description === "string" ? (
              <p className="text-lg">{description}</p>
            ) : (
              description
            )}
            {buttons && (
              <Stack className="flex-col gap-4 md:flex-row">
                {buttons.map((button, idx) => {
                  if (!button) return
                  return <CallToAction key={idx} index={idx} {...button} />
                })}
              </Stack>
            )}
          </Stack>
          {/* TODO:
           * Add conditional Big Stat box here
           */}
        </Stack>
      </div>
    </div>
  )
}

export default ContentHero
