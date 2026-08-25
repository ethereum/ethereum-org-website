import { getTranslations } from "next-intl/server"

import { Image } from "@/components/Image"

import { DEVCON_INDIA_TICKET_URL } from "@/lib/constants"

import { Card, CardButtonFake } from "../ui/card"

import DevconDateLocation from "./date-location"

import devconIndiaBanner from "@/public/images/assets/devcon-india-banner.webp"

type DevconIndiaLargeCalloutProps = {
  /** Distinct per placement so Matomo can tell the banners apart */
  eventCategory: string
}

const DevconIndiaLargeCallout = async ({
  eventCategory,
}: DevconIndiaLargeCalloutProps) => {
  const tDevcon = await getTranslations("component-devcon-banner")
  return (
    <Card
      href={DEVCON_INDIA_TICKET_URL}
      customEventOptions={{
        eventCategory,
        eventAction: "get_tickets",
        eventName: "visit",
      }}
      variant="ghost"
      hoverLift={false}
      className="relative isolate mx-page my-space-3x flex flex-col items-center gap-y-8 overflow-hidden px-8 pt-8 pb-24 text-white hover:text-white sm:px-12 **:[img]:transition-transform **:[img]:duration-500 hover:**:[img]:scale-105"
    >
      <Image
        src={devconIndiaBanner}
        alt=""
        fill
        preload
        sizes="100vw"
        quality={90}
        className="-z-20 object-cover object-bottom"
      />
      <div className="absolute inset-0 -z-10 bg-radial from-black/14 to-black/70" />
      <div className="flex h-15 w-full items-center justify-between">
        <Image
          src="/images/assets/svgs/devcon-india-logo.svg"
          alt={tDevcon("logo-alt")}
          width="139"
          height="60"
        />
        <DevconDateLocation className="text-end" />
      </div>
      <p className="text-center text-5xl font-black text-balance text-shadow-[0_1px_2px_rgb(0_0_0/0.7),0_3px_8px_rgb(0_0_0/0.6),0_6px_28px_rgb(0_0_0/0.55)]">
        {tDevcon("title")}
      </p>
      <p className="text-center text-2xl font-medium text-shadow-[0_1px_2px_rgb(0_0_0/0.7),0_3px_8px_rgb(0_0_0/0.6),0_6px_28px_rgb(0_0_0/0.55)]">
        {tDevcon("subtitle")}
      </p>
      <CardButtonFake size="lg">{tDevcon("cta-get-tickets")}</CardButtonFake>
    </Card>
  )
}

export default DevconIndiaLargeCallout
