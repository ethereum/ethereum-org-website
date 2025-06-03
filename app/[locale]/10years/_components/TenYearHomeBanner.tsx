import ParallaxImage from "@/components/Image/ParallaxImage"
import { ButtonLink } from "@/components/ui/buttons/Button"

import Countdown from "./CountDown"

import TenYearGraphicImage from "@/public/images/10-year-anniversary/10-year-logo.png"
import TenYearDesktopText from "@/public/images/10-year-anniversary/10yeartext.svg"
import TenYearMobileText from "@/public/images/10-year-anniversary/10yeartext-mobile.svg"

const TenYearHomeBanner = () => {
  return (
    <div className="relative rounded-2xl bg-[url('/images/10-year-anniversary/10-year-background.png')] bg-cover bg-center text-center">
      <div className="absolute h-full w-full rounded-2xl bg-ten-year-gradient opacity-80" />
      <div className="relative rounded-2xl p-8">
        <ParallaxImage
          src={TenYearGraphicImage}
          alt=""
          className="mx-auto -mb-2 -mt-16 max-w-[500px] object-contain sm:-mt-24 md:-mt-32"
        />
        <div className="flex justify-center">
          <TenYearDesktopText className="mb-4 hidden object-contain text-body md:block" />
          <TenYearMobileText className="mb-4 block object-contain text-body md:hidden" />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <p>
            <strong>On July 30, 2015, at 3:44 p.m. UTC,</strong> the first block
            of the Ethereum blockchain came to life.
          </p>
          <p>Ten years down, infinity to go! 🚀</p>
        </div>
        <Countdown className="mb-8 mt-4 bg-background" />
        <ButtonLink href="/10years/">Join the party</ButtonLink>
      </div>
    </div>
  )
}

export default TenYearHomeBanner
