import { motion } from "framer-motion"

import { Flex } from "@/components/ui/flex"

import { EthGlyphIcon } from "../../icons"

const MotionFlex = motion(Flex)

export const WelcomeScreen = () => (
  <MotionFlex
    className="h-full flex-col items-center bg-background-highlight pt-16"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <EthGlyphIcon className="my-4 h-[110px] w-auto text-body md:h-[190px]" />
    <p className="px-4 text-center text-2xl leading-8 md:px-8">
      Welcome to
      <span className="block font-bold">wallet simulator</span>
    </p>
  </MotionFlex>
)
