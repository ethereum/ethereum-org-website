import { Clipboard } from "lucide-react"
import { useTranslations } from "next-intl"

import { Flex, type FlexProps } from "@/components/ui/flex"

import { FAKE_DEMO_ADDRESS } from "../constants"
import { NotificationPopover } from "../NotificationPopover"

type AddressPillProps = Omit<FlexProps, "children">

export const AddressPill = ({ ...btnProps }: AddressPillProps) => {
  const t = useTranslations("component-wallet-simulator")
  return (
    <NotificationPopover
      title={t("sim-example-walkthrough")}
      content={t("sim-address-tooltip")}
    >
      <Flex
        className="gap-2 self-center rounded-full border border-border bg-background-highlight px-2 py-1 text-center text-xs text-disabled"
        {...btnProps}
      >
        <p>{FAKE_DEMO_ADDRESS}</p>
        <Clipboard className="size-4 text-lg leading-none" />
      </Flex>
    </NotificationPopover>
  )
}
