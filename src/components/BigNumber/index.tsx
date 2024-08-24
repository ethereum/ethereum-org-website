import { type ReactNode } from "react"
import { useTranslation } from "next-i18next"
import { MdInfoOutline } from "react-icons/md"

import { cn } from "@/lib/utils/cn"

import Tooltip from "../Tooltip"
import Link from "../ui/Link"

type BigNumberProps = {
  children: ReactNode
  value?: ReactNode
  sourceName?: string
  sourceUrl?: string
  className?: string
}

const BigNumber = ({
  children,
  value,
  sourceName,
  sourceUrl,
  className,
}: BigNumberProps) => {
  const { t } = useTranslation("common")
  return (
    <div
      className={cn(
        "flex flex-1 shrink-0 flex-col self-stretch py-8",
        className
      )}
    >
      {value ? (
        <>
          <div className="text-5xl font-bold">{value}</div>
          <div className="text-sm">
            {children}
            {sourceName && sourceUrl && (
              <Tooltip
                content={
                  <>
                    {t("data-provided-by")}{" "}
                    <Link href={sourceUrl}>{sourceName}</Link>
                  </>
                }
              >
                <MdInfoOutline className="mb-0.5 ms-2 inline align-text-bottom" />
              </Tooltip>
            )}
          </div>
        </>
      ) : (
        <span className="text-3xl">{t("loading-error-refresh")}</span>
      )}
    </div>
  )
}
export default BigNumber
