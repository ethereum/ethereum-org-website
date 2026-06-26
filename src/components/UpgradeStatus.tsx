import { getTranslations } from "next-intl/server"

import type { TranslationKey } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

export type UpgradeStatusProps = {
  dateKey: TranslationKey
  isShipped?: boolean
  children?: React.ReactNode
}

const UpgradeStatus = async ({
  dateKey,
  isShipped,
  children,
}: UpgradeStatusProps) => {
  const ns = "page-upgrades"
  const t = await getTranslations(ns)
  const tCommon = await getTranslations("common")

  const split = dateKey.split(ns + ":")
  const whenKey = split[split.length - 1]

  return (
    <aside
      className={cn(
        "flow w-full rounded-base p-6 shadow-2xl",
        isShipped ? "bg-tint-success" : "bg-tiny-accent-a"
      )}
    >
      <h2 className="text-sm font-normal uppercase">
        {tCommon("consensus-when-shipping")}
      </h2>
      <p className="text-h2 font-bold">{t(whenKey)}</p>
      <p>{children}</p>
    </aside>
  )
}

export default UpgradeStatus
