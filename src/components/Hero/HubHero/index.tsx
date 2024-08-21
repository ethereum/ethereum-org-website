import type { CommonHeroProps } from "@/lib/types"

import { CallToAction } from "@/components/Hero/CallToAction"
import { Image } from "@/components/Image"
import { Stack } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

export type HubHeroProps = Omit<CommonHeroProps, "breadcrumbs" | "blurDataURL">

const HubHero = ({
  heroImg,
  title,
  header,
  description,
  buttons,
}: HubHeroProps) => {
  if (buttons && buttons.length > 2) {
    throw new Error(
      "Can not have more than two call-to-action buttons in this hero component."
    )
  }

  return (
    <div className="relative">
      <Image
        src={heroImg}
        alt=""
        priority
        // TODO: adjust value when the old theme breakpoints are removed (src/theme.ts)
        sizes="(max-width: 1504px) 100vw, 1504px"
        style={{ width: "100vw", objectFit: "cover" }}
        h={{
          base: "192px",
          md: "256px",
          lg: "320px",
          xl: "576px",
          "2xl": "672px",
        }}
      />
      <Stack
        className={cn(
          "gap-4 p-4 lg:p-8",
          "text-center xl:text-start",
          "xl:rounded",
          "xl:bg-hub-hero-content-bg",
          "xl:absolute xl:top-1/2 xl:max-w-sm",
          "xl:-translate-y-1/2 xl:transform",
          "xl:backdrop-blur xl:backdrop-filter",
          "break-words",
          "xl:start-[32px]"
        )}
      >
        {title ? (
          <h1 className="text-md font-normal uppercase text-body-medium">
            {title}
          </h1>
        ) : null}
        <Stack
          // --eth-sizes-container-md: 768px ==> tailwind max-w-3xl
          className="max-w-3xl gap-2 self-center md:gap-1"
        >
          {title ? (
            <h2 className="text-4xl lg:text-5xl">{header}</h2>
          ) : (
            <h1 className="text-4xl lg:text-5xl">{header}</h1>
          )}

          <p className="text-lg">{description}</p>
        </Stack>
        <Stack
          className={cn(
            "h-fit flex-col gap-0 md:flex-row",
            "md:justify-center xl:justify-start",
            "gap-4"
          )}
        >
          {buttons?.map((button, idx) => {
            if (!button) return
            return <CallToAction key={idx} index={idx} {...button} />
          })}
        </Stack>
      </Stack>
    </div>
  )
}

export default HubHero
