import { Box, Text, Tooltip } from "@chakra-ui/react"

import DismissableBanner from "@/components/Banners/DismissableBanner"
import Emoji from "@/components/Emoji"
import Link from "@/components/Link"

import NetworkUpgradeSummaryData from "@/data/NetworkUpgradeSummaryData"

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
          label={
            <Box bg="background.base" p="2" rounded="base">
              Epoch 269568 - {upgradeDate.toLocaleString()}
            </Box>
          }
          aria-label="Deneb/Cancun timing"
        >
          {upgradeDate.toLocaleDateString()}
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
