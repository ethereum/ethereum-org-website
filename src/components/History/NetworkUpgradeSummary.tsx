// Libraries
import React from "react"
import { Flex, Stack, Text } from "@chakra-ui/react"
// TODO
// import { useI18next } from "gatsby-plugin-react-i18next"

// Components
import Emoji from "../Emoji"
import Link from "../Link"
// TODO add Translation
// import Translation from "../Translation"

// Data
import NetworkUpgradeSummaryData from "../../data/NetworkUpgradeSummaryData"

// Utils
// TODO
// import { Lang } from "../../utils/languages"
// TODO
// import { getLocaleForNumberFormat } from "../../utils/translations"

interface IProps {
  name: string
}

const NetworkUpgradeSummary: React.FC<IProps> = ({ name }) => {
  // TODO
  const language = "en"
  // const localeForStatsBoxNumbers = getLocaleForNumberFormat(language as Lang)
  const {
    dateTimeAsString,
    ethPriceInUSD,
    waybackLink,
    blockNumber,
    epochNumber,
    slotNumber,
  } = NetworkUpgradeSummaryData[name]
  // TODO fix dateTimeAsString
  const date = new Date(dateTimeAsString as any)
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

  const blockTypeTranslation = (translationKey, explorerUrl, number) => {
    return (
      <Flex>
        <Emoji fontSize="sm" mr={2} text=":bricks:" />
        {/* <Translation id={translationKey} /> */}
        :&nbsp;
        <Link to={`${explorerUrl}${number}`}>
          {/* // TODO */}
          {/* {new Intl.NumberFormat(localeForStatsBoxNumbers).format(number)} */}
        </Link>
      </Flex>
    )
  }

  return (
    <Stack>
      {formattedUTC && (
        <Flex>
          <Emoji fontSize="sm" mr={2} text=":calendar:" />
          <Text fontFamily="monospace" m={0}>
            {formattedUTC}
          </Text>
        </Flex>
      )}
      {blockNumber &&
        blockTypeTranslation(
          "page-history-block-number",
          "https://etherscan.io/block/",
          blockNumber
        )}
      {epochNumber &&
        blockTypeTranslation(
          "page-history-epoch-number",
          "https://beaconscan.com/epoch/",
          epochNumber
        )}
      {slotNumber &&
        blockTypeTranslation(
          "page-history-slot-number",
          "https://beaconscan.com/slot/",
          slotNumber
        )}
      {ethPriceInUSD && (
        <Flex>
          <Emoji fontSize="sm" mr={2} text=":money_bag:" />
          {/* TODO */}
          {/* <Translation id="page-history-eth-price" /> */}
          :&nbsp;
          {/* TODO */}
          {/* {new Intl.NumberFormat(localeForStatsBoxNumbers, {
            style: "currency",
            currency: "USD",
          }).format(ethPriceInUSD)} */}
        </Flex>
      )}
      {waybackLink && (
        <Flex>
          <Emoji fontSize="sm" mr={2} text=":desktop_computer:" />
          <Link to={waybackLink}>
            {/* TODO */}
            {/* <Translation id="page-history-ethereum-org-wayback" /> */}
          </Link>
        </Flex>
      )}
    </Stack>
  )
}

export default NetworkUpgradeSummary
