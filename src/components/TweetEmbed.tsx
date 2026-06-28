import { Suspense } from "react"
import { getTranslations } from "next-intl/server"
import { Tweet } from "react-tweet"

import { cn } from "@/lib/utils/cn"

/**
 * Server-rendered tweet embed for MDX content.
 *
 * Mirrors the YouTube component pattern: a single prop for the tweet
 * identifier, rendered inside a semantic figure element. Uses Vercel's
 * `react-tweet` which fetches tweet data at build time via Twitter's
 * syndication API — zero client JS, no third-party scripts at runtime.
 *
 * @param id - The numeric tweet/post ID.
 *   For https://x.com/anomalyskins/status/1981254371007426993 the `id`
 *   is "1981254371007426993".
 * @returns Server-rendered tweet card wrapped in a figure.
 */
type TweetEmbedProps = {
  id: string
  className?: string
}

const TweetEmbed = async ({ id, className }: TweetEmbedProps) => {
  const t = await getTranslations("common")

  return (
    <figure className={cn("not-prose my-8", className)}>
      <Suspense
        fallback={
          <div className="flex justify-center rounded-xl border p-8 text-body-medium">
            {t("loading")}
          </div>
        }
      >
        <Tweet id={id} />
      </Suspense>
    </figure>
  )
}

export default TweetEmbed
