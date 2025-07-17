import type { ReactNode } from "react"

import Emoji from "@/components/Emoji"

import { cn } from "@/lib/utils/cn"

import { Flex, VStack } from "./ui/flex"

type InfoBannerProps = {
  children?: ReactNode
  emoji?: string
  isWarning?: boolean
  shouldCenter?: boolean
  shouldSpaceBetween?: boolean
  title?: string
  id?: string
  className?: string
}

const InfoBanner = ({
  children,
  emoji,
  isWarning,
  shouldCenter,
  shouldSpaceBetween,
  title,
  className,
  ...props
}: InfoBannerProps) => {
  const banner = (
    <VStack
      className={cn(
        "rounded-sm p-6 sm:flex-row",
        shouldCenter ? "max-w-[55rem]" : "max-w-full",
        isWarning
          ? "bg-warning-light dark:text-body-inverse"
          : "bg-primary-low-contrast",
        className
      )}
      {...props}
    >
      {emoji && (
        <Emoji
          className="mb-2 me-0 flex-shrink-0 flex-grow-0 self-start text-4xl sm:mb-0 sm:me-6 sm:self-auto"
          text={emoji}
        />
      )}
      <Flex
        className={cn(
          "block",
          shouldSpaceBetween
            ? "w-full items-center justify-between sm:flex"
            : "w-auto sm:block"
        )}
      >
        {title && <p className="mb-6 text-lg font-bold">{title}</p>}
        {children}
      </Flex>
    </VStack>
  )
  return shouldCenter ? (
    <Flex className="justify-center">{banner}</Flex>
  ) : (
    banner
  )
}

export default InfoBanner
