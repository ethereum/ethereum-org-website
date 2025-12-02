import { getLocale, getTranslations } from "next-intl/server"

import { LinkBox, LinkOverlay } from "@/components/ui/link-box"

import FusakaCountdown from "./FusakaCountdown"

const FusakaBanner = async () => {
  const locale = getLocale()
  const t = await getTranslations({ locale, namespace: "page-index" })

  return (
    <LinkBox className="w-full bg-[#333369] p-2 text-center text-white md:p-4 md:px-8">
      <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-16">
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
          <FusakaCountdown liveNowText={t("page-index-fusaka-live-now")} />
        </div>
      </div>
    </LinkBox>
  )
}

export default FusakaBanner
