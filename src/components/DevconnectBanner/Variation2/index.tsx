import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"

import { useTranslation } from "@/hooks/useTranslation"
import DevconnectBanner from "@/public/images/devconnect/devconnect-banner.png"
import DevconnectLogo from "@/public/images/devconnect/devconnect-logo-transparent.png"

const DevconnectBannerVariation2 = () => {
  const { t } = useTranslation("page-index")

  return (
    <div
      className="relative flex w-full flex-col items-center justify-center rounded-[30px] bg-cover bg-center p-8"
      style={{ backgroundImage: `url(${DevconnectBanner.src})` }}
    >
      <div className="mb-4 flex w-full flex-col items-center justify-between gap-2 md:flex-row">
        <Image
          src={DevconnectLogo}
          alt="Devconnect Logo"
          className="h-[65px] w-auto object-contain"
          sizes="202px"
        />
        <div className="text-center font-bold text-white">
          <p>17 - 22 Nov 2025</p>
          <p>Buenos Aires, Argentina</p>
        </div>
      </div>
      <div className="mb-8 max-w-[640px] text-center">
        <p className="text-3xl font-bold text-white [text-shadow:0_4px_8px_rgba(0,0,0,0.65)] md:text-5xl">
          {t(
            "page-index-devconnect-banner-join-the-biggest-ethereum-event-of-the-year"
          )}
        </p>
      </div>
      <ButtonLink
        href="https://devconnect.org/"
        size="sm"
        hideArrow
        className="rounded-none border-b-2 border-b-[#B2820A] bg-[#F6B40E] font-bold uppercase text-[2xs] text-black hover:bg-[#B2820A] hover:!text-black md:text-md"
      >
        {t("page-index-devconnect-banner-get-tickets")}
      </ButtonLink>
    </div>
  )
}

export default DevconnectBannerVariation2
