import React from "react"
import { useI18next } from "gatsby-plugin-react-i18next"
import { Badge, Box, Flex, HStack, Text } from "@chakra-ui/react"
import CopyToClipboard from "./CopyToClipboard"
import Link from "./Link"
import TutorialTags from "./TutorialTags"
import { getLocaleTimestamp } from "../utils/time"
import Emoji from "./Emoji"
import Translation from "./Translation"
import { Lang } from "../utils/languages"
import { TranslationKey } from "../utils/translations"

export interface IProps {
  tutorial: any
}

export enum Skill {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export const getSkillTranslationId = (skill: Skill): TranslationKey =>
  `page-tutorial-${Skill[skill.toUpperCase() as keyof typeof Skill]}`

const TutorialMetadata: React.FC<IProps> = ({ tutorial }) => {
  const { language } = useI18next()

  const frontmatter = tutorial.frontmatter
  const hasSource = frontmatter.source && frontmatter.sourceUrl
  const published = frontmatter.published
  const author = frontmatter.author
  const address = frontmatter.address

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      borderBottomWidth={{ base: 0, lg: "1px" }}
      borderBottomColor="border"
    >
      <Flex justifyContent="space-between" alignItems="center" w="full" mb={8}>
        <Flex flexWrap="wrap" w="full">
          <TutorialTags tags={frontmatter.tags} />
        </Flex>
        <Flex
          as={Badge}
          variant="secondary"
          alignSelf="flex-start"
          mb={2}
          whiteSpace="nowrap"
        >
          <Translation id={getSkillTranslationId(frontmatter.skill)} />
        </Flex>
      </Flex>
      <HStack
        mb={6}
        flexWrap="wrap"
        mt={-4}
        fontSize="sm"
        color="text300"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={4}
      >
        {author && (
          <Box>
            <Emoji fontSize="sm" mr={2} text=":writing_hand:" />
            {author}
          </Box>
        )}
        {hasSource && (
          <Box>
            <Emoji fontSize="sm" mr={2} text=":books:" />
            <Link to={frontmatter.sourceUrl}>{frontmatter.source}</Link>
          </Box>
        )}
        {published && (
          <Box>
            <Emoji fontSize="sm" mr={2} text=":calendar:" />
            {getLocaleTimestamp(language as Lang, published)}
          </Box>
        )}
        <Box>
          <Emoji fontSize="sm" mr={2} text=":stopwatch:" />
          {Math.round(tutorial.fields.readingTime.minutes)}{" "}
          <Translation id="comp-tutorial-metadata-minute-read" />
        </Box>
      </HStack>
      <HStack
        mb={6}
        flexWrap="wrap"
        mt={-4}
        fontSize="sm"
        color="text300"
        justifyContent="flex-start"
      >
        {address && (
          <Flex flexWrap="wrap" w="full" mr={4}>
            <CopyToClipboard text={frontmatter.address}>
              {(isCopied) => (
                <Text color="primary.base" cursor="pointer">
                  {!isCopied ? (
                    <Box
                      overflow="hidden"
                      textOverflow="ellipsis"
                      fontFamily="monospace"
                      bg="ednBackground"
                      px={1}
                      fontSize="sm"
                      _hover={{
                        bg: "primary100",
                      }}
                    >
                      <Text
                        as={Translation}
                        textTransform="uppercase"
                        id="comp-tutorial-metadata-tip-author"
                      />{" "}
                      {frontmatter.address}
                    </Box>
                  ) : (
                    <Box
                      overflow="hidden"
                      textOverflow="ellipsis"
                      fontFamily="monospace"
                      bg="ednBackground"
                      px={1}
                      fontSize="sm"
                      _hover={{
                        bg: "primary100",
                      }}
                    >
                      <Text
                        as={Translation}
                        textTransform="uppercase"
                        id="comp-tutorial-metadata-tip-author"
                      />{" "}
                      {frontmatter.address} <Translation id="copied" />
                      <Emoji
                        fontSize="sm"
                        ml={2}
                        mr={2}
                        text=":white_check_mark:"
                      />
                    </Box>
                  )}
                </Text>
              )}
            </CopyToClipboard>
          </Flex>
        )}
      </HStack>
    </Flex>
  )
}

export default TutorialMetadata
