import { type ReactNode } from "react"
import { Info } from "lucide-react"
import { getLocale, getTranslations } from "next-intl/server"
import { tv, type VariantProps } from "tailwind-variants"

import { cn } from "@/lib/utils/cn"
import { dateTimeFormat, isValidDate } from "@/lib/utils/date"

import Tooltip from "../Tooltip"
import Link from "../ui/Link"

const bigNumberVariants = tv({
  slots: {
    root: "flex shrink-0 flex-col",
    valueSlot: "text-4xl font-bold",
    label: "text-sm",
    icon: "mb-0.5 inline size-3.5 align-text-bottom",
  },
  variants: {
    variant: {
      default: {
        root: "flex-1 self-stretch py-8",
        valueSlot: "sm:text-5xl",
      },
      light: {
        root: "self-stretch py-8",
        label: "text-body-medium",
      },
      // Start-ruled cell, monospace primary value, uppercase label
      ruled: {
        root: "gap-2 border-s p-4 pe-12",
        valueSlot: "font-monospace text-3xl text-primary",
        label: "uppercase",
        icon: "mb-0 size-[1em] align-[-0.125em] hover:text-primary",
      },
    },
    center: { true: { root: "mx-auto items-center text-center" } },
  },
  defaultVariants: {
    variant: "default",
    center: true,
  },
})

type BigNumberProps = {
  children: ReactNode
  value?: ReactNode
  sourceName?: string
  sourceUrl?: string
  /** Extra context shown above the attribution in the source tooltip */
  sourceDescription?: ReactNode
  lastUpdated?: number | string
  className?: string
} & VariantProps<typeof bigNumberVariants>

const BigNumber = async ({
  children,
  value,
  sourceName,
  sourceUrl,
  sourceDescription,
  lastUpdated,
  className,
  variant,
  center,
}: BigNumberProps) => {
  const locale = await getLocale()
  const t = await getTranslations("common")

  const { root, valueSlot, label, icon } = bigNumberVariants({
    variant,
    center,
  })

  const lastUpdatedDisplay =
    lastUpdated && isValidDate(lastUpdated)
      ? dateTimeFormat(locale, {
          dateStyle: "medium",
        }).format(new Date(lastUpdated))
      : ""
  return (
    <div
      data-label="big-number"
      className={cn(root(), className)}
      itemScope
      itemType="https://schema.org/Observation"
    >
      {value ? (
        <>
          <div data-label="value" className={valueSlot()} itemProp="value">
            {value}
          </div>
          <div className={label()}>
            <span itemProp="name">{children}</span>
            {sourceName && sourceUrl && (
              <>
                &nbsp;
                <Tooltip
                  content={
                    <div className="normal-case">
                      {sourceDescription && <p>{sourceDescription}</p>}
                      <p>
                        {t("data-provided-by")}{" "}
                        <Link href={sourceUrl}>{sourceName}</Link>
                      </p>
                      {lastUpdated && (
                        <p className="mt-2">
                          {t("last-updated")}: {lastUpdatedDisplay}
                        </p>
                      )}
                    </div>
                  }
                >
                  <Info className={icon()} aria-label={t("data-provided-by")} />
                </Tooltip>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div
            data-label="value"
            className={valueSlot()}
            aria-label={t("loading-error-refresh")}
          >
            —
          </div>
          <div className={label()}>
            <span>{children}</span>
          </div>
        </>
      )}
    </div>
  )
}
export default BigNumber
