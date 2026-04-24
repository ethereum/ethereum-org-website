import { motion } from "motion/react"
import { useTranslations } from "next-intl"

import EthGlyph from "@/components/icons/eth-glyph-solid.svg"
import { Image } from "@/components/Image"
import { Button } from "@/components/ui/buttons/Button"
import { Flex } from "@/components/ui/flex"

import { FAKE_DEMO_ADDRESS } from "../../constants"
import { NotificationPopover } from "../../NotificationPopover"

import QrImage from "@/public/images/qr-code-ethereum-org.png"

export const ReceiveEther = () => {
  const t = useTranslations("component-wallet-simulator")
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-background-highlight md:text-md h-full px-4 py-6 text-sm md:px-6 md:py-8"
    >
      <p className="mb-3 text-xl font-bold md:mb-6 md:text-2xl">
        {t("sim-receive-title")}
      </p>
      <p className="mb-3 md:mb-5">{t("sim-receive-qr-desc")}</p>
      {/* QR Code */}
      <NotificationPopover
        title={t("sim-example-walkthrough")}
        content={t("sim-receive-qr-share")}
        side="top"
      >
        <div className="bg-background relative mx-auto mb-3 w-fit p-3 md:mb-5">
          <Image
            alt=""
            src={QrImage}
            className="size-[6rem] rounded p-1 md:size-[7.5rem] dark:invert"
          />
          <div className="bg-primary-action absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full" />
          <EthGlyph className="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 transform text-white" />
        </div>
      </NotificationPopover>
      <Flex className="relative mb-3 w-full items-center justify-between gap-2 rounded border px-3 py-2 md:mb-5">
        <div>
          <p className="text-body-medium m-0 text-xs">
            {t("sim-receive-your-address")}
          </p>
          <p className="m-0 text-sm">{FAKE_DEMO_ADDRESS}</p>
        </div>
        <NotificationPopover
          title={t("sim-example-walkthrough")}
          content={t("sim-address-tooltip")}
          side="top"
          align="end"
        >
          <Button className="bg-body-light text-body h-fit rounded-lg px-2 py-1.5 text-xs font-bold">
            {t("sim-receive-copy")}
          </Button>
        </NotificationPopover>
      </Flex>
      <p className="m-0 text-xs">{t("sim-receive-address-note")}</p>
    </motion.div>
  )
}
