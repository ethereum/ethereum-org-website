import React from "react"

import { ChildOnlyProp } from "@/lib/types"

import { Flex } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

export const Banner = ({ children }: ChildOnlyProp) => {
  return (
    <Flex className="w-full flex-col flex-nowrap bg-banner-grid-gradient lg:flex-row [&_h2]:mt-0 [&_ul]:mb-0">
      {children}
    </Flex>
  )
}

export const BannerBody = ({ children }: ChildOnlyProp) => {
  return <div className="w-full flex-[4] p-10">{children}</div>
}

export const BannerImage = ({ children }: ChildOnlyProp) => {
  return <Flex className="flex-[2] justify-end self-end">{children}</Flex>
}

export const BannerGrid = ({ children }: ChildOnlyProp) => {
  return (
    <div className="md:grid-rows-[repeat(3, 1fr)] lg:grid-rows-[repeat(2, 1fr)] grid w-full grid-cols-[repeat(1,1fr)] gap-0 md:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(3,1fr)]">
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
        "md:border-s md:border-s-search-background",
        "first:border-t-0",
        "lg:[&:first-child]:border-s-0",
        "md:[&:nth-child(-n+2)]:border-t-0 lg:[&:nth-child(-n+2)]:border-t lg:[&:nth-child(-n+2)]:border-t-search-background",
        "md:[&:nth-child(2n+1)]:border-s-0 lg:[&:nth-child(2n+1)]:border-s lg:[&:nth-child(2n+1)]:border-s-search-background",
        "lg:[&:nth-child(-n+3)]:justify-start lg:[&:nth-child(-n+3)]:border-t-0 lg:[&:nth-child(-n+3)]:pt-0",
        "lg:[&:nth-child(3n+1)]:border-s-0 lg:[&:nth-child(3n+1)]:ps-0",
        "lg:[&:nth-child(n+4)]:justify-start lg:[&:nth-child(n+4)]:pb-0"
      )}
    >
      {children}
    </Flex>
  )
}
