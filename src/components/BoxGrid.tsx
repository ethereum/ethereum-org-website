import React, { useState } from "react"

import type { MatomoEventOptions } from "@/lib/types"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { Flex } from "./ui/flex"
import Emoji from "./Emoji"

export interface BoxItem {
  emoji: string
  title: string
  description: string
  matomo: MatomoEventOptions
}

export type BoxGridProps = {
  items: Array<BoxItem>
}

// Represent string as 32-bit integer
const hashCode = (stringPhrase: string): number => {
  let hash = 0
  for (const char of stringPhrase) {
    const code = char.charCodeAt(0)
    hash = (hash << 5) - hash + code
    hash |= 0
  }
  return Math.abs(hash)
}

// Theme variables from Theme.js
const colors = [
  "bg-[#ffe78e]",
  "bg-[#ef7d7d]",
  "bg-[#a7d0f4]",
  "bg-[#6fc4a0]",
  "bg-[#ffe3d3]",
  "bg-[#ffa1c3]",
  "bg-[#a4a4ff]",
]

const BoxGrid = ({ items }: BoxGridProps) => {
  const [indexOpen, setOpenIndex] = useState(0)

  return (
    <div className="my-16 grid grid-cols-1 rounded-xs lg:grid-cols-4">
      {items.map((item, idx: number) => {
        const colorIdx = hashCode(item.emoji) % colors.length
        const color = colors[colorIdx]
        const isOpen = idx === indexOpen

        return (
          <Flex
            className={cn(
              "border-body hover:shadow-table-box-hover cursor-pointer items-center justify-between border p-6 transition-transform duration-500 hover:-skew-x-6 lg:items-stretch",
              isOpen
                ? `flex-col text-gray-600 sm:flex-col lg:row-start-1 lg:row-end-3 lg:flex-col ${color}`
                : "bg-background text-body hover:bg-background-highlight flex-col-reverse sm:flex-row-reverse lg:flex-col-reverse"
            )}
            onClick={() => {
              setOpenIndex(idx)
              trackCustomEvent({
                eventCategory: item.matomo.eventCategory,
                eventAction: item.matomo.eventAction,
                eventName: item.matomo.eventName,
              })
            }}
            key={idx}
          >
            <Emoji
              className={cn(
                "m-2 text-8xl",
                isOpen
                  ? "mb-8"
                  : "self-center hover:rotate-12 hover:duration-500"
              )}
              text={item.emoji}
            />
            <div>
              <h3 className="leading-xs mt-0 mb-8 text-[2.5rem] font-normal">
                {item.title}
              </h3>
              {isOpen && (
                <p className="leading-xs mb-6 text-xl text-gray-600">
                  {item.description}
                </p>
              )}
            </div>
          </Flex>
        )
      })}
    </div>
  )
}

export default BoxGrid
