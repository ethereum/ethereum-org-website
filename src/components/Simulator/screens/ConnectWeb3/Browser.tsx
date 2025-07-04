import React, { type HTMLAttributes, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MoreHorizontal, Search, Triangle } from "lucide-react"

import { Flex, HStack } from "@/components/ui/flex"

import { BASE_ANIMATION_DELAY_SEC } from "../../constants"
import { BrowserGlobe } from "../../icons"
import { NotificationPopover } from "../../NotificationPopover"

import { EXAMPLE_APP_URL } from "./constants"

type BrowserProps = HTMLAttributes<HTMLDivElement>

export const Browser = ({ ...props }: BrowserProps) => {
  const [typing, setTyping] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTyping(true)
    }, BASE_ANIMATION_DELAY_SEC * 1000)
    return () => clearTimeout(timeout)
  }, [])

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  }
  const letter = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0 } },
  }

  return (
    <Flex className="h-full flex-col bg-body-light" {...props}>
      <div className="w-full bg-background-highlight px-3 pb-3 pt-9">
        <NotificationPopover
          title="Example walkthrough"
          content="Try logging into a real app with your wallet when finished here"
        >
          <HStack className="cursor-default gap-0 rounded bg-background px-3 py-2 text-disabled">
            <div className="flex-1 border-e border-background-highlight">
              {typing ? (
                <motion.p
                  className="text-body-medium"
                  variants={sentence}
                  initial="hidden"
                  animate="visible"
                >
                  {EXAMPLE_APP_URL.split("").map((char, index) => (
                    <motion.span key={char + "-" + index} variants={letter}>
                      {char}
                    </motion.span>
                  ))}
                </motion.p>
              ) : (
                <p>Search or enter website</p>
              )}
            </div>
            <BrowserGlobe className="ms-3 size-4" />
          </HStack>
        </NotificationPopover>
      </div>

      <Flex className="flex-1 justify-center pt-20 md:pt-24">
        <BrowserGlobe className="size-24 stroke-1 text-disabled" />
      </Flex>

      <Flex className="w-full justify-around bg-background-highlight px-3 pb-9 pt-4 text-xl text-disabled">
        <Triangle className="-rotate-90" />
        <Triangle className="rotate-90" />
        <Search />
        <MoreHorizontal />
      </Flex>
    </Flex>
  )
}
