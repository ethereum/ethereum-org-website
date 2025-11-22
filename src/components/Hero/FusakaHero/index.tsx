import { getLocale, getTranslations } from "next-intl/server"

import LanguageMorpher from "@/components/Homepage/LanguageMorpher"
import { Image } from "@/components/Image"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"

import FusakaCountdown from "./FusakaCountdown"

import RoadmapFusakaImage from "@/public/images/roadmap/roadmap-fusaka.png"

const FusakaHero = async () => {
  const locale = getLocale()
  const t = await getTranslations({ locale, namespace: "page-index" })

  return (
    <div className="relative w-full">
      <LinkBox className="bg-[#333369] p-2 text-center text-white md:p-4 md:px-8">
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row md:gap-16">
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl font-extrabold uppercase !leading-none md:text-2xl">
              FUSAKA
            </p>
            <p className="text-sm font-bold uppercase text-purple-100">
              {t("page-index-fusaka-network-upgrade")}
            </p>
          </div>
          <p className="text-xs text-white md:text-sm">
            {t("page-index-fusaka-description")}{" "}
            <LinkOverlay
              href="/roadmap/fusaka"
              className="text-white hover:text-purple-300"
            >
              {t("page-index-fusaka-read-more")}
            </LinkOverlay>
            .
          </p>
          <div className="flex flex-row items-center justify-center gap-4 md:mt-0 md:flex-col md:gap-0">
            <p className="text-xs font-bold uppercase text-gray-200">
              {t.rich("page-index-fusaka-going-live-in", {
                br: () => <br className="md:hidden" />,
              })}
            </p>
            <FusakaCountdown />
          </div>
        </div>
      </LinkBox>

      <div className="relative z-0 h-[240px] overflow-hidden md:h-[480px]">
        <Image
          src={RoadmapFusakaImage}
          alt="Fusaka Hero"
          className="h-full w-full object-cover"
          priority
        />
      </div>

      <div className="flex flex-col items-center px-4 py-10 text-center">
        <LanguageMorpher />
        <div className="flex flex-col items-center gap-y-5 md:max-w-2xl">
          <h1 className="font-black">{t("page-index-title")}</h1>
          <p className="max-w-96 text-md text-body-medium md:text-lg">
            {t("page-index-description")}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FusakaHero
