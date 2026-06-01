import { getTranslations } from "next-intl/server"

import { formatDate, isValidDate } from "@/lib/utils/date"

import { DEFAULT_LOCALE } from "@/lib/constants"

import type { AdoptionCard, InnovationCard, Story } from "./types"

import EthETFImage from "@/public/images/10-year-anniversary/eth-etf.png"
import DefiSummerImage from "@/public/images/10-year-anniversary/gathering-robot-people-defi-icons.png"
import Adoption5Image from "@/public/images/10-year-anniversary/humanoid-robot-waving-walking.png"
import NftImage from "@/public/images/10-year-anniversary/people-robot-and-pink-cats-glyph.png"
import EthereumLaunchImage from "@/public/images/10-year-anniversary/person-and-robot-handshake-eth-glyph.png"
import StableCoinImage from "@/public/images/10-year-anniversary/person-mining-crystals-with-robot-eth-dai.png"
import Adoption3Image from "@/public/images/10-year-anniversary/person-walking-beside-blue-bull.png"
import TheMergeImage from "@/public/images/10-year-anniversary/robot-and-cheering-crowd-with-dog.png"
import Adoption4Image from "@/public/images/10-year-anniversary/two-cloaked-people-walking-talking.png"
import Adoption2Image from "@/public/images/10-year-anniversary/two-people-at-futuristic-atm-kiosk.png"
import Adoption1Image from "@/public/images/10-year-anniversary/two-people-conversing-walking.png"
import Adoption6Image from "@/public/images/10-year-anniversary/two-people-walking-with-tablet.png"

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

export const getInnovationCards = async (): Promise<InnovationCard[]> => {
  const t = await getTranslations("page-10-year-anniversary")
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
  const t = await getTranslations("page-10-year-anniversary")
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
