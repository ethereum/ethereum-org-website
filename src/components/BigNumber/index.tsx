import { type ReactNode } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { MdInfoOutline } from "react-icons/md"

import { cn } from "@/lib/utils/cn"
import { isValidDate } from "@/lib/utils/date"

import Tooltip from "../Tooltip"
import Link from "../ui/Link"

type BigNumberProps = {
  children: ReactNode
  value?: ReactNode
  sourceName?: string
  sourceUrl?: string
  lastUpdated?: number | string
  className?: string
}

const BigNumber = ({
  children,
  value,
  sourceName,
  sourceUrl,
  lastUpdated,
  className,
}: BigNumberProps) => {
  const { t } = useTranslation("common")
  const { locale } = useRouter()
  const lastUpdatedDisplay =
    lastUpdated && isValidDate(lastUpdated)
      ? new Intl.DateTimeFormat(locale, {
          dateStyle: "medium",
        }).format(new Date(lastUpdated))
      : ""
  return (
    <div
      className={cn(
        "flex flex-1 shrink-0 flex-col self-stretch py-8",
        className
      )}
    >
      {value ? (
        <>
          <div className="text-4xl font-bold sm:text-5xl">{value}</div>
          <div className="text-sm">
            {children}
            {sourceName && sourceUrl && (
              <Tooltip
                content={
                  <>
                    <p>
                      {t("data-provided-by")}{" "}
                      <Link href={sourceUrl}>{sourceName}</Link>
                    </p>
                    {lastUpdated && (
                      <p className="mt-2">
                        {t("last-updated")}: {lastUpdatedDisplay}
                      </p>
                    )}
                  </>
                }
              >
                <MdInfoOutline className="mb-0.5 ms-2 inline align-text-bottom" />
              </Tooltip>
            )}
          </div>
        </>
      ) : (
        <span className="pt-4 text-md text-body-medium">
          {t("loading-error-refresh")}
        </span>
      )}
    </div>
  )
}
export default BigNumber
