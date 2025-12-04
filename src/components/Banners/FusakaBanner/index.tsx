import { getLocale, getTranslations } from "next-intl/server"

import { LinkBox, LinkOverlay } from "@/components/ui/link-box"

import FusakaCountdown from "./FusakaCountdown"

const FusakaBanner = async () => {
  const locale = getLocale()
  const t = await getTranslations({ locale, namespace: "page-index" })

  return (
    <LinkBox className="w-full bg-[#333369] px-4 py-3 text-center text-white md:p-4 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 md:flex-row md:gap-16">
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-2xl font-extrabold uppercase !leading-none">
            FUSAKA
          </p>
          <p className="text-xs font-bold uppercase text-purple-100 md:text-sm">
            {t("page-index-fusaka-network-upgrade")}
          </p>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-white md:text-sm">
          {t("page-index-fusaka-description")}{" "}
          <LinkOverlay
            href="/roadmap/fusaka"
            className="whitespace-nowrap text-white hover:text-purple-300"
          >
            {t("page-index-fusaka-read-more")}
          </LinkOverlay>
        </p>
        <div className="flex flex-col items-center justify-center gap-2 md:gap-1">
          <p className="hidden text-xs font-bold uppercase leading-tight text-gray-200 md:block">
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
