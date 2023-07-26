import React from "react"
import {
  Box,
  Avatar,
  Flex,
  LinkOverlay,
  LinkBox,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
} from "@chakra-ui/react"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Emoji from "./Emoji"
import Link from "./Link"
import Translation from "./Translation"

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

const Leaderboard: React.FC<IProps> = ({ content, limit = 100 }) => {
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

  const { t } = useTranslation()

  return (
    <List
      bgColor="background.base"
      boxShadow={colorModeStyles.listBoxShadow}
      w="100%"
      mb={8}
      ml={0}
      aria-label={t("page-upgrades-bug-bounty-leaderboard-list")}
    >
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

          const PLACE_WORDS = [
            "first",
            "second",
            "third",
            "fourth",
            "fifth",
          ] as const
          return (
            <ListItem mb={0}>
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
                <Box mr={4} opacity="0.4">
                  {idx + 1}
                </Box>
                <Avatar
                  src={avatarImg}
                  name={avatarAlt}
                  mr={4}
                  h={10}
                  w={10}
                  display={{ base: "none", xs: "block" }}
                />
                <Flex flex="1 1 75%" direction="column" mr={8}>
                  <LinkOverlay
                    as={Link}
                    href={hasGitHub ? `${githubUrl}${username}` : "#"}
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
                    {score}{" "}
                    <Translation id="page-upgrades-bug-bounty-leaderboard-points" />
                  </Box>
                </Flex>
                {emoji && <Emoji mr={8} fontSize="2xl" text={emoji} />}
                <Box
                  as="span"
                  _after={{
                    content: '"↗"',
                    ml: 0.5,
                    mr: 1.5,
                  }}
                ></Box>
              </LinkBox>
            </ListItem>
          )
        })}
    </List>
  )
}

export default Leaderboard
