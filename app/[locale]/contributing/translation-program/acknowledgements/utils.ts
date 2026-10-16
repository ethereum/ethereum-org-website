import { reverse, sortBy } from "lodash"

import type { CostLeaderboardData } from "@/lib/types"

/**
 * The leaderboard UI offers a 10- and a 50-row view, so 50 is the most rows it
 * can ever render for a range. Rows past that are dead weight: the datasets
 * total ~6.4k entries (~1.6 MB of `alltime-data.json` alone), all of which used
 * to be serialized into the client payload.
 */
export const MAX_TRANSLATION_LEADERBOARD_ROWS = 50

/**
 * A leaderboard row reduced to what `translation-leaderboard.tsx` actually
 * renders. `CostLeaderboardData.fullName` is dropped (nothing reads it), and
 * `langs` is narrowed to the single entry the row shows.
 */
export type TranslationLeaderboardRow = Pick<
  CostLeaderboardData,
  "username" | "avatarUrl" | "totalCosts"
> & { langs: string[] }

const sortAndFilterData = (data: CostLeaderboardData[]) =>
  reverse(sortBy(data, ({ totalCosts }) => totalCosts))

/**
 * Sorts a raw translation report by descending total cost and trims it to
 * `MAX_TRANSLATION_LEADERBOARD_ROWS`, keeping only rendered fields. Runs on the
 * server so the full dataset stays out of the client bundle.
 */
export const getTranslationLeaderboardRows = (
  data: CostLeaderboardData[]
): TranslationLeaderboardRow[] =>
  sortAndFilterData(data)
    .slice(0, MAX_TRANSLATION_LEADERBOARD_ROWS)
    .map(({ username, avatarUrl, totalCosts, langs }) => ({
      username,
      avatarUrl,
      totalCosts,
      langs: langs.slice(0, 1),
    }))
