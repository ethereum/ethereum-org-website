import { getTranslations } from "next-intl/server"

import ParallaxImage from "@/components/Image/ParallaxImage"
import { ButtonLink } from "@/components/ui/buttons/Button"

import Countdown from "./CountDown"
import { getTimeUnitTranslations } from "./utils"

import TenYearGraphicImage from "@/public/images/10-year-anniversary/10-year-logo.png"
import TenYearDesktopText from "@/public/images/10-year-anniversary/10yeartext.svg"
import TenYearMobileText from "@/public/images/10-year-anniversary/10yeartext-mobile.svg"

const TenYearHomeBanner = async ({ locale }: { locale: string }) => {
  const t = await getTranslations({
    locale,
    namespace: "page-10-year-anniversary",
  })

  const timeLeftLabels = await getTimeUnitTranslations(locale)

  return (
    <div className="relative rounded-2xl bg-[url('/images/10-year-anniversary/10-year-background.png')] bg-cover bg-center text-center">
      <div className="absolute h-full w-full rounded-2xl bg-ten-year-gradient opacity-80" />
      <div className="relative rounded-2xl p-8">
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
        <Countdown
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
