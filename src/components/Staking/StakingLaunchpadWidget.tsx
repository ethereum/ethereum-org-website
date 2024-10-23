import { useState } from "react"
import { useTranslation } from "next-i18next"
import { FaTools } from "react-icons/fa"

import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Flex } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import Select, { type SelectOnChange } from "../Select"

type StakingDataOption = { label: string; value: string }

const StakingLaunchpadWidget = () => {
  const { t } = useTranslation("page-staking")
  const [selection, setSelection] = useState("testnet")

  const handleChange: SelectOnChange<StakingDataOption> = (data) => {
    if (!data) return

    trackCustomEvent({
      eventCategory: `Selected testnet vs mainnet for Launchpad link`,
      eventAction: `Clicked`,
      eventName: `${data.label} bridge selected`,
      eventValue: `${data.value}`,
    })
    setSelection(data.value)
  }

  const data = {
    testnet: {
      label: `Holesky ${t("testnet")}`,
      url: "https://holesky.launchpad.ethereum.org",
    },
    mainnet: {
      label: "Mainnet",
      url: "https://launchpad.ethereum.org",
    },
  }

  const selectOptions = Object.keys(data).map<StakingDataOption>((key) => ({
    label: data[key].label,
    value: key,
  }))

  return (
    <Flex
      className={cn(
        "flex-col rounded p-6 md:p-8",
        "bg-gradient-to-r from-accent-a/10 to-accent-c/10 dark:from-accent-a/20 dark:to-accent-c-hover/20"
      )}
    >
      <span className="leading-6 text-body-medium">
        <Translation id="page-staking:page-staking-launchpad-widget-span" />
      </span>
      <div className="my-4 md:max-w-[50%]">
        <Select
          instanceId="staking-launchpad-select"
          options={selectOptions}
          onChange={handleChange}
          defaultValue={selectOptions[0]}
          variant="outline"
        />
      </div>
      <p className="mb-6 leading-6">
        <Translation id="page-staking:page-staking-launchpad-widget-p1" />
      </p>
      <p className="mb-6 leading-6">
        <Translation id="page-staking:page-staking-launchpad-widget-p2" />
      </p>
      <div className="mb-4">
        <ButtonLink href={data[selection].url} className="w-full md:w-auto">
          {selection === "mainnet"
            ? t("page-staking:page-staking-launchpad-widget-mainnet-start")
            : t("page-staking:page-staking-launchpad-widget-testnet-start")}
        </ButtonLink>
      </div>
      <p className="mb-6 leading-6">
        <Translation id="page-staking:page-staking-launchpad-widget-p3" />
      </p>
      <div>
        <ButtonLink
          href="#node-and-client-tools"
          variant="outline"
          className="w-full md:w-auto"
        >
          <FaTools />{" "}
          <Translation id="page-staking:page-staking-launchpad-widget-link" />
        </ButtonLink>
      </div>
    </Flex>
  )
}

export default StakingLaunchpadWidget
