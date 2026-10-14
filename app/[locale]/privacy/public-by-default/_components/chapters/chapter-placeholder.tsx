import { getTranslations } from "next-intl/server"

import { SkeletonLines } from "@/components/ui/skeleton"

// TEMPORARY: shown until each chapter is built; removed at the end of step 3-12
const ChapterPlaceholder = async () => {
  const t = await getTranslations("page-privacy-public-by-default")
  return (
    <div className="rounded-base border border-dashed p-6">
      <p className="mb-4 text-sm text-body-medium">
        {t("page-privacy-public-by-default-nav-chapter-placeholder")}
      </p>
      <SkeletonLines noOfLines={4} />
    </div>
  )
}

export default ChapterPlaceholder
