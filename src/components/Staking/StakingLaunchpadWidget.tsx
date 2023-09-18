import React, { useState } from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { FaTools } from "react-icons/fa"
import { Box, Flex } from "@chakra-ui/react"

import ButtonLink from "../ButtonLink"
import ReactSelect, { type ReactSelectOnChange } from "../ReactSelect"
import Translation from "../Translation"
import Text from "../OldText"

import { trackCustomEvent } from "../../utils/matomo"

export interface IProps {}

const StakingLaunchpadWidget: React.FC<IProps> = () => {
  const { t } = useTranslation()
  const [selection, setSelection] = useState("testnet")

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

  type Layer2Option = {
    label: string
    value: string
  }

  const selectOptions: Layer2Option[] = Object.keys(data).map((key) => ({
    label: data[key].label,
    value: key,
  }))

  const handleChange: ReactSelectOnChange<Layer2Option> = (selectedOption) => {
    if (selectedOption == undefined) return
    trackCustomEvent({
      eventCategory: `Selected testnet vs mainnet for Launchpad link`,
      eventAction: `Clicked`,
      eventName: `${selectedOption.label} bridge selected`,
      eventValue: `${selectedOption.value}`,
    })
    setSelection(selectedOption.value)
  }

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
        <Box w="full" maxW={{ md: "50%" }}>
          <ReactSelect
            options={selectOptions}
            onChange={handleChange}
            defaultValue={selectOptions[0]}
          />
        </Box>
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
          leftIcon={<FaTools />}
        >
          <Translation id="page-staking-launchpad-widget-link" />
        </ButtonLink>
      </Box>
    </Flex>
  )
}

export default StakingLaunchpadWidget
