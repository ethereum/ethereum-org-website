"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

import type { MatomoEventOptions } from "@/lib/types"

import { ButtonLink } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

export interface TabNavItem {
  key: string
  label: string
  href: string
  icon?: ReactNode
}

interface TabNavProps {
  items: TabNavItem[]
  activeKey: string
  className?: string
  itemClassName?: string
  showActiveBackground?: boolean
  useMotion?: boolean
  motionLayoutId?: string
  customEventOptions?: Pick<MatomoEventOptions, "eventCategory" | "eventAction">
}

const TabNav = ({
  items,
  activeKey,
  className,
  itemClassName,
  showActiveBackground = true,
  useMotion = false,
  motionLayoutId = "active-section-highlight",
  customEventOptions,
}: TabNavProps) => (
  <div className="flex w-full justify-center">
    <nav
      className={cn(
        "flex w-full max-w-fit gap-1 overflow-x-auto rounded-2xl bg-background p-0.5 shadow md:border md:shadow-lg lg:w-auto",
        className
      )}
    >
      {items.map((item) => {
        const isActive = activeKey.toLowerCase() === item.key.toLowerCase()
        return (
          <ButtonLink
            key={item.key}
            href={item.href}
            variant="ghost"
            isSecondary
            className={cn(
              "relative flex-shrink-0 text-nowrap rounded-xl px-4 py-2 text-sm [&_svg]:shrink-0 [&_svg]:text-sm",
              isActive && "!text-primary",
              itemClassName
            )}
            customEventOptions={
              customEventOptions
                ? {
                    ...customEventOptions,
                    eventName: item.key,
                  }
                : undefined
            }
          >
            {showActiveBackground &&
              isActive &&
              (useMotion ? (
                <motion.div
                  layoutId={motionLayoutId}
                  className="absolute inset-0 z-0 rounded-xl bg-primary-low-contrast"
                />
              ) : (
                <div className="absolute inset-0 z-0 rounded-xl bg-primary-low-contrast" />
              ))}
            {item.icon && <span className="relative z-10">{item.icon}</span>}
            <span className="relative z-10">{item.label}</span>
          </ButtonLink>
        )
      })}
    </nav>
  </div>
)

export default TabNav
