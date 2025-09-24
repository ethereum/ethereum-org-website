import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"

import { useTranslation } from "@/hooks/useTranslation"
import DevconnectBanner from "@/public/images/devconnect/devconnect-banner.png"
import DevconnectLogo from "@/public/images/devconnect/devconnect-logo-transparent.png"

const DevconnectBannerVariation2 = () => {
  const { t } = useTranslation("page-index")

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-4xl bg-cover bg-center p-8">
      <Image
        src={DevconnectBanner}
        alt=""
        className="absolute inset-0 -z-10 h-full object-cover"
        sizes="100vw"
      />
      <div className="mb-4 flex w-full flex-col items-center justify-between gap-2 md:flex-row">
        <Image
          src={DevconnectLogo}
          alt="Devconnect Logo"
          className="h-[65px] w-auto object-contain"
          sizes="202px"
        />
        <div className="text-center text-white md:text-end">
          <p>
            <span className="font-bold">17 - 22 Nov</span> 2025
          </p>
          <p className="whitespace-nowrap font-bold">Buenos Aires, Argentina</p>
        </div>
      </div>
      <div className="mb-8 max-w-[400px] text-center md:max-w-[640px]">
        <p className="text-3xl font-extrabold text-white [text-shadow:0_4px_8px_rgba(0,0,0,0.65)] md:text-5xl">
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
        className="min-h-0 whitespace-nowrap rounded-none border-b-2 border-b-[#B2820A] bg-[#F6B40E] px-4 text-md/none font-bold uppercase text-black hover:bg-[#B2820A] hover:!text-black active:text-black"
      >
        {t("page-index-devconnect-banner-get-tickets")}
      </ButtonLink>
    </div>
  )
}

export default DevconnectBannerVariation2
