import { getTranslations } from "next-intl/server"

import type { TranslationKey } from "@/lib/types"

import { Alert } from "@/components/ui/alert"

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
    <Alert
      role="complementary"
      variant={isShipped ? "success" : "update"}
      // The card keeps its own look: a flat tinted panel with no border,
      // not the alert's bordered row. Overrides go last so they win.
      className={cn(
        "flow w-full flex-col items-stretch gap-0 rounded-base border-0 p-6 text-body shadow-2xl",
        isShipped
          ? "!bg-transparent !bg-tint-success"
          : "!bg-transparent !bg-tint-accent-a"
      )}
    >
      <h2 className="text-sm font-normal uppercase">
        {tCommon("consensus-when-shipping")}
      </h2>
      <p className="text-h2 font-bold">{t(whenKey)}</p>
      <p>{children}</p>
    </Alert>
  )
}

export default UpgradeStatus
