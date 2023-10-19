import React from "react"
import { Badge, Box, Flex, HStack } from "@chakra-ui/react"

import Emoji from "./Emoji"
import CopyToClipboard from "./CopyToClipboard"
import InlineLink from "./Link"
import TutorialTags from "./TutorialTags"
// import Translation from "./Translation"
import Text from "./OldText"

import { Lang } from "../utils/languages"
import { getLocaleTimestamp } from "../utils/time"
import { TranslationKey } from "../utils/translations"

export interface IProps {
  frontmatter: any
}

export enum Skill {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export const getSkillTranslationId = (skill: Skill): TranslationKey =>
  `page-tutorial-${Skill[skill.toUpperCase() as keyof typeof Skill]}`


// TODO: Implement intl
const TutorialMetadata: React.FC<IProps> = ({ frontmatter }) => {
  // TODO: Implement intl
  // const { language } = useI18next()

  const hasSource = frontmatter.source && frontmatter.sourceUrl
  const published = frontmatter.published
  const author = frontmatter.author

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
          {/* TODO: Implement intl */}
          {/* <Translation id={getSkillTranslationId(frontmatter.skill)} /> */}
          {frontmatter.skill}
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
            <InlineLink to={frontmatter.sourceUrl}>
              {frontmatter.source}
            </InlineLink>
          </Box>
        )}
        {published && (
          <Box>
            <Emoji fontSize="sm" mr={2} text=":calendar:" />
            {/* TODO: Implement language from intl */}
            {/* {getLocaleTimestamp(language as Lang, published)} */}
          </Box>
        )}
        {/* <Box>
          <Emoji fontSize="sm" mr={2} text=":stopwatch:" />
          {Math.round(tutorial.fields.readingTime.minutes)}{" "}
          <Translation id="comp-tutorial-metadata-minute-read" />
        </Box> */}
      </HStack>
    </Flex>
  )
}

export default TutorialMetadata
