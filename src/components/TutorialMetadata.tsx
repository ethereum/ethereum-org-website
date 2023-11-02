import React from "react"
import { Badge, Box, Flex, HStack, Text } from "@chakra-ui/react"

import CopyToClipboard from "@/components/CopyToClipboard"
import Emoji from "@/components/Emoji"
import InlineLink from "@/components/Link"
import Translation from "@/components/Translation"
import TutorialTags from "@/components/TutorialTags"

// import { Lang } from "../utils/languages"
// import { getLocaleTimestamp } from "../utils/time"
import type { TranslationKey } from "@/lib/types"
import { TutorialFrontmatter } from "@/lib/interfaces"

export type TutorialMetadataProps = {
  frontmatter: TutorialFrontmatter
  timeToRead: number
}

export enum Skill {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export const getSkillTranslationId = (skill: Skill): TranslationKey =>
  `page-tutorial-${Skill[skill.toUpperCase() as keyof typeof Skill]}`


const TutorialMetadata = ({ frontmatter, timeToRead }: TutorialMetadataProps) => {
  // TODO: Implement after intl
  // const { language } = useI18next()

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
          {/* TODO: Implement after intl */}
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
            {/* TODO: Implement after intl */}
            {/* {getLocaleTimestamp(language as Lang, published)} */}
          </Box>
        )}
        <Box>
          <Emoji fontSize="sm" mr={2} text=":stopwatch:" />
          {timeToRead}{" "}
          {/* TODO: Implement after intl */}
          {/* <Translation id="comp-tutorial-metadata-minute-read" /> */}
          minute read
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
            <CopyToClipboard text={address}>
              {(isCopied) => (
                <Box
                  color="primary.base"
                  cursor="pointer"
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
                  {address} {isCopied && <Translation id="copied" />}
                  {isCopied && <Emoji
                      fontSize="sm"
                      ml={2}
                      mr={2}
                      text=":white_check_mark:"
                    />}
                </Box>
              )}
            </CopyToClipboard>
          </Flex>
        )}
      </HStack>
    </Flex>
  )
}

export default TutorialMetadata
