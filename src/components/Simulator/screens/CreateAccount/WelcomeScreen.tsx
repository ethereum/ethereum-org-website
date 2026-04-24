import { motion } from "motion/react"
import { useTranslations } from "next-intl"

import { Flex } from "@/components/ui/flex"

import { EthGlyphIcon } from "../../icons"

const MotionFlex = motion.create(Flex)

export const WelcomeScreen = () => {
  const t = useTranslations("component-wallet-simulator")

  return (
    <MotionFlex
      className="bg-background-highlight h-full flex-col items-center pt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <EthGlyphIcon className="text-body my-4 h-[110px] w-auto md:h-[190px]" />
      <p className="px-4 text-center text-2xl leading-8 md:px-8">
        {t("sim-ca-welcome-to")}
        <span className="block font-bold">{t("sim-ca-wallet-simulator")}</span>
      </p>
    </MotionFlex>
  )
}
