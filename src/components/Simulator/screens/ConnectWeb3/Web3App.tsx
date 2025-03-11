import React, { type HTMLAttributes } from "react"
import { GrMenu } from "react-icons/gr"

import { HStack } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import { FAKE_DEMO_ADDRESS } from "../../constants"
import { EthGlyphIcon } from "../../icons"
import { NotificationPopover } from "../../NotificationPopover"

type Web3AppProps = HTMLAttributes<HTMLDivElement> & {
  displayUrl: string
  appName?: string
}
export const Web3App = ({
  displayUrl,
  appName,
  children,
  className,
  ...rest
}: Web3AppProps) => {
  return (
    <div
      className={cn("size-full bg-background-highlight", className)}
      {...rest}
    >
      <div className="bg-[#e8e8e8] p-1 dark:bg-[#171717]">
        <p className="text-center text-xs">{displayUrl}</p>
      </div>
      <NotificationPopover
        title="Example walkthrough"
        content="Try out a real Ethereum application when finished here"
      >
        <HStack className="gap-3 p-6 text-4xl">
          {/* TODO: Remove 'size' class when icon is migrated */}
          <EthGlyphIcon className="!size-[1em]" />
          <div className="flex-1 cursor-default">
            {appName && (
              <>
                <p className="text-md font-bold">{appName}</p>
                <p className="text-sm">{FAKE_DEMO_ADDRESS}</p>
              </>
            )}
          </div>
          <GrMenu className="[&>path]:stroke-body" />
        </HStack>
      </NotificationPopover>
      {children}
    </div>
  )
}
