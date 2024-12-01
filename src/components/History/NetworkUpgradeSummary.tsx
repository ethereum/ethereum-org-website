import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import type { Lang } from "@/lib/types"

import { Flex, Stack } from "@/components/ui/flex"

import { getLocaleForNumberFormat } from "@/lib/utils/translations"

import NetworkUpgradeSummaryData from "../../data/NetworkUpgradeSummaryData"
import Emoji from "../Emoji"
import InlineLink from "../Link"

type NetworkUpgradeSummaryProps = {
  name: string
}

const NetworkUpgradeSummary = ({ name }: NetworkUpgradeSummaryProps) => {
  const [formattedUTC, setFormattedUTC] = useState("")
  const { locale } = useRouter()
  const localeForStatsBoxNumbers = getLocaleForNumberFormat(locale as Lang)
  const { t } = useTranslation("page-history")

  const {
    dateTimeAsString,
    ethPriceInUSD,
    waybackLink,
    blockNumber,
    epochNumber,
    slotNumber,
  } = NetworkUpgradeSummaryData[name]
  // TODO fix dateTimeAsString

  // calculate date format only on the client side to avoid hydration issues
  useEffect(() => {
    const date = new Date(dateTimeAsString as string)
    const formattedDate = date.toLocaleString(locale, {
      timeZone: "UTC",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })
    setFormattedUTC(`${formattedDate} +UTC`)
  }, [dateTimeAsString, locale])

  const blockTypeTranslation = (translationKey, explorerUrl, number) => {
    return (
      <Flex className="whitespace-pre-wrap">
        <Emoji className="me-2 text-sm" text=":bricks:" />
        {t(translationKey)}:{" "}
        <InlineLink href={`${explorerUrl}${number}`}>
          {new Intl.NumberFormat(localeForStatsBoxNumbers).format(number)}
        </InlineLink>
      </Flex>
    )
  }

  return (
    <Stack>
      {dateTimeAsString && (
        <Flex>
          <Emoji className="me-2 text-sm" text=":calendar:" />
          <p className="font-monospace">{formattedUTC}</p>
        </Flex>
      )}
      {blockNumber &&
        blockTypeTranslation(
          "page-history:page-history-block-number",
          "https://etherscan.io/block/",
          blockNumber
        )}
      {epochNumber &&
        blockTypeTranslation(
          "page-history:page-history-epoch-number",
          "https://beaconscan.com/epoch/",
          epochNumber
        )}
      {slotNumber &&
        blockTypeTranslation(
          "page-history:page-history-slot-number",
          "https://beaconscan.com/slot/",
          slotNumber
        )}
      {ethPriceInUSD && (
        <Flex>
          <Emoji className="me-2 text-sm" text=":money_bag:" />
          {t("page-history:page-history-eth-price")}:{" "}
          {new Intl.NumberFormat(localeForStatsBoxNumbers, {
            style: "currency",
            currency: "USD",
          }).format(ethPriceInUSD)}
        </Flex>
      )}
      {waybackLink && (
        <Flex>
          <Emoji className="me-2 text-sm" text=":desktop_computer:" />
          <InlineLink href={waybackLink}>
            {t("page-history:page-history-ethereum-org-wayback")}
          </InlineLink>
        </Flex>
      )}
    </Stack>
  )
}

export default NetworkUpgradeSummary
