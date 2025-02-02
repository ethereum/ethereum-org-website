import { type HTMLAttributes } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MdArrowDownward } from "react-icons/md"

import type { SimulatorNavProps } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import { EthGlyphIcon } from "../../icons"

import useColorModeValue from "@/hooks/useColorModeValue"

type HomeScreenProps = HTMLAttributes<HTMLDivElement> & SimulatorNavProps

export const HomeScreen = ({ nav, ...props }: HomeScreenProps) => {
  const gridShadow = useColorModeValue(
    "shadow-[0_0_7px_0_var(--eth-colors-blackAlpha-800)]",
    "shadow-[0_0_7px_0_var(--eth-colors-whiteAlpha-800)]"
  )

  const { step } = nav
  const ICON_COUNT = 8
  const sharedIconStyles = {
    w: "full",
    aspectRatio: 1,
    borderRadius: "xl",
    placeItems: "center",
    transition:
      "background-color 2000ms ease-in-out, border 200ms ease-in--out",
    border: "2px solid transparent",
  } as const
  const sharedIconClasses =
    "w-full aspect-square rounded-xl place-items-center duration-200 transition-[border,background-color] border-2 border-transparent"
  return (
    <div className="grid w-full grid-cols-4 gap-5 px-6 py-8" {...props}>
      {Array(ICON_COUNT)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("bg-body-light", sharedIconClasses)}
            {...sharedIconStyles}
          />
        ))}
      <AnimatePresence>
        {step === 1 ? (
          <motion.button
            className={cn(
              "grid border-body bg-body outline duration-300 hover:outline-2 hover:outline-offset-2 hover:outline-primary-hover",
              sharedIconClasses,
              gridShadow
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={nav.progressStepper}
          >
            {/* TODO: remove important flag from classes when icons are migrated */}
            <EthGlyphIcon className="!text-2xl !text-background sm:!text-3xl" />
          </motion.button>
        ) : (
          <motion.div
            className={cn(
              sharedIconClasses,
              "grid border-dashed border-disabled bg-background duration-200"
            )}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MdArrowDownward className="!text-2xl !text-disabled sm:!text-3xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
