import React, { useState } from "react"
import reverse from "lodash/reverse"
import sortBy from "lodash/sortBy"
import { useTranslation } from "next-i18next"

import type { CostLeaderboardData } from "@/lib/types"

import { Button } from "@/components/ui/buttons/Button"
import { Flex } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import Emoji from "./Emoji"
import { TwImage } from "./Image"

const RadioCard = ({ value, children, checked, onChange }) => {
  return (
    <Button
      variant="ghost"
      onClick={() => onChange(value)}
      className={cn(
        "m-2 mx-0 flex h-full w-full items-center justify-center rounded-full px-6 py-4 lg:mx-2 lg:w-auto",
        checked && "border-primary text-primary shadow-md"
      )}
    >
      <span className="text-center text-md font-semibold leading-none md:text-lg md:font-normal">
        {children}
      </span>
    </Button>
  )
}

const sortAndFilterData = (data: CostLeaderboardData[]) =>
  reverse(sortBy(data, ({ totalCosts }) => totalCosts))

type TranslationLeaderboardProps = {
  allTimeData: CostLeaderboardData[]
  monthData: CostLeaderboardData[]
  quarterData: CostLeaderboardData[]
}

const TranslationLeaderboard = ({
  monthData,
  quarterData,
  allTimeData,
}: TranslationLeaderboardProps) => {
  const leaderboardData = {
    monthData: sortAndFilterData(monthData),
    quarterData: sortAndFilterData(quarterData),
    allTimeData: sortAndFilterData(allTimeData),
  }

  const [filterAmount, updateFilterAmount] = useState(10)
  const [dateRangeType, updateDateRangeType] = useState("monthData")

  const showLess = () => {
    updateFilterAmount(10)
  }

  const showMore = () => {
    updateFilterAmount(50)
  }

  const { t } = useTranslation(
    "page-contributing-translation-program-acknowledgements"
  )

  return (
    <div>
      <Flex className="mb-8 w-full flex-col justify-center px-8 py-0 lg:flex-row">
        <RadioCard
          value="monthData"
          checked={dateRangeType === "monthData"}
          onChange={updateDateRangeType}
        >
          {t(
            "page-contributing-translation-program-acknowledgements-translation-leaderboard-month-view"
          )}
        </RadioCard>
        <RadioCard
          value="quarterData"
          checked={dateRangeType === "quarterData"}
          onChange={updateDateRangeType}
        >
          {t(
            "page-contributing-translation-program-acknowledgements-translation-leaderboard-quarter-view"
          )}
        </RadioCard>
        <RadioCard
          value="allTimeData"
          checked={dateRangeType === "allTimeData"}
          onChange={updateDateRangeType}
        >
          {t(
            "page-contributing-translation-program-acknowledgements-translation-leaderboard-all-time-view"
          )}
        </RadioCard>
      </Flex>
      <div className="mb-8 w-full bg-background-highlight shadow-md">
        <Flex className="bg-muted text-foreground mb-[1px] w-full items-center justify-between p-4">
          <Flex>
            <div className="w-10 opacity-40">#</div>
            <Flex className="me-8 flex-row items-center break-words">
              {t(
                "page-contributing-translation-program-acknowledgements-translator"
              )}
            </Flex>
          </Flex>
          <Flex className="min-w-[20%] flex-row items-start">
            {t(
              "page-contributing-translation-program-acknowledgements-total-words"
            )}
          </Flex>
        </Flex>
        {leaderboardData[dateRangeType]
          .slice(0, filterAmount)
          .map((item: CostLeaderboardData, idx: number) => {
            const { username, avatarUrl, totalCosts, langs } = item

            let emoji: string | null = null
            if (idx === 0) {
              emoji = ":trophy:"
            } else if (idx === 1) {
              emoji = ":2nd_place_medal:"
            } else if (idx === 2) {
              emoji = ":3rd_place_medal:"
            }
            return (
              <Flex
                key={idx}
                className="text-foreground hover:rounded-base hover:bg-accent/50 mb-[1px] w-full items-center justify-between px-4 py-2 shadow-sm hover:shadow-md"
              >
                <Flex>
                  <div className="flex w-10 items-center">
                    {emoji ? (
                      <Emoji className="me-4 text-[2rem]" text={emoji} />
                    ) : (
                      <span className="opacity-40">{idx + 1}</span>
                    )}
                  </div>
                  <Flex className="me-8 flex-row items-center break-words">
                    <div className="relative me-4 hidden h-[30px] w-[30px] sm:block sm:h-10 sm:w-10">
                      <TwImage
                        fill
                        className="rounded-full object-cover"
                        src={avatarUrl}
                        alt={username}
                      />
                    </div>
                    <div className="max-w-[100px] sm:max-w-none">
                      {username}
                      <span className="block text-sm opacity-60">
                        {langs[0]}
                      </span>
                    </div>
                  </Flex>
                </Flex>
                <Flex className="min-w-[20%] flex-row items-start">
                  <Emoji
                    text=":writing:"
                    className="me-2 hidden text-2xl sm:block"
                  />
                  {totalCosts}
                </Flex>
              </Flex>
            )
          })}
      </div>
      <Flex className="mb-8 w-full flex-col justify-center px-8 py-0 lg:flex-row">
        <Button
          variant="ghost"
          onClick={filterAmount === 10 ? showMore : showLess}
          className="m-2 mx-0 flex h-full w-full items-center justify-center rounded-full px-6 py-4 lg:mx-2 lg:w-auto"
        >
          <span className="text-center text-md font-semibold leading-none md:text-lg md:font-normal">
            {t(
              filterAmount === 10
                ? "page-contributing-translation-program-acknowledgements-translation-leaderboard-show-more"
                : "page-contributing-translation-program-acknowledgements-translation-leaderboard-show-less"
            )}
          </span>
        </Button>
      </Flex>
    </div>
  )
}

export default TranslationLeaderboard
