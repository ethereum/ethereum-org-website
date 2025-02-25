import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import Emoji from "@/components/Emoji"

import { GITHUB_URL } from "@/lib/constants"

import { Avatar } from "./ui/avatar"
import { Flex } from "./ui/flex"
import { LinkBox } from "./ui/link-box"
import { LinkOverlay } from "./ui/link-box"
import { List, ListItem } from "./ui/list"

import { useRtlFlip } from "@/hooks/useRtlFlip"
import { useTranslation } from "@/hooks/useTranslation"

type Person = {
  name: string
  username: string
  score: number
}

type LeaderboardProps = {
  content: Person[]
  limit?: number
}

const Leaderboard = ({ content, limit = 100 }: LeaderboardProps) => {
  const { twFlipForRtl } = useRtlFlip()
  const { t } = useTranslation("page-bug-bounty")

  return (
    <List
      className="mb-8 ms-0 w-full list-none bg-background shadow-table-box"
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
            <ListItem className="mb-0" key={username}>
              <LinkBox
                className="mb-1 flex w-full items-center justify-between p-4 shadow-table-item-box hover:rounded-lg hover:bg-background-highlight hover:no-underline hover:shadow-primary"
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
                    <VisuallyHidden>{`In place number ${
                      idx + 1
                    } with ${score} points`}</VisuallyHidden>
                    {name}{" "}
                    {hasGitHub && (
                      <VisuallyHidden>(See Github Profile)</VisuallyHidden>
                    )}
                  </LinkOverlay>

                  <div className="text-sm text-body-medium">
                    {score} {t("page-upgrades-bug-bounty-leaderboard-points")}
                  </div>
                </Flex>
                {emoji && <Emoji className="me-8 text-2xl" text={emoji} />}
                <span
                  className={`after:me-1.5 after:ms-0.5 after:content-['↗'] after:${twFlipForRtl} after:inline-block`}
                />
              </LinkBox>
            </ListItem>
          )
        })}
    </List>
  )
}

export default Leaderboard
