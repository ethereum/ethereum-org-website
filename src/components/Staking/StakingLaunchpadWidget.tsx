import { useState } from "react"
import { useTranslation } from "next-i18next"
import { FaTools } from "react-icons/fa"
import { Box, Flex } from "@chakra-ui/react"

import { ButtonLink } from "@/components/Buttons"
import Text from "@/components/OldText"
import Translation from "@/components/Translation"

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
      bg="layer2Gradient"
      borderRadius="base"
      flexDir="column"
      p={{ base: 6, md: 8 }}
    >
      <Text as="span" color="text200">
        <Translation id="page-staking:page-staking-launchpad-widget-span" />
      </Text>
      <Box my={4} maxW={{ md: "50%" }}>
        <Select
          instanceId="staking-launchpad-select"
          options={selectOptions}
          onChange={handleChange}
          defaultValue={selectOptions[0]}
          variant="outline"
        />
      </Box>
      <Text>
        <Translation id="page-staking:page-staking-launchpad-widget-p1" />
      </Text>
      <Text>
        <Translation id="page-staking:page-staking-launchpad-widget-p2" />
      </Text>
      <Box mb={4}>
        <ButtonLink
          href={data[selection].url}
          width={{ base: "full", md: "auto" }}
        >
          {selection === "mainnet"
            ? t("page-staking:page-staking-launchpad-widget-mainnet-start")
            : t("page-staking:page-staking-launchpad-widget-testnet-start")}
        </ButtonLink>
      </Box>
      <Text>
        <Translation id="page-staking:page-staking-launchpad-widget-p3" />
      </Text>
      <Box>
        <ButtonLink
          href="#node-and-client-tools"
          variant="outline"
          width={{ base: "full", md: "auto" }}
          leftIcon={<FaTools />}
        >
          <Translation id="page-staking:page-staking-launchpad-widget-link" />
        </ButtonLink>
      </Box>
    </Flex>
  )
}

export default StakingLaunchpadWidget
