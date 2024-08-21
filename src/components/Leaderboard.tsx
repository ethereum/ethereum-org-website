import { useTranslation } from "next-i18next"
import {
  Avatar,
  Box,
  Flex,
  LinkBox,
  LinkOverlay,
  List,
  ListItem,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react"

import Emoji from "@/components/Emoji"
import { BaseLink } from "@/components/Link"

import { GITHUB_URL } from "@/lib/constants"

import { useRtlFlip } from "@/hooks/useRtlFlip"

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
  const { flipForRtl } = useRtlFlip()
  const colorModeStyles = useColorModeValue(
    {
      listBoxShadow: "tableBox.light",
      linkBoxShadow: "tableItemBox.light",
      scoreColor: "blackAlpha.700",
    },
    {
      listBoxShadow: "tableBox.dark",
      linkBoxShadow: "tableItemBox.dark",
      scoreColor: "whiteAlpha.600",
    }
  )

  const { t } = useTranslation("page-bug-bounty")

  return (
    <List
      bgColor="background.base"
      boxShadow={colorModeStyles.listBoxShadow}
      w="100%"
      mb={8}
      ms={0}
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
            <ListItem key={username} mb={0}>
              <LinkBox
                key={idx}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                boxShadow={colorModeStyles.linkBoxShadow}
                mb={0.25}
                p={4}
                w="100%"
                _hover={{
                  textDecor: "none",
                  borderRadius: 0.5,
                  boxShadow: "0 0 1px var(--eth-colors-primary-base)",
                  background: "tableBackgroundHover",
                }}
              >
                <Box me={4} opacity="0.4">
                  {idx + 1}
                </Box>
                <Avatar
                  src={avatarImg}
                  name={avatarAlt}
                  me={4}
                  h={10}
                  w={10}
                  display={{ base: "none", xs: "block" }}
                />
                <Flex flex="1 1 75%" direction="column" me={8}>
                  <LinkOverlay
                    as={BaseLink}
                    href={hasGitHub ? `${GITHUB_URL}${username}` : "#"}
                    textDecor="none"
                    color="text"
                    hideArrow
                  >
                    <VisuallyHidden>{`In place number ${
                      idx + 1
                    } with ${score} points`}</VisuallyHidden>
                    {name}{" "}
                    {hasGitHub && (
                      <VisuallyHidden>(See Github Profile)</VisuallyHidden>
                    )}
                  </LinkOverlay>

                  <Box fontSize="sm" color={colorModeStyles.scoreColor}>
                    {score} {t("page-upgrades-bug-bounty-leaderboard-points")}
                  </Box>
                </Flex>
                {emoji && <Emoji className="me-8 text-2xl" text={emoji} />}
                <Box
                  as="span"
                  _after={{
                    content: '"↗"',
                    ms: 0.5,
                    me: 1.5,
                    transform: flipForRtl,
                    display: "inline-block",
                  }}
                />
              </LinkBox>
            </ListItem>
          )
        })}
    </List>
  )
}

export default Leaderboard
