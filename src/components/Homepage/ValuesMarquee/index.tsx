"use client"

import { forwardRef, useCallback, useRef, useState } from "react"
import { Check, X } from "lucide-react"

import type { ValuesPairing } from "@/lib/types"

import EthGlyphSolid from "@/components/icons/eth-glyph-solid.svg"
import Tooltip from "@/components/Tooltip"

import { cn } from "@/lib/utils/cn"
import { isMobile } from "@/lib/utils/isMobile"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { Stack } from "../../ui/flex"

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"
import { useRtlFlip } from "@/hooks/useRtlFlip"

type ItemProps = React.HTMLAttributes<HTMLButtonElement> & {
  pairing: ValuesPairing
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
}: ItemProps) => {
  // Debounce tracking events to prevent excessive calls
  const debouncedTrack = useCallback(() => {
    trackCustomEvent({
      eventCategory,
      eventAction: "internet_changing",
      eventName: label,
    })
  }, [eventCategory, label])

  return (
    <>
      <Tooltip
        container={container}
        onBeforeOpen={debouncedTrack}
        content={
          <Stack>
            <h3 className="text-md text-body-medium dark:text-gray-300">
              {label}
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 text-body-medium">
                <div className="p-1 text-lg">
                  <X />
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
}
Item.displayName = "MarqueeItem"

type RowProps = React.HTMLAttributes<HTMLDivElement> & {
  toRight?: boolean
}

const Row = forwardRef<HTMLDivElement, RowProps>(
  ({ className, children, toRight }, ref) => {
    const { prefersReducedMotion } = usePrefersReducedMotion()
    const [isVisible, setIsVisible] = useState(true)

    const { ref: intersectionRef } = useIntersectionObserver({
      threshold: 0.1,
      onChange: setIsVisible,
    })

    // Combine refs
    const combinedRef = useCallback(
      (node: HTMLDivElement | null) => {
        if (ref) {
          if (typeof ref === "function") {
            ref(node)
          } else {
            ref.current = node
          }
        }
        intersectionRef(node)
      },
      [ref, intersectionRef]
    )

    // Move mask to CSS for better performance

    return (
      // Note: dir="ltr" forced on parent to prevent "translateX" animation bugs
      // Locale "direction" passed to marquee Item for correction
      <div ref={combinedRef} className={cn("group", className)} dir="ltr">
        <div
          className={cn(
            "flex max-w-full overflow-hidden motion-reduce:overflow-auto",
            !prefersReducedMotion &&
              "[mask-image:linear-gradient(to_right,transparent_1rem,white_15%,white_85%,transparent_calc(100%-1rem))]"
          )}
        >
          {Array(prefersReducedMotion ? 1 : 2)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex min-w-fit items-center space-x-10 px-6 py-8 motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center",
                  isMobile()
                    ? "group-has-[button:hover]:animate-pause"
                    : "group-hover:animate-pause",
                  !isVisible || prefersReducedMotion
                    ? ""
                    : toRight
                      ? "animate-scroll-right"
                      : "animate-scroll-left"
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

type ValuesMarqueeProps = {
  pairings: ValuesPairing[]
  eventCategory: string
  categoryLabels: {
    ethereum: string
    legacy: string
  }
}

const ValuesMarquee = ({
  pairings,
  eventCategory,
  categoryLabels,
}: ValuesMarqueeProps) => {
  const containerFirstRef = useRef<HTMLDivElement>(null)
  const containerSecondRef = useRef<HTMLDivElement>(null)

  // Optimize container access - use direct refs instead of state
  const getContainer = useCallback((ref: React.RefObject<HTMLDivElement>) => {
    return ref.current
  }, [])

  const { direction, isRtl, twFlipForRtl } = useRtlFlip()

  return (
    <div className="relative mt-19 overflow-hidden max-2xl:-mx-4 2xl:rounded-2xl">
      <Row
        ref={containerFirstRef}
        className="border-b border-background bg-blue-50 dark:bg-blue-600"
      >
        {pairings.map((pairing) => (
          <Item
            key={pairing.ethereum.label}
            label={pairing.ethereum.label}
            container={getContainer(containerFirstRef)}
            pairing={pairing}
            separatorClass="bg-accent-a"
            className="group/item bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700"
            eventCategory={eventCategory}
            direction={direction}
          >
            <Check
              className="me-1 size-[1em] stroke-[4.5] text-success group-hover/item:text-white"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
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
            container={getContainer(containerSecondRef)}
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
          {categoryLabels.legacy}
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
          {categoryLabels.ethereum}
        </p>
      </div>
    </div>
  )
}
ValuesMarquee.displayName = "ValuesMarquee"

export default ValuesMarquee
