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
        <div className="items-left flex flex-col gap-0 md:flex-row md:items-center md:gap-4">
          <div>
            <Image
              src={DevconnectLogo}
              alt="Devconnect"
              className="h-[27px] w-auto md:h-[50px]"
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs leading-6xs text-black">
              <strong>17 - 22 Nov</strong> 2025
            </p>
            <p className="text-xs leading-6xs text-black">
              <strong>Buenos Aires, Argentina</strong>
            </p>
          </div>
        </div>
        <div className="max-w-[200px] text-wrap text-center md:max-w-[287px] lg:max-w-[474px]">
          <p className="text-xs text-black sm:text-sm md:text-xl">
            <strong>
              {t(
                "page-index-devconnect-banner-join-the-biggest-ethereum-event-of-the-year"
              )}
            </strong>
          </p>
        </div>
        <div>
          <ButtonLink
            href="https://devconnect.org/"
            size="sm"
            target="_blank"
            rel="noopener noreferrer"
            hideArrow
            className="rounded-none border-b-2 border-b-[#215D93] bg-[#74ACDF] text-[2xs] text-white hover:bg-[#215D93] md:text-md"
          >
            {t("page-index-devconnect-banner-get-tickets").toUpperCase()}
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}

export default DevconnectBannerVariation1
