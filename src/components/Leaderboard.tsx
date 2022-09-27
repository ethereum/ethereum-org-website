import React from "react"
import Emoji from "./OldEmoji"
import Link from "./Link"

import Translation from "./Translation"
import { Box, Avatar, Flex } from "@chakra-ui/react"

const githubUrl = `https://github.com/`

export interface Person {
  name: string
  username?: string | null
  score: number
}

export interface IProps {
  content: Array<Person>
  limit?: number
}

const Leaderboard: React.FC<IProps> = ({ content, limit = 100 }) => (
  <Box bgColor="background" boxShadow="tableBoxShadow" w="100%" mb={8}>
    {content
      .filter((_, idx) => idx < limit)
      .map((item, idx) => {
        const { name, username, score } = item
        const hasGitHub = username !== ""
        const avatarImg = hasGitHub
          ? `${githubUrl}${username}.png?size=40`
          : "https://github.com/random.png?size=40"
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
          <Link
            key={idx}
            textDecor="none"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            color="text"
            boxShadow="0 1px 1px tableItemBoxShadow"
            mb={0.25}
            p={4}
            w="100%"
            _hover={{
              textDecor: "none",
              borderRadius: 0.5,
              boxShadow: "0 0 1px primary",
              background: "tableBackgroundHover",
            }}
            to={hasGitHub ? `${githubUrl}${username}` : "#"}
          >
            <Box mr={4} opacity="0.4">
              {idx + 1}
            </Box>
            <Avatar
              src={avatarImg}
              name={avatarAlt}
              mr={4}
              h={10}
              w={10}
              borderRadius="50%"
              display={{ base: "none", xs: "block" }}
            />
            <Flex flex="1 1 75%" direction="column" mr={8}>
              <Box>{name}</Box>
              <Box fontSize="sm" mb={0} opacity="0.6">
                {score}{" "}
                <Translation id="page-upgrades-bug-bounty-leaderboard-points" />
              </Box>
            </Flex>
            {emoji && <Emoji mr={`2rem`} text={emoji} />}
          </Link>
        )
      })}
  </Box>
)

export default Leaderboard
