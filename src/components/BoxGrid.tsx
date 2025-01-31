import React, { useState } from "react"

import { cn } from "@/lib/utils/cn"
import { MatomoEventOptions, trackCustomEvent } from "@/lib/utils/matomo"

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
  "#ffe78e",
  "#ef7d7d",
  "#a7d0f4",
  "#6fc4a0",
  "#ffe3d3",
  "#ffa1c3",
  "#a4a4ff",
]

const BoxGrid = ({ items }: BoxGridProps) => {
  const [indexOpen, setOpenIndex] = useState(0)

  return (
    <div className="my-16 grid grid-cols-1 rounded-sm lg:grid-cols-4">
      {items.map((item, idx: number) => {
        let columnNumber = idx + 1
        if (columnNumber > 4) {
          columnNumber = columnNumber - 3
        }
        const colorIdx = hashCode(item.emoji) % colors.length
        const color = colors[colorIdx]
        const isOpen = idx === indexOpen

        return (
          <Flex
            className={cn(
              "cursor-pointer items-center justify-between border border-body p-6 transition-transform duration-500 hover:-skew-x-6 hover:shadow-table-box-hover lg:items-stretch",
              isOpen
                ? [
                    "flex-col text-gray-600 sm:flex-col lg:row-start-1 lg:row-end-3 lg:flex-col",
                    columnNumber === 1 && "lg:col-start-1",
                    columnNumber === 2 && "lg:col-start-2",
                    columnNumber === 3 && "lg:col-start-3",
                    columnNumber === 4 && "lg:col-start-4",
                  ]
                : "flex-col-reverse bg-background text-body hover:bg-background-highlight sm:flex-row-reverse lg:flex-col-reverse"
            )}
            style={{ backgroundColor: isOpen ? color : "" }}
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
              <h3 className="mb-8 mt-0 leading-xs">{item.title}</h3>
              {isOpen && (
                <p className="mb-6 leading-xs text-gray-600">
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
