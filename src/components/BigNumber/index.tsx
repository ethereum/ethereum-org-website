import { type ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Info } from "lucide-react"
import { getLocale, getTranslations } from "next-intl/server"

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
} & VariantProps<typeof bigNumberVariants>

const bigNumberVariants = cva("flex shrink-0 flex-col self-stretch py-8", {
  variants: {
    variant: {
      default: "flex-1",
      light: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const valueVariants = cva("font-bold text-4xl", {
  variants: {
    variant: {
      default: "sm:text-5xl",
      light: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const childrenVariants = cva("text-sm", {
  variants: {
    variant: {
      default: "",
      light: "text-body-medium",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const BigNumber = async ({
  children,
  value,
  sourceName,
  sourceUrl,
  lastUpdated,
  className,
  variant,
}: BigNumberProps) => {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: "common" })

  const lastUpdatedDisplay =
    lastUpdated && isValidDate(lastUpdated)
      ? new Intl.DateTimeFormat(locale, {
          dateStyle: "medium",
        }).format(new Date(lastUpdated))
      : ""
  return (
    <div
      data-label="big-number"
      className={cn(bigNumberVariants({ variant }), className)}
    >
      {value ? (
        <>
          <div data-label="value" className={valueVariants({ variant })}>
            {value}
          </div>
          <div className={childrenVariants({ variant })}>
            {children}
            {sourceName && sourceUrl && (
              <>
                &nbsp;
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
                  <Info
                    className="mb-0.5 inline size-3.5 align-text-bottom"
                    aria-label={t("data-provided-by")}
                  />
                </Tooltip>
              </>
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
