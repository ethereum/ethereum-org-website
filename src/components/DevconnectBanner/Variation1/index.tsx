import Banner from "@/components/DevconnectBanner/Variation1/banner.svg"
import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"

import { useTranslation } from "@/hooks/useTranslation"
import DevconnectLogo from "@/public/images/devconnect/devconnect-logo.png"

const DevconnectBannerVariation1 = () => {
  const { t } = useTranslation("page-index")

  return (
    <div className="relative w-full">
      <Banner className="h-[66px] w-full" />
      <div className="absolute inset-0 flex h-[66px] w-full items-center justify-between gap-4 px-3 md:px-6">
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
          <div className="min-w-[80px]">
            <Image
              src={DevconnectLogo}
              alt="Devconnect"
              className="h-[27px] w-auto object-contain md:h-[50px]"
              sizes="(max-width: 768px) 77px, 142px"
            />
          </div>
          <div className="hidden text-2xs/6xs font-bold text-black sm:block md:text-xs/6xs">
            <p className="whitespace-nowrap">
              17 - 22 Nov <span className="font-normal">2025</span>
            </p>
            <p className="whitespace-nowrap">Buenos Aires, Argentina</p>
          </div>
        </div>
        <div className="text-wrap text-center">
          <p className="text-xs font-extrabold text-black sm:text-sm md:text-xl">
            {t(
              "page-index-devconnect-banner-join-the-biggest-ethereum-event-of-the-year"
            )}
          </p>
        </div>
        <ButtonLink
          href="https://devconnect.org/"
          size="sm"
          variant="ghost"
          hideArrow
          className="min-h-0 whitespace-nowrap rounded-none border-b-2 border-b-[#215D93] bg-[#74ACDF] text-xs/none font-bold uppercase text-white hover:bg-[#215D93] hover:!text-white active:bg-[#215D93] active:!text-white md:text-md/none"
        >
          {t("page-index-devconnect-banner-get-tickets")}
        </ButtonLink>
      </div>
    </div>
  )
}

export default DevconnectBannerVariation1
