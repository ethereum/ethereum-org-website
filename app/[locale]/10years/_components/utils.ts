import { getLocale, getTranslations } from "next-intl/server"

import { TimeLeftLabels } from "@/lib/types"

import { formatDate, isValidDate } from "@/lib/utils/date"

import { DEFAULT_LOCALE } from "@/lib/constants"

import type { AdoptionCard, InnovationCard, Story } from "./types"

import Adoption1Image from "@/public/images/10-year-anniversary/adoption-1.png"
import Adoption2Image from "@/public/images/10-year-anniversary/adoption-2.png"
import Adoption3Image from "@/public/images/10-year-anniversary/adoption-3.png"
import DefiSummerImage from "@/public/images/10-year-anniversary/defi-summer.png"
import EthETFImage from "@/public/images/10-year-anniversary/eth-etf.png"
import EthereumLaunchImage from "@/public/images/10-year-anniversary/ethereum-launch.png"
import NftImage from "@/public/images/10-year-anniversary/nft-frontier.png"
import TheMergeImage from "@/public/images/10-year-anniversary/robot-and-crowd-cheering.png"
import Adoption5Image from "@/public/images/10-year-anniversary/robot-walking.png"
import StableCoinImage from "@/public/images/10-year-anniversary/the-pioneer-stablecoin.png"
import Adoption4Image from "@/public/images/10-year-anniversary/walking-talking-1.png"
import Adoption6Image from "@/public/images/10-year-anniversary/walking-talking-2.png"

const parseDate = (date: string, locale = DEFAULT_LOCALE): string => {
  // TODO: Remove this check when spreadsheet is fixed
  // Currently dates are in the formatted as "DD.MM." which is not parsable by Date.parse
  // If partially valid date, reformat it
  const partiallyValidDate = /^(\d{1,2})\.(\d{1})\.$/
  if (partiallyValidDate.test(date)) {
    const [, day, month] = date.match(partiallyValidDate) || []
    const newDate = `2025-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    return formatDate(newDate, locale)
  }

  // If the date is already in a valid format, return it
  if (isValidDate(date)) return formatDate(date, locale)
  // If the date is not recognized, return original value
  return date
}

export const parseStoryDates = (
  stories: Story[],
  locale = DEFAULT_LOCALE
): Story[] =>
  stories.map(({ date, ...story }) => ({
    ...story,
    date: parseDate(date, locale),
  }))

export const getTimeUnitTranslations = async () => {
  const locale = await getLocale()
  const t = await getTranslations({
    locale,
    namespace: "page-10-year-anniversary",
  })
  const timeLeftLabels: TimeLeftLabels = {
    days: {
      singular: t("page-10-year-countdown-day"),
      plural: t("page-10-year-countdown-days"),
    },
    hours: {
      singular: t("page-10-year-countdown-hour"),
      plural: t("page-10-year-countdown-hours"),
    },
    minutes: {
      singular: t("page-10-year-countdown-minute"),
      plural: t("page-10-year-countdown-minutes"),
    },
    seconds: {
      singular: t("page-10-year-countdown-second"),
      plural: t("page-10-year-countdown-seconds"),
    },
  }
  return timeLeftLabels
}

export const getInnovationCards = async (): Promise<InnovationCard[]> => {
  const locale = await getLocale()
  const t = await getTranslations({
    locale,
    namespace: "page-10-year-anniversary",
  })
  return [
    {
      image: EthereumLaunchImage,
    },
    {
      image: StableCoinImage,
    },
    {
      image: NftImage,
    },
    {
      image: DefiSummerImage,
    },
    {
      image: TheMergeImage,
    },
    {
      image: EthETFImage,
    },
  ].map((card, index) => ({
    ...card,
    title: t(`page-10-year-innovation-card-${index + 1}-title`),
    date: t(`page-10-year-innovation-card-${index + 1}-date`),
    description1: t(`page-10-year-innovation-card-${index + 1}-description-1`),
    description2: t(`page-10-year-innovation-card-${index + 1}-description-2`),
  }))
}

export const getAdoptionCards = async (): Promise<AdoptionCard[]> => {
  const locale = await getLocale()
  const t = await getTranslations({
    locale,
    namespace: "page-10-year-anniversary",
  })
  return [
    {
      image: Adoption1Image,
      href: "/resources",
    },
    {
      image: Adoption2Image,
      href: "/roadmap",
    },
    {
      image: Adoption3Image,
      href: "/stablecoins",
    },
    {
      image: Adoption4Image,
      href: "/defi",
    },
    {
      image: Adoption5Image,
      href: "/energy-consumption",
    },
    {
      image: Adoption6Image,
      href: "/layer-2",
    },
  ].map((card, index) => ({
    ...card,
    title: t(`page-10-year-adoption-card-${index + 1}-title`),
    linkText: t(`page-10-year-adoption-card-${index + 1}-link-text`),
    // description: Uses htmr, loaded directly with Translation component where consumed
  }))
}
