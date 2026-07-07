"use client"

import { useState } from "react"

import Tools from "@/components/icons/tools.svg"
import { ButtonLink } from "@/components/ui/buttons/Button"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { CANONICAL_STAKING_TESTNET } from "@/lib/constants"

import { Strong } from "../IntlStringElements"
import Select, { type SelectOnChange } from "../Select"
import InlineLink from "../ui/Link"

import { useTranslation } from "@/hooks/useTranslation"

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
      label: t("page-staking:page-staking-network-testnet", {
        network: CANONICAL_STAKING_TESTNET,
      }),
      url: `https://${CANONICAL_STAKING_TESTNET.toLowerCase()}.launchpad.ethereum.org`,
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
    <div className="flow rounded-base bg-tint-accent-c p-page gradient-use-light gradient-reverse">
      <p className="text-body-medium">
        {t("page-staking-launchpad-widget-span")}
      </p>
      <Select
        instanceId="staking-launchpad-select"
        options={selectOptions}
        onChange={handleChange}
        defaultValue={selectOptions[0]}
        variant="outline"
        className="w-full md:max-w-md!"
      />
      <p>
        {t.rich("page-staking.page-staking-launchpad-widget-p1", {
          network: CANONICAL_STAKING_TESTNET,
          strong: Strong,
          link: (chunks) => (
            <InlineLink href="/developers/docs/nodes-and-clients/client-diversity/">
              {chunks}
            </InlineLink>
          ),
        })}
      </p>
      <p>{t("page-staking-launchpad-widget-p2")}</p>
      <ButtonLink href={data[selection].url} className="max-md:w-full">
        {t("page-staking:page-staking-launchpad-widget-start", {
          network:
            selection === "mainnet"
              ? t("page-staking:page-staking-launchpad-widget-mainnet-label")
              : t("page-staking:page-staking-network-testnet", {
                  network: CANONICAL_STAKING_TESTNET,
                }),
        })}
      </ButtonLink>
      <p>{t("page-staking-launchpad-widget-p3")}</p>
      <ButtonLink
        href="#node-and-client-tools"
        variant="outline"
        className="max-md:w-full"
      >
        <Tools /> {t("page-staking-launchpad-widget-link")}
      </ButtonLink>
    </div>
  )
}

export default StakingLaunchpadWidget
