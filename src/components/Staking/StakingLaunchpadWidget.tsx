import React, { useState } from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { Box, chakra, Flex, Text } from "@chakra-ui/react"

import Select from "../Select"
import ButtonLink from "../ButtonLink"
import Emoji from "../OldEmoji"
import Translation from "../Translation"

import { trackCustomEvent } from "../../utils/matomo"

export interface IProps {}

const StakingLaunchpadWidget: React.FC<IProps> = () => {
  const { t } = useTranslation()
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
        <Translation id="page-staking-launchpad-widget-span" />
      </Text>
      <Box my={4}>
        <Select
          options={selectOptions}
          onChange={handleChange}
          defaultValue={selectOptions[0]}
          maxW={{ md: "50%" }}
        />
      </Box>
      <Text>
        <Translation id="page-staking-launchpad-widget-p1" />
      </Text>
      <Text>
        <Translation id="page-staking-launchpad-widget-p2" />
      </Text>
      <Box mb={4}>
        <ButtonLink
          to={data[selection].url}
          width={{ base: "full", md: "auto" }}
        >
          {selection === "mainnet"
            ? t("page-staking-launchpad-widget-mainnet-start")
            : t("page-staking-launchpad-widget-testnet-start")}
        </ButtonLink>
      </Box>
      <Text>
        <Translation id="page-staking-launchpad-widget-p3" />
      </Text>
      <Box>
        <ButtonLink
          to="#node-and-client-tools"
          variant="outline"
          width={{ base: "full", md: "auto" }}
        >
          <Emoji text="🛠" mr="1rem" />
          <Translation id="page-staking-launchpad-widget-link" />
        </ButtonLink>
      </Box>
    </Flex>
  )
}

export default StakingLaunchpadWidget
