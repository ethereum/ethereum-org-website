import { getLocale, getTranslations } from "next-intl/server"

import { Image } from "@/components/Image"
import ParallaxImage from "@/components/Image/ParallaxImage/lazy"
import { ButtonLink } from "@/components/ui/buttons/Button"

import Countdown from "./CountDown/lazy"
import { getTimeUnitTranslations } from "./utils"

import TenYearBackgroundImage from "@/public/images/10-year-anniversary/10-year-background.png"
import TenYearGraphicImage from "@/public/images/10-year-anniversary/10-year-logo.png"
import TenYearDesktopText from "@/public/images/10-year-anniversary/10yeartext.svg"
import TenYearMobileText from "@/public/images/10-year-anniversary/10yeartext-mobile.svg"

const TenYearHomeBanner = async () => {
  const locale = await getLocale()
  const t = await getTranslations({
    locale,
    namespace: "page-10-year-anniversary",
  })

  const timeLeftLabels = await getTimeUnitTranslations()

  return (
    <div className="relative rounded-2xl bg-cover bg-center text-center">
      <div className="absolute inset-0 overflow-hidden rounded-2xl after:absolute after:inset-0 after:bg-ten-year-gradient after:opacity-80 after:content-['']">
        <Image
          src={TenYearBackgroundImage}
          alt=""
          sizes="(max-width: 1504px) 100vw, 1504px"
          quality={15}
          className="size-full"
        />
      </div>
      <div className="relative rounded-2xl p-8">
        {/* CLIENT SIDE, lazy loaded */}
        <ParallaxImage
          src={TenYearGraphicImage}
          alt=""
          className="mx-auto -mb-2 -mt-16 max-w-[min(100%,500px)] object-contain sm:-mt-24 md:-mt-32"
        />
        <div className="mt-4 flex justify-center">
          <h2 className="sr-only">{t("page-10-year-banner-header")}</h2>
          <TenYearDesktopText className="mb-4 hidden object-contain text-body md:block" />
          <TenYearMobileText className="mb-4 block object-contain text-5xl text-body md:hidden" />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <p>
            <strong>{t("page-10-year-banner-launch-text")}</strong>
          </p>
          <p>{t("page-10-year-banner-tagline")}</p>
        </div>
        {/* CLIENT SIDE, lazy loaded */}
        <Countdown
          dateTime="2025-07-30T15:44:00Z"
          className="mb-8 mt-4 bg-background"
          timeLeftLabels={timeLeftLabels}
          expiredLabel={t("page-10-year-countdown-expired")}
        />

        <ButtonLink href="/10years/">{t("page-10-year-banner-cta")}</ButtonLink>
      </div>
    </div>
  )
}

export default TenYearHomeBanner
