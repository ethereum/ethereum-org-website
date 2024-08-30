import { useTranslation } from "next-i18next"

import type { ClassNameProp } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

const Title = ({ className }: ClassNameProp) => {
  const { t } = useTranslation("page-index")

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="w-fit rounded-full bg-primary-low-contrast px-4 py-0 text-sm uppercase text-primary">
        {t("common:nav-use-cases-label")}
      </div>
      <h2 className="mb-4 me-4 mt-2 text-5xl font-black xl:mb-6 xl:text-7xl">
        {t("page-index-bento-header")}
      </h2>
    </div>
  )
}

export default Title
