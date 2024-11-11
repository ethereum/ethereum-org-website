import { useTranslation } from "next-i18next"

import type { TranslationKey } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

export type UpgradeStatusProps = {
  children?: React.ReactNode
  dateKey: TranslationKey
  isShipped?: boolean
}

const UpgradeStatus = ({
  dateKey,
  children,
  isShipped = false,
}: UpgradeStatusProps) => {
  const { t } = useTranslation("page-staking")

  return (
    <aside
      className={cn(
        "my-8 flex w-full flex-col gap-6 rounded p-6 shadow-2xl lg:mt-0",
        "bg-black/80 bg-gradient-to-b from-accent-c/10",
        "dark:border-2 dark:bg-gray-700 dark:from-transparent",
        isShipped
          ? "bg-success-light dark:border-success"
          : "bg-accent-a/20 dark:border-primary"
      )}
    >
      <h2 className="text-sm font-normal uppercase">
        {t("common:consensus-when-shipping")}
      </h2>
      <p className="mb-6 text-4xl font-bold leading-none">{t(dateKey)}</p>
      <p className="text-xl">{children}</p>
    </aside>
  )
}

export default UpgradeStatus
