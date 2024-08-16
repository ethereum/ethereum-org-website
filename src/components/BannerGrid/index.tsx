import React from "react"

import { ChildOnlyProp } from "@/lib/types"

import { Flex } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

export const Banner = ({ children }: ChildOnlyProp) => {
  return (
    <Flex className="flex-col flex-nowrap bg-banner-grid-gradient lg:flex-row [&_h2]:mt-0 [&_ul]:mb-0">
      {children}
    </Flex>
  )
}

export const BannerBody = ({ children }: ChildOnlyProp) => {
  return (
    <div className="flex-shrink-[1] flex-grow-[4] basis-0 p-10">{children}</div>
  )
}

export const BannerImage = ({ children }) => {
  return (
    <Flex className="flex-shrink-[1] flex-grow-[2] basis-0 justify-end self-end">
      {children}
    </Flex>
  )
}

export const BannerGrid = ({ children }: ChildOnlyProp) => {
  return (
    <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2">
      {children}
    </div>
  )
}

export const BannerGridCell = ({ children }: ChildOnlyProp) => {
  return (
    <Flex
      className={cn(
        "px-0 py-8 md:px-12",
        "flex-col",
        "border-t border-t-search-background",
        "md:border-l md:border-l-search-background",
        "first:border-t-0",
        "lg:[&:first-child]:border-l-0",
        "md:[&:nth-child(-n+2)]:border-t-0 lg:[&:nth-child(-n+2)]:border-t lg:[&:nth-child(-n+2)]:border-t-search-background",
        "md:[&:nth-child(2n+1)]:border-l-0 lg:[&:nth-child(2n+1)]:border-l lg:[&:nth-child(2n+1)]:border-l-search-background",
        "lg:[&:nth-child(-n+3)]:justify-start lg:[&:nth-child(-n+3)]:border-t-0 lg:[&:nth-child(-n+3)]:pt-0",
        "lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(3n+1)]:ps-0",
        "lg:[&:nth-child(n+4)]:justify-start lg:[&:nth-child(n+4)]:pb-0"
      )}
    >
      {children}
    </Flex>
  )
}
