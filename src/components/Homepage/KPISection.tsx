"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowLeftRight, User } from "lucide-react"
import { useIntersectionObserver } from "usehooks-ts"

import { Section, SectionHeader, SectionTag } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"

type KPISectionProps = {
  accountHolders: number | null
  transactionsToday: number | null
  className?: string
}

// ~2,914 transactions every 12 seconds across Ethereum + major L2s
// Based on L2BEAT daily averages for Base, Arbitrum One, OP Mainnet, Starknet, Scroll, Linea, ZKsync Era
const TRANSACTIONS_PER_INTERVAL = 2914
const INTERVAL_MS = 12_000
const ANIMATION_DURATION_MS = 2000

/**
 * Hook that returns an incrementing transaction count
 * Adds ~2,914 transactions every 12 seconds when visible
 * Returns null if initialValue is null (error state)
 */
function useIncrementalCounter(
  initialValue: number | null,
  isVisible: boolean
): number | null {
  const [target, setTarget] = useState(initialValue)

  // Sync with new initial value when it changes
  useEffect(() => {
    setTarget(initialValue)
  }, [initialValue])

  // Increment counter every 12 seconds when visible (only if we have a valid value)
  useEffect(() => {
    if (!isVisible || initialValue === null) return

    const interval = setInterval(() => {
      setTarget((prev) =>
        prev !== null ? prev + TRANSACTIONS_PER_INTERVAL : null
      )
    }, INTERVAL_MS)

    return () => clearInterval(interval)
  }, [isVisible, initialValue])

  return target
}

/**
 * AnimatedNumber component - animates smoothly to target value
 * Respects prefers-reduced-motion
 */
function AnimatedNumber({
  value,
  formatter,
  className,
}: {
  value: number
  formatter: (n: number) => string
  className?: string
}) {
  const [displayValue, setDisplayValue] = useState(value)
  const animationRef = useRef<number | null>(null)
  const previousValue = useRef(value)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    // If reduced motion or first render, show value immediately
    if (prefersReducedMotion || previousValue.current === value) {
      setDisplayValue(value)
      previousValue.current = value
      return
    }

    // Cancel any ongoing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    const startValue = displayValue
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / ANIMATION_DURATION_MS, 1)

      // Ease-out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(
        startValue + (value - startValue) * easedProgress
      )

      setDisplayValue(current)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        animationRef.current = null
      }
    }

    animationRef.current = requestAnimationFrame(animate)
    previousValue.current = value

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <p className={className}>{formatter(displayValue)}</p>
}

/**
 * Format large numbers with M/B suffix
 */
function formatNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`
  }
  if (value >= 1_000_000) {
    return `${Math.round(value / 1_000_000)}M`
  }
  if (value >= 1_000) {
    return new Intl.NumberFormat("en-US").format(value)
  }
  return value.toString()
}

/**
 * Format transaction count with spaces (European style: 21 400 433)
 */
function formatTransactions(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

const KPISection = ({
  accountHolders,
  transactionsToday,
  className,
}: KPISectionProps) => {
  const { ref: intersectionRef, isIntersecting: isVisible } =
    useIntersectionObserver({
      threshold: 0.3,
      freezeOnceVisible: true,
    })

  const liveTransactions = useIncrementalCounter(transactionsToday, isVisible)

  return (
    <Section
      ref={intersectionRef}
      className={cn(
        "flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between",
        className
      )}
    >
      <div className="flex w-full flex-col gap-10 lg:max-w-[823px]">
        <div className="flex flex-col gap-2">
          <SectionTag variant="plain">The user-owned internet</SectionTag>

          <SectionHeader className="!mb-0 !mt-0">
            Ethereum gives back control of your assets
          </SectionHeader>
        </div>

        <p className="text-lg leading-relaxed text-body-medium lg:text-2xl lg:leading-[39px]">
          Your bank account is an entry in someone else&apos;s database. Your
          application is a file in someone else&apos;s server. Ethereum is an
          alternative network where you hold your assets directly.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-20">
        <div className="hidden h-[267px] w-px bg-border lg:block" />

        <div className="flex w-[243px] flex-col gap-8">
          <div className="flex items-start gap-3">
            <User
              className="mt-[5.5px] size-8 text-body-medium"
              strokeWidth={1.5}
            />
            <div className="flex flex-col gap-1">
              <p className="text-4xl font-bold leading-[1.2]">
                {accountHolders !== null ? formatNumber(accountHolders) : "—"}
              </p>
              <p className="text-base leading-[1.6] text-body-medium">
                ETH holders
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ArrowLeftRight
              className="mt-[5.5px] size-8 text-body-medium"
              strokeWidth={1.5}
            />
            <div className="flex flex-col gap-1">
              {liveTransactions !== null ? (
                <AnimatedNumber
                  value={liveTransactions}
                  formatter={formatTransactions}
                  className="text-4xl font-bold leading-[1.2]"
                />
              ) : (
                <p className="text-4xl font-bold leading-[1.2]">—</p>
              )}
              <p className="text-base leading-[1.6] text-body-medium">
                Transactions today
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default KPISection
