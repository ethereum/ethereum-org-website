// Libraries
import React from "react"
import { Flex, Stack, Text } from "@chakra-ui/react"
import { useI18next } from "gatsby-plugin-react-i18next"

// Components
import Emoji from "../Emoji"
import Link from "../Link"
import Translation from "../Translation"

// Data
import NetworkUpgradeSummaryData from "../../data/NetworkUpgradeSummaryData"

// Utils
import { Lang } from "../../utils/languages"
import { getLocaleForNumberFormat } from "../../utils/translations"

interface IProps {
  name: string
}

const NetworkUpgradeSummary: React.FC<IProps> = ({ name }) => {
  let blockTypeTranslation
  const { language } = useI18next()
  const localeForStatsBoxNumbers = getLocaleForNumberFormat(language as Lang)
  const {
    dateTimeAsString,
    ethPriceInUSD,
    waybackLink,
    blockNumber,
    epochNumber,
    slotNumber,
  } = NetworkUpgradeSummaryData[name]
  const date = new Date(dateTimeAsString)
  const formattedDate = date.toLocaleString(language, {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  })
  const formattedUTC = `${formattedDate} +UTC`

  if (blockNumber) {
    blockTypeTranslation = (
      <Flex>
        <Emoji fontSize="sm" mr={2} text=":bricks:" />
        <Translation id="page-history-block-number" />
        :&nbsp;
        <Link to={`https://etherscan.io/block/${blockNumber}`}>
          {new Intl.NumberFormat(localeForStatsBoxNumbers).format(blockNumber)}
        </Link>
      </Flex>
    )
  }

  if (epochNumber) {
    blockTypeTranslation = (
      <Flex>
        <Emoji fontSize="sm" mr={2} text=":bricks:" />
        <Translation id="page-history-epoch-number" />
        :&nbsp;
        <Link to={`https://beaconscan.com/epoch/${epochNumber}`}>
          {new Intl.NumberFormat(localeForStatsBoxNumbers).format(epochNumber)}
        </Link>
      </Flex>
    )
  }

  if (slotNumber) {
    blockTypeTranslation = (
      <Flex>
        <Emoji fontSize="sm" mr={2} text=":bricks:" />
        <Translation id="page-history-beacon-block-number" />
        :&nbsp;
        <Link to={`https://beaconscan.com/slot/${slotNumber}`}>
          {new Intl.NumberFormat(localeForStatsBoxNumbers).format(slotNumber)}
        </Link>
      </Flex>
    )
  }

  return (
    <Stack>
      <Flex>
        <Emoji fontSize="sm" mr={2} text=":calendar:" />
        <Text fontFamily="monospace" m={0}>
          {formattedUTC}
        </Text>
      </Flex>
      {blockTypeTranslation}
      <Flex>
        <Emoji fontSize="sm" mr={2} text=":money_bag:" />
        <Translation id="page-history-eth-price" />
        :&nbsp;
        {new Intl.NumberFormat(localeForStatsBoxNumbers, {
          style: "currency",
          currency: "USD",
          minimumSignificantDigits: 2,
          maximumSignificantDigits: 3,
        }).format(ethPriceInUSD)}
      </Flex>
      <Flex>
        <Emoji fontSize="sm" mr={2} text=":desktop_computer:" />
        <Link to={waybackLink}>
          <Translation id="page-history-ethereum-org-wayback" />
        </Link>
      </Flex>
    </Stack>
  )
}

export default NetworkUpgradeSummary
