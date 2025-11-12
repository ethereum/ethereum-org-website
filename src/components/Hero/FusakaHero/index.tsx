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
      <div className="relative z-0 h-[240px] overflow-hidden md:h-[380px] lg:h-[480px]">
        <Image
          src={RoadmapFusakaImage}
          alt="Fusaka Hero"
          className="h-full w-full object-cover"
          priority
        />
      </div>

      <LinkBox className="duration-50 -mt-1 rounded-none border border-[rgba(0,0,0,0.08)] bg-[#333369]/95 p-4 text-center text-white transition-shadow lg:mx-8 lg:-mt-14 lg:rounded-2xl lg:border-[#C8B2F5] lg:shadow-[0_10px_10px_0_rgba(108,30,210,0.51)] lg:hover:shadow-[0_20px_10px_5px_rgba(108,30,210,0.51)]">
        <div className="flex flex-col items-center justify-between gap-2 lg:flex-row lg:gap-16">
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl font-extrabold uppercase !leading-none lg:text-5xl">
              FUSAKA
            </p>
            <p className="text-sm font-bold uppercase text-purple-100">
              Network upgrade
            </p>
          </div>
          <p className="text-xs text-white lg:text-sm">
            For a faster, safer, and more user-friendly Ethereum network |{" "}
            <LinkOverlay
              href="/roadmap/fusaka"
              className="text-white hover:text-purple-300"
            >
              Read more
            </LinkOverlay>
            .
          </p>
          <div className="flex flex-row items-center justify-center gap-4 lg:mt-0 lg:flex-col lg:gap-0">
            <p className="text-xs font-bold uppercase text-gray-200">
              Going
              <br className="lg:hidden" /> live in
            </p>
            <FusakaCountdown />
          </div>
        </div>
      </LinkBox>

      <div className="flex flex-col items-center px-4 py-10 text-center">
        <LanguageMorpher />
        <div className="flex flex-col items-center gap-y-5 lg:max-w-2xl">
          <h1 className="font-black">{t("page-index-title")}</h1>
          <p className="max-w-96 text-md text-body-medium lg:text-lg">
            {t("page-index-description")}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FusakaHero
