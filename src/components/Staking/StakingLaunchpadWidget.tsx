import { useState } from "react"
import { useTranslation } from "next-i18next"
import { FaTools } from "react-icons/fa"
import { Box, chakra, Flex } from "@chakra-ui/react"

import { ButtonLink } from "@/components/Buttons"
import Text from "@/components/OldText"
import { StyledSelect as Select } from "@/components/SharedStyledComponents"
import Translation from "@/components/Translation"

import { trackCustomEvent } from "@/lib/utils/matomo"

const StyledSelect = chakra(Select, {
  baseStyle: {
    maxW: { base: "full", md: "50%" },
  },
})

const StakingLaunchpadWidget = () => {
  const { t } = useTranslation("page-staking")
  const [selection, setSelection] = useState("testnet")

  const handleChange = (e) => {
    trackCustomEvent({
      eventCategory: `Selected testnet vs mainnet for Launchpad link`,
      eventAction: `Clicked`,
      eventName: `${e.label} bridge selected`,
      eventValue: `${e.value}`,
    })
    setSelection(e.value)
  }

  const data = {
    testnet: {
      label: "Goerli testnet",
      url: "https://goerli.launchpad.ethereum.org",
    },
    mainnet: {
      label: "Mainnet",
      url: "https://launchpad.ethereum.org",
    },
  }

  const selectOptions = Object.keys(data).map((key) => ({
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
      <Box my={4}>
        <StyledSelect
          className="react-select-container"
          classNamePrefix="react-select"
          options={selectOptions}
          onChange={handleChange}
          defaultValue={selectOptions[0]}
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
          to={data[selection].url}
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
          to="#node-and-client-tools"
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
