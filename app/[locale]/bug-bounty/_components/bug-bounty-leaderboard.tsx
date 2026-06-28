import { ExternalLink } from "lucide-react"
import { getTranslations } from "next-intl/server"

import Emoji from "@/components/Emoji"
import { Avatar } from "@/components/ui/avatar"
import { Flex } from "@/components/ui/flex"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { List, ListItem } from "@/components/ui/list"

import { GITHUB_URL } from "@/lib/constants"

type Person = {
  name: string
  username: string
  score: number
}

type BugBountyLeaderboardProps = {
  content: Person[]
  limit?: number
}

const BugBountyLeaderboard = async ({
  content,
  limit = 100,
}: BugBountyLeaderboardProps) => {
  const t = await getTranslations("page-bug-bounty")

  return (
    <List
      className="ms-0 mb-8 w-full list-none overflow-hidden rounded-base bg-background shadow-table-box"
      aria-label={t("page-upgrades-bug-bounty-leaderboard-list")}
    >
      {content
        .filter((_, idx) => idx < limit)
        .map(({ name, username, score }, idx) => {
          const hasGitHub = !!username
          const avatarImg = GITHUB_URL + (username || "random") + ".png?size=40"
          const avatarAlt = hasGitHub ? `${username} GitHub avatar` : ""

          let emoji: string | null = null
          if (idx === 0) {
            emoji = ":trophy:"
          } else if (idx === 1) {
            emoji = ":2nd_place_medal:"
          } else if (idx === 2) {
            emoji = ":3rd_place_medal:"
          }

          return (
            <ListItem
              className="mb-0 not-last:border-b"
              key={name + username + score}
            >
              <LinkBox
                className="flex w-full items-center justify-between p-4 hover:bg-background-highlight hover:no-underline hover:shadow-primary"
                key={idx}
              >
                <div className="me-4 opacity-40">{idx + 1}</div>
                <Avatar
                  src={avatarImg}
                  name={avatarAlt}
                  // This meets the Design System requirement, despite the leaderboard item itself being a link
                  href={hasGitHub ? `${GITHUB_URL}${username}` : "#"}
                  // `size-10` is not part of a "size" variant
                  className="me-4 size-10"
                />
                <Flex className="me-8 flex-1 basis-3/4 flex-col">
                  <LinkOverlay
                    className="text-body no-underline"
                    href={hasGitHub ? `${GITHUB_URL}${username}` : "#"}
                  >
                    <span className="sr-only">
                      {t("page-upgrades-bug-bounty-leaderboard-position", {
                        rank: idx + 1,
                        score,
                      })}
                    </span>
                    {name}{" "}
                    {hasGitHub && (
                      <span className="sr-only">
                        {t(
                          "page-upgrades-bug-bounty-leaderboard-github-profile"
                        )}
                      </span>
                    )}
                  </LinkOverlay>

                  <div className="text-sm text-body-medium">
                    {score} {t("page-upgrades-bug-bounty-leaderboard-points")}
                  </div>
                </Flex>
                {emoji && <Emoji className="me-8 text-2xl" text={emoji} />}
                <ExternalLink className="size-[1em] rtl:-scale-x-100" />
              </LinkBox>
            </ListItem>
          )
        })}
    </List>
  )
}

export default BugBountyLeaderboard
