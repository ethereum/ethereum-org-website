import { forwardRef, useEffect, useRef, useState } from "react"
import { FaCheck } from "react-icons/fa"
import { MdClose } from "react-icons/md"

import EthGlyphSolid from "@/components/icons/eth-glyph-solid.svg"
import Tooltip from "@/components/Tooltip"

import { cn } from "@/lib/utils/cn"
import { isMobile } from "@/lib/utils/isMobile"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { type Pairing, useValuesMarquee } from "../Homepage/useValuesMarquee"
import { Stack } from "../ui/flex"
import {
  Section,
  SectionContent,
  SectionHeader,
  SectionTag,
} from "../ui/section"

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"
import { useRtlFlip } from "@/hooks/useRtlFlip"

type ItemProps = React.HTMLAttributes<HTMLButtonElement> & {
  pairing: Pairing
  separatorClass: string
  container?: HTMLElement | null
  label: string
  eventCategory: string
  direction: HTMLDivElement["dir"]
}

const Item = ({
  children,
  className,
  pairing,
  separatorClass,
  container,
  label,
  eventCategory,
  direction,
}: ItemProps) => (
  <>
    <Tooltip
      container={container}
      onBeforeOpen={() => {
        trackCustomEvent({
          eventCategory,
          eventAction: "internet_changing",
          eventName: label,
        })
      }}
      content={
        <Stack>
          <h3 className="text-md text-body-medium dark:text-gray-300">
            {label}
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 text-body-medium">
              <div className="p-1 text-lg">
                <MdClose />
              </div>
              <div>
                {pairing.legacy.content.map((line) => (
                  <p key={line} className="text-sm">
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex gap-2 text-body">
              <div className="p-1 text-lg">
                <EthGlyphSolid />
              </div>
              <div className="flex flex-col gap-2">
                {pairing.ethereum.content.map((line) => (
                  <p key={line} className="text-sm">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Stack>
      }
    >
      <div
        className={cn(
          "flex flex-nowrap items-center text-nowrap rounded-full px-4 py-1 font-bold uppercase",
          className
        )}
        dir={direction}
      >
        {children}
      </div>
    </Tooltip>
    <div
      className={cn(
        "h-1.5 min-w-1.5 rounded-full motion-reduce:last:hidden",
        separatorClass
      )}
    />
  </>
)
Item.displayName = "MarqueeItem"

type RowProps = React.HTMLAttributes<HTMLDivElement> & {
  toRight?: boolean
}

const Row = forwardRef<HTMLDivElement, RowProps>(
  ({ className, children, toRight }, ref) => {
    const { prefersReducedMotion } = usePrefersReducedMotion()

    const fadeEdges = {
      mask: `linear-gradient(to right, transparent 1rem, white 15%, white 85%, transparent calc(100% - 1rem))`,
    }

    return (
      // Note: dir="ltr" forced on parent to prevent "translateX" animation bugs
      // Locale "direction" passed to marquee Item for correction
      <div ref={ref} className={cn("group", className)} dir="ltr">
        <div
          className="flex max-w-full overflow-hidden motion-reduce:overflow-auto"
          style={prefersReducedMotion ? {} : fadeEdges}
        >
          {Array(prefersReducedMotion ? 1 : 3)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex min-w-fit items-center space-x-10 px-6 py-8 motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center",
                  isMobile()
                    ? "group-has-[button:hover]:animate-pause"
                    : "group-hover:animate-pause",
                  toRight ? "animate-scroll-right" : "animate-scroll-left"
                )}
              >
                {children}
              </div>
            ))}
        </div>
      </div>
    )
  }
)
Row.displayName = "MarqueeRow"

const ValuesMarquee = () => {
  const { t, pairings, eventCategory } = useValuesMarquee()
  const containerFirstRef = useRef<HTMLDivElement>(null)
  const containerSecondRef = useRef<HTMLDivElement>(null)

  const [containerFirst, setContainerFirst] = useState<HTMLDivElement | null>(
    null
  )
  const [containerSecond, setContainerSecond] = useState<HTMLDivElement | null>(
    null
  )

  useEffect(() => {
    if (containerFirstRef.current) {
      setContainerFirst(containerFirstRef.current)
    }
    if (containerSecondRef.current) {
      setContainerSecond(containerSecondRef.current)
    }
  }, [])

  const { direction, isRtl, twFlipForRtl } = useRtlFlip()

  return (
    <Section id="values" className="!sm:my-64 !my-48 scroll-m-48">
      <SectionContent className="flex flex-col items-center text-center">
        <SectionTag>{t("page-index:page-index-values-tag")}</SectionTag>
        <SectionHeader>
          {t("page-index:page-index-values-header")}
        </SectionHeader>
        <p className="text-lg text-body-medium">
          {t("page-index:page-index-values-description")}
        </p>
      </SectionContent>
      <div className="relative mt-19 overflow-hidden max-2xl:-mx-4 2xl:rounded-2xl">
        <Row
          ref={containerFirstRef}
          className="border-b border-background bg-blue-50 dark:bg-blue-600"
        >
          {pairings.map((pairing) => (
            <Item
              key={pairing.ethereum.label}
              label={pairing.ethereum.label}
              container={containerFirst}
              pairing={pairing}
              separatorClass="bg-accent-a"
              className="group/item bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700"
              eventCategory={eventCategory}
              direction={direction}
            >
              <FaCheck className="me-1 text-success group-hover/item:text-white" />
              {pairing.ethereum.label}
            </Item>
          ))}
        </Row>

        <Row
          ref={containerSecondRef}
          className="border-t border-background bg-gray-50 dark:bg-gray-800"
          toRight
        >
          {pairings.map((pairing) => (
            <Item
              key={pairing.legacy.label}
              label={pairing.legacy.label}
              container={containerSecond}
              pairing={pairing}
              className="bg-gray-200/20 text-body-medium hover:bg-gray-600 hover:text-white dark:bg-gray-950 dark:text-body"
              separatorClass="bg-gray-200 dark:bg-gray-950"
              eventCategory={eventCategory}
              direction={direction}
            >
              {pairing.legacy.label}
            </Item>
          ))}
        </Row>

        <div
          className={cn(
            "absolute start-[50%] top-[50%] flex -translate-y-[50%] items-center overflow-hidden rounded-lg text-sm font-bold",
            isRtl ? "translate-x-[50%]" : "-translate-x-[50%]"
          )}
        >
          <p className="bg-gray-50 px-4 py-1 text-body-medium dark:bg-gray-800 dark:text-gray-200">
            {t("page-index-values-legacy")}
          </p>

          <div
            className={cn(
              "border-t-[15px] border-t-blue-50 dark:border-t-blue-600",
              "border-r-8 border-r-blue-50 dark:border-r-blue-600",
              "border-b-[15px] border-b-gray-50 dark:border-b-gray-800",
              "border-l-8 border-l-gray-50 dark:border-l-gray-800",
              twFlipForRtl
            )}
          />

          <p className="bg-blue-50 px-4 py-1 text-accent-a dark:bg-blue-600 dark:text-white">
            {t("common:ethereum")}
          </p>
        </div>
      </div>
    </Section>
  )
}
ValuesMarquee.displayName = "ValuesMarquee"

export default ValuesMarquee
