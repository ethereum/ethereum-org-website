import { type ReactNode } from "react"
import { motion } from "framer-motion"
import { PiCheckThin } from "react-icons/pi"

import { HStack, VStack } from "@/components/ui/flex"

import { EthGlyphIcon } from "../../icons"

type SliderProps = {
  isConnected: boolean
  displayUrl: string
  children: ReactNode
}
export const Slider = ({ isConnected, displayUrl, children }: SliderProps) => {
  return (
    <>
      <motion.div
        key="backdrop"
        className="absolute inset-0 bg-black/15 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        key="slider"
        className="absolute h-[360px] w-full"
        initial={{ bottom: "-100%" }}
        animate={{ bottom: 0 }}
        exit={{ bottom: "-100%" }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        data-testid="slider-box"
      >
        <VStack className="size-full gap-0 rounded-t-2xl bg-background px-6 py-8">
          {isConnected ? (
            <VStack className="gap-4 pt-8">
              <motion.div
                key="checkmark"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.25 }}
              >
                <PiCheckThin className="-rotate-[10deg] text-[4.5rem]" />
              </motion.div>
              <motion.div
                key="text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <p className="px-4 text-center md:px-8">
                  You&apos;re logged in!
                </p>
              </motion.div>
            </VStack>
          ) : (
            <>
              <p className="mb-4 text-center text-lg font-bold">
                Connect account?
              </p>
              {/* URL Pill */}
              <HStack className="mb-6 rounded-full bg-black/5 px-2 py-1 text-xs">
                <div className="grid size-5 place-items-center rounded-full bg-body">
                  {/* TODO: Remove important flags and `size` class when icon is migrated */}
                  <EthGlyphIcon className="!size-[1em] !text-sm !text-background" />
                </div>
                <p className="me-0.5">{displayUrl}</p>
              </HStack>
              {/* Information */}
              <p>{children}</p>
            </>
          )}
        </VStack>
      </motion.div>
    </>
  )
}
