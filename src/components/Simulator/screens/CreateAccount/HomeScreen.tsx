import { type HTMLAttributes } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MdArrowDownward } from "react-icons/md"

import type { SimulatorNavProps } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import { EthGlyphIcon } from "../../icons"

type HomeScreenProps = HTMLAttributes<HTMLDivElement> & SimulatorNavProps

export const HomeScreen = ({ nav, ...props }: HomeScreenProps) => {
  const { step } = nav
  const ICON_COUNT = 8
  const sharedIconClasses =
    "w-full aspect-square rounded-xl place-items-center duration-200 transition-[border,background-color] border-2 border-transparent"
  return (
    <div className="grid w-full grid-cols-4 gap-5 px-6 py-8" {...props}>
      {Array(ICON_COUNT)
        .fill(0)
        .map((_, i) => (
          <div key={i} className={cn("bg-body-light", sharedIconClasses)} />
        ))}
      <AnimatePresence>
        {step === 1 ? (
          <motion.button
            className={cn(
              "hover:outline-primary-hover, grid border-body bg-body shadow-md duration-300 hover:outline hover:outline-2 hover:outline-offset-2",
              sharedIconClasses
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={nav.progressStepper}
          >
            <EthGlyphIcon className="size-[1em] text-2xl text-background sm:text-3xl" />
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
            <MdArrowDownward className="!size-[1em] !text-2xl !text-disabled sm:!text-3xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
