import React, { type HTMLAttributes, useEffect, useState } from "react"
import { MoreHorizontal, Search, Triangle } from "lucide-react"
import { motion } from "motion/react"
import { useTranslations } from "next-intl"

import { Flex, HStack } from "@/components/ui/flex"

import { BASE_ANIMATION_DELAY_SEC } from "../../constants"
import { BrowserGlobe } from "../../icons"
import { NotificationPopover } from "../../NotificationPopover"

import { EXAMPLE_APP_URL } from "./constants"

type BrowserProps = HTMLAttributes<HTMLDivElement>

export const Browser = ({ ...props }: BrowserProps) => {
  const t = useTranslations("component-wallet-simulator")
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
    <Flex className="bg-body-light h-full flex-col" {...props}>
      <div className="bg-background-highlight w-full px-3 pt-9 pb-3">
        <NotificationPopover
          title={t("sim-example-walkthrough")}
          content={t("sim-try-login-app")}
        >
          <HStack className="bg-background text-disabled cursor-default gap-0 rounded px-3 py-2">
            <div className="border-background-highlight flex-1 border-e">
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
                <p>{t("sim-cw-search-website")}</p>
              )}
            </div>
            <BrowserGlobe className="ms-3 size-4" />
          </HStack>
        </NotificationPopover>
      </div>

      <Flex className="flex-1 justify-center pt-20 md:pt-24">
        <BrowserGlobe className="text-disabled size-24 stroke-1" />
      </Flex>

      <Flex className="bg-background-highlight text-disabled w-full justify-around px-3 pt-4 pb-9 text-xl">
        <Triangle className="-rotate-90" />
        <Triangle className="rotate-90" />
        <Search />
        <MoreHorizontal />
      </Flex>
    </Flex>
  )
}
