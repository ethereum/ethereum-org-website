import { useState } from "react"
import { FaTools } from "react-icons/fa"
import { Link } from "@chakra-ui/next-js"
import { Box, chakra, Flex } from "@chakra-ui/react"

import { ButtonLink } from "@/components/Buttons"
import Text from "@/components/OldText"
import { StyledSelect as Select } from "@/components/SharedStyledComponents"

// TODO: Re-enable after i18n implemented
// import Translation from "@/components/Translation"
import { trackCustomEvent } from "@/lib/utils/matomo"

const StyledSelect = chakra(Select, {
  baseStyle: {
    maxW: { base: "full", md: "50%" },
  },
})

export interface IProps {}

const StakingLaunchpadWidget: React.FC<IProps> = () => {
  // TODO: Re-enable after i18n implemented
  // const { t } = useTranslation()
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

  // TODO: Re-enable translations after i18n implemented, and remove English placeholders
  return (
    <Flex
      bg="layer2Gradient"
      borderRadius="base"
      flexDir="column"
      p={{ base: 6, md: 8 }}
    >
      <Text as="span" color="text200">
        {/* <Translation id="page-staking-launchpad-widget-span" /> */}
        Choose network
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
        {/* <Translation id="page-staking-launchpad-widget-p1" /> */}
        Solo validators are expected to <strong>test their setup</strong> and
        operational skills on the Goerli testnet before risking funds. Remember
        it is important to choose a{" "}
        <Link href="/developers/docs/nodes-and-clients/client-diversity/">
          minority client
        </Link>{" "}
        as it improves the security of the network and limits your risk.
      </Text>
      <Text>
        {/* <Translation id="page-staking-launchpad-widget-p2" /> */}
        If you&apos;re comfortable with it, you can set up everything needed
        from the command line using the Staking Launchpad alone.
      </Text>
      <Box mb={4}>
        <ButtonLink
          to={data[selection].url}
          width={{ base: "full", md: "auto" }}
        >
          {/* {selection === "mainnet"
            ? t("page-staking-launchpad-widget-mainnet-start")
            : t("page-staking-launchpad-widget-testnet-start")} */}
          {selection === "mainnet"
            ? "Start staking on Mainnet"
            : "Start staking on Goerli"}
        </ButtonLink>
      </Box>
      <Text>
        {/* <Translation id="page-staking-launchpad-widget-p3" /> */}
        To make things easier, check out some of the tools and guides below that
        can help you alongside the Staking Launchpad to get your clients set up
        with ease.
      </Text>
      <Box>
        <ButtonLink
          to="#node-and-client-tools"
          variant="outline"
          width={{ base: "full", md: "auto" }}
          leftIcon={<FaTools />}
        >
          {/* <Translation id="page-staking-launchpad-widget-link" /> */}
          Software tools and guide
        </ButtonLink>
      </Box>
    </Flex>
  )
}

export default StakingLaunchpadWidget
