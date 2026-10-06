import { getLocale, getTranslations } from "next-intl/server"

import { cn } from "@/lib/utils/cn"
import { formatDateRangeToParts } from "@/lib/utils/date"

import { DEVCON_INDIA_END_DATE, DEVCON_INDIA_START_DATE } from "@/lib/constants"

type Breakpoint = "md" | "xl"

type DevconDateLocationProps = {
  className?: string
  longMonthBreakpoint?: Breakpoint
}
const DevconDateLocation = async ({
  longMonthBreakpoint = "md",
  className,
}: DevconDateLocationProps) => {
  const locale = await getLocale()
  const tDevcon = await getTranslations("component-devcon-banner")
  const hiddenClassNames: Record<Breakpoint, [string, string]> = {
    md: ["md:hidden", "max-md:hidden"],
    xl: ["xl:hidden", "max-xl:hidden"],
  }
  return (
    <div className={cn("flex flex-col text-start text-nowrap", className)}>
      <div>
        {(["short", "long"] as const).map((month) => (
          <span
            key={month}
            className={
              month === "short"
                ? hiddenClassNames[longMonthBreakpoint][0]
                : hiddenClassNames[longMonthBreakpoint][1]
            }
          >
            {formatDateRangeToParts(
              DEVCON_INDIA_START_DATE,
              DEVCON_INDIA_END_DATE,
              locale,
              { day: "2-digit", month, year: "numeric", timeZone: "UTC" }
            ).map(({ type, value }, idx) => (
              <span
                key={idx}
                className={type === "year" ? undefined : "font-semibold"}
              >
                {value}
              </span>
            ))}
          </span>
        ))}
      </div>
      <div className="font-semibold">{tDevcon("location")}</div>
    </div>
  )
}

export default DevconDateLocation
