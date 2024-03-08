import { Box, Text } from "@chakra-ui/react"

import DismissableBanner from "@/components/Banners/DismissableBanner"
import Emoji from "@/components/Emoji"
import Link from "@/components/Link"

import NetworkUpgradeSummaryData from "@/data/NetworkUpgradeSummaryData"

import Tooltip from "./Tooltip"

const DencunBanner = () => {
  const dateTimeAsString = NetworkUpgradeSummaryData.cancun
    .dateTimeAsString as string
  const upgradeDate = new Date(dateTimeAsString)
  return (
    <DismissableBanner storageKey="dencunBanner">
      <Text m={0}>
        <Emoji text="🚨" me="2" />
        The Deneb + Cancun network upgrade is scheduled for{" "}
        <Tooltip
          content={<Box>Epoch 269568 - {upgradeDate.toLocaleString()}</Box>}
          aria-label="Deneb/Cancun timing"
        >
          <span>{upgradeDate.toLocaleDateString()}</span>
        </Tooltip>
        . Node operators must update client software to a supported version to
        prepare.{" "}
        <Link
          href="https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement"
          color="background.base !important"
        >
          Learn more
        </Link>
      </Text>
    </DismissableBanner>
  )
}

export default DencunBanner
