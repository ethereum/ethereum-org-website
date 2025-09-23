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
      <div className="absolute inset-0 flex h-[66px] w-full items-center justify-between px-3 md:px-6">
        <div className="flex flex-col gap-0 md:flex-row md:items-center md:gap-4">
          <Image
            src={DevconnectLogo}
            alt="Devconnect"
            className="h-[27px] w-auto md:h-[50px]"
            sizes="(max-width: 768px) 77px, 142px"
          />
          <div className="hidden sm:block">
            <p className="text-xs/6xs text-black">
              <strong>17 - 22 Nov</strong> 2025
            </p>
            <p className="text-xs/6xs font-bold text-black">
              Buenos Aires, Argentina
            </p>
          </div>
        </div>
        <div className="max-w-[200px] text-wrap text-center md:max-w-[287px] lg:max-w-[474px]">
          <p className="text-xs font-bold text-black md:text-sm lg:text-xl">
            {t(
              "page-index-devconnect-banner-join-the-biggest-ethereum-event-of-the-year"
            )}
          </p>
        </div>
        <ButtonLink
          href="https://devconnect.org/"
          size="sm"
          hideArrow
          className="rounded-none border-b-2 border-b-[#215D93] bg-[#74ACDF] text-2xs uppercase text-white hover:bg-[#215D93] md:text-md"
        >
          {t("page-index-devconnect-banner-get-tickets")}
        </ButtonLink>
      </div>
    </div>
  )
}

export default DevconnectBannerVariation1
