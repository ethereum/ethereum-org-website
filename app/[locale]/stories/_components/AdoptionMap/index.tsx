import { getTranslations } from "next-intl/server"

import WorldMap from "./WorldMap"

const AdoptionMap = async () => {
  const t = await getTranslations("page-stories")

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
      <div className="flex flex-col gap-3 lg:w-1/3">
        <h2>{t("page-stories-adoption-title")}</h2>
        <p className="text-lg text-body-medium">
          {t("page-stories-adoption-description")}
        </p>
      </div>
      <div className="lg:w-2/3">
        <WorldMap />
      </div>
    </div>
  )
}

export default AdoptionMap
